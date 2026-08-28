<script setup lang="ts">
import { absoluteUrl, SITE_BASELINE, SITE_NAME, SITE_URL } from '~/utils/site'

useHead({
  titleTemplate: title => (title ? `${title} · ${SITE_NAME}` : SITE_NAME),
})

// Identité du site pour les moteurs : une seule fois, portée par toutes les pages.
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': SITE_NAME,
    'url': SITE_URL,
    'slogan': SITE_BASELINE,
    'logo': absoluteUrl('/favicon.svg'),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_NAME,
    'url': SITE_URL,
    'inLanguage': 'fr-FR',
  },
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
