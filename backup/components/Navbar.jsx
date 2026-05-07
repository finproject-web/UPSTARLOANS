import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Shield, CheckCircle } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UpStars Loans</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/personal-financing" className="text-gray-600 hover:text-primary-600 transition-colors">Personal Financing</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors">FAQ</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
            <Link to="/personal-financing" className="btn-primary">
              Check Your Options
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md">Home</Link>
              <Link to="/personal-financing" className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md">Personal Financing</Link>
              <Link to="/how-it-works" className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md">How It Works</Link>
              <Link to="/faq" className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md">FAQ</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md">Contact</Link>
              <div className="px-3 py-2">
                <Link to="/personal-financing" className="btn-primary w-full text-center block">
                  Check Your Options
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
