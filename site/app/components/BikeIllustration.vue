<script setup lang="ts">
import type { IllustrationKind } from '~/data/types'

// Silhouettes de vélo dessinées maison, déclinées par univers et teintées
// par la couleur réelle du vélo. Un seul trait, une seule grammaire.
const props = withDefaults(defineProps<{
  kind: IllustrationKind
  color?: string
  /** Couleur du trait (pneus, cockpit) — à éclaircir sur fond sombre. */
  ink?: string
  /** Libellé accessible ; vide = décoratif. */
  label?: string
}>(), { color: '#17140e', ink: '#17140e', label: '' })

const ink = computed(() => props.ink)

interface Geometry {
  scale: number
  rearX: number
  frontX: number
  wheelR: number
  tire: number
  frame: number
}

const geometries: Partial<Record<IllustrationKind, Partial<Geometry>>> = {
  enfant: { scale: 0.68, rearX: 95, frontX: 225, wheelR: 34, tire: 8, frame: 8 },
  bmx: { scale: 0.8, rearX: 95, frontX: 225, wheelR: 34, tire: 8, frame: 8 },
  cargo: { rearX: 52, frontX: 268, wheelR: 36, tire: 7, frame: 7 },
}

const g = computed<Geometry>(() => ({
  scale: 1,
  rearX: 72,
  frontX: 248,
  wheelR: 42,
  tire: props.kind === 'vtt' || props.kind === 'vae' ? 8 : props.kind === 'gravel' || props.kind === 'ville' ? 6 : 4.5,
  frame: 7,
  ...geometries[props.kind],
}))

const wheelY = computed(() => 180 - g.value.wheelR)

function spokes(cx: number, cy: number, r: number) {
  const inner = r * 0.82
  const parts: string[] = []
  for (const a of [15, 75, 135]) {
    const rad = (a * Math.PI) / 180
    const dx = Math.cos(rad) * inner
    const dy = Math.sin(rad) * inner
    parts.push(`M${cx - dx} ${cy - dy}L${cx + dx} ${cy + dy}`)
  }
  return parts.join('')
}

const transform = computed(() => {
  const s = g.value.scale
  if (s === 1)
    return undefined
  // Réduction ancrée sur la ligne de sol, centrée horizontalement.
  return `translate(${160 * (1 - s)}, ${180 * (1 - s)}) scale(${s})`
})
</script>

