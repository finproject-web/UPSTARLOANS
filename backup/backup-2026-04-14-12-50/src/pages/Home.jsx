import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, FileText, Clock, CheckCircle, ArrowRight, TrendingUp, Lock, HeadphonesIcon, Star, Zap, BarChart3, Award, Target, Lightbulb, Building } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Compare financial options from multiple providers in one place
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto animate-slide-up">
              We help you explore offers from a network of lenders through a simple and secure online experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/loan-application" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                View your options
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>
              <Link to="/how-it-works" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl text-lg border-2 border-indigo-200 hover:bg-indigo-50 transition-all duration-300">
                Learn How It Works
              </Link>
            </div>
            <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
              We are not a direct lender. We connect users with independent providers.
            </p>
            <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto mt-2">
              We do not charge users for submitting requests. Providers may have their own terms and fees.
            </p>
            <p className="text-xs text-gray-400 text-center max-w-3xl mx-auto mt-2">
              No obligation to proceed • Submitting a request does not commit you to any offer
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Compare multiple providers
                </span>
                <span className="text-xs text-gray-500 mt-1">Access options from different financial providers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Simple process
                </span>
                <span className="text-xs text-gray-500 mt-1">Quick and easy online experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Transparent approach
                </span>
                <span className="text-xs text-gray-500 mt-1">Clear information before making decisions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">FinanceHub</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing transparent, secure, and personalized financial solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Options</h3>
              <p className="text-gray-600">Tailored financing solutions based on your unique financial situation</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600">Access to multiple lenders to find the best rates for your needs</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Process</h3>
              <p className="text-gray-600">Simple online application with fast response times</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">Dedicated team to guide you through every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A transparent and secure marketplace
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* We connect you with verified providers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                We connect you with verified providers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All partners are thoroughly vetted and approved
              </p>
            </div>

            {/* You choose what works best for you */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                You choose what works best for you
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compare multiple options before deciding
              </p>
            </div>

            {/* No obligation to proceed */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                No obligation to proceed
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore options without commitment
              </p>
            </div>

            {/* Your data is handled securely */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your data is handled securely
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level encryption protects your information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW OUR PLATFORM WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How our platform works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Submit your request */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Submit your request
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We collect your details through a secure form
              </p>
            </div>

            {/* Get matched */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get matched
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We connect you with relevant providers
              </p>
            </div>

            {/* Choose your option */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choose your option
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You decide what works best
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MULTIPLE PROVIDERS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Access a network of providers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare options from multiple financial service providers in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Provider 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Traditional Banks</h3>
              <p className="text-gray-600">Established financial institutions with competitive rates</p>
            </div>

            {/* Provider 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Lenders</h3>
              <p className="text-gray-600">Digital-first lending with fast approval processes</p>
            </div>

            {/* Provider 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Credit Unions</h3>
              <p className="text-gray-600">Member-owned financial cooperatives with member benefits</p>
            </div>

            {/* Provider 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fintech Platforms</h3>
              <p className="text-gray-600">Modern technology-driven financial services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Security & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Privacy First</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your financial security is our top priority with industry-leading protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Bank-Level Security</h3>
              </div>
              <p className="text-gray-600 mb-4">256-bit SSL encryption protects your data during transmission and storage</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Encrypted data transmission</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Secure servers with 24/7 monitoring</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Regular security audits</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Privacy Protection</h3>
              </div>
              <p className="text-gray-600 mb-4">We never sell your data and only share it with verified lenders when you authorize</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Data never sold to third parties</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />You control data sharing permissions</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />GDPR and CCPA compliant</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Trusted Network</h3>
              </div>
              <p className="text-gray-600 mb-4">Partnered with verified financial institutions and lenders</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />All partners thoroughly vetted</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Transparent lending practices</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Customer-first approach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Protect Your Data Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Protect Your Data</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-layered security measures to keep your financial information safe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border-2 border-indigo-100 bg-indigo-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
              <p className="text-sm text-gray-600">Your data is encrypted from device to our servers</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl border-2 border-green-100 bg-green-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-sm text-gray-600">Bank-level security for all stored information</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl border-2 border-blue-100 bg-blue-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Access Control</h3>
              <p className="text-sm text-gray-600">You control who can access your financial information</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl border-2 border-purple-100 bg-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Regular Audits</h3>
              <p className="text-sm text-gray-600">Third-party security assessments and compliance checks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to meet your diverse needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Financing</h3>
              <p className="text-gray-600">Multiple loan options with terms that work for you</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Review</h3>
              <p className="text-gray-600">Fast application processing with same-day responses</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your information protected with industry-standard security</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Expert guidance available throughout your financial journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100">
              <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100">
              <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">500,000+</div>
              <div className="text-gray-600">Applications Processed</div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">Bank-Level</div>
              <div className="text-gray-600">Security Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to access your personalized financial options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Details</h3>
              <p className="text-gray-600">Provide basic information about your financial needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Options</h3>
              <p className="text-gray-600">Explore available financial products from our network</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose What Works</h3>
              <p className="text-gray-600">Select option that best fits your requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 text-indigo-600 mr-2" />
                How does FinanceHub work?
              </h3>
              <p className="text-gray-600">We connect you with verified financial service providers based on your needs and profile.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 text-indigo-600 mr-2" />
                Will checking options affect my credit?
              </h3>
              <p className="text-gray-600">No, exploring options through our platform won't impact your credit score.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 text-indigo-600 mr-2" />
                Is my information secure?
              </h3>
              <p className="text-gray-600">Yes, we use bank-level encryption and comply with all privacy laws.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 text-indigo-600 mr-2" />
                How long does the process take?
              </h3>
              <p className="text-gray-600">The initial application takes just a few minutes to complete.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
              <FileText className="w-5 h-5" />
              <span>View All FAQs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Your Options?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Take the first step towards finding the right financial solution for your needs
          </p>
          <Link to="/loan-application" className="inline-flex items-center space-x-2 bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
            <CheckCircle className="w-6 h-6" />
            <span>Get Started Now</span>
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
