-- Fix RLS policies to allow application-level authentication
-- This disables RLS since we use custom auth (userId/password) not Supabase Auth

-- Disable RLS on all tables (we handle auth at application level)
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_documents DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('customers', 'loan_applications', 'kyc_documents')
ORDER BY tablename;

-- Grant necessary permissions to anon role
-- Note: Sequences are not needed because tables use UUID primary keys with uuid_generate_v4()
GRANT ALL ON customers TO anon;
GRANT ALL ON loan_applications TO anon;
GRANT ALL ON kyc_documents TO anon;

-- Display final status
SELECT 'RLS policies fixed. Tables are now accessible via anon key.' as status;
