<script setup lang="ts">
import { universes } from '~/data/universes'

// Deux registres : « univers » (fond encre, liens) et « slogan » (fond flamme,
// sens inverse) — accolés ils font l'affiche.
const props = withDefaults(defineProps<{ variant?: 'univers' | 'slogan' }>(), { variant: 'univers' })

const slogan = ['Achetez', 'Vendez', 'Roulez', 'Recommencez']
const isSlogan = computed(() => props.variant === 'slogan')
</script>

<template>
  <div
    class="marquee py-3.5"
    :class="isSlogan ? 'marquee-reverse bg-flame text-white' : 'border-y border-line bg-ink text-card'"
    :aria-label="isSlogan ? undefined : 'Tous les univers'"
    :aria-hidden="isSlogan ? 'true' : undefined"
  >
    <div v-for="copy in 2" :key="copy" :aria-hidden="copy === 2 ? 'true' : undefined">
      <template v-if="isSlogan">
        <template v-for="n in 3" :key="n">
          <template v-for="word in slogan" :key="word + n">
            <span class="headline px-5 text-xl">{{ word }}</span>
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true" class="shrink-0">
              <circle cx="16" cy="16" r="9.5" stroke="#ffffff" stroke-opacity="0.55" stroke-width="3.5" />
              <circle cx="16" cy="16" r="2.6" fill="#ffffff" />
            </svg>
          </template>
        </template>
      </template>
      <template v-else>
        <template v-for="u in universes" :key="u.slug">
          <NuxtLink
            :to="`/velos/${u.slug}`"
            class="headline px-5 text-xl text-card no-underline transition-colors duration-150 hover:text-flame"
            :tabindex="copy === 2 ? -1 : undefined"
          >
            {{ u.name }}
          </NuxtLink>
          <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true" class="shrink-0 opacity-50">
            <circle cx="16" cy="16" r="9.5" stroke="#e8401a" stroke-width="3.5" />
            <circle cx="16" cy="16" r="2.6" fill="#e8401a" />
          </svg>
        </template>
      </template>
    </div>
  </div>
</template>
