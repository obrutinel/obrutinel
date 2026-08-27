<script setup lang="ts">
// La crête et le soleil : deux sommets, un point d'ambre.
withDefaults(defineProps<{ size?: number, tone?: 'pine' | 'light' }>(), { size: 28, tone: 'pine' })

const tones = {
  pine: { disc: '#1e4d38', ridge: '#fcfdfb', sun: '#e9b163' },
  light: { disc: '#fcfdfb', ridge: '#1e4d38', sun: '#c9701f' },
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="15" :fill="tones[tone].disc" />
    <circle cx="20.5" cy="11" r="2.6" :fill="tones[tone].sun" />
    <path
      d="M5 21.5 L11 13.5 L14.8 18.2 L18.6 13.8 L27 21.5"
      :stroke="tones[tone].ridge"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
