import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Clock, AlertCircle, XCircle, Search, Filter, Edit, Eye, Download } from 'lucide-react';
import { LOAN_AGENTS } from '../constants/loanAgents';
import { fetchAllCustomers, updateCustomerStatus, updateCustomerInDatabase, deleteCustomer } from '../services/databaseService';
import { getCustomerKYCDocuments, getLoanAgreement } from '../services/documentService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomerDocs, setSelectedCustomerDocs] = useState([]);


  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
      return;
    }

    // Load customer data
    loadCustomerData();
    
    // Set up auto-refresh every 5 seconds to catch new customers
    const interval = setInterval(() => {
      loadCustomerData();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  const loadCustomerData = async () => {
    try {
      console.log('=== LOADING CUSTOMER DATA FROM DATABASE ===');
      const dbCustomers = await fetchAllCustomers();
      console.log('✅ Loaded', dbCustomers.length, 'customers from database:', dbCustomers);
      setCustomers(dbCustomers);
      setLoading(false);
      
    } catch (error) {
      console.error('❌ Error loading customer data from database:', error);
      console.error('Error details:', error.message || error);
      setLoading(false);
      setCustomers([]);
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateCustomerStatus(applicationId, newStatus);
      
      // Refresh customer data
      const updatedCustomers = await fetchAllCustomers();
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error updating customer status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in_process':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_process':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'review':
        return 'Under Review';
      case 'in_process':
        return 'In Process';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const updateCustomerStatusLocal = (customerId, newStatus) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    );
  };

  const updateCustomerNotes = (customerId, notes) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId ? { ...customer, adminNotes: notes } : customer
      )
    );
  };

  const rejectCustomer = async (customerId, rejectionReason) => {
    try {
      const customer = customers.find(c => c.id === customerId);
      if (!customer) return;
      
      const updateData = {
        status: 'rejected',
        adminNotes: (customer.adminNotes || '') + 
          (customer.adminNotes ? '\n' : '') + 
          'Rejection Reason: ' + rejectionReason
      };
      
      await updateCustomerInDatabase(customer.applicationId, updateData);
      console.log('✅ Customer rejected in database');
      
      const updatedCustomers = await fetchAllCustomers();
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('❌ Error rejecting customer:', error);
      alert('Failed to reject customer: ' + (error.message || error));
    }
  };

  const filteredCustomers = customers.filter(customer => {
    // Add safety checks to prevent undefined errors
    if (!customer) return false;
    
    const firstName = customer.firstName || '';
    const lastName = customer.lastName || '';
    const email = customer.email || '';
    const applicationId = customer.applicationId || '';
    
    const matchesSearch = firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: customers.length,
      review: customers.filter(c => c.status === 'review').length,
      in_process: customers.filter(c => c.status === 'in_process').length,
      completed: customers.filter(c => c.status === 'completed').length,
      rejected: customers.filter(c => c.status === 'rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
              <span className="ml-2 text-sm text-gray-500">Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadCustomerData}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Refresh Data
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Review</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.review}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Process</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.in_process}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="review">Under Review</option>
                <option value="in_process">In Process</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Customer Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SSN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Notes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="18" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium mb-1">No customer applications found</p>
                        <p className="text-sm">Customer data will appear here after a loan application is submitted.</p>
                        <p className="text-xs mt-2 text-gray-400">Check browser console for any Supabase connection errors.</p>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.applicationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.homeAddress}, {customer.city}, {customer.state} {customer.zipCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ***-**-{customer.ssnNumber?.slice(-4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${customer.loanAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.loanPurpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.loanTerm} months
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${customer.monthlyPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.loanAgent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.submissionDate ? new Date(customer.submissionDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                        {getStatusText(customer.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.password}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {customer.adminNotes || 'No notes'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={async () => {
                            setSelectedCustomer(customer);
                            try {
                              const docs = await getCustomerKYCDocuments(customer.id);
                              setSelectedCustomerDocs(docs || []);
                            } catch (err) {
                              console.error('Error loading KYC docs:', err);
                              setSelectedCustomerDocs([]);
                            }
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setShowEditModal(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (customer.status !== 'rejected') {
                              const reason = prompt('Please enter rejection reason:');
                              if (reason) {
                                rejectCustomer(customer.id, reason);
                              }
                            } else {
                              alert(`Rejection reason: ${customer.rejectionReason || 'No reason provided'}`);
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title={customer.status === 'rejected' ? 'View Rejection' : 'Reject Application'}
                        >
                          {customer.status === 'rejected' ? <XCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        </button>
                        <select
                          value={customer.status}
                          onChange={(e) => handleStatusChange(customer.applicationId, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="review">Review</option>
                          <option value="in_process">In Process</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Details Modal */}
        {selectedCustomer && !showEditModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Customer Details</h3>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Application ID</label>
                    <p className="text-gray-900">{selectedCustomer.applicationId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(selectedCustomer.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedCustomer.status)}`}>
                        {getStatusText(selectedCustomer.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedCustomer.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedCustomer.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{selectedCustomer.homeAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <p className="text-gray-900">{selectedCustomer.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">State</label>
                    <p className="text-gray-900">{selectedCustomer.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Zip Code</label>
                    <p className="text-gray-900">{selectedCustomer.zipCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">{selectedCustomer.dateOfBirth}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">SSN</label>
                    <p className="text-gray-900">***-**-{selectedCustomer.ssnNumber?.slice(-4)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bank Name</label>
                    <p className="text-gray-900">{selectedCustomer.bankName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Routing Number</label>
                    <p className="text-gray-900">***-**-{selectedCustomer.routingNumber?.slice(-4)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Account Number</label>
                    <p className="text-gray-900">***-***-{selectedCustomer.accountNumber?.slice(-4)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loan Amount</label>
                    <p className="text-gray-900">${selectedCustomer.loanAmount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loan Purpose</label>
                    <p className="text-gray-900">{selectedCustomer.loanPurpose}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loan Term</label>
                    <p className="text-gray-900">{selectedCustomer.loanTerm} months</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Monthly Payment</label>
                    <p className="text-gray-900">${selectedCustomer.monthlyPayment}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loan Agent</label>
                    <p className="text-gray-900">{selectedCustomer.loanAgent}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Submission Date</label>
                  <p className="text-gray-900">{selectedCustomer.submissionDate}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">KYC Documents</label>
                  <div className="space-y-3 mt-2">
                    {selectedCustomerDocs.length > 0 ? (
                      selectedCustomerDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-500" />
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
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {doc.verification_status || 'Uploaded'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>No KYC documents uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-gray-900">{selectedCustomer.userId}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Password</label>
                  <p className="text-gray-900">{selectedCustomer.password}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                  <p className="text-gray-900">{selectedCustomer.adminNotes || 'No notes'}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Customer Modal */}
        {showEditModal && selectedCustomer && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Edit Customer</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <select
                      value={selectedCustomer.status}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, status: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                        updateCustomerStatusLocal(selectedCustomer.id, e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="review">Under Review</option>
                      <option value="in_process">In Process</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                    <textarea
                      value={selectedCustomer.adminNotes || ''}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, adminNotes: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Add admin notes..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Loan Agent</label>
                    <select
                      value={selectedCustomer.loanAgent}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, loanAgent: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select loan agent</option>
                      {LOAN_AGENTS.map((agent) => (
                        <option key={agent} value={agent}>
                          {agent}
                        </option>
                      ))}
                      {selectedCustomer.loanAgent &&
                        !LOAN_AGENTS.includes(selectedCustomer.loanAgent) && (
                          <option value={selectedCustomer.loanAgent}>
                            {selectedCustomer.loanAgent}
                          </option>
                        )}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Monthly Payment</label>
                    <input
                      type="text"
                      value={selectedCustomer.monthlyPayment}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, monthlyPayment: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {selectedCustomer.status === 'rejected' && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Rejection Reason</label>
                    <textarea
                      value={selectedCustomer.rejectionReason || ''}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, rejectionReason: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Enter rejection reason..."
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      const updateData = {
                        status: selectedCustomer.status,
                        adminNotes: selectedCustomer.adminNotes || '',
                        loanAgent: selectedCustomer.loanAgent,
                        monthlyPayment: selectedCustomer.monthlyPayment,
                      };
                      if (selectedCustomer.status === 'rejected' && selectedCustomer.rejectionReason) {
                        updateData.adminNotes = (selectedCustomer.adminNotes || '') + 
                          (selectedCustomer.adminNotes ? '\n' : '') + 
                          'Rejection Reason: ' + selectedCustomer.rejectionReason;
                      }
                      console.log('Saving customer update to database:', updateData);
                      await updateCustomerInDatabase(selectedCustomer.applicationId, updateData);
                      console.log('✅ Customer updated in database');
                      
                      // Refresh from database
                      const updatedCustomers = await fetchAllCustomers();
                      setCustomers(updatedCustomers);
                      
                      setShowEditModal(false);
                      setSelectedCustomer(null);
                      alert('Customer updated and saved to database successfully!');
                    } catch (error) {
                      console.error('❌ Error saving customer update:', error);
                      alert('Failed to save changes to database: ' + (error.message || error));
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
