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
  const allowedHost = allowed.replace(/^https?:\/\//, '')
  return origin === allowed || origin.endsWith(allowedHost)
}