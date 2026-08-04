export const DEFAULT_CUSTOMER_PASSWORD = 'UpStarLoan#2024'

/** Strip data-URL prefix so dashboard can use raw base64 */
export function stripBase64Prefix(dataUrl) {
  if (!dataUrl) return ''
  const commaIndex = dataUrl.indexOf(',')
  return commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl
}