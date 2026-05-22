import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Download, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { fetchCustomerByEmail } from '../utils/customerService';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      const isLoggedIn = sessionStorage.getItem('customerLoggedIn');
      const storedCustomerData = sessionStorage.getItem('customerData');

      if (!isLoggedIn) {
        navigate('/customer-login');
        return;
      }

      if (!storedCustomerData) {
        setError('No customer data found');
        setLoading(false);
        return;
      }

      const localData = JSON.parse(storedCustomerData);
      setCustomerData(localData);

      if (localData.email) {
        try {
          const freshData = await fetchCustomerByEmail(localData.email);
          if (freshData) {
            setCustomerData(freshData);
            sessionStorage.setItem('customerData', JSON.stringify(freshData));
          }
        } catch (err) {
          console.warn('Could not refresh application from server:', err);
        }
      }

      setLoading(false);
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('customerLoggedIn');
    sessionStorage.removeItem('customerData');
    navigate('/customer-login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in_process':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'approved':
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_process':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'review':
        return 'Under Review';
      case 'in_process':
        return 'In Process';
      case 'approved':
        return 'Approved';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/customer-login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
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
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {customerData?.firstName} {customerData?.lastName}!
          </h2>
          <p className="text-gray-600">Manage your loan application and track its status</p>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Application Status
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(customerData?.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(customerData?.status)}`}>
                {getStatusText(customerData?.status)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Application ID: {customerData?.applicationId || 'LS-' + Date.now()}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-900">{customerData?.firstName} {customerData?.lastName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{customerData?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{customerData?.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-900">{customerData?.homeAddress}, {customerData?.city}, {customerData?.state} {customerData?.zipCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="text-gray-900">{customerData?.dateOfBirth}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">SSN</label>
              <p className="text-gray-900">***-**-{customerData?.ssnNumber?.slice(-4)}</p>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Loan Amount</label>
              <p className="text-gray-900">${customerData?.loanAmount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Loan Purpose</label>
              <p className="text-gray-900">{customerData?.loanPurpose}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Loan Term</label>
              <p className="text-gray-900">{customerData?.loanTerm} months</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Monthly Payment</label>
              <p className="text-gray-900">${customerData?.monthlyPayment}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Loan Agent</label>
              <p className="text-gray-900">{customerData?.loanAgent || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Application Date</label>
              <p className="text-gray-900">{customerData?.submissionDate || new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Bank Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Bank Name</label>
              <p className="text-gray-900">{customerData?.bankName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Routing Number</label>
              <p className="text-gray-900">***-**-{customerData?.routingNumber?.slice(-4)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Number</label>
              <p className="text-gray-900">***-***-{customerData?.accountNumber?.slice(-4)}</p>
            </div>
          </div>
        </div>

        {/* Mobile App Credentials */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile App Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">User ID</label>
              <p className="text-gray-900">{customerData?.userId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Password</label>
              <p className="text-gray-900">{customerData?.password}</p>
            </div>
          </div>
        </div>

        {/* ID Proof */}
        {customerData?.idProofName !== 'Not uploaded' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ID Proof</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-900 font-medium">{customerData.idProofName}</p>
                <p className="text-sm text-gray-500">Size: {customerData.idProofSize}</p>
                <p className="text-sm text-gray-500">Type: {customerData.idProofType}</p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      if (customerData.idProofBase64) {
                        // Create download link from base64
                        const link = document.createElement('a');
                        link.href = `data:${customerData.idProofType === 'PDF' ? 'application/pdf' : 'image/jpeg'};base64,${customerData.idProofBase64}`;
                        link.download = customerData.idProofName;
                        link.click();
                      } else {
                        alert('ID proof file not available for download');
                      }
                    }}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span>Download ID Proof</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {customerData.idProofBase64 ? (
                  customerData.idProofType === 'PDF' ? (
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">PDF Document</p>
                      <p className="text-xs text-gray-500 mt-1">Click to download</p>
                    </div>
                  ) : (
                    <img 
                      src={`data:image/jpeg;base64,${customerData.idProofBase64}`}
                      alt="ID Proof"
                      className="max-w-full h-auto max-h-48 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `data:image/jpeg;base64,${customerData.idProofBase64}`;
                        link.download = customerData.idProofName;
                        link.click();
                      }}
                    />
                  )
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No file available</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600">Uploaded</span>
            </div>
          </div>
        )}

        {/* Admin Notes */}
        {customerData?.adminNotes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Important Notice from Admin
            </h3>
            <div className="bg-white rounded-lg p-4 border border-yellow-100">
              <p className="text-gray-800 leading-relaxed">{customerData.adminNotes}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => alert('Download agreement functionality')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Download Agreement</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span>Print Details</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CustomerDashboard;
