export const safeTrim = (str) => {
  if (typeof str === 'string') {
    return str.trim()
  }

  if (typeof str === 'number') {
    return String(str).trim()
  }

  return ''
}
