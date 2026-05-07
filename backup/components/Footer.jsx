import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Calculator, HelpCircle, Lock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FinanceHub</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              We are a platform that connects users with third-party lenders and financial providers. Modern financial solutions designed to help you explore options with confidence.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-teal-600 transition-colors">About</Link></li>
              <li><Link to="/credit-score" className="text-gray-600 hover:text-teal-600 transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/payment-calculator" className="text-gray-600 hover:text-teal-600 transition-colors flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-teal-600 transition-colors flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              This platform provides access to financial options and related tools. Availability, terms, and outcomes may vary. This is not a guarantee of approval or funding.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed mt-3">
              This platform is not a direct lender. We connect users with third-party financial service providers. Availability, terms, and approval depend on individual lenders and user profiles. We do not guarantee approval or funding.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mt-2">
              We do not charge users for submitting requests. Providers may have their own terms and fees.
            </p>
          </div>
          
          {/* Trust Line */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="flex items-center text-gray-600 text-sm">
              <Lock className="w-4 h-4 mr-1 text-teal-600" />
              Secure experience
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">
              No obligation to proceed
            </span>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} FinanceHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
