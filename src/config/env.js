// Centralized environment-based configuration
// Sensitive values are loaded from .env and not hardcoded

export const CONFIG = {
  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  edgeFunctionBaseUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`,

  // Admin
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL,
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD,

  // Public contact info
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@upstarsloans.com',
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '1-800-UPSTARS',
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || 'www.upstarsloans.com',

  // Google Apps Script endpoints
  googleSheets: {
    loanApp: import.meta.env.VITE_GSHEET_LOAN_APP_URL,
    personalFinancing: import.meta.env.VITE_GSHEET_PERSONAL_FINANCING_URL,
    loanApplication: import.meta.env.VITE_GSHEET_LOAN_APPLICATION_URL,
    contact: import.meta.env.VITE_GSHEET_CONTACT_URL,
    customerService: import.meta.env.VITE_GSHEET_CUSTOMER_SERVICE_URL
  }
}