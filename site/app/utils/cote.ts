import type { Bike } from '~/data/types'
import { getSeller } from '~/data/sellers'
import { getUniverse } from '~/data/universes'

/*
  Cote « bonne affaire » & prix conseillé — heuristique phase 1 de la roadmap.
  Calculable uniquement quand le prix neuf est connu : sinon on n'affiche
  rien (jamais de jauge ni de prix « estimés » qui font semblant).
  prix théorique = prix neuf × décote(âge, univers) × état × kilométrage
  × saison, bonus garantie pro. La fourchette de marché encadre ce prix.
  Le même moteur sert la jauge des annonces et le prix conseillé au dépôt,
  pour qu'un vendeur qui suit le conseil ne soit jamais affiché
  « au-dessus du marché » sur sa propre annonce.
*/

export type CoteTone = 'pine' | 'neutral' | 'amber'

export interface Cote {
  theoretical: number
  min: number
  max: number
  /** Écart du prix demandé vs prix théorique (−0.15 = 15 % sous la cote). */
  deviation: number
  /** Position du prix demandé sur la fourchette, 0 → 1 (clampée). */
  position: number
  label: 'Très bonne affaire' | 'Bonne affaire' | 'Prix du marché' | 'Au-dessus du marché'
  tone: CoteTone
}

/** [décote 1re année, décote annuelle ensuite] par famille d'univers. */
const decay: Record<string, [number, number]> = {
  'velo-route': [0.70, 0.90],
  'gravel': [0.70, 0.90],
  'triathlon': [0.66, 0.88],
  'vtt': [0.68, 0.90],
  'vae': [0.62, 0.85],
  'velo-cargo': [0.64, 0.86],
  'velo-ville': [0.75, 0.92],
  'fixie': [0.75, 0.92],
  'bmx': [0.72, 0.91],
  'velo-enfant': [0.72, 0.93],
  'pieces-equipement': [0.65, 0.88],
}

const conditionFactor: Record<Bike['condition'], number> = {
  'comme-neuf': 1.08,
  'tres-bon-etat': 1,
  'bon-etat': 0.9,
  'a-reviser': 0.75,
}

/** Kilométrage annuel médian par univers, pour situer l'usure. */
const expectedKmPerYear: Record<string, number> = {
  'velo-route': 4000,
  'gravel': 3000,
  'triathlon': 3000,
  'vtt': 2500,
  'vae': 3000,
  'velo-cargo': 3000,
  'velo-ville': 2000,
}

/** Mois (0-11) de haute et basse saison de vente par famille d'univers. */
const seasons: Record<string, { high: number[], low: number[] }> = {
  sport: { high: [2, 3, 4, 5], low: [9, 10, 11] }, // printemps / fin d'automne
  urbain: { high: [7, 8, 9], low: [11, 0] }, // rentrée / plein hiver
  enfant: { high: [8, 10, 11], low: [0, 1] }, // rentrée + Noël / cœur d'hiver
}

const seasonFamily: Record<string, keyof typeof seasons> = {
  'velo-route': 'sport',
  'gravel': 'sport',
  'triathlon': 'sport',
  'vtt': 'sport',
  'bmx': 'sport',
  'vae': 'urbain',
  'velo-ville': 'urbain',
  'velo-cargo': 'urbain',
  'fixie': 'urbain',
  'velo-enfant': 'enfant',
}

export type Season = 'haute' | 'basse' | null

export function seasonOf(universe: string, month = new Date().getMonth()): Season {
  const s = seasons[seasonFamily[universe] ?? '']
  if (!s)
    return null
  return s.high.includes(month) ? 'haute' : s.low.includes(month) ? 'basse' : null
}

function seasonFactor(universe: string, month?: number): number {
  const season = seasonOf(universe, month)
  return season === 'haute' ? 1.05 : season === 'basse' ? 0.95 : 1
}

export interface CoteParams {
  universe: string
  year: number
  condition: Bike['condition']
  originalPrice: number
  km?: number
  warrantyChecked?: boolean
  /** Mois 0-11 (défaut : mois courant) — la saison pèse ±5 %. */
  month?: number
}

