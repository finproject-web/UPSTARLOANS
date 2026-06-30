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
    if (idType) {
      nextStep();
    } else {
      alert('Please select your ID type before continuing.');
    }
  };

  const handleSubmit = async () => {
    const expectedStatement = 'I have read, understood, and agree to the Payment Protection Insurance Policy terms and conditions.';
    
    if (understandingStatement.trim() !== expectedStatement) {
      alert('Please type the exact understanding statement to confirm.');
      return;
    }

    if (!customerEmail) {
      alert('Customer email not found. Please log in again.');
      navigate('/customer-login');
      return;
    }

    setLoading(true);

    try {
      await saveInsuranceReview({
        email: customerEmail,
        understandingStatement: understandingStatement,
        ipAddress: userIP,
        idType: idType
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
              Step 1: Read Payment Protection Insurance Policy
            </h2>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <p className="text-gray-900 text-sm">
                  Please read this document carefully. By proceeding, you acknowledge that you have read and understood the terms.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-gray-700 text-sm leading-relaxed max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">PAYMENT PROTECTION INSURANCE POLICY</h3>

              <p className="mb-4">
                This Payment Protection Insurance (PPI) policy provides coverage for loan payments in the event of involuntary unemployment, disability, or death.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">1. Coverage Details</h4>
              <p className="mb-4">
                The policy covers monthly loan payments up to a maximum of $1,500 per month for a period of up to 12 months.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">2. Eligibility</h4>
              <p className="mb-4">
                You must be between 18 and 65 years old, employed for at least 6 months, and a permanent resident to be eligible.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">3. Exclusions</h4>
              <p className="mb-4">
                Pre-existing medical conditions, self-inflicted injuries, and unemployment due to misconduct are not covered.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">4. Claims Process</h4>
              <p className="mb-4">
                Claims must be submitted within 30 days of the qualifying event with supporting documentation.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">5. Premiums</h4>
              <p className="mb-4">
                Premiums are calculated as a percentage of your loan amount and are added to your monthly payment.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">6. Cancellation</h4>
              <p className="mb-4">
                You may cancel this policy within 30 days of purchase for a full refund. After 30 days, cancellation is subject to pro-rata refund.
              </p>

              <h4 className="text-orange-500 font-semibold mb-2">7. Legal Consequences</h4>
              <p className="mb-4">
                Providing false information or making fraudulent claims may result in policy cancellation, legal action, and prosecution.
              </p>

              <p className="mt-6 text-gray-500">
                By proceeding to the next step, you acknowledge that you have read and understood this policy.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="bg-orange-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center"
              >
                I Have Read and Understood
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
                placeholder="Please type: 'I have read, understood, and agree to the Payment Protection Insurance Policy terms and conditions.'"
              />
              <p className="text-xs text-gray-500 mt-2">
                Type exactly: "I have read, understood, and agree to the Payment Protection Insurance Policy terms and conditions."
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                By clicking submit, you confirm that you have completed all steps and agree to the terms.
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
