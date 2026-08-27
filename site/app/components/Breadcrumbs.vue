<script setup lang="ts">
import { absoluteUrl } from '~/utils/site'

interface Crumb {
  label: string
  to?: string
}

const props = defineProps<{ items: Crumb[] }>()

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': absoluteUrl('/') },
    ...props.items.map((c, i) => ({
      '@type': 'ListItem',
      'position': i + 2,
      'name': c.label,
      ...(c.to ? { item: absoluteUrl(c.to) } : {}),
    })),
  ],
})
</script>

<template>
  <nav aria-label="Fil d'Ariane" class="text-sm text-ink-soft">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <li>
        <NuxtLink to="/" class="no-underline hover:underline">Accueil</NuxtLink>
      </li>
      <li v-for="(c, i) in items" :key="i" class="flex items-center gap-2">
        <span aria-hidden="true">›</span>
        <NuxtLink v-if="c.to" :to="c.to" class="no-underline hover:underline">{{ c.label }}</NuxtLink>
        <span v-else aria-current="page" class="text-ink">{{ c.label }}</span>
      </li>
    </ol>
  </nav>
</template>
