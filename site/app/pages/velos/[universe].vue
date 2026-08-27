<script setup lang="ts">
import type { SellerType } from '~/data/types'
import { bikesByUniverse } from '~/data/bikes'
import { getSeller } from '~/data/sellers'
import { getUniverse, universes } from '~/data/universes'
import { absoluteUrl } from '~/utils/site'

const route = useRoute()
const universe = getUniverse(route.params.universe as string)

if (!universe) {
  throw createError({ statusCode: 404, statusMessage: 'Univers introuvable', fatal: true })
}

const all = bikesByUniverse(universe.slug)

usePageSeo({
  title: `${universe.h1} — annonces vérifiées`,
  description: universe.metaDescription,
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': universe.h1,
  'numberOfItems': all.length,
  'itemListElement': all.map((b, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'name': b.title,
    'url': absoluteUrl(`/annonce/${b.slug}`),
  })),
})

// Filtres client : le HTML pré-rendu liste toutes les annonces de l'univers.
const maxPrice = ref('')
const sellerType = ref<'' | SellerType>('')
const sort = ref<'recent' | 'prix-asc' | 'prix-desc'>('recent')

const filtered = computed(() => {
  let list = all.filter((b) => {
    if (maxPrice.value && b.price > Number(maxPrice.value))
      return false
    if (sellerType.value && getSeller(b.sellerSlug)?.type !== sellerType.value)
      return false
    return true
  })
  if (sort.value === 'prix-asc')
    list = [...list].sort((a, b) => a.price - b.price)
  else if (sort.value === 'prix-desc')
    list = [...list].sort((a, b) => b.price - a.price)
  else
    list = [...list].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  return list
})

const others = universes.filter(u => u.slug !== universe.slug).slice(0, 6)
</script>

<template>
  <div v-if="universe">
    <section class="border-b border-line bg-card">
      <div class="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6">
        <Breadcrumbs :items="[{ label: universe.h1 }]" />
        <div class="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <h1 class="text-balance font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
              {{ universe.h1 }}
            </h1>
            <p class="mt-4 max-w-[65ch] leading-relaxed text-ink-soft">
              {{ universe.intro }}
            </p>
          </div>
          <div class="hidden h-24 w-40 md:block" aria-hidden="true">
            <BikeIllustration :kind="universe.kind" color="#17140e" />
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-label="Annonces">
      <form class="flex flex-wrap items-end gap-4 rounded-md border border-line bg-card p-4" @submit.prevent>
        <div class="flex flex-col gap-1">
          <label for="filtre-prix" class="roadsign-label text-xs text-ink-soft">Budget max</label>
          <select id="filtre-prix" v-model="maxPrice" class="rounded-sm border border-line bg-paper px-3 py-2 text-sm">
            <option value="">Tous les prix</option>
            <option value="500">500 €</option>
            <option value="1000">1 000 €</option>
            <option value="2000">2 000 €</option>
            <option value="3000">3 000 €</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="filtre-vendeur" class="roadsign-label text-xs text-ink-soft">Vendeur</label>
          <select id="filtre-vendeur" v-model="sellerType" class="rounded-sm border border-line bg-paper px-3 py-2 text-sm">
            <option value="">Tous</option>
            <option value="particulier">Particuliers</option>
            <option value="boutique">Boutiques</option>
            <option value="loueur">Loueurs pros</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="filtre-tri" class="roadsign-label text-xs text-ink-soft">Trier par</label>
          <select id="filtre-tri" v-model="sort" class="rounded-sm border border-line bg-paper px-3 py-2 text-sm">
            <option value="recent">Plus récentes</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </div>
        <p class="tnum ml-auto pb-2 text-sm text-ink-soft" role="status">
          {{ filtered.length }} annonce{{ filtered.length > 1 ? 's' : '' }}
        </p>
      </form>

      <div v-if="filtered.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BikeCard v-for="b in filtered" :key="b.slug" :bike="b" />
      </div>

      <div v-else class="mt-6 rounded-md border border-dashed border-line bg-card px-6 py-14 text-center">
        <p class="font-display text-2xl font-semibold uppercase">Aucune annonce sur ce tronçon</p>
        <p class="mx-auto mt-2 max-w-[48ch] text-ink-soft">
          Élargissez le budget ou le type de vendeur — ou jetez un œil aux univers voisins ci-dessous.
        </p>
        <button type="button" class="pressable roadsign-label mt-6 rounded-sm bg-ink px-5 py-2.5 text-sm text-borne" @click="maxPrice = ''; sellerType = ''">
          Réinitialiser les filtres
        </button>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <FaqSection :items="universe.faq" :title="`${universe.name} d'occasion : bien acheter`" />
    </section>

    <section class="mx-auto max-w-6xl px-4 pb-14 sm:px-6" aria-label="Autres univers">
      <h2 class="roadsign-label text-sm text-ink-soft">Continuer la route</h2>
      <ul class="mt-4 flex flex-wrap gap-2.5">
        <li v-for="u in others" :key="u.slug">
          <NuxtLink :to="`/velos/${u.slug}`" class="roadsign-label inline-block rounded-sm border border-line bg-card px-3.5 py-2 text-xs no-underline transition-colors duration-150 hover:border-ink">
            {{ u.h1 }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
