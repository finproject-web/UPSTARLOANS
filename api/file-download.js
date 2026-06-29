// Vercel API Route for Secure File Download
// Serves files directly with authentication validation
import { createClient } from '@supabase/supabase-js'
import { authMiddleware } from './middleware/auth.js'
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
 * Handle file download request
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
      // Customers can only download their own files
      targetCustomerId = req.auth.user.id
      
      // Verify the file belongs to this customer
      if (!storagePath.startsWith(targetCustomerId)) {
        return res.status(403).json({ 
          error: 'Forbidden',
          message: 'You can only download your own files' 
        })
      }
    } else if (req.auth.role === 'admin') {
      // Admins can download any customer's files
      if (!customerId) {
        return res.status(400).json({ 
          error: 'Bad Request',
          message: 'Admin must specify customerId for audit logging' 
        })
      }
    }

    // Download file from Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(storagePath)

    if (error) {
      console.error('Storage download error:', error)
      
      if (error.message?.includes('Not Found')) {
        return res.status(404).json({ 
          error: 'Not Found',
          message: 'File not found' 
        })
      }
      
      throw error
    }

    // Determine content type
    const contentType = data.type || 'application/octet-stream'

    // Determine filename from path
    const filename = storagePath.split('/').pop()

    // Set appropriate headers
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Cache-Control', 'private, max-age=300') // 5 minutes
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // Log download for audit purposes
    console.log(`File download: ${req.auth.role} ${targetCustomerId} downloaded ${storagePath} from ${bucketName}`)

    // Stream the file
    const arrayBuffer = await data.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    return res.send(buffer)

  } catch (error) {
    console.error('File download error:', error)
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message || 'File download failed' 
    })
  }
}

// Configure for Vercel
export const config = {
  api: {
    bodyParser: false, // Disable body parser for GET requests
    responseLimit: '50mb' // Allow larger file downloads
  }
}
