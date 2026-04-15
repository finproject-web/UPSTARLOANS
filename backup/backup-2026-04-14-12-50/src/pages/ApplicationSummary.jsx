import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Download, FileText, Clock, Shield, Users, ArrowRight, Mail, Phone } from 'lucide-react'

const ApplicationSummary = () => {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    // Simulate download
    setTimeout(() => {
      setDownloading(false)
      // Create a simple text file for download
      const content = `Application Summary - UpStars Loans
Generated: ${new Date().toLocaleDateString()}

Application Details:
- Request Amount: $5,000
- Application ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}
- Status: Under Review

Next Steps:
1. Review available options from our network providers
2. Compare terms and conditions carefully
3. Choose the option that works best for your needs
4. Complete any additional requirements with the chosen provider

Important Information:
- This is not an approval or guarantee of financing
- Final decisions are made by individual financial service providers
- You may receive multiple offers to consider
- You're under no obligation to accept any offer

Contact Information:
- Support: support@upstarsloans.com
- Phone: 1-800-UPSTARS
- Hours: Mon-Fri 9AM-6PM EST

Thank you for using UpStars Loans!`
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'application-summary.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Application Received
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thank you for submitting your information. Your request has been shared with relevant financial providers in our network.
          </p>
        </div>
      </section>

      {/* Summary Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Summary Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Summary</h2>
                
                <div className="space-y-6">
                  {/* Application Status */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-blue-900">Application Status</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-700 font-medium">Under Review</span>
                      </div>
                    </div>
                    <p className="text-blue-800">
                      Your information is being reviewed by our network of financial service providers. 
                      You may receive contact from interested providers within 24-48 hours.
                    </p>
                  </div>

                  {/* Application Details */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Application Details</h3>
                    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Application ID:</span>
                        <span className="font-medium text-gray-900">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submission Date:</span>
                        <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requested Amount:</span>
                        <span className="font-medium text-gray-900">$5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Application Type:</span>
                        <span className="font-medium text-gray-900">Personal Financing</span>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Next */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">What Happens Next</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Provider Review</h4>
                          <p className="text-gray-600 text-sm">Financial providers in our network will review your application</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Receive Options</h4>
                          <p className="text-gray-600 text-sm">You may receive offers directly from interested providers</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Make Your Choice</h4>
                          <p className="text-gray-600 text-sm">Review all terms and choose what works best for you</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">Important Notice</h3>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                      <li>• This is not an approval or guarantee of financing</li>
                      <li>• Final decisions are made by individual financial service providers</li>
                      <li>• Review all terms and conditions carefully before proceeding</li>
                      <li>• You're under no obligation to accept any offer</li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex-1 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2 inline" />
                        Download Summary
                      </>
                    )}
                  </button>
                  <Link to="/" className="flex-1 btn-secondary text-lg py-4 text-center">
                    Return Home
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Support Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">support@upstarsloans.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone Support</p>
                      <p className="text-sm text-gray-600">1-800-UPSTARS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Trust Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">50,000+ Users Served</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">Quick Response Time</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-semibold text-primary-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/faq" className="block w-full text-center bg-white text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors">
                    View FAQ
                  </Link>
                  <Link to="/contact" className="block w-full text-center bg-white text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors">
                    Contact Support
                  </Link>
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
            Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you through the process.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Support
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ApplicationSummary
