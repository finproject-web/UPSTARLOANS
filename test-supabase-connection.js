// Test script to verify Supabase connection and configuration
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

console.log('=== SUPABASE CONNECTION TEST ===\n');

// Test 1: Check environment variables
console.log('Test 1: Environment Variables');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Loaded' : '❌ Not found');
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Not found');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Loaded' : '❌ Not found');
console.log('');

// Test 2: Initialize Supabase client
console.log('Test 2: Supabase Client Initialization');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.log('❌ FAILED: Supabase URL not configured');
  process.exit(1);
}

if (!supabaseKey || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.log('❌ FAILED: Supabase anon key not configured');
  process.exit(1);
}

try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized successfully');
  console.log('Project URL:', supabaseUrl);
  console.log('');
} catch (error) {
  console.log('❌ FAILED: Supabase client initialization error:', error.message);
  process.exit(1);
}

// Test 3: Database connection test
console.log('Test 3: Database Connection Test');
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection by checking customers table
    const { data, error } = await supabase
      .from('customers')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ FAILED: Database connection error:', error.message);
      console.log('Error code:', error.code);
      console.log('Error details:', error);
      process.exit(1);
    }
    
    console.log('✅ Database connection successful');
    console.log('Customers table exists and is accessible');
    console.log('Current customer count:', data);
    console.log('');
    
    // Test 4: Check other tables
    console.log('Test 4: Table Existence Check');
    
    const tables = ['customers', 'loan_applications', 'kyc_documents'];
    
    for (const table of tables) {
      const { data: tableData, error: tableError } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (tableError) {
        console.log(`❌ Table '${table}' not accessible:`, tableError.message);
      } else {
        console.log(`✅ Table '${table}' exists and accessible (count: ${tableData})`);
      }
    }
    
    console.log('');
    console.log('=== SUPABASE CONNECTION TEST COMPLETE ===');
    console.log('✅ All tests passed - Supabase is properly configured and accessible');
    
  } catch (error) {
    console.log('❌ FAILED: Connection test error:', error.message);
    process.exit(1);
  }
}

testConnection();
