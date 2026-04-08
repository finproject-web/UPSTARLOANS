import React from 'react'
import { ArrowRight, Users, TrendingUp, Zap, Target, Building, Briefcase, FileText, Star, CheckCircle, Clock, Award } from 'lucide-react'

const Partners = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Partner with a growing financial marketplace
            </h1>
            <p className="text-lg text-gray-600 mb-4 text-center max-w-4xl mx-auto">
              For affiliates, platforms, and integration partners
            </p>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join our network of lenders and service providers to reach more customers.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 max-w-4xl mx-auto">
              <p className="text-blue-800 text-sm text-center">
                Our platform connects users to partners. Partners handle approvals and funding directly.
              </p>
            </div>
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Become a partner
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

      {/* WHY PARTNER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why partner with us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Broaden your reach */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Broaden your reach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with a wider audience
              </p>
            </div>

            {/* Create new opportunities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create new opportunities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate additional revenue streams
              </p>
            </div>

            {/* Simple onboarding */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Simple onboarding
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Easy setup process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership opportunities
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Referral partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Target className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Referral partners
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Earn through introductions
              </p>
            </div>

            {/* Integration partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Building className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Integration partners
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Connect systems easily
              </p>
            </div>

            {/* Institutional partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Briefcase className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Institutional partners
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Collaborate on financial solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership process
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1: Apply */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Apply
              </h3>
            </div>

            {/* Step 2: Get approved */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get approved
              </h3>
            </div>

            {/* Step 3: Set up */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-teal-600" />
              </div>
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Set up
              </h3>
            </div>

            {/* Step 4: Start collaborating */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Start collaborating
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* HOW PARTNERSHIPS WORK */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How partnerships work
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Users apply through platform */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Users apply through platform
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Customers submit applications through our streamlined interface
              </p>
            </div>

            {/* Leads are shared with partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Leads are shared with partners
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Qualified applications are routed to your lending system
              </p>
            </div>

            {/* Partners manage decisions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partners manage decisions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You maintain full control over approvals and funding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start your partnership journey
            </h2>
            <button className="bg-white text-teal-600 font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Become a partner
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners
