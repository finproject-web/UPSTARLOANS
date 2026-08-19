import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Download, CheckCircle, Clock, XCircle, AlertCircle, Shield } from 'lucide-react';
import { customerLogin } from '../services/edgeFunctionService';
import { getCustomerKYCDocuments } from '../services/documentService';
import { loadAdminNotes } from '../services/databaseService';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState([]);
  const [adminNotes, setAdminNotes] = useState([]);

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

      if (localData.email && localData.password) {
        try {
          const loginResult = await customerLogin(localData.email, localData.password);
          if (loginResult && loginResult.customer) {
            const freshData = loginResult.customer;
            setCustomerData(freshData);
            sessionStorage.setItem('customerData', JSON.stringify(freshData));
            
            // Fetch KYC documents
            if (freshData.id) {
              const docs = await getCustomerKYCDocuments(freshData.id);
              setDocuments(docs);
            }
            
            // Load admin notes from the admin_notes table
            try {
              const notes = await loadAdminNotes(freshData.email || localData.email);
              setAdminNotes(notes || []);
            } catch (notesErr) {
              console.warn('Could not load admin notes:', notesErr);
              setAdminNotes([]);
            }
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
              <h1 className="text-xl font-bold text-gray-900">UpStart Loans</h1>
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

        {/* Notifications Section */}
        {adminNotes.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Notifications & Updates
            </h3>
            <div className="space-y-3">
              {adminNotes.map((note) => (
                <div
                  key={note.id}
                  className={`rounded-lg p-4 ${
                    note.note_type === 'insurance_review'
                      ? 'bg-blue-50 border border-blue-200'
                      : note.note_type === 'insurance_completed'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm mb-2">{note.note_text}</p>
                      {note.note_type === 'insurance_review' && (
                        <button
                          onClick={() => navigate('/insurance-policy-review')}
                          className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Start Insurance Review
                        </button>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs ml-4">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* KYC Documents */}
        {documents && documents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Documents</h3>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.document_name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.document_type === 'id_front' && 'Government ID Front'}
                        {doc.document_type === 'id_back' && 'Government ID Back'}
                        {doc.document_type === 'selfie' && 'Selfie Photo'}
                        {doc.document_type === 'head_rotation' && '360° Head Rotation Video'}
                        {' · '}{doc.document_size}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Notes */}
        {typeof customerData?.adminNotes === 'string' && customerData.adminNotes && (
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
