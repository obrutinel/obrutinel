<script setup lang="ts">
import type { IllustrationKind } from '~/data/types'

// Illustration « catalogue » : vélo de profil, rendu deux tons + dégradés,
// roues détaillées, transmission, ombre au sol. Déclinée par univers et
// teintée par la couleur réelle du vélo.
const props = withDefaults(defineProps<{
  kind: IllustrationKind
  color?: string
  /** Couleur du trait (pneus, cockpit) — à éclaircir sur fond sombre. */
  ink?: string
  /** Libellé accessible ; vide = décoratif. */
  label?: string
}>(), { color: '#131512', ink: '#1d1f1a', label: '' })

const uid = useId()

function mix(hex: string, target: string, amount: number) {
  const p = (h: string) => [1, 3, 5].map(i => Number.parseInt(h.slice(i, i + 2), 16))
  const [r1, g1, b1] = p(hex)
  const [r2, g2, b2] = p(target)
  const c = (a: number, b: number) => Math.round(a + (b - a) * amount)
  return `rgb(${c(r1!, r2!)} ${c(g1!, g2!)} ${c(b1!, b2!)})`
}

const light = computed(() => mix(props.color, '#ffffff', 0.32))
const dark = computed(() => mix(props.color, '#000000', 0.34))
const metal = '#a9ada3'
const metalDark = '#5e6159'

interface Geometry {
  scale: number
  rearX: number
  frontX: number
  wheelR: number
  tire: number
  frame: number
}

const geometries: Partial<Record<IllustrationKind, Partial<Geometry>>> = {
  enfant: { scale: 0.68, rearX: 190, frontX: 450, wheelR: 68, tire: 15, frame: 15 },
  bmx: { scale: 0.8, rearX: 190, frontX: 450, wheelR: 68, tire: 15, frame: 15 },
  cargo: { rearX: 104, frontX: 536, wheelR: 72, tire: 13, frame: 13 },
}

const g = computed<Geometry>(() => ({
  scale: 1,
  rearX: 144,
  frontX: 496,
  wheelR: 84,
  tire: props.kind === 'vtt' || props.kind === 'vae' ? 15 : props.kind === 'gravel' || props.kind === 'ville' ? 12 : 9,
  frame: 13,
  ...geometries[props.kind],
}))

const wheelY = computed(() => 360 - g.value.wheelR)

function spokes(cx: number, cy: number, r: number) {
  const inner = r * 0.88
  const parts: string[] = []
  for (let i = 0; i < 9; i++) {
    const rad = ((i * 20 + 8) * Math.PI) / 180
    const dx = Math.cos(rad) * inner
    const dy = Math.sin(rad) * inner
    parts.push(`M${(cx - dx).toFixed(1)} ${(cy - dy).toFixed(1)}L${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}`)
  }
  return parts.join('')
}

const transform = computed(() => {
  const s = g.value.scale
  if (s === 1)
    return undefined
  return `translate(${320 * (1 - s)}, ${368 * (1 - s)}) scale(${s})`
})

const isDiamond = computed(() => ['vtt', 'route', 'gravel', 'fixie', 'triathlon'].includes(props.kind))
</script>

