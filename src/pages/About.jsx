import React from 'react'
import { Shield, Users, FileText, Clock, CheckCircle, ArrowRight, TrendingUp, Lock, HeadphonesIcon, Star, Zap, BarChart3, Award, Target, Lightbulb, Briefcase, Building, Newspaper, GraduationCap } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting people with financial opportunities
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Our platform helps individuals and businesses explore financial options by connecting them with a network of third-party providers.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 max-w-4xl mx-auto">
              <p className="text-blue-800 text-sm text-center">
                We do not provide loans directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We are a platform that connects users with third-party lenders and financial providers. Our goal is to help you explore available options while maintaining transparency about our role as a connector, not a direct lender.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility First</h3>
                    <p className="text-gray-600">Making financial solutions available to everyone, regardless of background or credit history</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Security</h3>
                    <p className="text-gray-600">Bank-level security and complete transparency in everything we do</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer-Centric</h3>
                    <p className="text-gray-600">Putting your needs first with personalized solutions and dedicated support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-4">100,000+</div>
                <div className="text-xl text-gray-700">Happy Customers</div>
                <div className="text-sm text-gray-600 mt-2">Trusted by thousands nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">We operate with complete transparency and honesty in all our dealings</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Constantly improving our platform to serve you better</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Empathy</h3>
              <p className="text-gray-600">Understanding your unique financial situation and needs</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">Delivering exceptional service and results every time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Experts</h3>
              <p className="text-gray-600">Decades of experience in lending and financial services</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Innovators</h3>
              <p className="text-gray-600">Building cutting-edge solutions for modern finance</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Champions</h3>
              <p className="text-gray-600">Dedicated to providing exceptional support and guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a trusted financial platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                2019
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Founded</h3>
              <p className="text-gray-600">Started with a mission to transform financial services</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-600">
                2021
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">Expanded our network and helped thousands of customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                2023
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Launched advanced features and improved user experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600">
                2025
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Future</h3>
              <p className="text-gray-600">Continuing to innovate and serve our growing community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Be part of our journey to make financial solutions accessible to everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/loan-application" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </a>
            <a href="/contact" className="bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-400 transition-colors text-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
