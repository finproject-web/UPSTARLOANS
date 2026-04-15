import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, Eye, Database, ArrowRight } from 'lucide-react'

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <p className="text-gray-600">
                <strong>Last Updated:</strong> {currentDate}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  UpStars Loans ("we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website upstarsloans.com and use our services.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By using our platform, you consent to the collection and use of information in accordance 
                  with this policy. If you disagree with any part of this privacy policy, please do not use our website or services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <Database className="w-5 h-5 mr-2 text-primary-600" />
                      Personal Information
                    </h3>
                    <p className="text-gray-600 mb-3">
                      When you use our services, we may collect the following personal information:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Full name and contact information (email, phone number)</li>
                      <li>Financial information (income, employment details, requested amount)</li>
                      <li>Demographic information (age, location)</li>
                      <li>Government identification information (when required for verification)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-primary-600" />
                      Automatically Collected Information
                    </h3>
                    <p className="text-gray-600 mb-3">
                      We automatically collect certain information when you visit our website:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website information</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>To connect you with financial service providers in our network</li>
                  <li>To process and review your financing requests</li>
                  <li>To improve our website and services</li>
                  <li>To communicate with you about your application</li>
                  <li>To provide customer support</li>
                  <li>To comply with legal obligations</li>
                  <li>To prevent fraud and ensure platform security</li>
                </ul>
              </div>

              {/* Data Protection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-primary-600" />
                  Data Protection Measures
                </h2>
                <p className="text-gray-600 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <ul className="text-blue-800 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>256-bit SSL encryption for all data transmissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Secure servers with firewalls and intrusion detection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Restricted access to personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Regular security audits and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Employee training on data protection</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third-Party Sharing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We may share your information with third parties in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>
                    <strong>Financial Service Providers:</strong> We share your information with 
                    lenders and financial service providers in our network to process your application 
                    and provide you with financing options.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We work with third-party service providers 
                    who assist us in operating our platform (e.g., payment processors, analytics providers).
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required by law 
                    or to protect our rights, property, or safety.
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We never sell your personal information to third parties for marketing purposes.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us at support@upstarsloans.com.
                </p>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand user behavior</li>
                  <li>Marketing cookies to personalize content</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-600">
                  We retain your personal information for as long as necessary to provide our services 
                  and comply with legal obligations. You can request deletion of your information at any time, 
                  subject to legal requirements.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last Updated" date.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Email:</strong> support@upstarsloans.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> 1-800-UPSTARS
                    </p>
                    <p className="text-gray-700">
                      <strong>Website:</strong> www.upstarsloans.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our privacy team is here to help with any concerns you may have.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Privacy Team
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
