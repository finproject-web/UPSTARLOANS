// Test data setup
const sampleLoanData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    loanAmount: '10000',
    loanDuration: '36',
    customerBank: 'chase',
    routingNumber: '021000021',
    accountNumber: '123456789',
    streetAddress: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    creditScore: '750'
};

sessionStorage.setItem('loanApplicationData', JSON.stringify(sampleLoanData));
console.log('Test data loaded:', sampleLoanData);
