import React, { useState } from 'react'
import { TrendingUp, Percent, DollarSign, Calendar, CheckCircle, ArrowRight, Info, AlertCircle, BarChart3, Star, Shield, Clock } from 'lucide-react'

const RateComparison = () => {
  const [loanAmount, setLoanAmount] = useState('10000')
  const [loanType, setLoanType] = useState('personal')
  const [creditScore, setCreditScore] = useState('good')

  const rateData = {
    personal: {
      excellent: { rate: '5.99%', apr: '6.2%', monthly: 301 },
      good: { rate: '8.99%', apr: '9.3%', monthly: 322 },
      fair: { rate: '12.99%', apr: '13.5%', monthly: 337 },
      poor: { rate: '18.99%', apr: '19.8%', monthly: 362 }
    },
    auto: {
      excellent: { rate: '3.99%', apr: '4.2%', monthly: 295 },
      good: { rate: '6.49%', apr: '6.8%', monthly: 306 },
      fair: { rate: '9.99%', apr: '10.3%', monthly: 321 },
      poor: { rate: '15.99%', apr: '16.5%', monthly: 343 }
    },
    home: {
      excellent: { rate: '4.49%', apr: '4.7%', monthly: 276 },
      good: { rate: '6.99%', apr: '7.2%', monthly: 295 },
      fair: { rate: '9.49%', apr: '9.8%', monthly: 316 },
      poor: { rate: '13.99%', apr: '14.3%', monthly: 346 }
    }
  }

  const currentRates = rateData[loanType]?.[creditScore] || rateData.personal.good

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
              Rate <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Comparison</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Compare interest rates and find the best option for your financial needs
            </p>
          </div>
        </div>
      </section>

      {/* Rate Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
                Loan Amount
              </label>
              <select
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="5000">$5,000</option>
                <option value="10000">$10,000</option>
                <option value="15000">$15,000</option>
                <option value="20000">$20,000</option>
                <option value="25000">$25,000</option>
                <option value="30000">$30,000</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
                Loan Type
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="personal">Personal Loan</option>
                <option value="auto">Auto Loan</option>
                <option value="home">Home Loan</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-5 h-5 text-indigo-600 mr-2" />
                Credit Score Range
              </label>
              <select
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="excellent">Excellent (750-850)</option>
                <option value="good">Good (670-739)</option>
                <option value="fair">Fair (580-669)</option>
                <option value="poor">Poor (300-579)</option>
              </select>
            </div>
          </div>

          {/* Current Rates Display */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Estimated Rates
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl border-2 border-indigo-100">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {currentRates.rate}
                </div>
                <div className="text-gray-600">Interest Rate</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl border-2 border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {currentRates.apr}
                </div>
                <div className="text-gray-600">APR</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl border-2 border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatCurrency(currentRates.monthly)}
                </div>
                <div className="text-gray-600">Monthly Payment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Rate <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Comparison</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how rates vary by credit score and loan type
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Credit Score</th>
                  <th className="px-6 py-4 text-center">Personal Loan</th>
                  <th className="px-6 py-4 text-center">Auto Loan</th>
                  <th className="px-6 py-4 text-center">Home Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Excellent (750+)</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">5.99% APR</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">4.2% APR</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">4.7% APR</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Good (670-739)</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-semibold">9.3% APR</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-semibold">6.8% APR</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-semibold">7.2% APR</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Fair (580-669)</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-semibold">13.5% APR</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-semibold">10.3% APR</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-semibold">9.8% APR</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Poor (300-579)</td>
                  <td className="px-6 py-4 text-center text-red-600 font-semibold">19.8% APR</td>
                  <td className="px-6 py-4 text-center text-red-600 font-semibold">16.5% APR</td>
                  <td className="px-6 py-4 text-center text-red-600 font-semibold">14.3% APR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Factors That <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Affect Rates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding what influences your interest rates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Credit Score</h3>
              <p className="text-gray-600">Higher scores typically qualify for lower rates</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Income Level</h3>
              <p className="text-gray-600">Higher income can lead to better rates</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Loan Term</h3>
              <p className="text-gray-600">Shorter terms often have lower rates</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collateral</h3>
              <p className="text-gray-600">Secured loans typically have lower rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tips for Better <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Rates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How to qualify for the best interest rates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Improve Credit</h3>
              <p className="text-gray-600">Pay bills on time and reduce debt to boost your score</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Shop Around</h3>
              <p className="text-gray-600">Compare offers from multiple lenders</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Timing Matters</h3>
              <p className="text-gray-600">Apply when rates are low and your credit is strong</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Rate?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get personalized rate offers based on your unique financial profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/loan-application" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              Get Started Now
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

export default RateComparison
