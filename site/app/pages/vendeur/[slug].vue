<script setup lang="ts">
import { bikesBySeller } from '~/data/bikes'
import { getSeller, sellerTypeLabels } from '~/data/sellers'
import { absoluteUrl } from '~/utils/site'

const route = useRoute()
const seller = getSeller(route.params.slug as string)

if (!seller) {
  throw createError({ statusCode: 404, statusMessage: 'Vendeur introuvable', fatal: true })
}

const listings = bikesBySeller(seller.slug)

usePageSeo({
  title: `${seller.name} — ${sellerTypeLabels[seller.type]} à ${seller.city}`,
  description: `${seller.name}, ${sellerTypeLabels[seller.type].toLowerCase()} à ${seller.city} (${seller.region}) : ${listings.length} vélo${listings.length > 1 ? 's' : ''} d'occasion en vente sur Biclette.${seller.checked ? ' Vélos contrôlés en atelier et garantis.' : ''}`,
})

if (seller.type !== 'particulier') {
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': seller.name,
    'description': seller.bio,
    'url': absoluteUrl(`/vendeur/${seller.slug}`),
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': seller.city,
      'addressRegion': seller.region,
      'addressCountry': 'FR',
    },
  })
}
</script>

<template>
  <div v-if="seller" class="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'Vendeurs' }, { label: seller.name }]" />

    <header class="mt-6 max-w-3xl">
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="headline text-4xl sm:text-5xl">{{ seller.name }}</h1>
        <SellerBadge :type="seller.type" />
      </div>
      <p class="tnum mt-3 text-sm text-ink-soft">
        {{ seller.city }} ({{ seller.region }}) · sur Biclette depuis {{ seller.since }}
      </p>
      <p class="mt-4 max-w-[65ch] leading-relaxed text-ink-soft">{{ seller.bio }}</p>
      <p v-if="seller.checked" class="mt-4 inline-flex items-center gap-2 rounded-xl bg-pine/10 px-3 py-2 text-sm font-medium">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="8" stroke="#1e4d38" stroke-width="1.6" />
          <path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="#1e4d38" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Vélos contrôlés en atelier — garantie {{ seller.warrantyMonths }} mois
      </p>
    </header>

    <section class="mt-10" aria-labelledby="annonces-title">
      <h2 id="annonces-title" class="headline text-2xl">
        {{ listings.length }} annonce{{ listings.length > 1 ? 's' : '' }} en ligne
      </h2>
      <div v-if="listings.length" class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BikeCard v-for="b in listings" :key="b.slug" :bike="b" />
      </div>
      <p v-else class="mt-5 rounded-2xl border border-dashed border-line bg-card px-6 py-10 text-center text-ink-soft">
        Aucune annonce en ligne pour le moment.
      </p>
    </section>
  </div>
</template>
