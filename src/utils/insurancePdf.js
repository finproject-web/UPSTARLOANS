import jsPDF from 'jspdf'
import { insuranceDocumentSections } from '../data/insuranceDocument'

const PAGE_WIDTH = 210 // A4 width in mm
const PAGE_HEIGHT = 297 // A4 height in mm
const MARGIN = 20
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

const LINE_HEIGHT_FACTOR = 0.45 // approximate mm per point of font size

const addPageIfNeeded = (pdf, yPosition, requiredHeight) => {
  if (yPosition + requiredHeight > PAGE_HEIGHT - MARGIN) {
    pdf.addPage()
    return MARGIN
  }
  return yPosition
}

const writeWrappedText = (pdf, text, yPosition, options = {}) => {
  const {
    fontSize = 10,
    fontStyle = 'normal',
    textColor = [0, 0, 0],
    align = 'left',
    indent = 0,
    lineSpacing = 1.2,
    spaceAfter = 2
  } = options

  pdf.setFont('helvetica', fontStyle)
  pdf.setFontSize(fontSize)
  pdf.setTextColor(...textColor)

  const maxWidth = CONTENT_WIDTH - indent
  const lines = pdf.splitTextToSize(text, maxWidth)
  const lineHeight = fontSize * LINE_HEIGHT_FACTOR * lineSpacing
  const totalHeight = lines.length * lineHeight + spaceAfter

  let y = addPageIfNeeded(pdf, yPosition, totalHeight)
  pdf.text(lines, MARGIN + indent, y, { align })
  return y + totalHeight
}

const writeHeading = (pdf, text, yPosition, level = 1) => {
  const sizes = { 1: 18, 2: 14, 3: 12 }
  const fontSize = sizes[level] || 12
  return writeWrappedText(pdf, text, yPosition, {
    fontSize,
    fontStyle: 'bold',
    textColor: level === 1 ? [0, 51, 102] : [0, 0, 0],
    spaceAfter: level === 1 ? 6 : 4
  })
}

export const downloadInsurancePolicyPDF = (customer = {}) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  let y = MARGIN

  // Header
  y = writeHeading(pdf, 'Payment Protection Insurance Policy', y, 1)
  y = writeWrappedText(pdf, 'UpStart Loans', y, {
    fontSize: 14,
    fontStyle: 'bold',
    align: 'center',
    textColor: [0, 51, 102],
    spaceAfter: 4
  })

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  y = writeWrappedText(pdf, `Date: ${today}`, y, { fontSize: 10, spaceAfter: 4 })

  if (customer.name || customer.email || customer.applicationId) {
    const customerLines = []
    if (customer.name) customerLines.push(`Customer: ${customer.name}`)
    if (customer.email) customerLines.push(`Email: ${customer.email}`)
    if (customer.applicationId) customerLines.push(`Application ID: ${customer.applicationId}`)
    y = writeWrappedText(pdf, customerLines.join('\n'), y, { fontSize: 10, spaceAfter: 6 })
  }

  y += 4

  // Sections
  insuranceDocumentSections.forEach((section, sectionIndex) => {
    y = writeHeading(pdf, `${sectionIndex + 1}. ${section.title}`, y, 2)

    section.points.forEach((point) => {
      y = writeWrappedText(pdf, point.title, y, {
        fontSize: 11,
        fontStyle: 'bold',
        indent: 4,
        spaceAfter: 1
      })
      y = writeWrappedText(pdf, point.content, y, {
        fontSize: 10,
        indent: 8,
        spaceAfter: 4
      })
    })

    y += 2
  })

  // Footer with page numbers
  const pageCount = pdf.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(120, 120, 120)
    pdf.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, { align: 'right' })
  }

  const filename = customer.applicationId
    ? `Insurance-Policy-${customer.applicationId}.pdf`
    : 'Insurance-Policy.pdf'

  pdf.save(filename)
}
