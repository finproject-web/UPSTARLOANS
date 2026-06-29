import { handleDatabaseError } from '../config/supabase'

// Storage bucket names
const BUCKETS = {
  AGREEMENT_PDFS: 'agreement-pdfs',
  SIGNATURES: 'signatures',
  ID_DOCUMENTS: 'id-documents',
  SELFIE_PHOTOS: 'selfie-photos',
  HEAD_ROTATION_VIDEOS: 'head-rotation-videos'
}

// API base URL (auto-detects environment)
const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:5173'

/**
 * Upload file to secure API
 * @param {string} bucketName - Name of the storage bucket
 * @param {string} fileType - Type of file (signature, agreement, id_front, etc.)
 * @param {string} fileName - Original file name
 * @param {string} fileData - File data (base64 or file object)
 * @param {string} customerId - Customer UUID (optional for admins)
 * @returns {Promise<Object>} Upload result with signed URL
 */
export async function uploadFile(bucketName, fileType, fileName, fileData, customerId = null) {
  try {
    // Get authentication credentials from session storage
    const role = sessionStorage.getItem('adminLoggedIn') ? 'admin' : 'customer'
    let authCredentials

    if (role === 'admin') {
      authCredentials = {
        role: 'admin',
        email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@upstarsloans.com',
        password: import.meta.env.VITE_ADMIN_PASSWORD || ''
      }
    } else {
      const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}')
      authCredentials = {
        role: 'customer',
        userId: customerData.userId,
        password: customerData.password
      }
    }

    const response = await fetch(`${API_BASE_URL}/api/file-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify(authCredentials)
      },
      body: JSON.stringify({
        bucketName,
        fileType,
        fileName,
        fileData,
        customerId
      })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'File upload failed')
    }

    return {
      path: result.data.path,
      fullPath: result.data.fullPath,
      signedUrl: result.data.signedUrl,
      bucketName: result.data.bucketName,
      expiresIn: result.data.expiresIn
    }
  } catch (error) {
    console.error('Error uploading file via API:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Upload signature image
 * @param {string} customerId - Customer UUID
 * @param {string} applicationId - Application ID
 * @param {string} signatureData - Base64 signature data
 * @returns {Promise<Object>} Upload result
 */
export async function uploadSignature(customerId, applicationId, signatureData) {
  try {
    const fileName = `signature_${applicationId}.png`
    
    const result = await uploadFile(
      BUCKETS.SIGNATURES,
      'signature',
      fileName,
      signatureData,
      customerId
    )
    
    return result
  } catch (error) {
    console.error('Error uploading signature:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Upload agreement PDF
 * @param {string} customerId - Customer UUID
 * @param {string} applicationId - Application ID
 * @param {Blob|File} pdfBlob - PDF file blob
 * @returns {Promise<Object>} Upload result
 */
export async function uploadAgreementPDF(customerId, applicationId, pdfBlob) {
  try {
    const fileName = `agreement_${applicationId}.pdf`
    
    // Convert blob to base64 for API
    const base64Data = await blobToBase64(pdfBlob)
    
    const result = await uploadFile(
      BUCKETS.AGREEMENT_PDFS,
      'agreement',
      fileName,
      base64Data,
      customerId
    )
    
    return result
  } catch (error) {
    console.error('Error uploading agreement PDF:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Upload ID document (front or back)
 * @param {string} customerId - Customer UUID
 * @param {string} applicationId - Application ID
 * @param {string} documentType - 'id_front' or 'id_back'
 * @param {string} documentData - Base64 document data or File object
 * @param {string} fileName - Original file name
 * @returns {Promise<Object>} Upload result
 */
export async function uploadIDDocument(customerId, applicationId, documentType, documentData, fileName) {
  try {
    // Convert file to base64 if needed
    let fileData = documentData
    if (documentData instanceof File || documentData instanceof Blob) {
      fileData = await blobToBase64(documentData)
    }
    
    const result = await uploadFile(
      BUCKETS.ID_DOCUMENTS,
      documentType,
      fileName,
      fileData,
      customerId
    )
    
    return result
  } catch (error) {
    console.error('Error uploading ID document:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Upload selfie photo
 * @param {string} customerId - Customer UUID
 * @param {string} applicationId - Application ID
 * @param {string} selfieData - Base64 selfie data or File object
 * @param {string} fileName - Original file name
 * @returns {Promise<Object>} Upload result
 */
export async function uploadSelfie(customerId, applicationId, selfieData, fileName) {
  try {
    // Convert file to base64 if needed
    let fileData = selfieData
    if (selfieData instanceof File || selfieData instanceof Blob) {
      fileData = await blobToBase64(selfieData)
    }
    
    const result = await uploadFile(
      BUCKETS.SELFIE_PHOTOS,
      'selfie',
      fileName,
      fileData,
      customerId
    )
    
    return result
  } catch (error) {
    console.error('Error uploading selfie:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Upload head rotation video
 * @param {string} customerId - Customer UUID
 * @param {string} applicationId - Application ID
 * @param {Blob|File} videoFile - Video file
 * @param {string} fileName - Original file name
 * @returns {Promise<Object>} Upload result
 */
export async function uploadHeadRotationVideo(customerId, applicationId, videoFile, fileName) {
  try {
    // Convert file to base64 for API
    const fileData = await blobToBase64(videoFile)
    
    const result = await uploadFile(
      BUCKETS.HEAD_ROTATION_VIDEOS,
      'video',
      fileName,
      fileData,
      customerId
    )
    
    return result
  } catch (error) {
    console.error('Error uploading head rotation video:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Convert blob to base64
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Get signed URL for file access
 * @param {string} bucketName - Name of the storage bucket
 * @param {string} storagePath - File path in storage
 * @param {string} customerId - Customer UUID (for access control)
 * @returns {Promise<string>} Signed URL
 */
export async function getSignedUrl(bucketName, storagePath, customerId = null) {
  try {
    // Get authentication credentials from session storage
    const role = sessionStorage.getItem('adminLoggedIn') ? 'admin' : 'customer'
    let authCredentials

    if (role === 'admin') {
      authCredentials = {
        role: 'admin',
        email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@upstarsloans.com',
        password: import.meta.env.VITE_ADMIN_PASSWORD || ''
      }
    } else {
      const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}')
      authCredentials = {
        role: 'customer',
        userId: customerData.userId,
        password: customerData.password
      }
    }

    // Build query parameters
    const params = new URLSearchParams({
      bucketName,
      storagePath,
      ...(customerId && { customerId })
    })

    const response = await fetch(`${API_BASE_URL}/api/file-access?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': JSON.stringify(authCredentials)
      }
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to generate signed URL')
    }

    return result.data.signedUrl
  } catch (error) {
    console.error('Error getting signed URL:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Download file directly
 * @param {string} bucketName - Name of the storage bucket
 * @param {string} storagePath - File path in storage
 * @param {string} customerId - Customer UUID (for access control)
 * @returns {Promise<Blob>} File blob
 */
export async function downloadFile(bucketName, storagePath, customerId = null) {
  try {
    // Get authentication credentials from session storage
    const role = sessionStorage.getItem('adminLoggedIn') ? 'admin' : 'customer'
    let authCredentials

    if (role === 'admin') {
      authCredentials = {
        role: 'admin',
        email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@upstarsloans.com',
        password: import.meta.env.VITE_ADMIN_PASSWORD || ''
      }
    } else {
      const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}')
      authCredentials = {
        role: 'customer',
        userId: customerData.userId,
        password: customerData.password
      }
    }

    // Build query parameters
    const params = new URLSearchParams({
      bucketName,
      storagePath,
      ...(customerId && { customerId })
    })

    const response = await fetch(`${API_BASE_URL}/api/file-download?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': JSON.stringify(authCredentials)
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'File download failed')
    }

    return await response.blob()
  } catch (error) {
    console.error('Error downloading file:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Helper function to determine content type from file name
 * @param {string} fileName - File name
 * @returns {string} MIME type
 */
function getFileContentType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase()
  
  const contentTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'pdf': 'application/pdf',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mov': 'video/quicktime',
    'gif': 'image/gif'
  }
  
  return contentTypes[extension] || 'application/octet-stream'
}

/**
 * Generate storage path for customer files
 * @param {string} customerId - Customer UUID
 * @param {string} fileType - Type of file (signature, agreement, id_front, id_back, selfie, video)
 * @param {string} fileName - Original file name
 * @returns {string} Storage path
 */
export function generateStoragePath(customerId, fileType, fileName) {
  const fileTypeFolders = {
    'signature': 'signatures',
    'agreement': 'agreements',
    'id_front': 'id_documents',
    'id_back': 'id_documents',
    'selfie': 'selfies',
    'video': 'videos'
  }
  
  const folder = fileTypeFolders[fileType] || 'other'
  return `${customerId}/${folder}/${fileName}`
}

// Export bucket names for use in other services
export { BUCKETS }
