export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

// Production + local origins that should always be allowed, even if the
// ALLOWED_ORIGIN secret is missing or accidentally changed.
const FALLBACK_ALLOWED_ORIGINS = [
  'https://upstarloans.vercel.app',
  'https://upstartloan.vercel.app',
  'https://www.upstarloans.vercel.app',
  'https://upstarsloans.com',
  'https://www.upstarsloans.com',
  'http://localhost',
  'https://localhost',
  'http://127.0.0.1',
  'https://127.0.0.1'
]

export function getAllowedOrigin(): string {
  return Deno.env.get('ALLOWED_ORIGIN') || ''
}

function isOriginAllowed(origin: string, allowedList: string[]): boolean {
  for (const entry of allowedList) {
    if (!entry) continue

    // Exact match (including protocol + host + optional port)
    if (origin === entry) return true

    const allowedHost = entry.replace(/^https?:\/\//, '')
    if (!allowedHost) continue

    // Match if origin ends with the allowed host (covers port variations)
    if (origin.replace(/^https?:\/\//, '').startsWith(allowedHost + ':') ||
        origin.replace(/^https?:\/\//, '') === allowedHost) {
      return true
    }

    // If the list includes localhost/127.0.0.1 without a port, allow any port
    if ((allowedHost === 'localhost' || allowedHost === '127.0.0.1') &&
        (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') ||
         origin.startsWith('https://localhost:') || origin.startsWith('https://127.0.0.1:'))) {
      return true
    }
  }
  return false
}

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') || ''
  if (!origin) return true

  // Build the allowed list from the secret AND the hardcoded fallback list.
  // The secret is checked first; the fallback guarantees the live site keeps
  // working even if the secret is accidentally overwritten.
  const secret = getAllowedOrigin()
  const allowedList = secret
    ? secret.split(',').map((s) => s.trim()).concat(FALLBACK_ALLOWED_ORIGINS)
    : FALLBACK_ALLOWED_ORIGINS

  return isOriginAllowed(origin, allowedList)
}