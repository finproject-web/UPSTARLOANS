-- Supabase Database Schema for Upstar Loans
-- Run this in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id VARCHAR(50) UNIQUE NOT NULL,
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  home_address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  ssn_number VARCHAR(20) NOT NULL,
  
  -- Loan Details
  loan_amount DECIMAL(12,2) NOT NULL,
  loan_purpose VARCHAR(100) NOT NULL,
  loan_term INTEGER NOT NULL,
  monthly_payment DECIMAL(12,2) NOT NULL,
  loan_agent VARCHAR(100) NOT NULL,
  
  -- Bank Information
  bank_name VARCHAR(100) NOT NULL,
  routing_number VARCHAR(20) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  
  -- Portal Credentials
  user_id VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  
  -- Status and Timestamps
  status VARCHAR(50) DEFAULT 'review',
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Admin Notes
  admin_notes TEXT
);

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  application_id VARCHAR(50) UNIQUE NOT NULL,
  
  -- Agreement Information
  agreement_status VARCHAR(50) DEFAULT 'pending',
  agreement_date TIMESTAMP WITH TIME ZONE,
  
  -- Signature Information
  signature_data TEXT, -- Base64 signature data (fallback)
  signature_storage_path TEXT, -- Path in Supabase Storage
  signature_storage_url TEXT, -- Public URL from Supabase Storage
  
  -- Agreement PDF Information
  agreement_pdf_url TEXT, -- Public URL from Supabase Storage
  agreement_pdf_storage_path TEXT, -- Path in Supabase Storage
  
  -- Additional Loan Details
  loan_type VARCHAR(50) DEFAULT 'personal',
  interest_rate DECIMAL(5,2) DEFAULT 10.00,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kyc_documents table
CREATE TABLE IF NOT EXISTS kyc_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Document Information
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(50) NOT NULL, -- 'id_front', 'id_back', 'selfie', 'head_rotation', 'other'
  document_size VARCHAR(20) NOT NULL,
  document_data TEXT, -- Base64 encoded document (fallback if storage fails)
  
  -- Supabase Storage References
  storage_path TEXT, -- Path in Supabase Storage
  storage_url TEXT, -- Public URL from Supabase Storage
  
  -- Verification Status
  verification_status VARCHAR(50) DEFAULT 'pending',
  verification_date TIMESTAMP WITH TIME ZONE,
  verified_by VARCHAR(100),
  verification_notes TEXT,
  
  -- Timestamps
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_application_id ON customers(application_id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_submission_date ON customers(submission_date);
CREATE INDEX IF NOT EXISTS idx_loan_applications_customer_id ON loan_applications(customer_id);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_customer_id ON kyc_documents(customer_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON loan_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: Row Level Security (RLS) is disabled for this application
-- The application uses custom authentication (portal credentials stored in customers table)
-- Security is handled at the application layer
-- If you want to enable RLS later, you'll need to create policies that work with your custom auth system


