// Vercel API Route for Secure File Access
// Generates signed URLs for authenticated file access
import { createClient } from '@supabase/supabase-js'
import { authMiddleware, requireCustomerAccess } from './middleware/auth.js'
import { fileAccessRateLimiter } from './middleware/rateLimit.js'

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Storage bucket configuration
const VALID_BUCKETS = [
  'agreement-pdfs',
  'signatures', 
  'id-documents',
  'selfie-photos',
  'head-rotation-videos'
]

/**
 * Handle file access request
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Apply rate limiting
    await new Promise((resolve, reject) => {
      fileAccessRateLimiter(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    // Apply authentication
    await new Promise((resolve, reject) => {
      authMiddleware(supabase)(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    // Extract query parameters
    const { bucketName, storagePath, customerId } = req.query

    // Validate required parameters
    if (!bucketName || !storagePath) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Missing required parameters: bucketName and storagePath' 
      })
    }

    // Validate bucket name
    if (!VALID_BUCKETS.includes(bucketName)) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: `Invalid bucket: ${bucketName}` 
      })
    }

    // Validate access permissions
    let targetCustomerId = customerId
    
    if (req.auth.role === 'customer') {
      // Customers can only access their own files
      targetCustomerId = req.auth.user.id
      
      // Verify the file belongs to this customer
      if (!storagePath.startsWith(targetCustomerId)) {
        return res.status(403).json({ 
          error: 'Forbidden',
          message: 'You can only access your own files' 
        })
      }
    } else if (req.auth.role === 'admin') {
      // Admins can access any customer's files
      if (!customerId) {
        return res.status(400).json({ 
          error: 'Bad Request',
          message: 'Admin must specify customerId for access control logging' 
        })
      }
    }

    // Check if file exists before generating signed URL
    const { data: fileData, error: checkError } = await supabase.storage
      .from(bucketName)
      .list(storagePath.split('/').slice(0, -1).join('/'), {
        limit: 1,
        search: storagePath.split('/').pop()
      })

    if (checkError || !fileData || fileData.length === 0) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: 'File not found' 
      })
    }

    // Determine expiration time based on role and file type
    let expiresIn = 5 * 60 // Default: 5 minutes
    
    if (req.auth.role === 'admin') {
      expiresIn = 15 * 60 // Admins: 15 minutes
    }

    // Longer expiration for PDFs (customers might need more time to download)
    if (bucketName === 'agreement-pdfs' && req.auth.role === 'customer') {
      expiresIn = 10 * 60 // 10 minutes for PDFs
    }

    // Generate signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(storagePath, expiresIn)

    if (signedUrlError) {
      console.error('Signed URL generation error:', signedUrlError)
      throw signedUrlError
    }

    // Log access for audit purposes
    console.log(`File access: ${req.auth.role} ${targetCustomerId} accessed ${storagePath} in ${bucketName}`)

    // Return signed URL
    return res.status(200).json({
      success: true,
      data: {
        signedUrl: signedUrlData.signedUrl,
        bucketName: bucketName,
        storagePath: storagePath,
        expiresIn: expiresIn,
        expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString()
      }
    })

  } catch (error) {
    console.error('File access error:', error)
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message || 'Failed to generate file access URL' 
    })
  }
}

// Configure for Vercel
export const config = {
  api: {
    bodyParser: false // Disable body parser for GET requests
  }
}
