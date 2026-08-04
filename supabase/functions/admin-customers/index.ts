// Supabase Edge Function: admin-customers
// Handles all customer/admin operations through service role, never exposes key

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
    const { action, data, token } = await req.json()

    if (!action) {
      return new Response(JSON.stringify({ error: 'Missing action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const serviceRoleKey = Deno.env.get('SB_SERVICE_ROLE_KEY') || ''

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: 'Server configuration missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    })

    switch (action) {
      case 'getCustomers': {
        if (!token) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
        const { data: customers, error } = await adminClient
          .from('customers')
          .select('*')
          .order('submission_date', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify({ success: true, customers }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'updateCustomerStatus': {
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        const { applicationId, status, adminNotes = '' } = data
        const updateData: any = { status }
        if (adminNotes !== undefined) updateData.admin_notes = adminNotes

        const { data: result, error } = await adminClient
          .from('customers')
          .update(updateData)
          .eq('application_id', applicationId)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ success: true, customer: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'updateCustomerInDatabase': {
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        const { applicationId, updateData } = data
        const dbUpdateData: any = {}
        Object.keys(updateData).forEach((key: string) => {
          const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
          dbUpdateData[snakeKey] = (updateData as any)[key]
        })

        const { data: result, error } = await adminClient
          .from('customers')
          .update(dbUpdateData)
          .eq('application_id', applicationId)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ success: true, customer: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'deleteCustomer': {
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        const { applicationId } = data
        const { data: result, error } = await adminClient
          .from('customers')
          .update({ status: 'deleted' })
          .eq('application_id', applicationId)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ success: true, customer: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'fetchCustomerByApplicationId': {
        const { applicationId } = data
        const { data: result, error } = await adminClient
          .from('customers')
          .select('*')
          .eq('application_id', applicationId)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            return new Response(JSON.stringify({ success: true, customer: null }), {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
          }
          throw error
        }
        return new Response(JSON.stringify({ success: true, customer: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'saveCustomerCredentials': {
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        const { applicationId, userId, password } = data
        const { data: result, error } = await adminClient
          .from('customers')
          .update({ user_id: userId, password })
          .eq('application_id', applicationId)
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ success: true, customer: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'triggerInsuranceReview': {
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        const { email } = data
        const { error } = await adminClient
          .from('admin_notes')
          .insert({
            email: email,
            note_text: 'Insurance Policy Review Required. Please complete the insurance policy review process by clicking the button below.',
            note_type: 'insurance_review',
            created_at: new Date().toISOString()
          })

        if (error) throw error
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'loadAdminNotes': {
        const { email } = data
        const { data: notes, error } = await adminClient
          .from('admin_notes')
          .select('*')
          .eq('email', email)
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify({ success: true, notes: notes || [] }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'saveInsuranceReview': {
        const { reviewData } = data
        const idVerificationStatus = (reviewData.idDocumentFront || reviewData.idDocumentBack || reviewData.selfiePhoto) ? 'submitted' : 'not_submitted'

        const { data: savedReview, error } = await adminClient
          .from('insurance_policy_reviews')
          .upsert({
            email: reviewData.email,
            understanding_statement: reviewData.understandingStatement,
            ip_address: reviewData.ipAddress,
            id_type: reviewData.idType,
            id_document_front_url: reviewData.idDocumentFront || null,
            id_document_back_url: reviewData.idDocumentBack || null,
            selfie_photo_url: reviewData.selfiePhoto || null,
            id_verification_status: idVerificationStatus,
            payment_method: reviewData.paymentMethod || null,
            review_completed: true,
            completed_at: new Date().toISOString()
          }, { onConflict: 'email' })

        if (error) throw error

        await adminClient
          .from('admin_notes')
          .insert({
            email: reviewData.email,
            note_text: `Customer has completed insurance policy review. IP: ${reviewData.ipAddress}, ID Type: ${reviewData.idType}. ID Verification: ${idVerificationStatus}. Customer agreed to all terms.`,
            note_type: 'insurance_completed',
            created_at: new Date().toISOString()
          })

        return new Response(JSON.stringify({ success: true, data: savedReview }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'checkInsuranceReviewStatus': {
        const { email } = data
        const { data: result, error } = await adminClient
          .from('insurance_policy_reviews')
          .select('review_completed, completed_at, id_verification_status, id_document_front_url, id_document_back_url, selfie_photo_url, id_type, payment_method, understanding_statement, ip_address')
          .eq('email', email)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            return new Response(JSON.stringify({
              success: true,
              review: {
                review_completed: false,
                completed_at: null,
                id_verification_status: 'not_submitted',
                id_document_front_url: null,
                id_document_back_url: null,
                selfie_photo_url: null,
                id_type: null,
                payment_method: null,
                understanding_statement: null,
                ip_address: null
              }
            }), {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
          }
          throw error
        }
        return new Response(JSON.stringify({ success: true, review: result }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
  } catch (error) {
    console.error('Admin customers error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
