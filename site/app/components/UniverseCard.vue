<script setup lang="ts">
import type { Universe } from '~/data/types'
import { bikesByUniverse } from '~/data/bikes'

const props = defineProps<{ universe: Universe }>()

const count = computed(() => bikesByUniverse(props.universe.slug).length)
</script>

<template>
  <article class="group relative flex items-center gap-4 rounded-md border border-line bg-card p-4 transition-shadow duration-200 hover:shadow-[0_10px_28px_-14px_rgba(23,20,14,0.35)]">
    <div class="h-16 w-24 shrink-0">
      <BikeIllustration :kind="universe.kind" color="#17140e" />
    </div>
    <div class="min-w-0 flex-1">
      <h3 class="font-display text-xl font-semibold uppercase leading-tight">
        <NuxtLink :to="`/velos/${universe.slug}`" class="no-underline after:absolute after:inset-0">
          {{ universe.name }}
        </NuxtLink>
      </h3>
      <p class="truncate text-sm text-ink-soft">{{ universe.tagline }}</p>
    </div>
    <p class="roadsign-label flex items-center gap-2 text-xs text-ink-soft">
      <span class="tnum">{{ count }}</span>
      <span class="text-lg leading-none transition-transform duration-200 ease-(--ease-out-strong) group-hover:translate-x-1" aria-hidden="true">→</span>
    </p>
  </article>
</template>
