<script setup lang="ts">
import { universes } from '~/data/universes'
</script>

<template>
  <!-- Bandeau défilant : les 11 univers en boucle, chaque nom est un lien. -->
  <div class="marquee border-y border-line bg-ink py-3.5 text-card" aria-label="Tous les univers">
    <div v-for="copy in 2" :key="copy" :aria-hidden="copy === 2 ? 'true' : undefined">
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
    </div>
  </div>
</template>
