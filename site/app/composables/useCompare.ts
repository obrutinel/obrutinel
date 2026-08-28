import { getBike } from '~/data/bikes'

/*
  Sélection du comparateur : 2 à 4 annonces du même univers, persistée en
  session. Sélectionner un vélo d'un autre univers repart sur une nouvelle
  sélection (comparer un VTT à un cargo n'aide personne).
*/
const STORAGE_KEY = 'biclette-compare'
export const COMPARE_MAX = 4

export function useCompare() {
  const slugs = useState<string[]>('compare', () => [])

  if (import.meta.client && !slugs.value.length) {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved)
        slugs.value = (JSON.parse(saved) as string[]).filter(s => getBike(s))
    }
    catch {}
  }

  function persist() {
    if (import.meta.client) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slugs.value))
      }
      catch {}
    }
  }

  function toggle(slug: string) {
    const bike = getBike(slug)
    if (!bike)
      return
    if (slugs.value.includes(slug)) {
      slugs.value = slugs.value.filter(s => s !== slug)
    }
    else {
      const current = slugs.value[0] ? getBike(slugs.value[0]) : null
      if (current && current.universe !== bike.universe)
        slugs.value = [slug]
      else if (slugs.value.length < COMPARE_MAX)
        slugs.value = [...slugs.value, slug]
    }
    persist()
  }

  function clear() {
    slugs.value = []
    persist()
  }

  const bikes = computed(() => slugs.value.map(getBike).filter(b => b != null))
  const isSelected = (slug: string) => slugs.value.includes(slug)

  return { slugs, bikes, toggle, clear, isSelected }
}
