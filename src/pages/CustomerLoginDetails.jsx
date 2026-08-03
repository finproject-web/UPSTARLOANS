import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { DEFAULT_CUSTOMER_PASSWORD } from '../utils/customerService';

const CustomerLoginDetails = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [showLoginDetails, setShowLoginDetails] = React.useState(false);

  const DEFAULT_PASSWORD = DEFAULT_CUSTOMER_PASSWORD;

  // Get customer data from sessionStorage (set during loan submission)
  React.useEffect(() => {
    const storedCustomerData = sessionStorage.getItem('customerData');
    if (storedCustomerData) {
      const data = JSON.parse(storedCustomerData);
      setCustomerEmail(data.email);
      setShowLoginDetails(true);
    } else {
      // If no data, redirect to customer login
      navigate('/customer-login');
    }
  }, [navigate]);

  const handleLogin = () => {
    // Store login state and redirect to dashboard
    sessionStorage.setItem('customerLoggedIn', 'true');
    navigate('/customer-dashboard');
  };

  const handleGoToLogin = () => {
    navigate('/customer-login');
  };

  if (!showLoginDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your login details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Upstart Loans</h1>
              <span className="ml-2 text-sm text-gray-500">Customer Portal</span>
            </div>
            <button
              onClick={handleGoToLogin}
              className="text-gray-500 hover:text-gray-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Loan Agreement Downloaded Successfully!
              </h2>
              <p className="text-green-700">
                Your loan application has been processed and your agreement is ready. 
                Below are your login credentials to access your customer dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Login Credentials Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Your Customer Portal Login Details
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <User className="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  <strong>Username (Email):</strong> {customerEmail}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Use your email address as your username
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Lock className="w-6 h-6 text-yellow-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900">
                  <strong>Password:</strong> UpStarLoan#2024
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Use this password to access your customer dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Quick Access:</strong> Use the credentials above to login
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You can change your password after logging in
                </p>
              </div>
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Manual Login Option */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Manual Login</h4>
          <p className="text-gray-600 mb-4">
            If you prefer to login manually, use the credentials below:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                readOnly
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="UpStarLoan#2024"
                  readOnly
                  className="block w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
            >
              <User className="w-4 h-4" />
              <span>Login to Dashboard</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerLoginDetails;
