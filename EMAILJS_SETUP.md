# EmailJS Setup Instructions

## Overview
This loan application now includes email functionality that sends the complete agreement with ID proof attachment when users submit their application.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account and follow the authentication steps
5. Note your **Service ID** (e.g., `service_gmail123`)

### 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use the template below:

**Template Content:**
```
Subject: Loan Agreement Submitted - {{borrower_name}}

Dear {{borrower_name}},

Thank you for submitting your loan agreement with UpStars Loans.

**Loan Details:**
- Loan Amount: ${{loan_amount}}
- Loan Term: {{loan_term}} months
- Agreement Number: {{agreement_number}}
- Submission Date: {{submission_date}}
- Signature Status: {{signature_status}}

**ID Proof Information:**
- File Name: {{id_proof_name}}
- File Type: {{id_proof_type}}
- File Size: {{id_proof_size}}

**Complete Agreement:**
{{agreement_content}}

**ID Proof Attachment:**
The ID proof file has been attached to this email as a base64 encoded string.

Next Steps:
1. We will review your application and ID proof
2. You will receive a decision within 24-48 hours
3. If approved, funds will be disbursed to your bank account

If you have any questions, please contact us at support@upstarsloans.com or call 1-800-UPSTARS.

Best regards,
UpStars Loans Team
```

4. Save the template and note your **Template ID** (e.g., `template_agreement123`)

### 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `abc123def456`)

### 5. Update the Code
Replace the placeholder values in `src/pages/LoanApplication.jsx`:

```javascript
// Find this section in sendAgreementEmail function:
const response = await emailjs.send(
  'service_your_service_id',      // Replace with your actual Service ID
  'template_your_template_id',    // Replace with your actual Template ID
  emailParams,
  'your_public_key'              // Replace with your actual Public Key
)
```

**Example:**
```javascript
const response = await emailjs.send(
  'service_gmail123',
  'template_agreement123',
  emailParams,
  'abc123def456'
)
```

### 6. Test the Integration
1. Start your development server
2. Complete a loan application
3. Upload an ID proof
4. Accept the agreement
5. Click "Submit Agreement"
6. Check your email for the test message

## Email Variables Available
- `to_email`: Borrower's email address
- `borrower_name`: Full name of borrower
- `loan_amount`: Loan amount requested
- `loan_term`: Loan term in months
- `agreement_number`: Unique agreement number
- `agreement_content`: Complete agreement text
- `id_proof_name`: ID proof file name
- `id_proof_type`: File type (PDF, JPG, etc.)
- `id_proof_size`: File size in MB
- `id_proof_base64`: Base64 encoded file content
- `submission_date`: Current date
- `signature_status`: Whether signature was provided

## Important Notes
- EmailJS free tier allows 200 emails/month
- Base64 encoding increases file size by ~33%
- Large files may exceed email limits
- Consider using cloud storage for production use

## Troubleshooting
- **Email not sending**: Check EmailJS credentials and network
- **Template not found**: Verify template ID is correct
- **Service not found**: Verify service ID is correct
- **Invalid API key**: Check public key in EmailJS dashboard

## Security Considerations
- Never expose your private API keys
- Consider server-side email sending for production
- Validate file uploads before processing
- Use HTTPS for all communications
