# Enhanced Google Apps Script Deployment Guide

## Overview
This guide will help you deploy the new enhanced Google Apps Script that handles both initial applications and agreement submissions with ID proof, sending emails to multiple recipients simultaneously.

## Step 1: Create New Google Apps Script

1. **Go to Google Apps Script**
   - Visit [script.google.com](https://script.google.com)
   - Click "New Project"

2. **Replace the default code**
   - Delete all default code
   - Copy the entire content from `ENHANCED_EMAIL_SCRIPT.gs`
   - Paste it into the editor

3. **Update Email Configuration**
   - Find these lines at the top of the script:
   ```javascript
   const PRIMARY_EMAIL = "your-primary-email@gmail.com";
   const SECONDARY_EMAIL = "your-secondary-email@gmail.com";
   ```
   - Replace with your actual Gmail addresses

## Step 2: Deploy the Script

1. **Save the Project**
   - Click "Save project" (Ctrl+S)
   - Give it a name like "UpStars Loans Enhanced Email"

2. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Select "Web app"
   - Configuration:
     - Description: "UpStars Loans Enhanced Email Service"
     - Execute as: "Me (your-email@gmail.com)"
     - Who has access: "Anyone"
   - Click "Deploy"

3. **Get Your Script URL**
   - After deployment, you'll get a URL like:
     `https://script.google.com/macros/s/ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567B890C123/exec`
   - Copy this URL - this is your **NEW_SCRIPT_ID**

## Step 3: Update Your React App

1. **Open `src/pages/LoanApplication.jsx`**
2. **Find this line:**
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec'
   ```
3. **Replace with your actual URL:**
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567B890C123/exec'
   ```

## Step 4: Test the Integration

### Test Initial Application
1. Start your React app
2. Fill out the loan application form completely
3. Click "Generate Document"
4. Check both Gmail accounts for the application email

### Test Agreement Submission
1. Complete the application flow
2. Upload an ID proof (PDF/JPG/PNG < 5MB)
3. Accept the agreement
4. Click "Submit Agreement"
5. Check both Gmail accounts for the agreement email with ID proof

## What You'll Receive in Emails

### Initial Application Email Includes:
- **Loan Agent**: Selected agent
- **Full Name**: Applicant's complete name
- **Contact Info**: Email, phone, address
- **Loan Details**: Amount, purpose, term, monthly payment
- **Bank Information**: Bank name, routing, account (masked)
- **Additional Info**: DOB, User ID, submission date

### Agreement Submission Email Includes:
- **Borrower Information**: Name, email
- **Agreement Details**: Agreement number, loan amount, term, monthly payment
- **Status**: Agreement accepted, signature status, submission date
- **ID Proof**: File name, type, size, base64 attachment
- **Complete Agreement**: Full agreement content

## Email Features

### Professional HTML Email Templates:
- **Responsive Design**: Works on all devices
- **Professional Styling**: Clean, modern layout
- **Data Organization**: Clear sections and labels
- **Status Indicators**: ✅ and ❌ for visual clarity

### Simultaneous Email Delivery:
- **Primary Email**: Full HTML email with all formatting
- **Secondary Email**: Plain text version for backup
- **Error Handling**: Automatic error notifications
- **Logging**: Complete activity logs

### Data Security:
- **Base64 Encoding**: Secure file attachment
- **Data Truncation**: Handles large files gracefully
- **Error Reporting**: Detailed error information
- **Validation**: Field validation before sending

## Troubleshooting

### Common Issues:
1. **"Script not found" error**
   - Check if you deployed the script correctly
   - Verify the URL is copied correctly
   - Ensure the script is published as web app

2. **"Permission denied" error**
   - Make sure you're logged into the correct Google account
   - Check that the script has proper permissions
   - Re-deploy if needed

3. **"Email not sending"**
   - Verify email addresses are correct
   - Check Google Apps Script execution logs
   - Ensure Gmail API is enabled

4. **Large file issues**
   - Script automatically truncates files >1MB base64
   - Still sends file information
   - Contact support if files are too large

### Google Apps Script Logs:
- **View logs**: script.google.com → your project → Executions
- **Check errors**: Look for red error messages
- **Monitor usage**: Track email sending success rates

## Security Notes:

1. **Never share your script URL publicly**
2. **Keep your Gmail credentials secure**
3. **Monitor for unusual activity**
4. **Regular security reviews**

## Support:

If you encounter issues:
1. Check the Google Apps Script execution logs
2. Verify the script URL is correct
3. Ensure all required fields are included
4. Test with small files first

The enhanced system now handles both initial applications and agreement submissions with ID proof, sending professional emails to both your Gmail accounts simultaneously!
