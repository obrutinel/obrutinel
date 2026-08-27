<script setup lang="ts">
import { bikes } from '~/data/bikes'
import { formatPrice } from '~/utils/site'

const query = ref('')
const focused = ref(false)

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (q.length < 2)
    return []
  return bikes
    .filter(b => [b.title, b.brand, b.model, b.city].join(' ').toLowerCase().includes(q))
    .slice(0, 6)
})
</script>

<template>
  <div class="relative">
    <label for="recherche" class="sr-only">Rechercher un vélo, une marque ou une ville</label>
    <div class="flex overflow-hidden rounded-sm border-2 border-ink bg-card focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
      <input
        id="recherche"
        v-model="query"
        type="search"
        placeholder="Marque, modèle ou ville — ex. « Canyon », « Lyon »…"
        class="w-full bg-transparent px-4 py-3.5 text-base outline-none placeholder:text-ink-soft/70"
        autocomplete="off"
        @focus="focused = true"
        @blur="focused = false"
      >
      <span class="roadsign-label hidden items-center bg-ink px-5 text-sm text-borne sm:flex" aria-hidden="true">
        Rechercher
      </span>
    </div>

    <ul
      v-if="results.length && (focused || query)"
      class="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-sm border border-line bg-card shadow-[0_16px_40px_-16px_rgba(23,20,14,0.4)]"
    >
      <li v-for="b in results" :key="b.slug" class="border-b border-line last:border-0">
        <NuxtLink :to="`/annonce/${b.slug}`" class="flex items-baseline justify-between gap-4 px-4 py-3 no-underline transition-colors duration-150 hover:bg-borne/25">
          <span class="min-w-0 truncate font-medium">{{ b.title }}</span>
          <span class="tnum shrink-0 text-sm text-ink-soft">{{ formatPrice(b.price) }} · {{ b.city }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
