import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoanCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">UpStart Loans</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Cancelled Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-600 bg-opacity-20 border border-red-500 rounded-lg p-8 text-center mb-8">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-4xl font-bold text-red-400 mb-4">Loan Agreement Cancelled</h1>
            <p className="text-xl text-gray-300 mb-2">You have chosen to cancel the loan agreement.</p>
            <p className="text-lg text-gray-400">No financial commitment has been made.</p>
          </div>

          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">What This Means</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <div>
                  <h3 className="font-semibold text-white">No Obligation</h3>
                  <p className="text-gray-300 text-sm">You have not entered into any binding agreement</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <div>
                  <h3 className="font-semibold text-white">No Credit Impact</h3>
                  <p className="text-gray-300 text-sm">This cancellation will not affect your credit score</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-check-circle text-green-500 mt-1"></i>
                <div>
                  <h3 className="font-semibold text-white">No Charges</h3>
                  <p className="text-gray-300 text-sm">No fees or charges have been applied</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-300 mb-2">💡 Still Need Financing?</h3>
            <p className="text-gray-300 text-sm mb-4">
              You can always return to complete your application later. Your information has been saved securely.
            </p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Your application data is preserved for 30 days</li>
              <li>• You can resume where you left off</li>
              <li>• No impact on your credit for reviewing options</li>
              <li>• Compare multiple loan offers before deciding</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/loan-application')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              <i className="fas fa-redo mr-2"></i> Resume Application
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              <i className="fas fa-home mr-2"></i> Back to Home
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Questions? Contact our support team at <span className="text-yellow-400">support@upstarloans.com</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanCancelled;
