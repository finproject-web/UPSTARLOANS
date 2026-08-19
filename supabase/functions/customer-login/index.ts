// Supabase Edge Function: customer-login
// Authenticates customer by email and password, hides database logic

import { createClient } from 'npm:@supabase/supabase-js@2'
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

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const serviceRoleKey = Deno.env.get('SB_SERVICE_ROLE_KEY') || ''
    const defaultPassword = Deno.env.get('DEFAULT_CUSTOMER_PASSWORD') || 'UpStarLoan#2024'

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: 'Server configuration missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    })

    const { data, error } = await adminClient
      .from('customers')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .order('submission_date', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return new Response(JSON.stringify({ success: false, error: 'Customer not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (password !== data.password && password !== defaultPassword) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid password' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Load admin notes (including insurance review triggers) for this customer
    const { data: notes, error: notesError } = await adminClient
      .from('admin_notes')
      .select('*')
      .eq('email', data.email)
      .order('created_at', { ascending: false })

    if (notesError) {
      console.error('Customer login admin notes error:', notesError)
    }

    ;(data as any).admin_note_records = notes || []

    return new Response(JSON.stringify({ success: true, customer: data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Customer login error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})