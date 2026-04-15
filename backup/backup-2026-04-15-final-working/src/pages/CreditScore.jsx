import React from 'react'
import { Shield, Users, FileText, Clock, CheckCircle, ArrowRight, TrendingUp, Lock, HeadphonesIcon, Star, Zap, BarChart3, Award, Target, Lightbulb, Briefcase, Building, Newspaper, GraduationCap, Info, AlertCircle, TrendingDown, Activity, PieChart } from 'lucide-react'

const CreditScore = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Credit <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Understand your credit score and learn how to improve it for better financial opportunities
            </p>
          </div>
        </div>
      </section>

      {/* What is Credit Score Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is a Credit Score?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                A credit score is a three-digit number that represents your creditworthiness to lenders. It's calculated based on your credit history and helps financial institutions assess the risk of lending to you.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Range: 300-850</h3>
                    <p className="text-gray-600">Higher scores indicate better creditworthiness and typically result in better loan terms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Factors</h3>
                    <p className="text-gray-600">Payment history, credit utilization, length of credit history, and more</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Impact on Loans</h3>
                    <p className="text-gray-600">Affects interest rates, loan amounts, and approval decisions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-4">750+</div>
                <div className="text-xl text-gray-700">Good Credit Score</div>
                <div className="text-sm text-gray-600 mt-2">Generally considered excellent by most lenders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Ranges */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Credit Score <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ranges</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding where your score falls helps you know your financial standing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center p-6 rounded-2xl bg-red-50 border-2 border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">300-579</h3>
              <p className="text-red-600 font-semibold mb-2">Poor</p>
              <p className="text-sm text-gray-600">Limited credit options, higher rates</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-orange-50 border-2 border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">580-669</h3>
              <p className="text-orange-600 font-semibold mb-2">Fair</p>
              <p className="text-sm text-gray-600">Some credit options available</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">670-739</h3>
              <p className="text-yellow-600 font-semibold mb-2">Good</p>
              <p className="text-sm text-gray-600">Decent credit options available</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-green-50 border-2 border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">740-799</h3>
              <p className="text-green-600 font-semibold mb-2">Very Good</p>
              <p className="text-sm text-gray-600">Good credit options, better rates</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">800-850</h3>
              <p className="text-emerald-600 font-semibold mb-2">Exceptional</p>
              <p className="text-sm text-gray-600">Best rates and terms available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Factors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What goes into calculating your credit score
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100">
              <div className="flex items-center mb-4">
                <PieChart className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Payment History</h3>
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">35%</div>
              <p className="text-gray-600">Most important factor - shows if you pay bills on time</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Credit Utilization</h3>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-gray-600">Amount of credit you're using vs. total available</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Credit History</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15%</div>
              <p className="text-gray-600">How long you've had credit accounts</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Credit Mix</h3>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10%</div>
              <p className="text-gray-600">Different types of credit accounts you have</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Improve Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Credit Score</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical tips to boost your credit score over time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pay On Time</h3>
              <p className="text-gray-600">Set up automatic payments to never miss a due date</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lower Utilization</h3>
              <p className="text-gray-600">Keep credit card balances below 30% of limits</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Monitor Regularly</h3>
              <p className="text-gray-600">Check your credit report for errors and fraud</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Keep Old Accounts</h3>
              <p className="text-gray-600">Longer credit history helps your score</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Limit New Applications</h3>
              <p className="text-gray-600">Too many hard inquiries can lower your score</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diversify Credit</h3>
              <p className="text-gray-600">Mix of credit types shows responsible management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Check Your Options?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            See what financial solutions are available for your credit profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/loan-application" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              View My Options
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </a>
            <a href="/payment-calculator" className="bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-400 transition-colors text-lg">
              Calculate Payments
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreditScore
