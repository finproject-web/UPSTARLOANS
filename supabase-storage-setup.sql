-- Supabase Storage Setup Script for Upstar Loans
-- Run this in your Supabase SQL Editor to set up storage buckets
-- Note: Storage extension is built-in to Supabase, no need to create it

-- Create PRIVATE storage buckets
-- All buckets are private - access controlled via backend API and signed URLs
-- Security is handled through Vercel API routes with authentication validation

-- 1. Agreement PDFs bucket (private, 10MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'agreement-pdfs',
  'agreement-pdfs',
  false, -- Private bucket - access via signed URLs only
  10485760, -- 10MB limit
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- 2. Signatures bucket (private, 1MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'signatures',
  'signatures',
  false, -- Private bucket - access via signed URLs only
  1048576, -- 1MB limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- 3. ID Documents bucket (private, 5MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'id-documents',
  'id-documents',
  false, -- Private bucket - access via signed URLs only
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- 4. Selfie Photos bucket (private, 5MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'selfie-photos',
  'selfie-photos',
  false, -- Private bucket - access via signed URLs only
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- 5. Head Rotation Videos bucket (private, 50MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'head-rotation-videos',
  'head-rotation-videos',
  false, -- Private bucket - access via signed URLs only
  52428800, -- 50MB limit
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Security Model:
-- All buckets are private - no public access
-- File access controlled through Vercel API routes
-- API routes validate authentication using custom portal credentials
-- Signed URLs generated server-side with short expiration (5-15 minutes)
-- Role-based access: admins can access all files, customers only their own
-- Rate limiting and request validation at API level
-- No direct file URLs exposed to frontend
