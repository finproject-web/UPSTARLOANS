# Supabase Setup Guide for Upstar Loans

This guide will help you set up Supabase for permanent data storage and file management, replacing the temporary Google Sheets solution.

## Prerequisites
- A Supabase account (free tier available)
- Your Upstar Loans project code
- Vercel account (for deployment)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the project details:
   - **Name**: `upstar-loans` (or your preferred name)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Get Supabase Credentials

1. Once your project is ready, go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
3. Keep these values safe - you'll need them for environment configuration

## Step 3: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-schema.sql` from your project
4. Paste the SQL code into the editor
5. Click "Run" to execute the schema creation
6. Verify that the tables were created:
   - `customers`
   - `loan_applications`
   - `kyc_documents`

## Step 4: Set Up Storage Buckets

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-storage-setup.sql` from your project
4. Paste the SQL code into the editor
5. Click "Run" to execute the storage setup
6. Verify the buckets were created:
   - Go to **Storage** in the left sidebar
   - You should see: `agreement-pdfs`, `signatures`, `id-documents`, `selfie-photos`, `head-rotation-videos`

## Step 5: Configure Environment Variables

### Local Development

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Redeploy your project to apply the changes

## Step 6: Test the Setup

### Local Testing

1. Start your local development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`

3. Test the loan application flow:
   - Fill out a loan application
   - Upload an ID document
   - Sign the agreement
   - Submit the application

4. Verify data was saved:
   - Go to Supabase dashboard → **Table Editor**
   - Check the `customers` table for the new record
   - Check the `kyc_documents` table for the uploaded ID
   - Check the `loan_applications` table for the agreement
   - Go to **Storage** to view uploaded files

### Admin Portal Testing

1. Navigate to the admin login
   - URL: `http://localhost:5173/admin-login`
   - Default credentials: `admin@upstarsloans.com` / `admin123`

2. Verify you can see the submitted application
3. Test status updates and admin notes

### Customer Portal Testing

1. Use the credentials generated during application submission
2. Log in to the customer portal
3. Verify your application data and status are displayed correctly

## Step 7: Security Configuration (Recommended)

### Enable Row Level Security (RLS)

The schema SQL already includes RLS policies, but you should review them:

1. Go to **Authentication** → **Policies**
2. Review the existing policies for each table
3. Adjust as needed for your security requirements

### Storage Policies

1. Go to **Storage** → **Policies**
2. Review the storage bucket policies
3. Ensure files are properly protected

## Step 8: Database Backups

Supabase automatically backs up your database, but you should:

1. Go to **Database** → **Backups**
2. Review the backup schedule
3. Consider enabling point-in-time recovery for critical data

## Troubleshooting

### Connection Issues

If you see connection errors:
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure your IP is not blocked (Supabase allows all IPs by default)

### File Upload Issues

If file uploads fail:
- Check storage bucket policies in Supabase
- Verify file size limits (configured in storage setup)
- Ensure file types match allowed MIME types

### Data Not Appearing

If data doesn't appear in the admin portal:
- Check the browser console for errors
- Verify RLS policies allow reading
- Test database queries in Supabase SQL Editor

### Email Notifications

The application still uses Gmail for email notifications. To disable:
- Remove the email script call in `LoanApplication.jsx`
- Or consider switching to Supabase Auth emails

## Migration from Google Sheets

If you have existing data in Google Sheets:

1. Export your Google Sheets data to CSV
2. Use the Supabase CSV import feature:
   - Go to **Table Editor**
   - Click "Import Data"
   - Upload your CSV file
   - Map columns to database fields

## Cost Considerations

Supabase free tier includes:
- 500MB database storage
- 1GB file storage
- 50,000 API requests per month
- 2GB bandwidth per month

For production, monitor your usage and upgrade if needed.

## Next Steps

After setup is complete:

1. ✅ Test all functionality thoroughly
2. ✅ Set up monitoring in Supabase dashboard
3. ✅ Configure custom domain if needed
4. ✅ Review and adjust security policies
5. ✅ Set up additional team members in Supabase
6. ✅ Deploy to production on Vercel

## Support

- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [https://discord.gg/supabase](https://discord.gg/supabase)
- Vercel Documentation: [https://vercel.com/docs](https://vercel.com/docs)

## File Structure Overview

```
UPSTARLOANS-main/
├── supabase-schema.sql              # Database table definitions
├── supabase-storage-setup.sql       # Storage bucket configuration
├── .env.example                     # Environment variables template
├── .env                             # Your actual credentials (don't commit)
├── src/
│   ├── config/
│   │   └── supabase.js            # Supabase client configuration
│   ├── services/
│   │   ├── databaseService.js     # Database operations
│   │   ├── documentService.js     # Document & agreement operations
│   │   └── storageService.js      # File upload/download operations
│   ├── pages/
│   │   ├── LoanApplication.jsx    # Updated to use Supabase
│   │   ├── CustomerDashboard.jsx   # Updated to use Supabase
│   │   └── AdminDashboard.jsx     # Updated to use Supabase
```

---

**Your application now has permanent database storage with Supabase!** 🎉

Customer data will persist across:
- ✅ Page refreshes
- ✅ Server restarts
- ✅ Vercel redeployments
- ✅ Browser sessions

All files are securely stored in Supabase Storage with proper access controls.