<template>
  <svg
    viewBox="0 0 640 420"
    fill="none"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    class="h-full w-full"
  >
    <defs>
      <linearGradient :id="`f-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="light" />
        <stop offset="0.45" :stop-color="color" />
        <stop offset="1" :stop-color="dark" />
      </linearGradient>
      <linearGradient :id="`t-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="mix(ink, '#ffffff', 0.16)" />
        <stop offset="1" :stop-color="ink" />
      </linearGradient>
    </defs>

    <g :transform="transform" stroke-linecap="round" stroke-linejoin="round">
      <!-- Ombre au sol -->
      <ellipse cx="320" cy="372" rx="252" ry="13" :fill="ink" opacity="0.10" />
      <ellipse cx="320" cy="372" rx="160" ry="8" :fill="ink" opacity="0.08" />

      <!-- Pièces détachées : roue + plateau -->
      <template v-if="kind === 'pieces'">
        <circle cx="240" cy="222" r="126" :stroke="`url(#t-${uid})`" stroke-width="17" />
        <circle cx="240" cy="222" r="103" :stroke="`url(#f-${uid})`" stroke-width="15" />
        <path :d="spokes(240, 222, 96)" :stroke="metalDark" stroke-width="2.4" />
        <circle cx="240" cy="222" r="16" :fill="metal" :stroke="metalDark" stroke-width="3" />
        <circle cx="470" cy="272" r="66" :stroke="`url(#f-${uid})`" stroke-width="8" />
        <circle cx="470" cy="272" r="48" :stroke="metalDark" stroke-width="3" />
        <circle cx="470" cy="272" r="14" :fill="metal" :stroke="metalDark" stroke-width="4" />
        <path d="M470 206v-26M470 338v26M404 272h-26M536 272h26" :stroke="metalDark" stroke-width="8" />
      </template>

      <template v-else>
        <!-- Roues -->
        <template v-for="cx in [g.rearX, g.frontX]" :key="cx">
          <circle v-if="kind === 'triathlon' && cx === g.rearX" :cx="cx" :cy="wheelY" :r="g.wheelR - 8" fill="#262823" />
          <circle :cx="cx" :cy="wheelY" :r="g.wheelR" :stroke="`url(#t-${uid})`" :stroke-width="g.tire" />
          <path :d="`M${cx - g.wheelR * 0.62} ${wheelY - g.wheelR * 0.72} A${g.wheelR} ${g.wheelR} 0 0 1 ${cx + g.wheelR * 0.62} ${wheelY - g.wheelR * 0.72}`" stroke="#ffffff" stroke-width="2.5" opacity="0.14" fill="none" />
          <circle :cx="cx" :cy="wheelY" :r="g.wheelR - g.tire / 2 - 5" stroke="#31332d" :stroke-width="kind === 'route' || kind === 'triathlon' ? 11 : 6" />
          <template v-if="!(kind === 'triathlon' && cx === g.rearX)">
            <path :d="spokes(cx, wheelY, g.wheelR - g.tire / 2 - 9)" :stroke="metalDark" stroke-width="1.7" opacity="0.85" />
          </template>
          <circle :cx="cx" :cy="wheelY" r="17" :stroke="metal" stroke-width="3.5" opacity="0.9" />
          <circle :cx="cx" :cy="wheelY" r="8" :fill="metal" :stroke="metalDark" stroke-width="2.5" />
        </template>
        <!-- Cassette + dérailleur arrière -->
        <template v-if="isDiamond">
          <circle :cx="g.rearX" :cy="wheelY" r="26" :stroke="metalDark" stroke-width="1.6" opacity="0.9" />
          <circle :cx="g.rearX" :cy="wheelY" r="32" :stroke="metalDark" stroke-width="1.6" opacity="0.7" />
          <path :d="`M${g.rearX + 6} ${wheelY + 34} l4 22`" :stroke="ink" stroke-width="6" />
          <circle :cx="g.rearX + 12" :cy="wheelY + 58" r="7" :fill="metalDark" />
        </template>

        <!-- ================= Cadres ================= -->

        <!-- Ville / VAE : col-de-cygne -->
        <template v-if="kind === 'ville' || kind === 'vae'">
          <path :d="`M${g.rearX - g.wheelR - 9} ${wheelY} A ${g.wheelR + 9} ${g.wheelR + 9} 0 0 1 ${g.rearX + g.wheelR + 9} ${wheelY}`" :stroke="dark" stroke-width="6" />
          <path :d="`M${g.frontX - g.wheelR - 9} ${wheelY - 20} A ${g.wheelR + 9} ${g.wheelR + 9} 0 0 1 ${g.frontX + g.wheelR + 4} ${wheelY + 14}`" :stroke="dark" stroke-width="6" />
          <path d="M432 172 C372 244 304 264 276 276" :stroke="`url(#f-${uid})`" :stroke-width="g.frame + 3" />
          <path :d="`M276 276 L${g.rearX} ${wheelY}`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame" />
          <path d="M276 276 L260 160" :stroke="`url(#f-${uid})`" :stroke-width="g.frame" />
          <path :d="`M${g.rearX} ${wheelY} L260 184`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame - 3" />
          <path :d="`M432 172 L${g.frontX} ${wheelY}`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame - 1" />
          <!-- Porte-bagages -->
          <path :d="`M${g.rearX - 52} 188 H${g.rearX + 60} M${g.rearX + 52} 188 L${g.rearX} ${wheelY - 16} M${g.rearX - 44} 188 L${g.rearX - 20} ${wheelY - 10}`" :stroke="ink" stroke-width="6" />
          <!-- Guidon relevé + poignée -->
          <path d="M432 172 L424 132 L392 120" :stroke="`url(#t-${uid})`" stroke-width="9" />
          <path d="M392 120 L372 116" :stroke="dark" stroke-width="13" />
          <!-- Selle -->
          <path d="M260 184 L260 152" :stroke="metal" stroke-width="7" />
          <path d="M232 148 Q236 138 252 138 L286 142 Q290 150 282 154 L240 156 Q232 154 232 148Z" :fill="ink" />
          <!-- VAE : batterie + moteur -->
          <template v-if="kind === 'vae'">
            <path d="M408 190 C360 244 312 262 288 272" :stroke="ink" stroke-width="19" />
            <path d="M404 196 C360 244 316 260 296 268" stroke="#ffffff" stroke-width="2" opacity="0.25" />
            <circle cx="276" cy="276" r="25" :fill="ink" />
            <circle cx="276" cy="276" r="25" :stroke="dark" stroke-width="3" />
            <circle cx="276" cy="276" r="10" :stroke="metal" stroke-width="3.5" />
          </template>
          <template v-else>
            <circle cx="276" cy="276" r="17" :stroke="`url(#t-${uid})`" stroke-width="7" />
            <circle cx="276" cy="276" r="5" :fill="metalDark" />
          </template>
          <path d="M276 276 L302 306 M302 306 h26" :stroke="ink" stroke-width="8" />
          <path d="M328 300 h-26 v12 h26z" :fill="metalDark" rx="3" />
        </template>

        <!-- Cargo longtail -->
        <template v-else-if="kind === 'cargo'">
          <path :d="`M300 284 L248 168 M300 284 L${g.rearX} ${wheelY} M300 284 L428 180 M248 168 L412 164 M${g.rearX} ${wheelY} L248 192`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame" />
          <path :d="`M428 180 L${g.frontX} ${wheelY} M428 180 L412 164`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame" />
          <!-- Plateau + arceaux -->
          <path :d="`M${g.rearX - 46} 184 H264 M${g.rearX - 28} 184 V${wheelY - 12} M224 184 V256`" :stroke="ink" stroke-width="9" />
          <path :d="`M${g.rearX - 46} 184 V144 M264 184 V144 M${g.rearX - 46} 144 H264`" :stroke="ink" stroke-width="7" />
          <path :d="`M${g.rearX - 46} 164 H264`" :stroke="ink" stroke-width="3" opacity="0.5" />
          <!-- Batterie + moteur -->
          <path d="M400 184 C360 232 324 256 304 268" :stroke="ink" stroke-width="18" />
          <circle cx="300" cy="284" r="23" :fill="ink" />
          <circle cx="300" cy="284" r="9" :stroke="metal" stroke-width="3.5" />
          <path d="M428 180 L420 140 L388 128" :stroke="`url(#t-${uid})`" stroke-width="9" />
          <path d="M388 128 L368 124" :stroke="dark" stroke-width="12" />
          <path d="M208 148 Q212 138 228 138 L258 142 Q262 150 254 154 L216 156 Q208 154 208 148Z" :fill="ink" />
          <path d="M252 192 L252 156" :stroke="metal" stroke-width="7" />
        </template>

        <!-- BMX -->
        <template v-else-if="kind === 'bmx'">
          <g transform="translate(-40 0)">
            <path :d="`M320 296 L240 216 M320 296 L${g.rearX + 46} ${wheelY} M${g.rearX + 46} ${wheelY} L240 216 M320 296 L412 208 M240 216 L396 192 M412 208 L396 192 M412 208 L${g.frontX + 40} ${wheelY}`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame" />
            <path d="M356 192 L356 124 M328 124 H392" :stroke="`url(#t-${uid})`" stroke-width="11" />
            <path d="M322 124 h-18 M392 124 h18" :stroke="dark" stroke-width="13" />
            <path d="M172 210 Q180 200 196 202 L216 208 Q218 216 210 218 L180 218 Q172 216 172 210Z" :fill="ink" />
            <circle cx="280" cy="296" r="17" :stroke="`url(#t-${uid})`" stroke-width="7" />
            <path d="M280 296 L306 322 M306 322 h24" :stroke="ink" stroke-width="8" />
          </g>
        </template>

        <!-- Diamant : route / VTT / gravel / fixie / triathlon -->
        <template v-else>
          <!-- Transmission -->
          <path :d="`M300 284 L${g.rearX} ${wheelY - 14}`" stroke="#3c3e37" stroke-width="3" stroke-dasharray="7 4" opacity="0.8" />
          <path :d="`M300 306 L${g.rearX + 10} ${wheelY + 30}`" stroke="#3c3e37" stroke-width="3" stroke-dasharray="7 4" opacity="0.6" />
          <!-- Cadre -->
          <path
            :d="`M300 284 L256 ${kind === 'vtt' ? 184 : 164} M300 284 L${g.rearX} ${wheelY} M${g.rearX} ${wheelY} L256 ${kind === 'vtt' ? 184 : 164}`"
            :stroke="`url(#f-${uid})`"
            :stroke-width="g.frame - 2"
          />
          <path
            :d="`M256 ${kind === 'vtt' ? 176 : 160} L432 ${kind === 'vtt' ? 156 : 164} M300 284 L444 188 M432 156 L444 188`"
            :stroke="`url(#f-${uid})`"
            :stroke-width="g.frame"
          />
          <!-- Décalque -->
          <path :d="`M330 268 L400 221`" stroke="#ffffff" stroke-width="4" opacity="0.55" />
          <!-- Sacoche gravel -->
          <path v-if="kind === 'gravel'" d="M282 258 L272 184 L398 180 Z" :fill="dark" opacity="0.5" />
          <path v-if="kind === 'gravel'" d="M282 258 L272 184 L398 180 Z" stroke="#000" stroke-opacity="0.2" stroke-width="2" fill="none" />
          <!-- Fourche -->
          <path v-if="kind === 'vtt'" :d="`M444 188 L${g.frontX - 8} 224`" :stroke="`url(#t-${uid})`" stroke-width="17" />
          <path v-if="kind === 'vtt'" :d="`M${g.frontX - 6} 228 L${g.frontX} ${wheelY}`" :stroke="metal" stroke-width="11" />
          <path v-else :d="`M444 188 Q452 232 ${g.frontX} ${wheelY}`" :stroke="`url(#f-${uid})`" :stroke-width="g.frame - 3" fill="none" />
          <!-- Tige + selle : profil fin, nez marqué -->
          <path :d="`M256 ${kind === 'vtt' ? 184 : 164} L249 ${kind === 'vtt' ? 146 : 128}`" :stroke="metal" stroke-width="6" />
          <g :transform="`translate(0 ${kind === 'vtt' ? 18 : 0})`">
            <path d="M224 122 Q225 115 236 115 L262 116 Q280 117 284 121 Q285 125 278 126 L232 127 Q224 126 224 122Z" :fill="ink" />
            <path d="M226 117 Q238 113 258 114" stroke="#ffffff" stroke-width="1.5" opacity="0.2" fill="none" />
          </g>
          <!-- Postes de pilotage -->
          <template v-if="kind === 'vtt'">
            <path d="M432 156 L424 124" :stroke="`url(#t-${uid})`" stroke-width="9" />
            <path d="M396 120 L452 128" :stroke="dark" stroke-width="12" />
          </template>
          <template v-else-if="kind === 'fixie'">
            <path d="M432 164 L428 132 M428 132 H476" :stroke="`url(#t-${uid})`" stroke-width="9" />
            <path d="M462 132 h14" :stroke="dark" stroke-width="13" />
          </template>
          <template v-else-if="kind === 'triathlon'">
            <path d="M432 164 L428 132 M412 136 H488 M420 120 H492" :stroke="`url(#t-${uid})`" stroke-width="9" />
            <path d="M478 120 h14 M474 136 h14" :stroke="dark" stroke-width="12" />
          </template>
          <template v-else>
            <path d="M432 164 L429 134" :stroke="`url(#t-${uid})`" stroke-width="8" />
            <path d="M429 134 H468 C484 134 484 166 466 166 L458 166" :stroke="`url(#t-${uid})`" stroke-width="6.5" fill="none" />
            <path d="M452 134 h16 Q474 136 474 146" :stroke="dark" stroke-width="9.5" fill="none" />
          </template>
          <!-- Pédalier -->
          <circle cx="300" cy="284" r="27" :stroke="`url(#t-${uid})`" stroke-width="5" />
          <circle cx="300" cy="284" r="19" :stroke="metalDark" stroke-width="2" opacity="0.8" />
          <circle cx="300" cy="284" r="5" :fill="metalDark" />
          <path d="M300 284 L326 312" :stroke="ink" stroke-width="9" />
          <path d="M340 306 h-26 v12 h26z" :fill="metalDark" />
        </template>
      </template>
    </g>
  </svg>
</template>
