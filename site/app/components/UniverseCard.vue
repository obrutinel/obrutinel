<script setup lang="ts">
import type { Universe } from '~/data/types'
import { bikesByUniverse } from '~/data/bikes'

// Vignette d'univers : carte neige, socle légèrement teinté, vélo à la hue.
const props = defineProps<{ universe: Universe }>()

const count = computed(() => bikesByUniverse(props.universe.slug).length)
</script>

<template>
  <article class="group relative flex w-48 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[box-shadow,translate] duration-200 ease-(--ease-out-strong) hover:-translate-y-0.5 hover:shadow-(--shadow-lift-lg) sm:w-56">
    <div class="px-3 pt-4" :style="{ backgroundColor: `color-mix(in srgb, ${universe.hue} 8%, #f4f6f2)` }">
      <div class="mx-auto aspect-16/10 w-full transition-transform duration-250 ease-(--ease-out-strong) group-hover:scale-[1.04]">
        <BikeIllustration :kind="universe.kind" :color="universe.hue" />
      </div>
    </div>
    <div class="flex items-center justify-between gap-2 p-4 pt-2.5">
      <div>
        <h3 class="headline text-lg">
          <NuxtLink :to="`/velos/${universe.slug}`" class="no-underline after:absolute after:inset-0">
            {{ universe.name }}
          </NuxtLink>
        </h3>
        <p class="tnum mt-0.5 text-xs text-ink-soft">{{ count }} annonce{{ count > 1 ? 's' : '' }}</p>
      </div>
      <span class="text-lg text-ink-soft transition-transform duration-200 ease-(--ease-out-strong) group-hover:translate-x-1 group-hover:text-pine" aria-hidden="true">→</span>
    </div>
  </article>
</template>
