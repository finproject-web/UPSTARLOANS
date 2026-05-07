import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, FileText, CheckCircle, ArrowRight, Users, Lock, Scale, AlertCircle, BookOpen } from 'lucide-react'

const LegalDocument = () => {
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isChecked) {
      alert('As you have agreed on our term and condition so next process will be guided by your concern officers.')
      navigate('/')
    } else {
      alert('Please acknowledge the terms and conditions to proceed.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Scale className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            UPSTART LOANS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Services</span>
          </h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 font-light leading-relaxed">
              Payment Protection Insurance (PPI) • Bank Account Review • Loan Terms & Conditions & Disclosure Policy
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border-2 border-white/20 shadow-2xl">
              <span className="text-white text-sm font-semibold tracking-wide">
                Document Version: 1.0 | Effective: January 1, 2025 | Updated: January 1, 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100/80 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Company Overview */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-slate-50 rounded-3xl shadow-2xl p-12 mb-12 border border-gray-200 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
            <div className="flex items-center mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl border-2 border-white/50">
                <Users className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Company Overview</h2>
            </div>
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <div className="flex items-start bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-400 shadow-lg">
                <span className="text-indigo-600 font-bold text-xl mr-4">•</span>
                <p className="text-lg leading-relaxed">UPSTART LOANS Services provides unsecured personal loans of up to <span className="font-bold text-2xl text-indigo-600 drop-shadow-lg">$25,000</span></p>
              </div>
              <div className="flex items-start bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-6 rounded-xl border-l-4 border-purple-400 shadow-lg">
                <span className="text-purple-600 font-bold text-xl mr-4">•</span>
                <p className="text-lg leading-relaxed">The company is authorized and operates in compliance with applicable U.S. laws and regulations</p>
              </div>
              <div className="flex items-start bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400 shadow-lg">
                <span className="text-blue-600 font-bold text-xl mr-4">•</span>
                <p className="text-lg leading-relaxed">All loan approvals are subject to underwriting, review, and final evaluation</p>
              </div>
            </div>
          </div>

          {/* 1. Introduction & Purpose */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">1. Introduction & Purpose</h2>
            </div>
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-900 mb-3 text-xl">Purpose of Document:</h3>
                <p className="text-lg leading-relaxed">This document establishes comprehensive policies, terms, and conditions governing relationship between UPSTART LOANS Services ("the Company") and applicants/customers regarding Payment Protection Insurance (PPI), bank account verification processes, and loan transactions.</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-transparent p-6 rounded-xl border-l-4 border-indigo-500">
                <h3 className="font-bold text-indigo-900 mb-3 text-xl">Scope of Policies Covered:</h3>
                <p className="text-lg leading-relaxed">These policies encompass all aspects of loan application process, including but not limited to credit evaluation, verification procedures, insurance requirements, fund usage restrictions, compliance monitoring, and customer obligations.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-900 mb-3 text-xl">Applicability:</h3>
                <p className="text-lg leading-relaxed">These terms and conditions apply to all applicants, borrowers, and customers of UPSTART LOANS Services, regardless of loan amount, purpose, or delivery method. By proceeding with any loan application, applicant acknowledges and agrees to be bound by these policies.</p>
              </div>
            </div>
          </div>

          {/* 2. Definitions */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">2. Definitions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">Applicant:</h4>
                  <p className="leading-relaxed">Any individual or entity submitting a loan application to UPSTART LOANS Services for consideration.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-2 text-lg">Borrower:</h4>
                  <p className="leading-relaxed">An applicant whose loan has been approved and who has accepted loan terms and conditions.</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">Loan Proceeds:</h4>
                  <p className="leading-relaxed">The net amount of funds disbursed to borrower after deduction of any applicable fees, insurance premiums, or other authorized charges.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-2 text-lg">Payment Protection Insurance (PPI):</h4>
                  <p className="leading-relaxed">Insurance coverage designed to protect loan repayments in specified circumstances, including unemployment, disability, or other qualifying events as defined in insurance policy.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">Verification Credit:</h4>
                  <p className="leading-relaxed">A temporary, restricted credit issued to normalize bank account balances for review purposes, which is not considered loan proceeds or customer-owned funds.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-2 text-lg">Restricted Funds:</h4>
                  <p className="leading-relaxed">Funds that may only be used for specific, authorized purposes as outlined in this document and accompanying agreements.</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">Underwriting:</h4>
                  <p className="leading-relaxed">The comprehensive evaluation process used to assess creditworthiness, verify information, and determine loan eligibility and terms.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-2 text-lg">Compliance Review:</h4>
                  <p className="leading-relaxed">The systematic examination of applications, documentation, and transactions to ensure adherence to regulatory requirements and company policies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Loan Eligibility & Credit Evaluation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Loan Eligibility & Credit Evaluation</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Credit Score Assessment:</h3>
                <p>UPSTART LOANS Services utilizes comprehensive credit evaluation methodologies, including but not limited to FICO scores, credit history analysis, debt-to-income ratios, and payment history. Minimum credit score requirements vary based on loan amount, purpose, and other risk factors.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Identity and Income Review:</h3>
                <p>All applicants must provide valid government-issued identification, proof of income, and employment verification. The Company reserves right to request additional documentation to verify identity, income sources, and financial capacity.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Banking Review Requirements:</h3>
                <p>Applicants must maintain an active bank account in good standing. The Company conducts review procedures to confirm account ownership, balance history, and transaction patterns. Accounts with negative balances, restrictions, or fraudulent activity may result in application denial.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">No Guarantee of Approval:</h3>
                <p>Submission of an application does not guarantee loan approval. All applications are subject to final underwriting review, and Company maintains right to decline any application for any lawful reason.</p>
              </div>
            </div>
          </div>

          {/* 4. Payment Protection Insurance (PPI) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Payment Protection Insurance (PPI)</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Circumstances Under Which PPI is Required:</h3>
                <p>Based on risk assessment, credit profile, loan amount, and regulatory compliance requirements, certain applicants may be required to maintain Payment Protection Insurance as a condition of loan approval. This determination is made on a case-by-case basis during underwriting.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Risk-Based Insurance Requirement:</h3>
                <p>PPI requirements are determined through sophisticated risk modeling algorithms that consider multiple factors including credit score, loan-to-value ratios, employment stability, and industry best practices. Higher-risk profiles may necessitate insurance coverage to mitigate default risk.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">PPI Cost Range:</h3>
                <p>Payment Protection Insurance premiums typically range from $500 to $900, depending on loan amount, coverage level, term duration, and individual risk factors. Premium amounts are clearly disclosed in loan agreement and may be financed as part of loan or paid separately.</p>
              </div>
            </div>
          </div>

          {/* 5. No Out-of-Pocket Cost Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. No Out-of-Pocket Cost Policy</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Clear Statement:</h3>
                <p>UPSTART LOANS Services maintains a strict policy that customers are not required to pay Payment Protection Insurance premiums, verification fees, or compliance costs from personal funds. All required costs are structured within the loan framework or facilitated through alternative means.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Compliance Facilitation:</h3>
                <p>The Company has established procedures to ensure regulatory compliance without imposing direct financial burdens on customers. This includes:</p>
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>Restricted-use credits for verification purposes only</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. Bank Account Verification & Negative Balance Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Bank Account Verification & Negative Balance Policy</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prohibition Policy:</h3>
                <p>UPSTART LOANS Services strictly prohibits loan disbursement into bank accounts with negative balances, restrictions, freezes, or other limitations that would impede proper fund access or repayment processing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Normalization Process:</h3>
                <p>When verification reveals account balance issues, Company may issue verification credits to normalize account standing. This process is designed to bring accounts to zero or positive balance status to facilitate proper loan processing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Balance Return Requirement:</h3>
                <p>Any remaining verification credit balance after normalization must be returned to Company within specified timeframe. Failure to return funds may result in application denial or other remedial actions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Final Disbursement Conditions:</h3>
                <p>Loan proceeds will only be disbursed to accounts that meet all verification criteria, including positive balance status, absence of restrictions, and successful completion of all compliance procedures.</p>
              </div>
            </div>
          </div>

          {/* 8. Restrictions on Use of Funds */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Restrictions on Use of Funds</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prohibition on Personal Use:</h3>
                <p>Verification credits, PPI funds, and any restricted-use funds may not be withdrawn, transferred, or used for personal purposes. These funds are designated solely for specific, authorized purposes as outlined in this document.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Restricted-Use Explanation:</h3>
                <p>Restricted funds are designated for verification, insurance premiums, compliance costs, or other specific purposes as determined by Company. Unauthorized use of restricted funds constitutes a material breach of these terms and may result in immediate application termination or legal action.</p>
              </div>
            </div>
          </div>

          {/* 9. Customer Responsibilities & Representations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Customer Responsibilities & Representations</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Accurate Information:</h3>
                <p>Customers must provide complete, accurate, and truthful information throughout the application process. Intentional misrepresentation or omission of material facts constitutes fraud and may result in application denial, legal action, or criminal prosecution.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Proper Use of Verification Funds:</h3>
                <p>Customers must use verification funds strictly for their intended purpose and return equivalent amounts as required. Any diversion or misuse of verification funds is strictly prohibited.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cooperation with Compliance:</h3>
                <p>Customers must cooperate fully with all compliance and verification requests, including providing additional documentation, participating in verification procedures, and responding to Company inquiries in a timely manner.</p>
              </div>
            </div>
          </div>

          {/* 10. Compliance, Monitoring & Review */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Compliance, Monitoring & Review</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Internal Monitoring Procedures:</h3>
                <p>UPSTART LOANS Services maintains comprehensive internal monitoring systems to detect fraud, ensure compliance, and identify policy violations. These procedures include automated monitoring, manual reviews, and periodic audits.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Right to Conduct Reviews:</h3>
                <p>The Company reserves right to conduct compliance reviews at any time during application process and throughout the loan term. This includes reviewing account activity, verifying information, and assessing compliance with all terms and conditions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Additional Documentation:</h3>
                <p>The Company may request additional documentation, clarification, or verification at any time. Failure to provide requested information may result in application delays, denial, or termination.</p>
              </div>
            </div>
          </div>

          {/* 11. Company Rights & Remedies */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Company Rights & Remedies</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Reversal or Cancellation:</h3>
                <p>The Company reserves right to reverse or cancel verification credits at any time for any reason, including suspected fraud, policy violations, or changes in verification requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Application Management:</h3>
                <p>UPSTART LOANS Services maintains right to suspend, deny, or cancel loan applications at any stage for any lawful reason, including but not limited to fraud detection, policy violations, or changes in applicant circumstances.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Termination Rights:</h3>
                <p>The Company may terminate processing and withdraw any offer if policy violations are detected, if applicant fails to cooperate with verification procedures, or if any material misrepresentation is discovered.</p>
              </div>
            </div>
          </div>

          {/* 12. Misuse, Misrepresentation & Prohibited Conduct */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Misuse, Misrepresentation & Prohibited Conduct</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Unauthorized Use Definition:</h3>
                <p>Unauthorized use includes, but is not limited to, withdrawing verification funds for personal purposes, providing false information, using restricted funds for unauthorized purposes, or attempting to circumvent verification procedures.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Consequences of Misuse:</h3>
                <p>Misuse or misrepresentation may result in immediate application denial, termination of any existing loan relationships, reporting to law enforcement agencies, credit bureau reporting, and pursuit of legal remedies to recover losses.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Reporting Obligations:</h3>
                <p>The Company complies with all applicable laws regarding reporting suspicious activities, fraud, or other prohibited conduct to appropriate regulatory and law enforcement authorities.</p>
              </div>
            </div>
          </div>

          {/* 13. Limitation of Liability */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">No Liability for Processing Outcomes:</h3>
                <p>UPSTART LOANS Services assumes no liability for application delays, denials, verification outcomes, or decisions resulting from underwriting processes, compliance reviews, or regulatory requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Third-Party Actions:</h3>
                <p>The Company is not responsible for actions, errors, or omissions by third-party banking institutions, credit bureaus, verification services, or other external entities involved in the loan process.</p>
              </div>
            </div>
          </div>

          {/* 14. Indemnification */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Indemnification</h2>
            <div className="text-gray-600">
              <p><strong>Customer Obligation:</strong> Customers agree to indemnify, defend, and hold harmless UPSTART LOANS Services, its officers, directors, employees, and affiliates from any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to false information, misuse of funds, or violation of these terms and conditions.</p>
            </div>
          </div>

          {/* 15. Privacy & Data Handling */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">15. Privacy & Data Handling</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Usage:</h3>
                <p>Customer information is used for underwriting, verification, compliance monitoring, fraud prevention, and service delivery. The Company maintains comprehensive data security measures and privacy protections in accordance with applicable laws.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy Reference:</h3>
                <p>Detailed information about data collection, use, sharing, and protection is available in the Company's Privacy Policy, which is incorporated by reference into these terms and conditions.</p>
              </div>
            </div>
          </div>

          {/* 16. Governing Law & Jurisdiction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Governing Law & Jurisdiction</h2>
            <div className="text-gray-600">
              <p><strong>Legal Framework:</strong> These policies and all related transactions are governed by applicable U.S. federal laws and laws of the state where the Company operates, without regard to conflict of law principles. Any disputes shall be resolved in appropriate federal or state courts.</p>
            </div>
          </div>

          {/* 17. Amendments & Updates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">17. Amendments & Updates</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Modification Rights:</h3>
                <p>UPSTART LOANS Services reserves the right to modify, update, or amend these policies at any time to reflect changes in laws, regulations, business practices, or operational requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Effective Date and Versioning:</h3>
                <p>All amendments become effective upon posting to the Company's website or notification to customers. The current version number and effective date are clearly displayed on this document.</p>
              </div>
            </div>
          </div>

          {/* 18. Customer Acknowledgment & Consent */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-12 mb-10 border-2 border-gray-200">
            <div className="flex items-center mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">18. Customer Acknowledgment & Consent</h2>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-400 p-8 rounded-xl mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
                <p className="text-lg font-semibold text-orange-900">Please review and acknowledge your agreement to terms and conditions outlined above:</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                <label className="flex items-start p-6 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors duration-200 border-2 border-transparent hover:border-indigo-300">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-4 focus:ring-indigo-500 mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold text-green-600 mr-3">✓</span>
                      <span className="text-xl font-bold text-gray-900">I AGREE</span>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-3">•</span>
                        <span className="text-lg">I acknowledge that I have read and understood all terms and conditions</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-3">•</span>
                        <span className="text-lg">I accept Payment Protection Insurance, verification credit, and bank account policies</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-3">•</span>
                        <span className="text-lg">I understand that verification funds are restricted and not loan proceeds</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-3">•</span>
                        <span className="text-lg">I agree to comply with all requirements and obligations outlined in this document</span>
                      </div>
                    </div>
                  </div>
                </label>

                <div className="ml-12 mt-6">
                  <label className="flex items-start p-6 rounded-xl cursor-pointer hover:bg-red-50 transition-colors duration-200 border-2 border-transparent hover:border-red-300">
                    <input
                      type="radio"
                      name="agreement"
                      className="mt-1 w-6 h-6 text-red-600 border-gray-300 focus:ring-4 focus:ring-red-500 mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-red-600 mr-3">✗</span>
                        <span className="text-xl font-bold text-gray-900">I DO NOT AGREE</span>
                      </div>
                      <p className="text-lg text-red-700">I understand that declining consent may result in application withdrawal or ineligibility for loan services through UPSTART LOANS Services.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={!isChecked}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-6 px-12 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CheckCircle className="w-6 h-6 mr-3 inline" />
                  Submit Acknowledgment
                </button>
              </div>
            </form>
          </div>

          {/* 19. Final Disclaimers */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">19. Final Disclaimers</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">No Guarantee of Approval:</h3>
                <p>Submission of this acknowledgment and application does not guarantee loan approval. All applications are subject to final underwriting, verification, and compliance review.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Not a Loan Agreement:</h3>
                <p>This document does not constitute a loan agreement or binding commitment to extend credit. A separate loan agreement will be provided if and when an application is approved.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Subject to Final Review:</h3>
                <p>All loans are subject to final underwriting, verification, and compliance procedures. The Company reserves the right to modify or withdraw any offer based on final review results.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/loan-application" 
              className="inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-colors duration-200"
            >
              <FileText className="w-5 h-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LegalDocument
