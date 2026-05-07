import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, AlertTriangle, Users, ArrowRight, Shield } from 'lucide-react'

const TermsOfService = () => {
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
            <FileText className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform and services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <p className="text-gray-600">
                <strong>Last Updated:</strong> {currentDate}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              {/* Important Disclaimer */}
              <div className="mb-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
                      <p className="text-yellow-800">
                        UpStars Loans is not a lender, financial advisor, or direct provider of financial products. 
                        We are a platform that connects users with third-party financial service providers. 
                        All financial products and services are provided by independent third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement to Terms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using UpStars Loans (the "Platform"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </div>

              {/* Description of Service */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  UpStars Loans provides a platform that:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Connects users with third-party financial service providers</li>
                  <li>Allows users to submit financing requests</li>
                  <li>Provides information about available financial options</li>
                  <li>Facilitates communication between users and providers</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We do not directly provide loans, make credit decisions, or guarantee approval for any financial products.
                </p>
              </div>

              {/* User Responsibilities */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As a user of our platform, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Provide accurate, truthful, and complete information</li>
                  <li>Update your information promptly if it changes</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the platform for lawful purposes only</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt the platform's operation</li>
                  <li>Respect the rights of other users and third-party providers</li>
                </ul>
              </div>

              {/* Third-Party Providers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-primary-600" />
                  Third-Party Providers
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our platform works with independent third-party financial service providers. You understand and agree that:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>
                    We are not responsible for the actions, policies, or practices of third-party providers
                  </li>
                  <li>
                    All financial products and services are provided directly by third-party providers
                  </li>
                  <li>
                    Terms, conditions, and rates are determined by individual providers
                  </li>
                  <li>
                    We do not endorse or guarantee any specific provider or product
                  </li>
                  <li>
                    You should carefully review all terms before proceeding with any provider
                  </li>
                </ul>
              </div>

              {/* No Guarantee of Results */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guarantee of Results</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do not guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>That you will receive financing offers</li>
                  <li>The approval of any financial application</li>
                  <li>Specific interest rates or loan terms</li>
                  <li>The quality of services provided by third parties</li>
                  <li>The availability of specific financial products</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  All outcomes depend on your individual circumstances and the decisions of independent third-party providers.
                </p>
              </div>

              {/* Privacy and Data Protection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-primary-600" />
                  Privacy and Data Protection
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                  use, and protect your information. By using our platform, you consent to the collection and use 
                  of information as described in our Privacy Policy.
                </p>
              </div>

              {/* User Content */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Content</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You retain ownership of any content you submit to our platform. However, by submitting content, 
                  you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display 
                  your content for the purpose of providing our services.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You are responsible for the content you submit and must ensure it does not violate any laws 
                  or infringe on the rights of others.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To the fullest extent permitted by law, UpStars Loans shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Actions or omissions of third-party providers</li>
                  <li>Decisions made based on information provided through our platform</li>
                  <li>Technical issues or service interruptions</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Our total liability shall not exceed the amount you paid for our services, if any.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify and hold harmless UpStars Loans, its affiliates, officers, directors, 
                  employees, and agents from any claims, damages, or expenses arising from your use of the platform 
                  or violation of these terms.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may terminate or suspend your account at any time, with or without cause, with or without notice. 
                  You may also terminate your account at any time by contacting us. Upon termination, your right to 
                  use the platform will cease immediately.
                </p>
              </div>

              {/* Dispute Resolution */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                <p className="text-gray-600 leading-relaxed">
                  Any disputes arising from these terms or your use of the platform shall be resolved through 
                  good faith negotiations. If a dispute cannot be resolved, it shall be subject to binding arbitration 
                  in accordance with the laws of [State/Country].
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting on our website. Your continued use of the platform constitutes acceptance of any 
                  modified terms.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our legal team is here to help clarify any questions you may have.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Legal Team
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService
