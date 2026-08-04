// Supabase Edge Function: submit-to-sheets
// Generic function to submit form data to any Google Sheet script

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

function getAllowedOrigin() {
  return Deno.env.get('ALLOWED_ORIGIN') || ''
}

function isAllowedOrigin(req) {
  const allowed = getAllowedOrigin()
  if (!allowed) return true

  const origin = req.headers.get('origin') || ''
  // Allow exact match or any subdomain
  return origin === allowed || origin.endsWith(allowed.replace(/^https?:\/\//, ''))
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Domain lock check
  if (!isAllowedOrigin(req)) {
    return new Response(JSON.stringify({ error: 'Forbidden: invalid origin' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const { formType, data } = await req.json()

    if (!formType || !data) {
      return new Response(JSON.stringify({ error: 'Missing formType or data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const scriptUrls = {
      'loanApp': Deno.env.get('LOAN_APP_SCRIPT_URL') || '',
      'personalFinancing': Deno.env.get('PERSONAL_FINANCING_SCRIPT_URL') || '',
      'loanApplication': Deno.env.get('LOAN_APPLICATION_SCRIPT_URL') || '',
      'contact': Deno.env.get('CONTACT_SCRIPT_URL') || '',
      'customerService': Deno.env.get('CUSTOMER_SERVICE_SCRIPT_URL') || ''
    }

    const scriptUrl = scriptUrls[formType]

    if (!scriptUrl) {
      return new Response(JSON.stringify({ error: `Unknown formType: ${formType}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const params = new URLSearchParams()
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value !== undefined && value !== null ? String(value) : '')
    })

    const sheetBody = params.toString()
    const bodyBytes = new TextEncoder().encode(sheetBody)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000)

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': String(bodyBytes.length)
      },
      body: sheetBody,
      signal: controller.signal
    }).finally(() => clearTimeout(timeout))

    const responseData = await response.json().catch(() => ({ result: 'success' }))

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Submit to sheets error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})