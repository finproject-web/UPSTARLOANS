import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, FileText, Clock, CheckCircle, ArrowRight, TrendingUp, Lock, Headphones, Star, Zap, BarChart3, Award, Target, HelpCircle } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the Right Financial Solution
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Connect with trusted lenders and discover personalized loan options tailored to your needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-4 sm:space-y-0 mb-8">
              <Link 
                to="/loan-application?type=personal" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>
              <Link 
                to="/personal-financing" 
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
              >
                Learn More
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

      {/* How Our Platform Works */}
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

      {/* Multiple Providers */}
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
            {/* Traditional Banks */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Traditional Banks</h3>
              <p className="text-gray-600">Established financial institutions with comprehensive services</p>
            </div>

            {/* Online Lenders */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Lenders</h3>
              <p className="text-gray-600">Digital-first lending with fast approval processes</p>
            </div>

            {/* Credit Unions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Credit Unions</h3>
              <p className="text-gray-600">Member-owned financial cooperatives</p>
            </div>

            {/* Fintech Platforms */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fintech Platforms</h3>
              <p className="text-gray-600">Innovative digital financial services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Find Your Financial Solution?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands who have found the right loan through our platform
            </p>
            <Link 
              to="/loan-application?type=personal" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
