// Supabase Edge Function: admin-login
// Verifies admin credentials without exposing them to the frontend

import { corsHeaders, isAllowedOrigin } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!isAllowedOrigin(req)) {
    return new Response(JSON.stringify({ error: 'Forbidden: invalid origin' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const { email, password } = await req.json()

    const adminEmail = Deno.env.get('ADMIN_EMAIL') || ''
    const adminPassword = Deno.env.get('ADMIN_PASSWORD') || ''

    if (!adminEmail || !adminPassword) {
      return new Response(JSON.stringify({ error: 'Admin not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (email !== adminEmail || password !== adminPassword) {
      return new Response(JSON.stringify({ success: false }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const sessionToken = crypto.randomUUID()

    return new Response(JSON.stringify({ success: true, token: sessionToken }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})