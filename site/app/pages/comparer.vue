<script setup lang="ts">
import type { Bike } from '~/data/types'
import { conditionLabels } from '~/data/bikes'
import { getSeller, sellerTypeLabels } from '~/data/sellers'
import { getUniverse, universeKind } from '~/data/universes'
import { computeCote } from '~/utils/cote'
import { discountPct, formatPrice } from '~/utils/site'

// Page outil, alimentée par la sélection en session : pas d'indexation.
usePageSeo({
  title: 'Comparer des annonces',
  description: 'Comparez côte à côte jusqu\'à 4 vélos d\'occasion du même univers : prix, cote, kilométrage, état, garantie.',
})
useSeoMeta({ robots: 'noindex' })

const { bikes, toggle, clear } = useCompare()
const universe = computed(() => bikes.value[0] ? getUniverse(bikes.value[0].universe) : null)

const conditionRank: Record<Bike['condition'], number> = {
  'comme-neuf': 3,
  'tres-bon-etat': 2,
  'bon-etat': 1,
  'a-reviser': 0,
}

interface Cell { text: string, best: boolean }
interface Row { label: string, cells: Cell[] }

function markBest(values: (number | null)[], texts: string[], pick: 'min' | 'max'): Cell[] {
  const usable = values.filter(v => v != null)
  // Une « meilleure valeur » n'a de sens que si elle départage vraiment.
  const target = usable.length >= 2 && new Set(usable).size > 1
    ? (pick === 'min' ? Math.min(...usable) : Math.max(...usable))
    : null
  return texts.map((text, i) => ({ text, best: target != null && values[i] === target }))
}

const rows = computed<Row[]>(() => {
  const b = bikes.value
  const out: Row[] = [
    { label: 'Prix', cells: markBest(b.map(x => x.price), b.map(x => formatPrice(x.price)), 'min') },
    {
      label: 'Décote vs neuf',
      cells: markBest(
        b.map(x => discountPct(x.price, x.originalPrice)),
        b.map(x => discountPct(x.price, x.originalPrice) != null ? `−${discountPct(x.price, x.originalPrice)} %` : '—'),
        'max',
      ),
    },
    { label: 'Année', cells: markBest(b.map(x => x.year), b.map(x => String(x.year)), 'max') },
    {
      label: 'Kilométrage',
      cells: markBest(b.map(x => x.km ?? null), b.map(x => x.km ? `${x.km.toLocaleString('fr-FR')} km` : '—'), 'min'),
    },
    {
      label: 'État',
      cells: markBest(b.map(x => conditionRank[x.condition]), b.map(x => conditionLabels[x.condition]), 'max'),
    },
    { label: 'Taille', cells: b.map(x => ({ text: x.size, best: false })) },
    { label: 'Transmission', cells: b.map(x => ({ text: x.groupset ?? '—', best: false })) },
  ]

  if (b.some(x => x.batteryWh)) {
    out.push({
      label: 'Batterie',
      cells: markBest(b.map(x => x.batteryWh ?? null), b.map(x => x.batteryWh ? `${x.batteryWh} Wh` : '—'), 'max'),
    })
  }

  out.push({
    label: 'Garantie',
    cells: markBest(
      b.map(x => getSeller(x.sellerSlug)?.warrantyMonths ?? 0),
      b.map((x) => {
        const m = getSeller(x.sellerSlug)?.warrantyMonths
        return m ? `${m} mois` : '—'
      }),
      'max',
    ),
  })

  out.push({
    label: 'Vendeur',
    cells: b.map((x) => {
      const s = getSeller(x.sellerSlug)
      return { text: s ? `${sellerTypeLabels[s.type]} · ${x.city}` : x.city, best: false }
    }),
  })

  return out
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'Comparer' }]" />

    <header class="mt-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="headline text-4xl sm:text-5xl">
          Comparer<template v-if="universe"> — {{ universe.name }}</template>
        </h1>
        <p class="mt-3 max-w-[60ch] leading-relaxed text-ink-soft">
          Jusqu'à 4 annonces du même univers, côte à côte. La meilleure valeur de
          chaque ligne est surlignée.
        </p>
      </div>
      <button v-if="bikes.length" type="button" class="text-sm font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline" @click="clear">
        Vider la sélection
      </button>
    </header>

    <!-- État vide -->
    <div v-if="bikes.length < 2" class="mt-10 rounded-2xl border border-dashed border-line bg-card px-6 py-14 text-center">
      <p class="headline text-2xl">
        {{ bikes.length === 0 ? 'Aucune annonce sélectionnée' : 'Encore une annonce à choisir' }}
      </p>
      <p class="mx-auto mt-2 max-w-[52ch] text-ink-soft">
        Cochez « Comparer » sur au moins deux annonces d'un même univers,
        puis revenez ici.
      </p>
      <NuxtLink to="/#univers" class="pressable mt-6 inline-block rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-pine-deep">
        Parcourir les univers
      </NuxtLink>
    </div>

    <!-- Tableau comparatif -->
    <div v-else class="mt-8 overflow-x-auto rounded-2xl border border-line bg-card">
      <table class="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <td class="w-36 border-b border-line p-4" />
            <th v-for="b in bikes" :key="b.slug" scope="col" class="border-b border-line p-4 text-left align-bottom">
              <div class="aspect-16/10 w-full max-w-52 rounded-xl px-2 pt-2" :style="{ backgroundColor: `color-mix(in srgb, ${b.color} 6%, #f4f6f2)` }">
                <BikeIllustration :kind="universeKind(b.universe)" :color="b.color" />
              </div>
              <p class="mt-2 font-semibold leading-snug">
                <NuxtLink :to="`/annonce/${b.slug}`" class="no-underline hover:text-pine">{{ b.title }}</NuxtLink>
              </p>
              <div class="mt-1.5">
                <CoteGauge :bike="b" variant="compact" />
              </div>
              <button type="button" class="mt-2 text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline" @click="toggle(b.slug)">
                Retirer
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label" class="border-b border-line last:border-0">
            <th scope="row" class="roadsign-label p-4 text-left align-top text-xs text-ink-soft">
              {{ row.label }}
            </th>
            <td
              v-for="(cell, i) in row.cells"
              :key="i"
              class="tnum p-4 align-top"
              :class="cell.best ? 'bg-pine/10 font-semibold text-pine-deep' : ''"
            >
              {{ cell.text }}<span v-if="cell.best" class="ml-1.5" aria-label="meilleure valeur">✓</span>
            </td>
          </tr>
          <tr>
            <th scope="row" class="roadsign-label p-4 text-left align-top text-xs text-ink-soft">Cote</th>
            <td v-for="b in bikes" :key="b.slug" class="p-4 align-top">
              <CoteGauge :bike="b" />
              <p v-if="!computeCote(b)" class="text-xs text-ink-soft">Non calculable (prix neuf inconnu)</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="bikes.length >= 2" class="mt-4 text-xs text-ink-soft">
      Démo : comparaison calculée à partir des annonces fictives du prototype.
    </p>
  </div>
</template>
