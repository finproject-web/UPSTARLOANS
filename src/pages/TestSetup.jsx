import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create sample loan data
    const sampleLoanData = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      loanAmount: "10000",
      loanDuration: "36",
      customerBank: "chase",
      routingNumber: "021000021",
      accountNumber: "123456789",
      streetAddress: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      creditScore: "750"
    };

    // Store in sessionStorage
    sessionStorage.setItem('loanApplicationData', JSON.stringify(sampleLoanData));
    console.log('Test data loaded:', sampleLoanData);
    
    // Redirect to home after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-xl">Setting up test data...</p>
        <p className="text-gray-400">You will be redirected to the home page.</p>
      </div>
    </div>
  );
};

export default TestSetup;
