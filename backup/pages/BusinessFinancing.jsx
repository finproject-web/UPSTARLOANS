import React from 'react'
import { ArrowRight, DollarSign, TrendingUp, Building, Briefcase, FileText, Shield, Zap, Clock, CheckCircle, Star, Users, Target, Award } from 'lucide-react'

const BusinessFinancing = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Explore funding options for your business
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Compare offers from multiple providers to find solutions that match your business needs.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 max-w-4xl mx-auto">
              <p className="text-blue-800 text-sm text-center">
                We connect businesses with independent financial providers.
              </p>
            </div>
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Explore business options
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
              We are not a direct lender. We connect users with independent providers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Compare multiple providers
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                No obligation to proceed
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Secure application process
              </span>
            </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How businesses use funding
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Daily operations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Daily operations
              </h3>
            </div>

            {/* Equipment investment */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Building className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Equipment investment
              </h3>
            </div>

            {/* Business expansion */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Business expansion
              </h3>
            </div>

            {/* Cash flow support */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cash flow support
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Designed for business needs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick application */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick application
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Submit details in minutes
              </p>
            </div>

            {/* Transparent structure */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Transparent structure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clear terms before moving forward
              </p>
            </div>

            {/* Flexible access */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flexible access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Use funds based on your priorities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1: Submit business details */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Submit business details
              </h3>
            </div>

            {/* Step 2: Review available options */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Review available options
              </h3>
            </div>

            {/* Step 3: Select a suitable plan */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Select a suitable plan
              </h3>
            </div>

            {/* Step 4: Complete process */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Complete process
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Support your business with right solution
            </h2>
            <button className="bg-white text-teal-600 font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get started
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            Funding availability, terms, and eligibility may vary. This is not a guarantee of approval.
          </p>
        </div>
      </section>
    </div>
  )
}

export default BusinessFinancing
