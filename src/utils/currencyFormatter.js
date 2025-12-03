export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const parseCurrency = (value) => {
  const cleaned = value.replace(/[^0-9.-]+/g, '')
  return parseFloat(cleaned) || 0
}

