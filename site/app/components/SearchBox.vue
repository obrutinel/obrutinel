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
    <div
      class="flex items-center gap-3 rounded-full border border-line bg-card py-2 pl-5 pr-2 shadow-(--shadow-lift) transition-shadow duration-200 focus-within:border-pine/50 focus-within:shadow-(--shadow-lift-lg)"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" class="shrink-0 text-ink-soft" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" />
        <path d="M12.2 12.2 16 16" />
      </svg>
      <input
        id="recherche"
        v-model="query"
        type="search"
        placeholder="Marque, modèle ou ville…"
        class="w-full bg-transparent py-1.5 text-base outline-none placeholder:text-ink-soft/60"
        autocomplete="off"
        @focus="focused = true"
        @blur="focused = false"
      >
      <span class="pressable hidden shrink-0 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white sm:block" aria-hidden="true">
        Rechercher
      </span>
    </div>

    <ul
      v-if="results.length && (focused || query)"
      class="absolute inset-x-2 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-lift-lg)"
    >
      <li v-for="b in results" :key="b.slug" class="border-b border-line last:border-0">
        <NuxtLink :to="`/annonce/${b.slug}`" class="flex items-baseline justify-between gap-4 px-5 py-3 no-underline transition-colors duration-150 hover:bg-paper">
          <span class="min-w-0 truncate font-medium">{{ b.title }}</span>
          <span class="tnum shrink-0 text-sm text-ink-soft">{{ formatPrice(b.price) }} · {{ b.city }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
