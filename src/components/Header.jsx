import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, DollarSign, Menu, X, Calculator, BookOpen, TrendingUp, Users, FileText, Home, Car, CreditCard, Briefcase, Heart, GraduationCap, Building, Newspaper, PieChart, Mic, CheckCircle } from 'lucide-react'

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current)
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-blue-700 text-white py-2 text-center text-sm">
        <div className="flex items-center justify-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>Access up to $50,000 with flexible terms</span>
          <span className="font-semibold">View your personalized options</span>
          <ChevronDown className="w-4 h-4 rotate-270" />
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* LOGO */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FinanceFlow</span>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* BORROW DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('borrow')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 text-gray-900 font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors duration-250">
                  <span>Explore Options</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'borrow' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'borrow' && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-xl shadow-xl border border-gray-100 z-50 transform transition-all duration-300 ease-out">
                    <div className="p-6 grid grid-cols-3 gap-8">
                      {/* Column 1: Personal Loans */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Flexible Financing</h3>
                        <ul className="space-y-3">
                          <li><a href="/loan-application?type=personal" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>View Personal Options</span>
                          </a></li>
                          <li><a href="/loan-application?type=wedding" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Heart className="w-4 h-4" />
                            <span>Wedding Financing</span>
                          </a></li>
                          <li><a href="/loan-application?type=home" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Home className="w-4 h-4" />
                            <span>Home Project Loans</span>
                          </a></li>
                          <li><a href="/loan-application?type=moving" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Building className="w-4 h-4" />
                            <span>Relocation Funding</span>
                          </a></li>
                          <li><a href="/loan-application?type=medical" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Heart className="w-4 h-4" />
                            <span>Healthcare Expenses</span>
                          </a></li>
                        </ul>
                      </div>

                      {/* Column 2: Car & HELOC */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Vehicle Solutions</h3>
                        <ul className="space-y-3 mb-6">
                          <li><a href="/loan-application?type=refinance" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Car className="w-4 h-4" />
                            <span>Vehicle Refinancing</span>
                          </a></li>
                        </ul>

                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Home Equity</h3>
                        <ul className="space-y-3 mb-6">
                          <li><a href="/loan-application?type=heloc" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Home className="w-4 h-4" />
                            <span>Home Credit Line</span>
                          </a></li>
                        </ul>

                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Short-Term Options</h3>
                        <ul className="space-y-3">
                          <li><a href="/loan-application?type=relief" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Emergency Funding</span>
                          </a></li>
                        </ul>
                      </div>

                      {/* Column 3: Consolidation */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Debt Management</h3>
                        <ul className="space-y-3">
                          <li><a href="/loan-application?type=consolidation" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <PieChart className="w-4 h-4" />
                            <span>Debt Solutions</span>
                          </a></li>
                          <li><a href="/loan-application?type=credit" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Card Balance Help</span>
                          </a></li>
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-8">
                          <a href="/loan-application" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                            <CheckCircle className="w-5 h-5" />
                            <span>Get Started</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FOR LENDERS */}
              <a href="#" className="text-gray-900 font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors duration-250">
                For Partners
              </a>

              {/* FOR DEALERS */}
              <a href="#" className="text-gray-900 font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors duration-250">
                For Businesses
              </a>

              {/* ABOUT DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 text-gray-900 font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors duration-250">
                  <span>Company</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transform transition-all duration-300 ease-out">
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Our Journey
                        </a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Leadership Team
                        </a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Updates
                        </a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Investor Info
                        </a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Careers
                        </a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50 block">
                          Market Insights
                        </a></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* RESOURCES DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 text-gray-900 font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors duration-250">
                  <span>Learning Hub</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-3xl bg-white rounded-xl shadow-xl border border-gray-100 z-50 transform transition-all duration-300 ease-out">
                    <div className="p-6 grid grid-cols-3 gap-8">
                      {/* Section 1: Education */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Learning Center</h3>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Financial Education</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Common Questions</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Customer Stories</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>Credit Insights</span>
                          </a></li>
                        </ul>
                      </div>

                      {/* Section 2: Tools */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Planning Tools</h3>
                        <ul className="space-y-3">
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Calculator className="w-4 h-4" />
                            <span>Payment Calculator</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Calculator className="w-4 h-4" />
                            <span>Budget Planner</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Calculator className="w-4 h-4" />
                            <span>Rate Checker</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Calculator className="w-4 h-4" />
                            <span>Savings Calculator</span>
                          </a></li>
                        </ul>
                      </div>

                      {/* Section 3: AI / Insights */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Smart Features</h3>
                        <ul className="space-y-3 mb-6">
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>Financial Assistant</span>
                          </a></li>
                          <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <Mic className="w-4 h-4" />
                            <span>Market Podcast</span>
                          </a></li>
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-8">
                          <a href="#" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                            <Calculator className="w-5 h-5" />
                            <span>Check Options</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LOG IN */}
            <a href="#" className="text-gray-900 font-semibold uppercase tracking-wide hover:text-teal-600 transition-colors duration-250">
              Log In
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-900 hover:text-teal-600 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">UpStars Loans</span>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-900 hover:text-teal-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              {/* Borrow Section */}
              <div>
                <button className="w-full text-left text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                  Borrow
                </button>
                <div className="ml-4 mt-3 space-y-2">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Personal Loans</h4>
                    <ul className="space-y-2">
                      <li><a href="/loan-application?type=personal" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Explore Personal Loans
                      </a></li>
                      <li><a href="/loan-application?type=wedding" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Wedding Loans
                      </a></li>
                      <li><a href="/loan-application?type=home" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Home Improvement Loans
                      </a></li>
                      <li><a href="/loan-application?type=moving" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Moving Loans
                      </a></li>
                      <li><a href="/loan-application?type=medical" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Medical Loans
                      </a></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Car Loan Refinance</h4>
                    <ul className="space-y-2">
                      <li><a href="/loan-application?type=refinance" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Refinance Your Car
                      </a></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">HELOC</h4>
                    <ul className="space-y-2">
                      <li><a href="/loan-application?type=heloc" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Home Equity Line Of Credit
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Other Links */}
              <a href="#" className="block text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                For Lenders
              </a>
              <a href="#" className="block text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                For Dealers
              </a>
              
              {/* About Section */}
              <div>
                <button className="w-full text-left text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                  About
                </button>
                <div className="ml-4 mt-3 space-y-2">
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    Our Story
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    Leadership
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    News
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    Investor Relations
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    Careers
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                    Macro Index
                  </a>
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <button className="w-full text-left text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                  Resources
                </button>
                <div className="ml-4 mt-3 space-y-2">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Education</h4>
                    <ul className="space-y-2">
                      <li><a href="/loan-application?type=relief" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Relief Loans
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        FAQ
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Borrower Stories
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Credit Score
                      </a></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Tools</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Loan Calculator
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Payment Calculator
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Interest Calculator
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Inflation Calculator
                      </a></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">AI / Insights</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        AI Certification
                      </a></li>
                      <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200 block py-1">
                        Podcast
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Log In */}
              <a href="#" className="block text-gray-900 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                Log In
              </a>

              {/* CTA Button */}
              <div className="mt-6">
                <a href="/loan-application" className="w-full inline-flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Apply Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
