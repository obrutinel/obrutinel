export const SITE_URL = 'https://www.recyclette.fr'
export const SITE_NAME = 'Recyclette'
export const SITE_BASELINE = 'La seconde vie des beaux vélos'

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function discountPct(price: number, original?: number) {
  if (!original || original <= price)
    return null
  return Math.round((1 - price / original) * 100)
}
