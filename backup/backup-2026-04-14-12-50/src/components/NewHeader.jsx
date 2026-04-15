import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, DollarSign, Menu, X, Calculator, BookOpen, TrendingUp, Users, FileText, Home, Car, CreditCard, Briefcase, Heart, GraduationCap, Building, Newspaper, PieChart, Mic, CheckCircle, Shield, Lock, Star, Zap } from 'lucide-react'

const NewHeader = () => {
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
      <div className="w-full bg-indigo-700 text-white py-2 text-center text-sm">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Smart financing options up to $100,000</span>
          <span className="font-semibold">See your personalized rates</span>
          <Star className="w-4 h-4" />
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">FinanceHub</span>
                <div className="text-xs text-gray-500 font-medium">Smart Financial Solutions</div>
              </div>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center space-x-10">
              {/* FINANCING OPTIONS DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('borrow')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-2 text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
                  <span>Financing Options</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'borrow' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'borrow' && (
                  <div className="absolute top-full left-0 mt-3 w-screen max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 transform transition-all duration-300 ease-out">
                    <div className="p-8 grid grid-cols-3 gap-10">
                      {/* Column 1: Personal Financing */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
                          Personal Financing
                        </h3>
                        <ul className="space-y-4">
                          <li><a href="/loan-application?type=personal" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            <div>
                              <div className="font-medium">Personal Options</div>
                              <div className="text-xs text-gray-500">Flexible terms available</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=wedding" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Heart className="w-5 h-5 text-pink-500" />
                            <div>
                              <div className="font-medium">Event Funding</div>
                              <div className="text-xs text-gray-500">Special occasion financing</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=home" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Home className="w-5 h-5 text-green-500" />
                            <div>
                              <div className="font-medium">Home Projects</div>
                              <div className="text-xs text-gray-500">Renovation & improvement</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=moving" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Building className="w-5 h-5 text-blue-500" />
                            <div>
                              <div className="font-medium">Relocation Support</div>
                              <div className="text-xs text-gray-500">Moving expense coverage</div>
                            </div>
                          </a></li>
                        </ul>
                      </div>

                      {/* Column 2: Vehicle & Property */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide flex items-center">
                          <Car className="w-4 h-4 mr-2 text-indigo-600" />
                          Vehicle & Property
                        </h3>
                        <ul className="space-y-4">
                          <li><a href="/loan-application?type=refinance" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Car className="w-5 h-5 text-blue-500" />
                            <div>
                              <div className="font-medium">Vehicle Solutions</div>
                              <div className="text-xs text-gray-500">Refinancing options</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=heloc" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Home className="w-5 h-5 text-green-500" />
                            <div>
                              <div className="font-medium">Home Credit Line</div>
                              <div className="text-xs text-gray-500">Equity access options</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=medical" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Heart className="w-5 h-5 text-red-500" />
                            <div>
                              <div className="font-medium">Healthcare Support</div>
                              <div className="text-xs text-gray-500">Medical expense help</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=relief" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <Shield className="w-5 h-5 text-orange-500" />
                            <div>
                              <div className="font-medium">Emergency Support</div>
                              <div className="text-xs text-gray-500">Quick assistance options</div>
                            </div>
                          </a></li>
                        </ul>
                      </div>

                      {/* Column 3: Debt Management */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide flex items-center">
                          <PieChart className="w-4 h-4 mr-2 text-indigo-600" />
                          Debt Management
                        </h3>
                        <ul className="space-y-4">
                          <li><a href="/loan-application?type=consolidation" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <PieChart className="w-5 h-5 text-purple-500" />
                            <div>
                              <div className="font-medium">Debt Solutions</div>
                              <div className="text-xs text-gray-500">Consolidation programs</div>
                            </div>
                          </a></li>
                          <li><a href="/loan-application?type=credit" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-indigo-50">
                            <CreditCard className="w-5 h-5 text-indigo-500" />
                            <div>
                              <div className="font-medium">Card Balance Help</div>
                              <div className="text-xs text-gray-500">Credit assistance</div>
                            </div>
                          </a></li>
                        </ul>

                        {/* CTA Section */}
                        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                          <h4 className="font-bold text-lg mb-3">Ready to get started?</h4>
                          <p className="text-sm mb-4 opacity-90">View your personalized financing options in minutes</p>
                          <a href="/loan-application" className="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                            <CheckCircle className="w-5 h-5" />
                            <span>View My Options</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PARTNERS */}
              <a href="/partners" className="text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
                Partners
              </a>

              {/* BUSINESS */}
              <a href="/business-financing" className="text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
                Business
              </a>

              {/* ABOUT US STATIC PAGE */}
              <a href="/about" className="text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
                About
              </a>

              {/* RESOURCES DROPDOWN - SIMPLIFIED */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-2 text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 transform transition-all duration-300 ease-out">
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li><a href="/credit-score" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-indigo-50 flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-orange-500" />
                          <div>
                            <div className="font-medium">Credit Insights</div>
                            <div className="text-xs text-gray-500">Understand your score</div>
                          </div>
                        </a></li>
                        <li><a href="/payment-calculator" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-indigo-50 flex items-center space-x-3">
                          <Calculator className="w-5 h-5 text-indigo-500" />
                          <div>
                            <div className="font-medium">Payment Calculator</div>
                            <div className="text-xs text-gray-500">Estimate monthly costs</div>
                          </div>
                        </a></li>
                        <li><a href="/rate-comparison" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-indigo-50 flex items-center space-x-3">
                          <Calculator className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">Rate Comparison</div>
                            <div className="text-xs text-gray-500">Compare offers easily</div>
                          </div>
                        </a></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACCOUNT ACCESS */}
            <a href="#" className="text-gray-800 font-semibold uppercase tracking-wide hover:text-indigo-600 transition-colors duration-300 py-2">
              Account Access
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">FinanceHub</span>
                  <div className="text-xs text-gray-500 font-medium">Smart Financial Solutions</div>
                </div>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Financing Options */}
              <div>
                <button className="w-full text-left text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200 flex items-center justify-between">
                  <span>Financing Options</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="ml-4 mt-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
                      Personal Financing
                    </h4>
                    <div className="space-y-2">
                      <a href="/loan-application?type=personal" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Personal Options
                      </a>
                      <a href="/loan-application?type=wedding" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Event Funding
                      </a>
                      <a href="/loan-application?type=home" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Home Projects
                      </a>
                      <a href="/loan-application?type=moving" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Relocation Support
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase flex items-center">
                      <Car className="w-4 h-4 mr-2 text-indigo-600" />
                      Vehicle & Property
                    </h4>
                    <div className="space-y-2">
                      <a href="/loan-application?type=refinance" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Vehicle Solutions
                      </a>
                      <a href="/loan-application?type=heloc" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Home Credit Line
                      </a>
                      <a href="/loan-application?type=medical" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Healthcare Support
                      </a>
                      <a href="/loan-application?type=relief" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Emergency Support
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase flex items-center">
                      <PieChart className="w-4 h-4 mr-2 text-indigo-600" />
                      Debt Management
                    </h4>
                    <div className="space-y-2">
                      <a href="/loan-application?type=consolidation" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Debt Solutions
                      </a>
                      <a href="/loan-application?type=credit" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                        Card Balance Help
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Links */}
              <a href="#" className="block text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                Partners
              </a>
              <a href="#" className="block text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                Business
              </a>
              <a href="/about" className="block text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                About
              </a>
              
              {/* Resources Section - Simplified */}
              <div>
                <button className="w-full text-left text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                  Resources
                </button>
                <div className="ml-4 mt-3 space-y-2">
                  <a href="/credit-score" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                    Credit Insights
                  </a>
                  <a href="/payment-calculator" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                    Payment Calculator
                  </a>
                  <a href="/rate-comparison" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 block py-2">
                    Rate Comparison
                  </a>
                </div>
              </div>

              {/* Account Access */}
              <a href="#" className="block text-gray-800 font-semibold uppercase tracking-wide py-3 border-b border-gray-200">
                Account Access
              </a>

              {/* CTA Button */}
              <div className="mt-6">
                <a href="/loan-application" className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
                  <CheckCircle className="w-6 h-6" />
                  <span>View My Options</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewHeader
