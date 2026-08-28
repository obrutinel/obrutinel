<script setup lang="ts">
// Lignes de crête superposées — le seul décor du monde Altitude.
// `tone` : clair (hero sur brume) ou sombre (bloc sapin profond).
// Motion : entrée en parallaxe étagée + brume qui dérive (voir main.css),
// coupées par prefers-reduced-motion.
withDefaults(defineProps<{ tone?: 'light' | 'dark', sun?: boolean }>(), { tone: 'light', sun: true })

const uid = useId()

const palettes = {
  light: { far: '#e2e8e0', mid: '#d3ddd2', near: '#c2d1c3', sun: '#e9b163', mist: '#fcfdfb' },
  dark: { far: '#1b4231', mid: '#17392a', near: '#123023', sun: '#e9b163', mist: '#2a5843' },
}
</script>

<template>
  <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" class="h-full w-full" aria-hidden="true">
    <defs>
      <radialGradient :id="`mist-${uid}`" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" :stop-color="palettes[tone].mist" stop-opacity="0.55" />
        <stop offset="1" :stop-color="palettes[tone].mist" stop-opacity="0" />
      </radialGradient>
    </defs>
    <!-- Le soleil se lève doucement à l'arrivée. -->
    <g v-if="sun" class="ridge-sun">
      <circle cx="1150" cy="150" r="40" :fill="palettes[tone].sun" :opacity="tone === 'light' ? 0.9 : 0.55" />
    </g>
    <g class="ridge-far">
      <path
        d="M0 246 L170 160 L320 232 L520 118 L700 224 L905 138 L1080 218 L1265 150 L1440 226 L1440 360 L0 360 Z"
        :fill="palettes[tone].far"
      />
    </g>
    <!-- La brume dérive entre les crêtes, très lentement. -->
    <ellipse class="ridge-mist-a" cx="360" cy="262" rx="300" ry="46" :fill="`url(#mist-${uid})`" />
    <g class="ridge-mid">
      <path
        d="M0 292 L120 226 L295 288 L480 196 L680 286 L880 210 L1075 288 L1250 224 L1440 290 L1440 360 L0 360 Z"
        :fill="palettes[tone].mid"
      />
    </g>
    <ellipse class="ridge-mist-b" cx="1010" cy="312" rx="340" ry="44" :fill="`url(#mist-${uid})`" />
    <g class="ridge-near">
      <path
        d="M0 340 L200 282 L420 336 L640 272 L860 338 L1090 284 L1290 334 L1440 300 L1440 360 L0 360 Z"
        :fill="palettes[tone].near"
      />
    </g>
  </svg>
</template>