const round10 = (n: number) => Math.round(n / 10) * 10

/** Prix théorique (arrondi à 10 €) — cœur commun de la cote et du conseil. */
export function computeTheoretical(p: CoteParams): number | null {
  if (!p.originalPrice || !getUniverse(p.universe) || !conditionFactor[p.condition])
    return null

  const [firstYear, perYear] = decay[p.universe] ?? [0.7, 0.9]
  const age = Math.max(1, new Date().getFullYear() - p.year)
  let theoretical = p.originalPrice * firstYear * perYear ** (age - 1)

  theoretical *= conditionFactor[p.condition]

  const kmRef = expectedKmPerYear[p.universe]
  if (p.km && kmRef) {
    const ratio = p.km / (kmRef * age)
    theoretical *= Math.min(1.08, Math.max(0.9, 1 - (ratio - 1) * 0.1))
  }

  theoretical *= seasonFactor(p.universe, p.month)

  if (p.warrantyChecked)
    theoretical *= 1.06

  return round10(theoretical)
}

export function computeCote(bike: Bike): Cote | null {
  const theoretical = computeTheoretical({
    universe: bike.universe,
    year: bike.year,
    condition: bike.condition,
    originalPrice: bike.originalPrice ?? 0,
    km: bike.km,
    warrantyChecked: getSeller(bike.sellerSlug)?.checked,
  })
  if (!theoretical)
    return null

  const min = round10(theoretical * 0.82)
  const max = round10(theoretical * 1.15)

  const deviation = bike.price / theoretical - 1
  const position = Math.min(1, Math.max(0, (bike.price - min) / (max - min)))

  const [label, tone]: [Cote['label'], CoteTone]
    = deviation <= -0.12
      ? ['Très bonne affaire', 'pine']
      : deviation <= -0.03
        ? ['Bonne affaire', 'pine']
        : deviation <= 0.08
          ? ['Prix du marché', 'neutral']
          : ['Au-dessus du marché', 'amber']

  return { theoretical, min, max, deviation, position, label, tone }
}

/* ---- Prix de vente conseillé (dépôt d'annonce) ---- */

/** Petits plus déclarés au dépôt — chacun ajuste le prix conseillé. */
export interface PriceExtras {
  /** Chaîne, pneus, plaquettes récents. */
  drivetrain?: boolean
  /** Facture d'achat disponible. */
  invoice?: boolean
  /** Carnet ou factures d'entretien. */
  maintenance?: boolean
  /** VAE : batterie récente ou < 300 cycles. */
  battery?: boolean
}

const extrasBonus: Record<keyof PriceExtras, number> = {
  drivetrain: 0.03,
  invoice: 0.02,
  maintenance: 0.03,
  battery: 0.04,
}

export interface PriceAdvice {
  theoretical: number
  /** Bas de fourchette — part en ~1 semaine (zone « bonne affaire »). */
  quick: number
  /** Haut de fourchette — comptez 3-4 semaines (haut du prix du marché). */
  patient: number
  min: number
  max: number
  season: Season
}

/**
 * Prix conseillé au dépôt. `null` tant que les entrées ne permettent pas un
 * calcul honnête : univers/année/état manquants ou prix neuf implausible.
 */
export function suggestPrice(p: CoteParams, extras: PriceExtras = {}): PriceAdvice | null {
  const currentYear = new Date().getFullYear()
  if (p.originalPrice < 200 || p.originalPrice > 20000)
    return null
  if (!p.year || p.year < 1970 || p.year > currentYear + 1)
    return null

  let theoretical = computeTheoretical(p)
  if (!theoretical)
    return null

  for (const key of Object.keys(extrasBonus) as (keyof PriceExtras)[]) {
    if (extras[key])
      theoretical *= 1 + extrasBonus[key]
  }
  theoretical = round10(theoretical)

  return {
    theoretical,
    quick: round10(theoretical * 0.93),
    patient: round10(theoretical * 1.08),
    min: round10(theoretical * 0.82),
    max: round10(theoretical * 1.15),
    season: seasonOf(p.universe, p.month),
  }
}
