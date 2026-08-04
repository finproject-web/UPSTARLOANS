import React from 'react'
import { Link } from 'react-router-dom'
import { Calculator, HelpCircle, Lock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="UpStart Loans" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-gray-900">UpStart Loans</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              UpStart Loans provides direct lending services with modern financial solutions designed to help you achieve your goals.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-teal-600 transition-colors">About</Link></li>
              <li><Link to="/legal-document" className="text-gray-600 hover:text-teal-600 transition-colors">Legal</Link></li>
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
              UpStart Loans provides direct lending services. Availability, terms, and outcomes may vary based on individual qualifications. This is not a guarantee of approval or funding.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed mt-3">
              UpStart Loans provides direct lending services with competitive rates and flexible terms. Approval depends on your individual profile and our lending criteria.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mt-2">
              We do not charge application fees. Terms and conditions apply to all loan products.
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
            <p>&copy; {new Date().getFullYear()} UpStart Loans. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
