<script setup lang="ts">
// Lignes de crête superposées — le seul décor du monde Altitude.
// `tone` : clair (hero sur brume) ou sombre (bloc sapin profond).
withDefaults(defineProps<{ tone?: 'light' | 'dark', sun?: boolean }>(), { tone: 'light', sun: true })

const palettes = {
  light: { far: '#e2e8e0', mid: '#d3ddd2', near: '#c2d1c3', sun: '#e9b163' },
  dark: { far: '#1b4231', mid: '#17392a', near: '#123023', sun: '#e9b163' },
}
</script>

<template>
  <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" class="h-full w-full" aria-hidden="true">
    <!-- Le soleil se couche derrière la crête : dessiné avant, masqué par elle. -->
    <circle v-if="sun" cx="1150" cy="150" r="40" :fill="palettes[tone].sun" :opacity="tone === 'light' ? 0.9 : 0.55" />
    <path
      d="M0 246 L170 160 L320 232 L520 118 L700 224 L905 138 L1080 218 L1265 150 L1440 226 L1440 360 L0 360 Z"
      :fill="palettes[tone].far"
    />
    <path
      d="M0 292 L120 226 L295 288 L480 196 L680 286 L880 210 L1075 288 L1250 224 L1440 290 L1440 360 L0 360 Z"
      :fill="palettes[tone].mid"
    />
    <path
      d="M0 340 L200 282 L420 336 L640 272 L860 338 L1090 284 L1290 334 L1440 300 L1440 360 L0 360 Z"
      :fill="palettes[tone].near"
    />
  </svg>
</template>
