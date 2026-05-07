import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Clock, AlertCircle, XCircle, Search, Filter, Edit, Eye, Download } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Admin credentials
  const ADMIN_EMAIL = 'admin@upstarsloans.com';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
      return;
    }

    // Load mock customer data
    loadCustomerData();
  }, [navigate]);

  const loadCustomerData = () => {
    // Mock customer data (in real app, this would come from backend)
    const mockCustomers = [
      {
        id: 1,
        applicationId: 'LS-1715084400000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phoneNumber: '555-123-4567',
        homeAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        dateOfBirth: '01/15/1985',
        ssnNumber: '123-45-6789',
        bankName: 'Chase',
        routingNumber: '123456789',
        accountNumber: '987654321',
        loanAmount: '5000',
        loanPurpose: 'medical emergency',
        loanTerm: '12',
        monthlyPayment: '439.47',
        loanAgent: 'Paul David',
        status: 'in_process',
        submissionDate: '5/7/2026, 10:30:15 AM',
        idProofUploaded: true,
        idProofName: 'driver_license.pdf',
        idProofSize: '2.5 MB',
        idProofType: 'PDF',
        adminNotes: 'Customer requested expedited processing',
        userId: 'john_doe_123',
        password: '12345678'
      },
      {
        id: 2,
        applicationId: 'LS-1715084500000',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phoneNumber: '555-987-6543',
        homeAddress: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        dateOfBirth: '03/22/1990',
        ssnNumber: '987-65-4321',
        bankName: 'Bank of America',
        routingNumber: '987654321',
        accountNumber: '123456789',
        loanAmount: '10000',
        loanPurpose: 'business',
        loanTerm: '24',
        monthlyPayment: '461.45',
        loanAgent: 'Eric Brown',
        status: 'review',
        submissionDate: '5/7/2026, 11:15:30 AM',
        idProofUploaded: true,
        idProofName: 'passport.jpg',
        idProofSize: '1.8 MB',
        idProofType: 'JPEG',
        adminNotes: 'Requires additional documentation',
        userId: 'jane_smith_456',
        password: '12345678'
      },
      {
        id: 3,
        applicationId: 'LS-1715084600000',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.j@email.com',
        phoneNumber: '555-456-7890',
        homeAddress: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        dateOfBirth: '07/10/1978',
        ssnNumber: '456-78-9012',
        bankName: 'Wells Fargo',
        routingNumber: '111000025',
        accountNumber: '987654321',
        loanAmount: '7500',
        loanPurpose: 'education',
        loanTerm: '18',
        monthlyPayment: '447.89',
        loanAgent: 'Richard Johns',
        status: 'completed',
        submissionDate: '5/7/2026, 9:45:00 AM',
        idProofUploaded: true,
        idProofName: 'student_id.pdf',
        idProofSize: '3.2 MB',
        idProofType: 'PDF',
        adminNotes: 'Loan approved - ready for disbursement',
        userId: 'mike_johnson_789',
        password: '12345678'
      }
    ];

    setCustomers(mockCustomers);
    setLoading(false);
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

  const updateCustomerStatus = (customerId, newStatus) => {
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

  const rejectCustomer = (customerId, rejectionReason) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId ? { ...customer, status: 'rejected', rejectionReason } : customer
      )
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
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
              <h1 className="text-xl font-bold text-gray-900">UpStars Loans</h1>
              <span className="ml-2 text-sm text-gray-500">Admin Portal</span>
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
                    ID Proof
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
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.applicationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{customer.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
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
                      {customer.submissionDate}
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
                      {customer.bankName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ***-**-{customer.routingNumber?.slice(-4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ***-***-{customer.accountNumber?.slice(-4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.idProofName} ({customer.idProofSize}, {customer.idProofType})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.adminNotes || 'No notes'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
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
                          onChange={(e) => updateCustomerStatus(customer.id, e.target.value)}
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
                  <label className="text-sm font-medium text-gray-500">ID Proof</label>
                  <div className="space-y-3">
                    {selectedCustomer.idProofUploaded ? (
                      <div>
                        <div className="flex items-center text-green-600 mb-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>Uploaded</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <p>File: {selectedCustomer.idProofName}</p>
                          <p>Size: {selectedCustomer.idProofSize}</p>
                          <p>Type: {selectedCustomer.idProofType}</p>
                        </div>
                        <div className="flex items-center justify-center">
                          {selectedCustomer.idProofType === 'PDF' ? (
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">PDF Document</p>
                              <button
                                onClick={() => {
                                  if (selectedCustomer.idProofBase64) {
                                    const link = document.createElement('a');
                                    link.href = `data:application/pdf;base64,${selectedCustomer.idProofBase64}`;
                                    link.download = selectedCustomer.idProofName;
                                    link.click();
                                  } else {
                                    alert('ID proof file not available');
                                  }
                                }}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <img 
                                src={`data:image/jpeg;base64,${selectedCustomer.idProofBase64}`}
                                alt="ID Proof"
                                className="max-w-full h-auto max-h-48 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow mx-auto"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = `data:image/jpeg;base64,${selectedCustomer.idProofBase64}`;
                                  link.download = selectedCustomer.idProofName;
                                  link.click();
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (selectedCustomer.idProofBase64) {
                                    const link = document.createElement('a');
                                    link.href = `data:image/jpeg;base64,${selectedCustomer.idProofBase64}`;
                                    link.download = selectedCustomer.idProofName;
                                    link.click();
                                  } else {
                                    alert('ID proof file not available');
                                  }
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Image
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        <span>Not Uploaded</span>
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
                        updateCustomerStatus(selectedCustomer.id, e.target.value);
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
                    <input
                      type="text"
                      value={selectedCustomer.loanAgent}
                      onChange={(e) => {
                        const updatedCustomer = { ...selectedCustomer, loanAgent: e.target.value };
                        setSelectedCustomer(updatedCustomer);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                  onClick={() => {
                    updateCustomerStatus(selectedCustomer.id, selectedCustomer.status);
                    updateCustomerNotes(selectedCustomer.id, selectedCustomer.adminNotes);
                    if (selectedCustomer.rejectionReason) {
                      rejectCustomer(selectedCustomer.id, selectedCustomer.rejectionReason);
                    }
                    setShowEditModal(false);
                    alert('Customer updated successfully!');
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
