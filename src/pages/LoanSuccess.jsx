import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanSuccess = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate credentials
    const generateCredentials = () => {
      const loanData = JSON.parse(sessionStorage.getItem('loanApplicationData') || '{}');
      const timestamp = Date.now();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const username = `UL${loanData.name ? loanData.name.replace(/\s+/g, '').substring(0, 6).toUpperCase() : 'USER'}${timestamp.toString().slice(-4)}`;
      const password = `Temp@${randomNum}`;
      
      const userCredentials = {
        username: username,
        password: password,
        email: loanData.email,
        fullName: loanData.name || loanData.fullName,
        loanAmount: loanData.loanAmount,
        createdAt: new Date().toISOString()
      };
      
      // Store credentials
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      setCredentials(userCredentials);
      setLoading(false);
    };

    generateCredentials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-xl">Generating your account credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upstar Loans</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Success Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-600 bg-opacity-20 border border-green-500 rounded-lg p-8 text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">Congratulations!</h1>
            <p className="text-xl text-gray-300 mb-2">Your loan has been approved and agreement signed!</p>
            <p className="text-lg text-gray-400">Your Upstar Loans account has been created successfully.</p>
          </div>

          {/* Credentials Section */}
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Your Login Credentials</h2>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email Address</p>
                  <p className="font-semibold text-white">{credentials?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Full Name</p>
                  <p className="font-semibold text-white">{credentials?.fullName}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Username</p>
                    <p className="font-mono font-bold text-yellow-400 text-lg">{credentials?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Temporary Password</p>
                    <p className="font-mono font-bold text-yellow-400 text-lg">{credentials?.password}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-300 mb-2">📋 Important Instructions:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Save these credentials securely</li>
                <li>• Use them to login at: <span className="text-yellow-400">http://localhost:5175/login</span></li>
                <li>• You can change your password after first login</li>
                <li>• Your loan agreement has been sent to your email</li>
                <li>• Funds disbursement begins within 1-2 business days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Go to Login
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                <i className="fas fa-home mr-2"></i> Back to Home
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-white">Account Setup</h4>
                  <p className="text-gray-300 text-sm">Your account has been created with the credentials above</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-white">Email Confirmation</h4>
                  <p className="text-gray-300 text-sm">You'll receive a confirmation email with your loan details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-white">Loan Processing</h4>
                  <p className="text-gray-300 text-sm">Your loan will be processed and funds disbursed within 1-2 business days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-white">First Payment</h4>
                  <p className="text-gray-300 text-sm">Your first payment will be due within 30 days of loan disbursement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanSuccess;
