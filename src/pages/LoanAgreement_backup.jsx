import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

const LoanAgreement = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loanData, setLoanData] = useState(null);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signature, setSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [loanNumber] = useState('LS-' + Date.now());
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("nW8qV4aakkEtYlieZ");
  }, []);

  // Load loan data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('loanApplicationData');
    
    if (!storedData) {
      alert('No loan application data found. Please start your application again.');
      navigate('/loan-application');
      return;
    }
    
    const data = JSON.parse(storedData);
    setLoanData(data);
    setLoading(false);
  }, [navigate]);

  // Initialize canvas for signature
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas size
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Set drawing styles
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Clear canvas with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Drawing functions
  const startDrawing = (e) => {
    if (e) e.preventDefault();
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e) e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
    // Auto-save signature when user stops drawing
    saveSignature();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setSignature(dataURL);
    }
  };

  // Calculate EMI using US loan formula
  const calculateEMI = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  // Generate payment schedule
  const generatePaymentSchedule = (principal, annualRate, months) => {
    const schedule = [];
    const monthlyRate = annualRate / 12 / 100;
    const emi = calculateEMI(principal, annualRate, months);
    let balance = principal;
    const startDate = new Date();

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(startDate.getMonth() + i);

      schedule.push({
        paymentNumber: i,
        paymentDate: paymentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        paymentAmount: emi.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2)
      });
    }

    return schedule;
  };

  // Get bank name from bank code
  const getBankName = (bankCode) => {
    const bankNames = {
      'chase': 'Chase Bank',
      'bank-of-america': 'Bank of America',
      'wells-fargo': 'Wells Fargo',
      'citibank': 'Citibank',
      'capital-one': 'Capital One',
      'us-bank': 'U.S. Bank',
      'pnc': 'PNC Bank',
      'td-bank': 'TD Bank',
      'bbt': 'BB&T (now Truist)',
      'suntrust': 'SunTrust (now Truist)',
      'regions': 'Regions Bank',
      'fifth-third': 'Fifth Third Bank',
      'keybank': 'KeyBank',
      'huntington': 'Huntington Bank',
      'citizens': 'Citizens Bank',
      'ally': 'Ally Bank',
      'discover': 'Discover Bank',
      'synchrony': 'Synchrony Bank',
      'marcus': 'Marcus by Goldman Sachs',
      'other': 'Other Bank'
    };
    
    return bankNames[bankCode] || 'Not provided';
  };

  
  // Toggle accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Handle agreement submission
  const handleAgree = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions first.');
      return;
    }
    
    if (!signature) {
      alert('Please provide your signature first.');
      return;
    }
    
    if (confirm('Are you sure you agree to this loan agreement?')) {
      const agreementData = {
        ...loanData,
        agreementAccepted: true,
        agreementDate: new Date().toLocaleString(),
        agreementStatus: 'Accepted and Downloaded',
        digitalSignature: signature
      };
      
      sessionStorage.setItem('loanAgreementData', JSON.stringify(agreementData));
      
      setAgreementAccepted(true);
      
      generateAndDownloadPDF();
      
      alert('Loan agreement accepted! Your agreement has been downloaded.');
      
      setTimeout(() => {
        navigate('/loan-success');
      }, 2000);
    }
  };

  // Handle disagreement
  const handleDisagree = () => {
    if (confirm('Are you sure you want to cancel this loan agreement?')) {
      navigate('/loan-cancelled');
    }
  };

  // Generate and download PDF
  const generateAndDownloadPDF = async () => {
    try {
      const doc = new jsPDF();
      
      const principal = parseFloat(loanData.loanAmount) || 0;
      const months = parseInt(loanData.loanDuration) || 36;
      const annualRate = 10;
      const emi = calculateEMI(principal, annualRate, months);
      const totalRepayment = emi * months;
      const totalInterest = totalRepayment - principal;
      
      let yPosition = 20;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.height;
      
      // Helper function to add new page if needed
      const checkPageBreak = (requiredSpace) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
      };
      
      // Header
      doc.setFillColor(25, 25, 112);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('Upstar Loans Agreement', 105, 25, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      yPosition = 50;
      
      // Agreement details
      doc.setFont(undefined, 'bold');
      doc.text('Agreement Details', 20, yPosition);
      yPosition += lineHeight;
      doc.setFont(undefined, 'normal');
      doc.text(`Agreement Number: ${loanNumber}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Date: ${currentDate}`, 20, yPosition);
      yPosition += lineHeight * 2;
      
      // Borrower information
      const fullName = loanData.name || loanData.fullName || `${loanData.firstName || ''} ${loanData.lastName || ''}`.trim() || 'Not provided';
      
      checkPageBreak(40);
      doc.setFont(undefined, 'bold');
      doc.text('Borrower Information', 20, yPosition);
      yPosition += lineHeight;
      doc.setFont(undefined, 'normal');
      doc.text(`Full Name: ${fullName}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Email: ${loanData.email || 'Not provided'}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Phone: ${loanData.phone || 'Not provided'}`, 20, yPosition);
      yPosition += lineHeight;
      
      const completeAddress = [
        loanData.streetAddress || loanData.address || 'Not provided',
        loanData.city || 'Not provided',
        loanData.state || 'Not provided',
        loanData.zipCode || 'Not provided'
      ].filter(part => part && part !== 'Not provided').join(', ');
      
      doc.text(`Address: ${completeAddress}`, 20, yPosition);
      yPosition += lineHeight * 2;
      
      // Loan summary
      checkPageBreak(50);
      doc.setFont(undefined, 'bold');
      doc.text('Loan Summary', 20, yPosition);
      yPosition += lineHeight;
      doc.setFont(undefined, 'normal');
      doc.text(`Loan Amount: $${principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Loan Term: ${months} months`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Annual Percentage Rate (APR): ${annualRate.toFixed(2)}%`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Monthly Payment: $${emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Total Repayment: $${totalRepayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPosition);
      yPosition += lineHeight;
      doc.text(`Total Interest: $${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPosition);
      
      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${i} of ${totalPages}`, 105, pageHeight - 10, { align: 'center' });
        doc.text('Upstar Loans Agreement - Confidential', 105, pageHeight - 5, { align: 'center' });
      }
      
      const fileName = `Upstar-Loans-Agreement-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      alert(`Complete loan agreement downloaded as ${fileName}`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try the print function instead.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-xl">Generating your loan agreement...</p>
        </div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500">No loan data found</p>
        </div>
      </div>
    );
  }

  const principal = parseFloat(loanData.loanAmount) || 0;
  const months = parseInt(loanData.loanDuration) || 36;
  const annualRate = 10;
  const emi = calculateEMI(principal, annualRate, months);
  const totalRepayment = emi * months;
  const paymentSchedule = generatePaymentSchedule(principal, annualRate, months);
  const fullName = loanData.name || loanData.fullName || `${loanData.firstName || ''} ${loanData.lastName || ''}`.trim() || 'Not provided';
  const bankName = getBankName(loanData.customerBank || loanData.bankName);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black text-white">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="/" className="text-white hover:text-yellow-500">Home</a>
              <a href="/personal-loans" className="text-white hover:text-yellow-500">Personal Loans</a>
              <a href="/bank-auth" className="text-white hover:text-yellow-500">Financial Details</a>
              <a href="/how-it-works" className="text-white hover:text-yellow-500">How it Works</a>
              <a href="/faqs" className="text-white hover:text-yellow-500">FAQs</a>
              <a href="/contact" className="text-white hover:text-yellow-500">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Trust Banner */}
      <section className="bg-blue-900 text-white py-3 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            <strong>This is a loan facilitation platform.</strong> We connect users with lending partners. We do not provide loans directly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-xl">Generating your loan agreement...</p>
          </div>
        ) : !loanData ? (
          <div className="text-center">
            <p className="text-xl text-red-500">No loan data found</p>
          </div>
        ) : (
          <div>
            {/* LightStream Loan Agreement Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">LightStream Loan Agreement</h1>
              <p className="text-lg text-gray-300">Loan Agreement Number: {loanNumber}</p>
              <p className="text-lg text-gray-300">Date: {currentDate}</p>
            </div>

          {!loading && (
            <footer className="bg-black text-white mt-12">
              <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-4">Business Hours (Eastern time)</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Customer Service</strong><br />
                      Monday - Friday: 9:30 a.m. to 7 p.m. & Saturday: Noon to 4 p.m.
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Application Processing</strong><br />
                      Monday - Friday: 10 a.m. to 6 p.m.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Mailing Address</h4>
                    <p className="text-sm text-gray-300">
                      PO Box 117320<br />
                      Atlanta, GA 30368-7320
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-8">
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>Your loan terms, including APR, may differ based on loan purpose, amount, term length, and your credit profile.</strong> Lowest rates require excellent credit. At least 10.003% of approved applicants applying for to lowest rate qualified for to lowest rate available based on data from 10/01/2025 to 12/31/2025. Rate is quoted with AutoPay discount. AutoPay discount is only available prior to loan funding. Rates without AutoPay are 0.50% points higher. Subject to credit approval. Conditions and limitations apply. Advertised rates and terms are subject to change without notice.
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>Payment example:</strong> Monthly payments for a $10,000 loan at 10.00% APR with a term of 3 years would result in 36 monthly payments of $306.44.
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>Maximum APR for a LightStream loan is 25.39%.</strong> Loan terms range from 24 - 240 months depending on loan type.
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>You can fund your loan today if today is a banking business day, your application is approved, and you complete the following steps by 2:30 p.m. Eastern time:</strong>
                  </p>
                  <ol className="text-sm text-gray-400 mb-4 ml-6">
                    <li>1. review and electronically sign your loan agreement;</li>
                    <li>2. provide us with your funding preferences and relevant banking information;</li>
                    <li>3. complete final application review.</li>
                  </ol>
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>E H L Truist Bank is an Equal Housing Lender. 2025 Truist Financial Corporation.</strong>
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    Truist, LightStream, and LightStream logos are service marks of Truist Financial Corporation. All rights reserved.
                  </p>
                  <p className="text-sm text-gray-400">
                    All other trademarks are property of their respective owners. Lending services provided by Truist Bank.
                  </p>
                </div>
              </div>
            </footer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoanAgreement;
