import React from 'react'
import { Link } from 'react-router-dom'
import { User, Search, CheckCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      title: "Share Your Details",
      description: "Provide basic information about your financial needs and personal situation. This helps us understand what options might work best for you.",
      details: [
        "Simple online form",
        "Takes just a few minutes",
        "Secure and confidential"
      ]
    },
    {
      icon: Search,
      title: "Review Available Options",
      description: "We'll match you with financial service providers from our trusted network who may be able to help with your specific needs.",
      details: [
        "Multiple provider options",
        "Clear terms and conditions",
        "No obligation to proceed"
      ]
    },
    {
      icon: CheckCircle,
      title: "Choose What Works for You",
      description: "Review the available options and select the one that best fits your requirements. You're in complete control of the decision.",
      details: [
        "Compare different offers",
        "Choose at your own pace",
        "No pressure or urgency"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our simple three-step process helps you explore financial options with transparency and security.
          </p>
          <Link to="/personal-financing" className="btn-primary text-lg px-8 py-4">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Step Card */}
                  <div className="card pt-8 h-full">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-center">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary-300" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Our Process Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed our platform with your needs and security in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your information is protected with bank-level encryption and never shared without your consent.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">
                Complete the initial application in minutes and receive options without any paperwork.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Network</h3>
              <p className="text-gray-600">
                We work with reputable financial service providers who are committed to fair practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Important Information</h3>
            <div className="space-y-4 text-blue-800">
              <p>
                <strong>No Impact on Credit Score:</strong> Exploring options through our platform won't affect your credit score.
              </p>
              <p>
                <strong>No Obligation:</strong> You're under no obligation to accept any offer presented to you.
              </p>
              <p>
                <strong>Transparent Process:</strong> All terms and conditions are clearly displayed before you make any decisions.
              </p>
              <p>
                <strong>Free Service:</strong> Our platform is completely free to use. We're compensated by our network partners when you choose to work with them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Take the first step towards exploring your financial options today.
          </p>
          <Link to="/personal-financing" className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors text-lg">
            Start Your Application
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
