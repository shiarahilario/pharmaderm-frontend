function normalizeCity(city) {
  return String(city || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

export function getShippingCost(subtotalRD, city = '') {
  if (subtotalRD >= 3000) return 0
  const c = normalizeCity(city)
  if (c.includes('santiago')) return 150
  if (c.includes('santo domingo') || c.includes('distrito nacional') || c.includes('d.n')) return 200
  return 300
}
