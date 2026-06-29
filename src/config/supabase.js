import { createClient } from '@supabase/supabase-js'

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Log configuration status
console.log('=== SUPABASE CONFIGURATION ===')
console.log('URL configured:', supabaseUrl !== 'YOUR_SUPABASE_URL')
console.log('Key configured:', supabaseKey !== 'YOUR_SUPABASE_ANON_KEY')
console.log('URL (first 20 chars):', supabaseUrl.substring(0, 20))
console.log('Key (first 20 chars):', supabaseKey.substring(0, 20))

// Log warning if credentials are not configured
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('⚠️ SUPABASE CREDENTIALS NOT CONFIGURED')
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
  console.error('Database operations will fail until credentials are configured')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table names
export const TABLES = {
  CUSTOMERS: 'customers',
  LOAN_APPLICATIONS: 'loan_applications',
  KYC_DOCUMENTS: 'kyc_documents'
}

// Error handling helper
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
