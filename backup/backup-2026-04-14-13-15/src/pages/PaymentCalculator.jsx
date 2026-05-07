import React, { useState } from 'react'
import { Calculator, DollarSign, Calendar, Percent, TrendingUp, CheckCircle, ArrowRight, Info, AlertCircle } from 'lucide-react'

const PaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('10000')
  const [interestRate, setInterestRate] = useState('8.5')
  const [loanTerm, setLoanTerm] = useState('36')
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const calculatePayment = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const term = parseInt(loanTerm)

    if (principal > 0 && rate > 0 && term > 0) {
      const payment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
      const total = payment * term
      const interest = total - principal

      setMonthlyPayment(payment)
      setTotalPayment(total)
      setTotalInterest(interest)
    }
  }

  React.useEffect(() => {
    calculatePayment()
  }, [loanAmount, interestRate, loanTerm])

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
                <Calculator className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Payment <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Calculator</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Calculate your monthly payments and understand the total cost of your loan
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Loan Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
                    Loan Amount
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$1,000</span>
                    <span className="text-xl font-bold text-indigo-600">{formatCurrency(loanAmount)}</span>
                    <span>$100,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Percent className="w-5 h-5 text-indigo-600 mr-2" />
                    Interest Rate
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>3%</span>
                    <span className="text-xl font-bold text-indigo-600">{interestRate}%</span>
                    <span>25%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['12', '24', '36', '48', '60', '84'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          loanTerm === term
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {term} months
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Payment Breakdown
              </h2>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-indigo-600 mb-2">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <div className="text-xl text-gray-700">Monthly Payment</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-indigo-200">
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-indigo-200">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="text-xl font-bold text-orange-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-900 font-semibold">Total Payment</span>
                    <span className="text-2xl font-bold text-indigo-600">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
                    <p className="text-gray-600 text-sm">
                      This calculator provides estimates only. Actual rates and terms may vary based on your credit profile, lender criteria, and other factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tips for Better <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Loan Terms</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How to get the best rates and terms for your situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-indigo-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Improve Credit Score</h3>
              <p className="text-gray-600">Higher credit scores typically result in lower interest rates</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make Larger Down Payment</h3>
              <p className="text-gray-600">Reduce the loan amount to lower monthly payments</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Shorter Term</h3>
              <p className="text-gray-600">Shorter loans have higher payments but less total interest</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compare Multiple Lenders</h3>
              <p className="text-gray-600">Shop around to find the best rates and terms</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Read Terms Carefully</h3>
              <p className="text-gray-600">Understand all fees, penalties, and conditions</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Consider Total Cost</h3>
              <p className="text-gray-600">Look beyond monthly payment to total interest paid</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See Your Options?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Explore personalized loan offers based on your financial profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/loan-application" className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </a>
            <a href="/rate-comparison" className="bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-400 transition-colors text-lg">
              Compare Rates
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaymentCalculator
