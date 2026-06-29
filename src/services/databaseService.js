import { supabase, TABLES, handleDatabaseError } from '../config/supabase'

// Customer Database Service
// Handles all database operations for customer data

export const DEFAULT_CUSTOMER_PASSWORD = 'Up$tarLoan#2024'

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
