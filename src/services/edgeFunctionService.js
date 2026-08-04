// Edge Function Service
// Calls Supabase Edge Functions to hide backend logic from the browser

import { CONFIG } from '../config/env'

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
  return callEdgeFunction('customer-login', { email, password })
}

/**
 * Get all customers for admin
 */
export async function getCustomers(token) {
  return callEdgeFunction('get-customers', { token })
}