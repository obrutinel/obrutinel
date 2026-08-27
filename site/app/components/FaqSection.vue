<script setup lang="ts">
const props = defineProps<{
  items: { q: string, a: string }[]
  title?: string
}>()

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': props.items.map(f => ({
    '@type': 'Question',
    'name': f.q,
    'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
  })),
})
</script>

<template>
  <section aria-labelledby="faq-title">
    <h2 id="faq-title" class="font-display text-3xl font-bold uppercase">
      {{ title ?? 'Questions fréquentes' }}
    </h2>
    <div class="mt-5 divide-y divide-line border-y border-line">
      <details v-for="f in items" :key="f.q" class="group py-1">
        <summary class="flex cursor-pointer list-none items-baseline justify-between gap-4 py-3 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
          <span>{{ f.q }}</span>
          <span class="font-display text-xl leading-none text-ink-soft transition-transform duration-200 ease-(--ease-out-strong) group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <p class="max-w-[65ch] pb-4 leading-relaxed text-ink-soft">{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>
