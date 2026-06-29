import { supabase, TABLES, handleDatabaseError } from '../config/supabase'
import { stripBase64Prefix } from './databaseService'
import {
  uploadIDDocument,
  uploadSelfie,
  uploadHeadRotationVideo,
  getSignedUrl,
  BUCKETS
} from './storageService'

/**
 * Save KYC document to database with storage
 */
export async function saveKYCDocument(customerId, applicationId, documentData) {
  try {
    console.log('=== SAVE KYC DOCUMENT ===')
    console.log('Document type:', documentData.documentType)
    console.log('Customer ID:', customerId)
    console.log('Application ID:', applicationId)
    
    let storagePath = null
    let storageUrl = null
    let documentDataBase64 = null
    
    // Determine document type and upload to appropriate storage
    const docType = documentData.documentType || documentData.type
    const fileName = documentData.documentName || documentData.name || 'document.jpg'
    
    console.log('Processing document:', docType, fileName)
    
    if (docType === 'id_front' || docType === 'id_back') {
      // Upload to ID documents bucket
      try {
        console.log('Uploading to ID documents bucket...')
        const uploadResult = await uploadIDDocument(
          customerId,
          applicationId,
          docType,
          documentData.documentData || documentData.data,
          fileName
        )
        storagePath = uploadResult.path
        storageUrl = uploadResult.publicUrl
        console.log('✅ ID document uploaded successfully:', uploadResult)
      } catch (uploadError) {
        console.error('❌ Storage upload failed, falling back to base64:', uploadError)
        documentDataBase64 = stripBase64Prefix(documentData.documentData || documentData.data)
      }
    } else if (docType === 'selfie') {
      // Upload to selfie bucket
      try {
        console.log('Uploading to selfie bucket...')
        const uploadResult = await uploadSelfie(
          customerId,
          applicationId,
          documentData.documentData || documentData.data,
          fileName
        )
        storagePath = uploadResult.path
        storageUrl = uploadResult.publicUrl
        console.log('✅ Selfie uploaded successfully:', uploadResult)
      } catch (uploadError) {
        console.error('❌ Storage upload failed, falling back to base64:', uploadError)
        documentDataBase64 = stripBase64Prefix(documentData.documentData || documentData.data)
      }
    } else if (docType === 'head_rotation') {
      // Upload to video bucket
      try {
        console.log('Uploading to video bucket...')
        const uploadResult = await uploadHeadRotationVideo(
          customerId,
          applicationId,
          documentData.documentData || documentData.data,
          fileName
        )
        storagePath = uploadResult.path
        storageUrl = uploadResult.publicUrl
        console.log('✅ Video uploaded successfully:', uploadResult)
      } catch (uploadError) {
        console.error('❌ Storage upload failed, falling back to base64:', uploadError)
        documentDataBase64 = stripBase64Prefix(documentData.documentData || documentData.data)
      }
    } else {
      // For other document types, store base64
      console.log('Storing as base64 (fallback)')
      documentDataBase64 = stripBase64Prefix(documentData.documentData || documentData.data)
    }
    
    const kycData = {
      customer_id: customerId,
      document_name: fileName,
      document_type: docType,
      document_size: documentData.documentSize || documentData.size,
      document_data: documentDataBase64,
      storage_path: storagePath,
      storage_url: storageUrl,
      verification_status: 'pending'
    }
    
    console.log('Inserting KYC document into database:', kycData)
    const { data, error } = await supabase
      .from(TABLES.KYC_DOCUMENTS)
      .insert(kycData)
      .select()
      .single()
    
    if (error) {
      console.error('❌ KYC DOCUMENT INSERT ERROR:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      throw error
    }
    
    console.log('✅ KYC DOCUMENT SAVED SUCCESSFULLY:', data)
    return data
  } catch (error) {
    console.error('❌ ERROR SAVING KYC DOCUMENT:', error)
    console.error('Error stack:', error.stack)
    throw handleDatabaseError(error)
  }
}

/**
 * Get KYC documents for a customer with signed URLs
 */
export async function getCustomerKYCDocuments(customerId) {
  try {
    const { data, error } = await supabase
      .from(TABLES.KYC_DOCUMENTS)
      .select('*')
      .eq('customer_id', customerId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    
    // Generate signed URLs for storage files
    const documentsWithUrls = await Promise.all(
      data.map(async (doc) => {
        if (doc.storage_path && !doc.storage_url) {
          try {
            const bucket = determineBucketFromDocType(doc.document_type)
            const signedUrl = await getSignedUrl(bucket, doc.storage_path, customerId)
            return { ...doc, access_url: signedUrl }
          } catch (urlError) {
            console.error('Error generating signed URL:', urlError)
            return { ...doc, access_url: null }
          }
        }
        return { ...doc, access_url: doc.storage_url || null }
      })
    )
    
    return documentsWithUrls
  } catch (error) {
    console.error('Error fetching KYC documents:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Determine storage bucket from document type
 */
function determineBucketFromDocType(docType) {
  if (docType === 'id_front' || docType === 'id_back') {
    return BUCKETS.ID_DOCUMENTS
  } else if (docType === 'selfie') {
    return BUCKETS.SELFIE_PHOTOS
  } else if (docType === 'head_rotation') {
    return BUCKETS.HEAD_ROTATION_VIDEOS
  }
  return BUCKETS.ID_DOCUMENTS // default
}

/**
 * Verify KYC document
 */
export async function verifyKYCDocument(documentId, verifiedBy, status = 'verified') {
  try {
    const { data, error } = await supabase
      .from(TABLES.KYC_DOCUMENTS)
      .update({
        verification_status: status,
        verification_date: new Date().toISOString(),
        verified_by: verifiedBy
      })
      .eq('id', documentId)
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error verifying KYC document:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Save loan agreement with storage
 */
export async function saveLoanAgreement(customerId, applicationId, agreementData) {
  try {
    console.log('=== SAVE LOAN AGREEMENT ===')
    console.log('Customer ID:', customerId)
    console.log('Application ID:', applicationId)
    console.log('Agreement status:', agreementData.agreementStatus)
    
    let signatureStoragePath = null
    let signatureStorageUrl = null
    let signatureDataBase64 = null
    
    // Upload signature to storage if provided
    if (agreementData.signatureData || agreementData.signature) {
      try {
        console.log('Uploading signature to storage...')
        const { uploadSignature } = await import('./storageService')
        const uploadResult = await uploadSignature(
          customerId,
          applicationId,
          agreementData.signatureData || agreementData.signature
        )
        signatureStoragePath = uploadResult.path
        signatureStorageUrl = uploadResult.publicUrl
        console.log('✅ Signature uploaded successfully:', uploadResult)
      } catch (uploadError) {
        console.error('❌ Signature upload failed, falling back to base64:', uploadError)
        signatureDataBase64 = stripBase64Prefix(agreementData.signatureData || agreementData.signature)
      }
    }
    
    const loanAgreement = {
      customer_id: customerId,
      application_id: applicationId,
      agreement_status: agreementData.agreementStatus || 'signed',
      signature_data: signatureDataBase64,
      signature_storage_path: signatureStoragePath,
      signature_storage_url: signatureStorageUrl,
      agreement_date: new Date().toISOString()
    }
    
    console.log('Inserting loan agreement into database:', loanAgreement)
    const { data, error } = await supabase
      .from(TABLES.LOAN_APPLICATIONS)
      .insert(loanAgreement)
      .select()
      .single()
    
    if (error) {
      console.error('❌ LOAN AGREEMENT INSERT ERROR:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      throw error
    }
    
    console.log('✅ LOAN AGREEMENT SAVED SUCCESSFULLY:', data)
    return data
  } catch (error) {
    console.error('❌ ERROR SAVING LOAN AGREEMENT:', error)
    console.error('Error stack:', error.stack)
    throw handleDatabaseError(error)
  }
}

/**
 * Get loan agreement for customer
 */
export async function getLoanAgreement(customerId) {
  try {
    const { data, error } = await supabase
      .from(TABLES.LOAN_APPLICATIONS)
      .select('*')
      .eq('customer_id', customerId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null // No agreement found
      }
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error fetching loan agreement:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Update agreement PDF with storage
 */
export async function updateAgreementPDF(customerId, applicationId, pdfBlob) {
  try {
    let pdfStoragePath = null
    let pdfStorageUrl = null
    
    // Upload PDF to storage if provided
    if (pdfBlob) {
      try {
        const { uploadAgreementPDF } = await import('./storageService')
        const uploadResult = await uploadAgreementPDF(
          customerId,
          applicationId,
          pdfBlob
        )
        pdfStoragePath = uploadResult.path
        pdfStorageUrl = uploadResult.publicUrl
      } catch (uploadError) {
        console.error('PDF upload failed:', uploadError)
        throw uploadError
      }
    }
    
    const { data, error } = await supabase
      .from(TABLES.LOAN_APPLICATIONS)
      .update({ 
        agreement_pdf_url: pdfStorageUrl,
        agreement_pdf_storage_path: pdfStoragePath
      })
      .eq('application_id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error updating agreement PDF:', error)
    throw handleDatabaseError(error)
  }
}
