export type IllustrationKind =
  | 'vtt'
  | 'route'
  | 'gravel'
  | 'ville'
  | 'vae'
  | 'enfant'
  | 'bmx'
  | 'triathlon'
  | 'fixie'
  | 'cargo'
  | 'pieces'

export interface Universe {
  slug: string
  /** Nom court affiché dans la navigation ("VTT"). */
  name: string
  /** Intitulé complet pour les H1 et titles ("VTT d'occasion"). */
  h1: string
  tagline: string
  /** Intro indexable de la page univers (2-3 phrases). */
  intro: string
  metaDescription: string
  kind: IllustrationKind
  /** Couleur de repérage de l'univers (pastilles, vignettes). */
  hue: string
  faq: { q: string, a: string }[]
}

export type SellerType = 'particulier' | 'boutique' | 'loueur'

export interface Seller {
  slug: string
  name: string
  type: SellerType
  city: string
  region: string
  since: number
  bio: string
  /** Contrôle technique + garantie proposés (pros uniquement). */
  checked?: boolean
  warrantyMonths?: number
}

export type Condition = 'comme-neuf' | 'tres-bon-etat' | 'bon-etat' | 'a-reviser'

export interface Bike {
  slug: string
  title: string
  brand: string
  model: string
  year: number
  universe: string
  price: number
  /** Prix neuf constaté, pour afficher la décote. */
  originalPrice?: number
  size: string
  condition: Condition
  km?: number
  sellerSlug: string
  city: string
  dept: string
  /** Couleur réelle du vélo — pilote l'illustration SVG. */
  color: string
  highlights: string[]
  description: string
  groupset?: string
  weightKg?: number
  batteryWh?: number
  postedDaysAgo: number
  /** Fait partie d'un lot de déstockage fin de saison. */
  lot?: boolean
}
