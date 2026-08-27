export const SITE_URL = 'https://www.biclette.com'
export const SITE_NAME = 'Biclette'
export const SITE_BASELINE = 'L\'occasion de bien rouler'

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

/** Mélange deux couleurs hex (#rrggbb) — utilisé par les illustrations duotone. */
export function mixHex(hex: string, target: string, amount: number) {
  const p = (h: string) => [1, 3, 5].map(i => Number.parseInt(h.slice(i, i + 2), 16))
  const [r1, g1, b1] = p(hex)
  const [r2, g2, b2] = p(target)
  const c = (a: number, b: number) => Math.round(a + (b - a) * amount)
  return `#${[c(r1!, r2!), c(g1!, g2!), c(b1!, b2!)].map(v => v.toString(16).padStart(2, '0')).join('')}`
}

export function discountPct(price: number, original?: number) {
  if (!original || original <= price)
    return null
  return Math.round((1 - price / original) * 100)
}
