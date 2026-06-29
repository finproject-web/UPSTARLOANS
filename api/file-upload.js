// Vercel API Route for Secure File Upload
// Handles authenticated file uploads to Supabase Storage
import { createClient } from '@supabase/supabase-js'
import { authMiddleware, requireCustomerAccess } from './middleware/auth.js'
import { fileUploadRateLimiter } from './middleware/rateLimit.js'

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Storage bucket configuration
const BUCKET_CONFIG = {
  'agreement-pdfs': { maxSize: 10485760, allowedTypes: ['application/pdf'] },
  'signatures': { maxSize: 1048576, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'] },
  'id-documents': { maxSize: 5242880, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'] },
  'selfie-photos': { maxSize: 5242880, allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'] },
  'head-rotation-videos': { maxSize: 52428800, allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime'] }
}

/**
 * Validate file against bucket constraints
 */
function validateFile(file, bucketName) {
  const config = BUCKET_CONFIG[bucketName]
  if (!config) {
    throw new Error(`Invalid bucket: ${bucketName}`)
  }

  // Check file size
  if (file.size > config.maxSize) {
    throw new Error(`File size exceeds limit of ${config.maxSize / (1024 * 1024)}MB`)
  }

  // Check file type
  if (!config.allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed for bucket ${bucketName}`)
  }

  return true
}

/**
 * Generate secure storage path
 */
function generateStoragePath(customerId, fileType, fileName) {
  // Sanitize filename
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  const timestamp = Date.now()
  return `${customerId}/${fileType}/${timestamp}_${sanitizedName}`
}

/**
 * Convert base64 to buffer
 */
function base64ToBuffer(base64String) {
  // Remove data URL prefix if present
  const base64Data = base64String.replace(/^data:.*;base64,/, '')
  
  const binaryString = Buffer.from(base64Data, 'base64').toString('binary')
  const buffer = Buffer.alloc(binaryString.length)
  
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i)
  }
  
  return buffer
}

/**
 * Handle file upload request
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Apply rate limiting
    await new Promise((resolve, reject) => {
      fileUploadRateLimiter(req, res, (err) => {
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

    // Extract request parameters
    const { bucketName, fileType, fileName, fileData, customerId } = req.body

    // Validate required parameters
    if (!bucketName || !fileType || !fileName || !fileData) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Missing required parameters' 
      })
    }

    // Determine customer ID based on role
    let targetCustomerId = customerId
    if (req.auth.role === 'customer') {
      targetCustomerId = req.auth.user.id
    } else if (req.auth.role === 'admin' && !customerId) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Admin must specify customerId' 
      })
    }

    // Validate bucket name
    if (!BUCKET_CONFIG[bucketName]) {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: `Invalid bucket: ${bucketName}` 
      })
    }

    // Convert file data to buffer
    let fileBuffer
    let fileSize
    let mimeType

    if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      // Handle data URL
      const matches = fileData.match(/^data:([^;]+);base64,(.+)$/)
      if (!matches) {
        throw new Error('Invalid data URL format')
      }
      
      mimeType = matches[1]
      fileBuffer = base64ToBuffer(fileData)
      fileSize = fileBuffer.length
    } else if (typeof fileData === 'string') {
      // Handle base64 string
      mimeType = 'application/octet-stream'
      fileBuffer = Buffer.from(fileData, 'base64')
      fileSize = fileBuffer.length
    } else {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Invalid file data format' 
      })
    }

    // Create file object for validation
    const fileObject = { size: fileSize, type: mimeType }

    // Validate file
    validateFile(fileObject, bucketName)

    // Generate storage path
    const storagePath = generateStoragePath(targetCustomerId, fileType, fileName)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      throw error
    }

    // Generate signed URL with short expiration (15 minutes)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(storagePath, 15 * 60) // 15 minutes

    if (signedUrlError) {
      console.error('Signed URL generation error:', signedUrlError)
      throw signedUrlError
    }

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        path: data.path,
        fullPath: data.fullPath,
        signedUrl: signedUrlData.signedUrl,
        bucketName: bucketName,
        expiresIn: 900 // 15 minutes in seconds
      }
    })

  } catch (error) {
    console.error('File upload error:', error)
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message || 'File upload failed' 
    })
  }
}

// Configure for Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb' // Allow larger file uploads
    }
  }
}
