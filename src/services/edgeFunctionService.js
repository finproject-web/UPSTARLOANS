// Edge Function Service
// Calls Supabase Edge Functions to hide backend logic from the browser

import { CONFIG } from '../config/env'

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
 * Call a Supabase Edge Function
 */
async function callEdgeFunction(functionName, body = {}, method = 'POST') {
  const url = `${CONFIG.edgeFunctionBaseUrl}/${functionName}`
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.supabaseAnonKey}`
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `Edge function ${functionName} failed`)
  }

  return response.json()
}

/**
 * Submit customer application through backend
 */
export async function submitApplication(customer) {
  return callEdgeFunction('submit-application', { customer })
}

/**
 * Admin login
 */
export async function adminLogin(email, password) {
  return callEdgeFunction('admin-login', { email, password })
}

/**
 * Customer login
 */
export async function customerLogin(email, password) {
  const result = await callEdgeFunction('customer-login', { email, password })
  if (!result.success) {
    throw new Error(result.error || 'Login failed')
  }
  return { ...result, customer: mapDatabaseCustomerToApplication(result.customer) }
}

/**
 * Submit data to any Google Sheet script through backend
 */
export async function submitToSheets(formType, data) {
  return callEdgeFunction('submit-to-sheets', { formType, data })
}
export async function getCustomers(token) {
  const result = await callEdgeFunction('get-customers', { token })
  if (!result.success) {
    throw new Error(result.error || 'Failed to load customers')
  }
  return result.customers.map(mapDatabaseCustomerToApplication)
}

/**
 * Call admin-customers edge function for admin/customer data operations
 */
export async function callAdminCustomers(action, data = {}, token = null) {
  const result = await callEdgeFunction('admin-customers', { action, data, token })
  if (!result.success) {
    throw new Error(result.error || `Admin customers action ${action} failed`)
  }
  return result
}