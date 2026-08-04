import { CONFIG } from '../config/env'

export const CUSTOMERS_SCRIPT_URL = CONFIG.googleSheets.customerService

export const DEFAULT_CUSTOMER_PASSWORD = 'UpStarLoan#2024'

/** Strip data-URL prefix so dashboard can use raw base64 */
export function stripBase64Prefix(dataUrl) {
  if (!dataUrl) return ''
  const commaIndex = dataUrl.indexOf(',')
  return commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl
}

/** Map a Google Sheets row object to dashboard profile shape */
export function mapSheetCustomerToProfile(customer) {
  if (!customer) return null

  const rawBase64 = customer.idproofbase64 || customer.idProofBase64 || ''

  return {
    applicationId: customer.applicationid || customer.applicationId || '',
    firstName: customer.firstname || customer.firstName || '',
    lastName: customer.lastname || customer.lastName || '',
    email: customer.email || '',
    phoneNumber: customer.phonenumber || customer.phoneNumber || '',
    homeAddress: customer.homeaddress || customer.homeAddress || '',
    city: customer.city || '',
    state: customer.state || '',
    zipCode: customer.zipcode || customer.zipCode || '',
    dateOfBirth: customer.dateofbirth || customer.dateOfBirth || '',
    ssnNumber: customer.ssnnumber || customer.ssnNumber || '',
    loanAmount: customer.loanamount || customer.loanAmount || '',
    loanPurpose: customer.loanpurpose || customer.loanPurpose || '',
    loanTerm: customer.loantem || customer.loanTerm || '',
    monthlyPayment: customer.monthlypayment || customer.monthlyPayment || '',
    loanAgent: customer.loanagent || customer.loanAgent || '',
    bankName: customer.bankname || customer.bankName || '',
    routingNumber: customer.routingnumber || customer.routingNumber || '',
    accountNumber: customer.accountnumber || customer.accountNumber || '',
    userId: customer.userid || customer.userId || '',
    password: customer.password || DEFAULT_CUSTOMER_PASSWORD,
    status: customer.status || 'review',
    submissionDate: customer.submissiondate || customer.submissionDate || '',
    idProofName: customer.idproofname || customer.idProofName || 'Not uploaded',
    idProofSize: customer.idproofsize || customer.idProofSize || '',
    idProofType: customer.idprooftype || customer.idProofType || '',
    idProofBase64: stripBase64Prefix(rawBase64),
    adminNotes: customer.adminnotes || customer.adminNotes || '',
  }
}

function applicationTimestamp(applicationId) {
  if (!applicationId) return 0
  const match = String(applicationId).match(/LS-(\d+)/)
  return match ? Number(match[1]) : 0
}

/** Fetch all customers from Google Sheets */
export async function fetchAllCustomers() {
  const response = await fetch(CUSTOMERS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ action: 'getCustomers' }),
  })

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('Could not read customer data from server')
  }

  if (result.result !== 'success') {
    throw new Error(result.error || 'Failed to load customer applications')
  }

  return (result.data || []).map(mapSheetCustomerToProfile).filter(Boolean)
}

/** Find the most recent application for an email */
export async function fetchCustomerByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase()
  const customers = await fetchAllCustomers()

  const matches = customers.filter(
    (c) => c.email && c.email.trim().toLowerCase() === normalizedEmail
  )

  if (matches.length === 0) return null

  return matches.sort(
    (a, b) => applicationTimestamp(b.applicationId) - applicationTimestamp(a.applicationId)
  )[0]
}