<template>
  <svg
    viewBox="0 0 320 200"
    fill="none"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    class="h-full w-full"
  >
    <g :transform="transform" stroke-linecap="round" stroke-linejoin="round">
      <!-- Pièces détachées : roue + plateau, pas de vélo complet -->
      <template v-if="kind === 'pieces'">
        <circle cx="120" cy="112" r="62" :stroke="ink" :stroke-width="8" />
        <circle cx="120" cy="112" r="50" :stroke="color" stroke-width="5" />
        <path :d="spokes(120, 112, 48)" :stroke="ink" stroke-width="2.5" />
        <circle cx="120" cy="112" r="7" :fill="ink" />
        <circle cx="236" cy="136" r="34" :stroke="color" stroke-width="6" />
        <circle cx="236" cy="136" r="10" :stroke="ink" stroke-width="5" />
        <path d="M236 102v-16M236 170v16M202 136h-16M270 136h16" :stroke="ink" stroke-width="5" />
      </template>

      <template v-else>
        <!-- Roues -->
        <circle v-if="kind === 'triathlon'" :cx="g.rearX" :cy="wheelY" :r="g.wheelR - 4" :fill="ink" />
        <circle :cx="g.rearX" :cy="wheelY" :r="g.wheelR" :stroke="ink" :stroke-width="g.tire" />
        <circle :cx="g.frontX" :cy="wheelY" :r="g.wheelR" :stroke="ink" :stroke-width="g.tire" />
        <path v-if="kind !== 'triathlon'" :d="spokes(g.rearX, wheelY, g.wheelR - g.tire / 2 - 1)" :stroke="ink" stroke-width="1.6" opacity="0.55" />
        <path :d="spokes(g.frontX, wheelY, g.wheelR - g.tire / 2 - 1)" :stroke="ink" stroke-width="1.6" opacity="0.55" />
        <circle :cx="g.rearX" :cy="wheelY" r="4" :fill="ink" />
        <circle :cx="g.frontX" :cy="wheelY" r="4" :fill="ink" />

        <!-- Cadres par famille -->
        <template v-if="kind === 'ville' || kind === 'vae'">
          <!-- Cadre ouvert col-de-cygne -->
          <path d="M216 86 C186 122 152 132 138 138" :stroke="color" :stroke-width="g.frame" />
          <path :d="`M138 138 L${g.rearX} ${wheelY}`" :stroke="color" :stroke-width="g.frame" />
          <path d="M138 138 L130 80" :stroke="color" :stroke-width="g.frame" />
          <path :d="`M${g.rearX} ${wheelY} L130 92`" :stroke="color" :stroke-width="g.frame - 1.5" />
          <path :d="`M216 86 L${g.frontX} ${wheelY}`" :stroke="color" :stroke-width="g.frame" />
          <!-- Garde-boue + porte-bagages -->
          <path :d="`M${g.rearX - g.wheelR - 4} ${wheelY} A ${g.wheelR + 4} ${g.wheelR + 4} 0 0 1 ${g.rearX + g.wheelR + 4} ${wheelY}`" :stroke="ink" stroke-width="3" />
          <path :d="`M${g.rearX - 26} 94 H${g.rearX + 30} M${g.rearX + 26} 94 L${g.rearX} ${wheelY - 8}`" :stroke="ink" stroke-width="4" />
          <!-- Guidon relevé + selle -->
          <path d="M216 86 L212 66 L196 60" :stroke="ink" stroke-width="5" />
          <path d="M118 78 H144" :stroke="ink" stroke-width="7" />
          <path d="M130 92 L130 80" :stroke="ink" stroke-width="4" />
          <!-- VAE : batterie sur le tube + moteur au pédalier -->
          <template v-if="kind === 'vae'">
            <path d="M204 96 C182 122 158 132 146 136" :stroke="ink" stroke-width="11" />
            <circle cx="138" cy="138" r="13" :fill="ink" />
            <circle cx="138" cy="138" r="5" :stroke="color" stroke-width="3" />
          </template>
          <template v-else>
            <circle cx="138" cy="138" r="9" :stroke="ink" stroke-width="4" />
          </template>
        </template>

        <template v-else-if="kind === 'cargo'">
          <!-- Longtail : plateau arrière allongé -->
          <path :d="`M150 142 L124 84 M150 142 L${g.rearX} ${wheelY} M150 142 L214 90 M124 84 L206 82 M${g.rearX} ${wheelY} L124 96`" :stroke="color" :stroke-width="g.frame" />
          <path :d="`M214 90 L${g.frontX} ${wheelY} M214 90 L206 82`" :stroke="color" :stroke-width="g.frame" />
          <!-- Plateau et arceaux -->
          <path :d="`M${g.rearX - 22} 92 H132 M${g.rearX - 14} 92 V${wheelY - 6} M112 92 V128`" :stroke="ink" stroke-width="5" />
          <path :d="`M${g.rearX - 22} 92 V72 M132 92 V72 M${g.rearX - 22} 72 H132`" :stroke="ink" stroke-width="4" />
          <!-- Batterie + moteur -->
          <path d="M200 92 C180 116 162 128 152 134" :stroke="ink" stroke-width="10" />
          <circle cx="150" cy="142" r="12" :fill="ink" />
          <circle cx="150" cy="142" r="4.5" :stroke="color" stroke-width="3" />
          <path d="M214 90 L210 70 L194 64" :stroke="ink" stroke-width="5" />
          <path d="M114 76 H140" :stroke="ink" stroke-width="7" />
          <path d="M127 96 L127 76" :stroke="ink" stroke-width="4" />
        </template>

        <template v-else-if="kind === 'bmx'">
          <path :d="`M160 148 L120 108 M160 148 L${g.rearX + 23} ${wheelY} M${g.rearX + 23} ${wheelY} L120 108 M160 148 L206 104 M120 108 L198 96 M206 104 L198 96 M206 104 L${g.frontX} ${wheelY}`" :stroke="color" :stroke-width="g.frame" transform="translate(-20 0)" />
          <!-- Guidon haut -->
          <path d="M178 96 L178 62 M164 62 H196" :stroke="ink" stroke-width="6" />
          <path d="M92 104 H112" :stroke="ink" stroke-width="6" />
          <circle cx="140" cy="148" r="9" :stroke="ink" stroke-width="4" />
        </template>

        <template v-else>
          <!-- Diamant route / VTT / gravel / fixie / triathlon -->
          <path
            :d="`M150 142 L128 ${kind === 'vtt' ? 92 : 82} M150 142 L${g.rearX} ${wheelY} M${g.rearX} ${wheelY} L128 ${kind === 'vtt' ? 92 : 82} M128 ${kind === 'vtt' ? 88 : 80} L216 ${kind === 'vtt' ? 78 : 82} M150 142 L222 94 M216 78 L222 94`"
            :stroke="color"
            :stroke-width="g.frame"
          />
          <!-- Sacoche de cadre gravel -->
          <path v-if="kind === 'gravel'" d="M140 128 L136 92 L200 90 Z" :fill="color" opacity="0.28" />
          <!-- Fourche : suspendue en VTT -->
          <path v-if="kind === 'vtt'" :d="`M222 94 L${g.frontX - 4} 112 M${g.frontX - 3} 116 L${g.frontX} ${wheelY}`" :stroke="ink" stroke-width="9" />
          <path v-else :d="`M222 94 L${g.frontX} ${wheelY}`" :stroke="color" :stroke-width="g.frame - 1" />
          <!-- Selle + tige -->
          <path :d="`M128 ${kind === 'vtt' ? 92 : 82} L124 ${kind === 'vtt' ? 74 : 68}`" :stroke="ink" stroke-width="4" />
          <path :d="`M112 ${kind === 'vtt' ? 72 : 66} H140`" :stroke="ink" stroke-width="7" />
          <!-- Postes de pilotage -->
          <template v-if="kind === 'vtt'">
            <path d="M216 78 L212 62 M198 60 L224 64" :stroke="ink" stroke-width="5" />
          </template>
          <template v-else-if="kind === 'fixie'">
            <path d="M216 82 L214 66 M214 66 H238" :stroke="ink" stroke-width="5" />
          </template>
          <template v-else-if="kind === 'triathlon'">
            <path d="M216 82 L214 66 M206 68 H244 M210 60 H246" :stroke="ink" stroke-width="5" />
          </template>
          <template v-else>
            <path d="M216 82 L214 66 M214 66 H234 C240 66 240 78 234 78 L230 78" :stroke="ink" stroke-width="5" />
          </template>
          <circle cx="150" cy="142" r="9" :stroke="ink" stroke-width="4" />
          <path d="M150 142 L162 156 M162 156 H174" :stroke="ink" stroke-width="4.5" />
        </template>
      </template>

      <!-- Ligne de sol -->
      <path d="M16 186 H304" :stroke="ink" stroke-width="2.5" stroke-dasharray="20 14" opacity="0.35" />
    </g>
  </svg>
</template>
