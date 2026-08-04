import { callAdminCustomers, getCustomers, customerLogin } from './edgeFunctionService'

// Customer Database Service
// Handles all database operations through Supabase Edge Functions

export const DEFAULT_CUSTOMER_PASSWORD = 'UpStarLoan#2024'

// Local error handling helper
export const handleDatabaseError = (error) => {
  console.error('Database error:', error)
  if (error.code === 'PGRST116') {
    return 'Record not found'
  }
  if (error.code === 'PGRST301') {
    return 'Database connection error'
  }
  return error.message || 'An error occurred while accessing the database'
}

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

function getAdminToken() {
  return sessionStorage.getItem('adminToken')
}

/**
 * Get all customers from database
 */
export async function fetchAllCustomers() {
  try {
    const token = getAdminToken()
    if (!token) {
      throw new Error('Admin not authenticated')
    }

    const customers = await getCustomers(token)

    if (!customers || customers.length === 0) {
      console.log('fetchAllCustomers: No rows returned')
      return []
    }

    return customers
  } catch (error) {
    console.error('Error fetching customers from database:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Get customer by email (uses customer login)
 */
export async function fetchCustomerByEmail(email) {
  try {
    const storedCustomer = sessionStorage.getItem('customerData')
    const password = storedCustomer ? JSON.parse(storedCustomer).password : ''
    const result = await customerLogin(email, password)
    return result.customer
  } catch (error) {
    console.warn('fetchCustomerByEmail: could not refresh:', error)
    return null
  }
}

/**
 * Get customer by application ID
 */
export async function fetchCustomerByApplicationId(applicationId) {
  try {
    const result = await callAdminCustomers('fetchCustomerByApplicationId', { applicationId })
    return mapDatabaseCustomerToApplication(result.customer)
  } catch (error) {
    console.error('Error fetching customer by application ID:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Update customer status
 */
export async function updateCustomerStatus(applicationId, status, adminNotes = '') {
  try {
    const token = getAdminToken()
    const result = await callAdminCustomers('updateCustomerStatus', { applicationId, status, adminNotes }, token)
    return mapDatabaseCustomerToApplication(result.customer)
  } catch (error) {
    console.error('Error updating customer status:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Update existing customer in database
 */
export async function updateCustomerInDatabase(applicationId, updateData) {
  try {
    const token = getAdminToken()
    const result = await callAdminCustomers('updateCustomerInDatabase', { applicationId, updateData }, token)
    return mapDatabaseCustomerToApplication(result.customer)
  } catch (error) {
    console.error('Error updating customer in database:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Delete customer (soft delete by updating status)
 */
export async function deleteCustomer(applicationId) {
  try {
    const token = getAdminToken()
    const result = await callAdminCustomers('deleteCustomer', { applicationId }, token)
    return mapDatabaseCustomerToApplication(result.customer)
  } catch (error) {
    console.error('Error deleting customer:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Save customer login credentials
 */
export async function saveCustomerCredentials(applicationId, userId, password) {
  try {
    const token = getAdminToken()
    const result = await callAdminCustomers('saveCustomerCredentials', { applicationId, userId, password }, token)
    return mapDatabaseCustomerToApplication(result.customer)
  } catch (error) {
    console.error('Error saving customer credentials:', error)
    throw handleDatabaseError(error)
  }
}

/**
 * Authenticate customer login
 * @deprecated Use customerLogin from edgeFunctionService
 */
export async function authenticateCustomer(userId, password) {
  // Not used anymore; kept for compatibility
  return null
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
    const token = getAdminToken()
    await callAdminCustomers('triggerInsuranceReview', { email }, token)
    console.log('Insurance review triggered successfully')
    return { success: true }
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
    const result = await callAdminCustomers('loadAdminNotes', { email })
    return result.notes || []
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
    const result = await callAdminCustomers('saveInsuranceReview', { reviewData })
    console.log('Insurance review saved successfully')
    return result.data
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
    const result = await callAdminCustomers('checkInsuranceReviewStatus', { email })
    return result.review
  } catch (error) {
    console.error('Error checking insurance review status:', error)
    return {
      review_completed: false,
      completed_at: null,
      id_verification_status: 'not_submitted',
      id_document_front_url: null,
      id_document_back_url: null,
      selfie_photo_url: null,
      id_type: null,
      payment_method: null,
      understanding_statement: null,
      ip_address: null
    }
  }
}
