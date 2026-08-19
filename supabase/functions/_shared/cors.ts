export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

export function getAllowedOrigin(): string {
  return Deno.env.get('ALLOWED_ORIGIN') || ''
}

export function isAllowedOrigin(req: Request): boolean {
  const allowed = getAllowedOrigin()
  if (!allowed) return true

  const origin = req.headers.get('origin') || ''

  // ALLOWED_ORIGIN can be a comma-separated list, e.g.:
  // https://upstarsloans.com,http://localhost:4173,http://127.0.0.1
  const allowedList = allowed.split(',').map((s) => s.trim())

  for (const entry of allowedList) {
    const allowedHost = entry.replace(/^https?:\/\//, '')
    if (!allowedHost) continue

    if (origin === entry || origin.endsWith(allowedHost)) {
      return true
    }

    // If the list includes "localhost" or "127.0.0.1" without a port,
    // allow any port (useful for browser preview proxies)
    if ((allowedHost === 'localhost' || allowedHost === '127.0.0.1') &&
        (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') ||
         origin.startsWith('https://localhost:') || origin.startsWith('https://127.0.0.1:'))) {
      return true
    }
  }

  return false
}