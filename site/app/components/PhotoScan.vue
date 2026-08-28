<script setup lang="ts">
// Simulation du scan photo IA : tout se passe dans le navigateur, la photo
// n'est envoyée nulle part. Sur le vrai Biclette, l'analyse (vision LLM)
// tournera côté serveur et pré-remplira les mêmes champs.
export interface ScanResult {
  universe: string
  brand: string
  model: string
  year: string
  confidence: 'Élevée' | 'Moyenne'
}

const emit = defineEmits<{ detected: [result: ScanResult] }>()

const demoResults: ScanResult[] = [
  { universe: 'gravel', brand: 'Canyon', model: 'Grizl CF SL 7', year: '2023', confidence: 'Élevée' },
  { universe: 'vtt', brand: 'Lapierre', model: 'Zesty AM CF 6.9', year: '2024', confidence: 'Élevée' },
  { universe: 'vae', brand: 'Moustache', model: 'Samedi 27 Xroad 3', year: '2022', confidence: 'Moyenne' },
]

const universeNames: Record<string, string> = {
  gravel: 'Gravel',
  vtt: 'VTT',
  vae: 'Vélo électrique',
}

const state = ref<'idle' | 'scanning' | 'done'>('idle')
const preview = ref('')
const result = ref<ScanResult | null>(null)
const input = useTemplateRef<HTMLInputElement>('input')
let scanCount = 0
let timer: ReturnType<typeof setTimeout> | undefined

function onFile(files: FileList | null) {
  const file = files?.[0]
  if (!file || !file.type.startsWith('image/'))
    return
  const reader = new FileReader()
  reader.onload = () => {
    preview.value = reader.result as string
    state.value = 'scanning'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer = setTimeout(() => {
      result.value = demoResults[scanCount++ % demoResults.length]!
      state.value = 'done'
      emit('detected', result.value)
    }, reduced ? 150 : 2200)
  }
  reader.readAsDataURL(file)
}

function reset() {
  clearTimeout(timer)
  state.value = 'idle'
  preview.value = ''
  result.value = null
  if (input.value)
    input.value.value = ''
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div>
    <!-- Zone d'upload -->
    <label
      v-if="state === 'idle'"
      class="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line bg-paper px-6 py-8 text-center transition-colors duration-150 hover:border-pine/60"
      @dragover.prevent
      @drop.prevent="onFile($event.dataTransfer?.files ?? null)"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" class="text-pine" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="22" height="17" rx="3" />
        <circle cx="14" cy="14" r="4.5" />
        <path d="M10 6l1.5-2.5h5L18 6" />
      </svg>
      <span class="font-semibold">Ajoutez une photo de votre vélo</span>
      <span class="max-w-[40ch] text-sm text-ink-soft">Notre IA la lit et pré-remplit l'annonce : marque, modèle, univers…</span>
      <span class="pressable mt-1 rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white">Choisir une photo</span>
      <input ref="input" type="file" accept="image/*" class="sr-only" @change="onFile(($event.target as HTMLInputElement).files)">
    </label>

    <!-- Aperçu + scan / résultat -->
    <div v-else class="overflow-hidden rounded-2xl border border-line bg-paper">
      <div class="relative">
        <img :src="preview" alt="Photo de votre vélo" class="max-h-56 w-full object-cover">
        <div v-if="state === 'scanning'" class="absolute inset-0 overflow-hidden bg-pine-deep/25" aria-hidden="true">
          <div class="scan-beam absolute inset-x-0 h-16" />
        </div>
      </div>
      <div class="p-4">
        <p v-if="state === 'scanning'" class="flex items-center gap-2.5 text-sm font-medium" role="status">
          <svg class="animate-spin text-pine" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-opacity="0.25" stroke-width="2.5" />
            <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          </svg>
          Analyse de la photo…
        </p>

        <div v-else-if="result" role="status">
          <div class="flex flex-wrap items-center gap-2">
            <span class="roadsign-label rounded-full bg-pine px-2.5 py-1 text-[10.5px] leading-none text-white">Détecté</span>
            <span class="rounded-full bg-pine/10 px-3 py-1 text-sm font-medium text-pine-deep">{{ universeNames[result.universe] }}</span>
            <span class="rounded-full bg-pine/10 px-3 py-1 text-sm font-medium text-pine-deep">{{ result.brand }} {{ result.model }}</span>
            <span class="tnum rounded-full bg-pine/10 px-3 py-1 text-sm font-medium text-pine-deep">{{ result.year }}</span>
            <span class="roadsign-label rounded-full border border-line px-2.5 py-1 text-[10.5px] leading-none text-ink-soft">Confiance {{ result.confidence }}</span>
          </div>
          <p class="mt-2.5 text-xs text-ink-soft">
            Champs pré-remplis ci-dessous — vérifiez et corrigez si besoin.
            <em>Démo : résultat simulé, votre photo ne quitte pas ce navigateur.</em>
          </p>
        </div>

        <button type="button" class="mt-2 text-sm font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline" @click="reset">
          Effacer la photo
        </button>
      </div>
    </div>
  </div>
</template>
