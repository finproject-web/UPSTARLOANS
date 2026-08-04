// Centralized environment-based configuration
// Only non-sensitive values are loaded here. Backend secrets live in Supabase Edge Functions.

export const CONFIG = {
  // Supabase (used to call Edge Functions)
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  edgeFunctionBaseUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`,

  // Public contact info
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@upstarsloans.com',
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '1-800-UPSTARS',
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || 'www.upstarsloans.com'
}