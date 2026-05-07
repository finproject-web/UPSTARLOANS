import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewHeader from './components/NewHeader'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import PersonalFinancing from './pages/PersonalFinancing'
import LoanApplication from './pages/LoanApplication'
import About from './pages/About'
import Partners from './pages/Partners'
import BusinessFinancing from './pages/BusinessFinancing'
import Lenders from './pages/Lenders'
import CreditScore from './pages/CreditScore'
import PaymentCalculator from './pages/PaymentCalculator'
import RateComparison from './pages/RateComparison'
import HowItWorks from './pages/HowItWorks'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import ApplicationSummary from './pages/ApplicationSummary'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import LegalDocument from './pages/LegalDocument'
import LoanSuccess from './pages/LoanSuccess'
import LoanCancelled from './pages/LoanCancelled'
import TestSetup from './pages/TestSetup'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashboard from './pages/CustomerDashboard'
import CustomerLoginDetails from './pages/CustomerLoginDetails'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NewHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/personal-financing" element={<PersonalFinancing />} />
            <Route path="/loan-application" element={<LoanApplication />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/business-financing" element={<BusinessFinancing />} />
            <Route path="/lenders" element={<Lenders />} />
            <Route path="/credit-score" element={<CreditScore />} />
            <Route path="/payment-calculator" element={<PaymentCalculator />} />
            <Route path="/rate-comparison" element={<RateComparison />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/application-summary" element={<ApplicationSummary />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal-document" element={<LegalDocument />} />
            <Route path="/loan-success" element={<LoanSuccess />} />
            <Route path="/loan-cancelled" element={<LoanCancelled />} />
            <Route path="/test-setup" element={<TestSetup />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/customer-login-details" element={<CustomerLoginDetails />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
