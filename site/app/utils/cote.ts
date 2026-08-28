import type { Bike } from '~/data/types'
import { getSeller } from '~/data/sellers'
import { getUniverse } from '~/data/universes'

/*
  Cote « bonne affaire » — heuristique phase 1 de la roadmap.
  Calculable uniquement quand le prix neuf est connu : sinon on n'affiche
  rien (jamais de jauge estimée qui fait semblant).
  prix théorique = prix neuf × décote(âge, univers) × état × kilométrage,
  bonus garantie pro. La fourchette de marché encadre ce prix théorique.
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

export function computeCote(bike: Bike): Cote | null {
  if (!bike.originalPrice || !getUniverse(bike.universe))
    return null

  const [firstYear, perYear] = decay[bike.universe] ?? [0.7, 0.9]
  const age = Math.max(1, new Date().getFullYear() - bike.year)
  let theoretical = bike.originalPrice * firstYear * perYear ** (age - 1)

  theoretical *= conditionFactor[bike.condition]

  const kmRef = expectedKmPerYear[bike.universe]
  if (bike.km && kmRef) {
    const ratio = bike.km / (kmRef * age)
    theoretical *= Math.min(1.08, Math.max(0.9, 1 - (ratio - 1) * 0.1))
  }

  if (getSeller(bike.sellerSlug)?.checked)
    theoretical *= 1.06

  theoretical = Math.round(theoretical / 10) * 10
  const min = Math.round(theoretical * 0.82 / 10) * 10
  const max = Math.round(theoretical * 1.15 / 10) * 10

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
