<script setup lang="ts">
// Plateau de pédalier stylisé : l'anneau, cinq trous d'allègement, l'axe.
withDefaults(defineProps<{ size?: number, tone?: 'flame' | 'ink' | 'light' }>(), { size: 28, tone: 'flame' })

const tones = {
  flame: { disc: '#e8401a', detail: '#ffffff' },
  ink: { disc: '#131512', detail: '#fdfdfb' },
  light: { disc: '#fdfdfb', detail: '#131512' },
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="15" :fill="tones[tone].disc" />
    <circle cx="16" cy="16" r="9.5" :stroke="tones[tone].detail" stroke-width="2.6" />
    <circle cx="16" cy="16" r="2.2" :fill="tones[tone].detail" />
    <g :fill="tones[tone].detail">
      <circle cx="16" cy="10" r="1.5" />
      <circle cx="21.7" cy="14.1" r="1.5" />
      <circle cx="19.5" cy="20.9" r="1.5" />
      <circle cx="12.5" cy="20.9" r="1.5" />
      <circle cx="10.3" cy="14.1" r="1.5" />
    </g>
  </svg>
</template>
