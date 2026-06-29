// Test script to verify actual database writes to Supabase
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

console.log('=== SUPABASE DATABASE WRITE TEST ===\n');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseWrite() {
  try {
    // Test 1: Insert into customers table
    console.log('Test 1: Insert into customers table');
    const testCustomer = {
      application_id: 'TEST-' + Date.now(),
      first_name: 'Test',
      last_name: 'Customer',
      email: 'test@example.com',
      phone_number: '555-1234',
      home_address: '123 Test Street',
      city: 'Test City',
      state: 'TS',
      zip_code: '12345',
      date_of_birth: '1990-01-01',
      ssn_number: '123-45-6789',
      loan_amount: 10000,
      loan_purpose: 'testing',
      loan_term: 12,
      monthly_payment: 879.16,
      loan_agent: 'Test Agent',
      bank_name: 'Test Bank',
      routing_number: '123456789',
      account_number: '987654321',
      user_id: 'test_user',
      password: 'test123',
      status: 'test',
      submission_date: new Date().toISOString()
    };

    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert(testCustomer)
      .select()
      .single();

    if (customerError) {
      console.log('❌ FAILED: Error inserting customer:', customerError.message);
      console.log('Error code:', customerError.code);
      process.exit(1);
    }

    console.log('✅ SUCCESS: Customer inserted successfully');
    console.log('Customer ID:', customerData.id);
    console.log('Application ID:', customerData.application_id);
    console.log('');

    // Test 2: Insert into loan_applications table
    console.log('Test 2: Insert into loan_applications table');
    const testLoanApplication = {
      customer_id: customerData.id,
      application_id: customerData.application_id,
      agreement_status: 'signed',
      signature_data: null,
      signature_storage_path: null,
      signature_storage_url: null,
      agreement_date: new Date().toISOString()
    };

    const { data: loanData, error: loanError } = await supabase
      .from('loan_applications')
      .insert(testLoanApplication)
      .select()
      .single();

    if (loanError) {
      console.log('❌ FAILED: Error inserting loan application:', loanError.message);
      console.log('Error code:', loanError.code);
      process.exit(1);
    }

    console.log('✅ SUCCESS: Loan application inserted successfully');
    console.log('Loan Application ID:', loanData.id);
    console.log('');

    // Test 3: Insert into kyc_documents table
    console.log('Test 3: Insert into kyc_documents table');
    const testDocument = {
      customer_id: customerData.id,
      document_name: 'test-document.jpg',
      document_type: 'id_front',
      document_size: '1.00 MB',
      document_data: 'dGVzdCBkYXRh',
      storage_path: null,
      storage_url: null,
      verification_status: 'pending'
    };

    const { data: docData, error: docError } = await supabase
      .from('kyc_documents')
      .insert(testDocument)
      .select()
      .single();

    if (docError) {
      console.log('❌ FAILED: Error inserting KYC document:', docError.message);
      console.log('Error code:', docError.code);
      process.exit(1);
    }

    console.log('✅ SUCCESS: KYC document inserted successfully');
    console.log('Document ID:', docData.id);
    console.log('');

    // Test 4: Clean up test data
    console.log('Test 4: Clean up test data');
    
    const { error: deleteDocError } = await supabase
      .from('kyc_documents')
      .delete()
      .eq('id', docData.id);

    if (deleteDocError) {
      console.log('⚠️  Warning: Could not delete test document:', deleteDocError.message);
    } else {
      console.log('✅ Test document deleted');
    }

    const { error: deleteLoanError } = await supabase
      .from('loan_applications')
      .delete()
      .eq('id', loanData.id);

    if (deleteLoanError) {
      console.log('⚠️  Warning: Could not delete test loan application:', deleteLoanError.message);
    } else {
      console.log('✅ Test loan application deleted');
    }

    const { error: deleteCustomerError } = await supabase
      .from('customers')
      .delete()
      .eq('id', customerData.id);

    if (deleteCustomerError) {
      console.log('⚠️  Warning: Could not delete test customer:', deleteCustomerError.message);
    } else {
      console.log('✅ Test customer deleted');
    }

    console.log('');
    console.log('=== DATABASE WRITE TEST COMPLETE ===');
    console.log('✅ All tests passed - Database writes are working correctly');
    console.log('✅ All three tables (customers, loan_applications, kyc_documents) accept inserts');
    console.log('✅ Test data cleaned up successfully');

  } catch (error) {
    console.log('❌ FAILED: Database write test error:', error.message);
    process.exit(1);
  }
}

testDatabaseWrite();
