import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does this platform work?",
      answer: "UpStars Loans is a financial services platform that connects users with third-party financial service providers. When you submit your information through our secure form, we review your details and match you with potential lenders or financial service providers from our network who may be able to help with your specific needs. You can then review the available options and choose what works best for you."
    },
    {
      question: "Will checking options affect my credit score?",
      answer: "No, exploring financial options through our platform will not affect your credit score. We perform a soft inquiry which has no impact on your credit rating. Only when you decide to proceed with a specific lender and they perform a hard inquiry could it potentially affect your credit score, but this only happens with your explicit consent."
    },
    {
      question: "How long does the process take?",
      answer: "The initial application through our platform typically takes just 3-5 minutes to complete. After submission, you'll usually receive options within minutes to a few hours, depending on your specific situation and the time of day. The entire process from application to reviewing options can often be completed in under 24 hours."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, absolutely. We use bank-level 256-bit SSL encryption to protect your personal information. Your data is stored securely and is only shared with verified financial service providers in our network for the purpose of helping you explore available options. We never sell your information to third parties for marketing purposes."
    },
    {
      question: "What happens after I submit my details?",
      answer: "After you submit your information, our system securely reviews your details and matches you with potential financial service providers from our network. You'll then be able to review any available options, including terms and conditions, interest rates, and repayment terms. You're under no obligation to accept any offer."
    },
    {
      question: "Are there any fees for using this platform?",
      answer: "No, our platform is completely free for users to use. We don't charge any application fees, subscription fees, or hidden costs. We're compensated by our network partners when you choose to work with them, but this doesn't affect the terms you receive."
    },
    {
      question: "Do you guarantee loan approval?",
      answer: "No, we don't guarantee approval for any financial products. As a platform that connects users with third-party providers, the final decision rests with the individual lenders or financial service providers. Approval depends on various factors including your creditworthiness, income, and the lender's specific criteria."
    },
    {
      question: "What types of financial products can I find?",
      answer: "Our network includes providers offering various financial products such as personal loans, debt consolidation options, credit building programs, and other financial services. The specific products available to you will depend on your location, financial situation, and the providers in our network."
    },
    {
      question: "Can I use the platform if I have bad credit?",
      answer: "Yes, we work with a diverse network of financial service providers, some of whom specialize in working with individuals who have less-than-perfect credit. While approval is never guaranteed, we encourage you to explore your options as different providers have different criteria."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the contact page on our website, or by emailing support@upstarsloans.com. We typically respond to inquiries within 24-48 hours during business days. You can also call us at 1-800-UPSTARS during business hours."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our platform and how we can help you explore financial options.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 animate-slide-up">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>
              <Link to="/personal-financing" className="btn-secondary text-lg px-8 py-4">
                Check Your Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Credit Impact</h3>
              <p className="text-gray-600">
                Exploring options through our platform won't affect your credit score
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free to Use</h3>
              <p className="text-gray-600">
                Our platform is completely free with no hidden fees or charges
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your information is protected with bank-level encryption
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
