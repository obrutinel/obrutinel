<script setup lang="ts">
import { bikesByUniverse, conditionLabels, getBike } from '~/data/bikes'
import { getSeller, sellerTypeLabels } from '~/data/sellers'
import { getUniverse, universeKind } from '~/data/universes'
import { absoluteUrl, formatPrice } from '~/utils/site'

const route = useRoute()
const bike = getBike(route.params.slug as string)

if (!bike) {
  throw createError({ statusCode: 404, statusMessage: 'Annonce introuvable', fatal: true })
}

const universe = getUniverse(bike.universe)!
const seller = getSeller(bike.sellerSlug)!
const similar = bikesByUniverse(bike.universe).filter(b => b.slug !== bike.slug).slice(0, 3)

usePageSeo({
  title: `${bike.title} ${bike.year} — ${formatPrice(bike.price)} (${bike.city})`,
  description: `${bike.title} ${bike.year}, taille ${bike.size}, ${conditionLabels[bike.condition].toLowerCase()}, à ${bike.city} (${bike.dept}). ${bike.highlights[0]}. Vendu par ${sellerTypeLabels[seller.type].toLowerCase()}${seller.checked ? ', contrôlé et garanti' : ''}.`,
  ogType: 'product',
})

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': `${bike.title} ${bike.year}`,
  'brand': { '@type': 'Brand', 'name': bike.brand },
  'model': bike.model,
  'description': bike.description,
  'category': universe.h1,
  'url': absoluteUrl(`/annonce/${bike.slug}`),
  'offers': {
    '@type': 'Offer',
    'price': bike.price,
    'priceCurrency': 'EUR',
    'availability': 'https://schema.org/InStock',
    'itemCondition': 'https://schema.org/UsedCondition',
    'seller': {
      '@type': seller.type === 'particulier' ? 'Person' : 'Organization',
      'name': seller.name,
    },
  },
})

const specs = computed(() => {
  const rows: [string, string][] = [
    ['Marque', bike.brand],
    ['Modèle', bike.model],
    ['Année', String(bike.year)],
    ['Taille', bike.size],
    ['État', conditionLabels[bike.condition]],
  ]
  if (bike.km)
    rows.push(['Kilométrage', `${bike.km.toLocaleString('fr-FR')} km`])
  if (bike.groupset)
    rows.push(['Transmission', bike.groupset])
  if (bike.batteryWh)
    rows.push(['Batterie', `${bike.batteryWh} Wh`])
  if (bike.weightKg)
    rows.push(['Poids', `${bike.weightKg.toLocaleString('fr-FR')} kg`])
  rows.push(['Localisation', `${bike.city} (${bike.dept})`])
  return rows
})
</script>

<template>
  <div v-if="bike" class="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: universe.h1, to: `/velos/${universe.slug}` }, { label: bike.title }]" />

    <div class="mt-6 grid gap-8 lg:grid-cols-[7fr_5fr]">
      <div>
        <figure class="relative overflow-hidden rounded-md border border-line" :style="{ backgroundColor: `color-mix(in srgb, ${bike.color} 10%, var(--color-card))` }">
          <span v-if="bike.lot" class="roadsign-label absolute left-0 top-5 rounded-r-sm bg-cartouche px-3 py-1.5 text-xs text-card">
            Lot fin de saison
          </span>
          <div class="mx-auto aspect-8/5 max-w-xl p-6">
            <BikeIllustration :kind="universeKind(bike.universe)" :color="bike.color" :label="`Silhouette du ${bike.title}`" />
          </div>
          <figcaption class="border-t border-line/60 px-4 py-2 text-xs text-ink-soft">
            Illustration d'après la teinte du vélo — photos fournies par le vendeur sur demande (démo).
          </figcaption>
        </figure>

        <section class="mt-8" aria-labelledby="description-title">
          <h2 id="description-title" class="font-display text-2xl font-bold uppercase">Ce qu'en dit le vendeur</h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="h in bike.highlights" :key="h" class="rounded-sm bg-borne/40 px-2.5 py-1 text-sm font-medium">
              {{ h }}
            </li>
          </ul>
          <p class="mt-4 max-w-[65ch] leading-relaxed text-ink-soft">{{ bike.description }}</p>
        </section>

        <section class="mt-8" aria-labelledby="specs-title">
          <h2 id="specs-title" class="font-display text-2xl font-bold uppercase">Fiche technique</h2>
          <table class="mt-4 w-full border-collapse text-sm">
            <tbody>
              <tr v-for="[label, value] in specs" :key="label" class="border-b border-line">
                <th scope="row" class="w-40 py-2.5 pr-4 text-left font-medium text-ink-soft">{{ label }}</th>
                <td class="tnum py-2.5">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <aside>
        <div class="lg:sticky lg:top-24">
          <div class="rounded-md border border-line bg-card p-6">
            <h1 class="text-balance font-display text-3xl font-bold uppercase leading-tight">
              {{ bike.title }}
            </h1>
            <p class="tnum mt-1 text-sm text-ink-soft">
              {{ bike.year }} · {{ bike.size }} · publiée il y a {{ bike.postedDaysAgo }} j
            </p>
            <div class="mt-5">
              <PriceTag :price="bike.price" :original-price="bike.originalPrice" size="lg" />
            </div>

            <button type="button" class="pressable roadsign-label mt-6 w-full rounded-sm bg-ink px-5 py-3.5 text-sm text-borne">
              Contacter {{ seller.type === 'particulier' ? 'le vendeur' : seller.name }}
            </button>
            <p class="mt-2 text-center text-xs text-ink-soft">
              Démo : la messagerie arrive avec la version complète.
            </p>

            <div v-if="seller.checked" class="mt-5 flex items-start gap-3 rounded-sm bg-borne/30 p-3.5 text-sm">
              <svg class="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" stroke="#17140e" stroke-width="1.6" />
                <path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="#17140e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p>
                Vélo <strong>contrôlé en atelier</strong> et garanti
                <strong>{{ seller.warrantyMonths }} mois</strong> par {{ seller.name }}.
              </p>
            </div>
          </div>

          <div class="mt-4 rounded-md border border-line bg-card p-6">
            <div class="flex items-center justify-between gap-3">
              <h2 class="font-display text-xl font-semibold uppercase">Le vendeur</h2>
              <SellerBadge :type="seller.type" />
            </div>
            <p class="mt-2 font-medium">
              <NuxtLink :to="`/vendeur/${seller.slug}`" class="hover:text-cartouche">{{ seller.name }}</NuxtLink>
            </p>
            <p class="tnum text-sm text-ink-soft">{{ seller.city }} ({{ seller.region }}) · sur Biclette depuis {{ seller.since }}</p>
            <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{{ seller.bio }}</p>
            <NuxtLink :to="`/vendeur/${seller.slug}`" class="mt-3 inline-block text-sm font-medium no-underline hover:underline">
              Voir ses annonces →
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <section v-if="similar.length" class="mt-14" aria-labelledby="similaires-title">
      <h2 id="similaires-title" class="font-display text-3xl font-bold uppercase">Dans le même univers</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BikeCard v-for="b in similar" :key="b.slug" :bike="b" />
      </div>
      <NuxtLink :to="`/velos/${universe.slug}`" class="mt-6 inline-block text-sm font-medium no-underline hover:underline">
        Toutes les annonces {{ universe.name }} →
      </NuxtLink>
    </section>
  </div>
</template>
