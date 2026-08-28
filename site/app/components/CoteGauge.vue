<script setup lang="ts">
import type { Bike } from '~/data/types'
import { computeCote } from '~/utils/cote'
import { formatPrice } from '~/utils/site'

// Jauge de cote : n'affiche rien quand la cote n'est pas calculable.
const props = withDefaults(defineProps<{
  bike: Bike
  /** compact : pastille seule (cartes, comparateur). */
  variant?: 'full' | 'compact'
}>(), { variant: 'full' })

const cote = computed(() => computeCote(props.bike))

const toneClasses = {
  pine: 'bg-pine text-white',
  neutral: 'bg-paper border border-line text-ink-soft',
  amber: 'bg-amber text-white',
}
</script>

<template>
  <span
    v-if="cote && variant === 'compact'"
    class="roadsign-label inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] leading-none"
    :class="toneClasses[cote.tone]"
  >
    {{ cote.label }}
  </span>

  <div v-else-if="cote" class="rounded-xl border border-line bg-paper p-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="roadsign-label text-xs text-ink-soft">Cote Biclette</p>
      <span class="roadsign-label rounded-full px-2.5 py-1 text-[10.5px] leading-none" :class="toneClasses[cote.tone]">
        {{ cote.label }}
      </span>
    </div>

    <!-- Fourchette du marché, curseur = prix demandé -->
    <div class="relative mt-4 h-2 rounded-full" style="background: linear-gradient(90deg, #1e4d38 0%, #6f9683 32%, #dde1d8 50%, #e2c194 72%, #c9701f 100%)">
      <div
        class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-card shadow-(--shadow-lift)"
        :style="{ left: `${8 + cote.position * 84}%` }"
        aria-hidden="true"
      />
    </div>
    <div class="tnum mt-2 flex justify-between text-xs text-ink-soft">
      <span>{{ formatPrice(cote.min) }}</span>
      <span class="font-semibold text-ink">cote : {{ formatPrice(cote.theoretical) }}</span>
      <span>{{ formatPrice(cote.max) }}</span>
    </div>

    <details class="group mt-3">
      <summary class="cursor-pointer list-none text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline [&::-webkit-details-marker]:hidden">
        Comment est calculée cette cote ?
      </summary>
      <p class="mt-2 max-w-[58ch] text-xs leading-relaxed text-ink-soft">
        À partir du prix neuf constaté, nous appliquons la décote type de l'univers
        selon l'âge, corrigée par l'état, le kilométrage et la garantie
        professionnelle. La fourchette représente les prix observés sur le marché.
        <em>Démo : estimation indicative — la vraie cote s'appuiera sur les ventes réelles.</em>
      </p>
    </details>
  </div>
</template>
