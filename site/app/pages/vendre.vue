<script setup lang="ts">
import type { ScanResult } from '~/components/PhotoScan.vue'
import { conditionLabels } from '~/data/bikes'
import { universes } from '~/data/universes'
import { formatPrice } from '~/utils/site'

usePageSeo({
  title: 'Vendre son vélo d\'occasion — dépôt d\'annonce guidé',
  description:
    "Vendez votre vélo d'occasion en 4 étapes : univers, état détaillé, prix aidé par la décote constatée, publication. Gratuit pour les particuliers.",
})

const steps = ['Le vélo', 'Son état', 'Le prix', 'Publication'] as const
const step = ref(0)
const done = ref(false)

const form = reactive({
  universe: '',
  brand: '',
  model: '',
  year: '',
  condition: '',
  size: '',
  km: '',
  price: '',
  originalPrice: '',
  city: '',
  email: '',
})

const stepValid = computed(() => {
  if (step.value === 0)
    return form.universe && form.brand && form.model
  if (step.value === 1)
    return form.condition && form.size
  if (step.value === 2)
    return Number(form.price) > 0
  return form.city && /.+@.+\..+/.test(form.email)
})

const decote = computed(() => {
  const p = Number(form.price)
  const o = Number(form.originalPrice)
  if (!p || !o || o <= p)
    return null
  return Math.round((1 - p / o) * 100)
})

function next() {
  if (!stepValid.value)
    return
  if (step.value < steps.length - 1)
    step.value++
  else done.value = true
}

// Scan photo simulé : pré-remplit sans écraser une saisie existante.
const justScanned = ref(false)
function onDetected(r: ScanResult) {
  if (!form.universe)
    form.universe = r.universe
  if (!form.brand)
    form.brand = r.brand
  if (!form.model)
    form.model = r.model
  if (!form.year)
    form.year = r.year
  justScanned.value = true
  setTimeout(() => {
    justScanned.value = false
  }, 1600)
}

const scanRing = computed(() =>
  justScanned.value ? 'ring-2 ring-pine/40 transition-shadow duration-500' : 'transition-shadow duration-500')
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'Vendre un vélo' }]" />

    <header class="mt-6">
      <p class="roadsign-label text-xs text-pine">Déjà roulé, jamais usé</p>
      <h1 class="headline mt-2 text-4xl sm:text-5xl">Vendre son vélo</h1>
      <p class="mt-3 max-w-[60ch] leading-relaxed text-ink-soft">
        Quatre étapes, cinq minutes. Une annonce précise se vend plus vite et plus cher :
        nous vous guidons sur les points que les acheteurs regardent vraiment.
      </p>
    </header>

    <div v-if="done" class="rise-in mt-10 rounded-2xl border border-line bg-card p-8 text-center">
      <div class="mx-auto h-24 w-40">
        <BikeIllustration :kind="(universes.find(u => u.slug === form.universe)?.kind) ?? 'route'" color="#1e4d38" />
      </div>
      <h2 class="mt-4 headline text-3xl">Annonce prête à partir</h2>
      <p class="mx-auto mt-3 max-w-[52ch] leading-relaxed text-ink-soft">
        <strong class="text-ink">{{ form.brand }} {{ form.model }}</strong>
        {{ form.price ? `à ${formatPrice(Number(form.price))}` : '' }} — sur le vrai Biclette,
        elle serait maintenant en ligne dans l'univers
        {{ universes.find(u => u.slug === form.universe)?.name }}. Ce site est une démonstration :
        aucune donnée n'est envoyée ni conservée.
      </p>
      <NuxtLink to="/" class="pressable mt-7 inline-block rounded-full bg-pine px-6 py-3 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-pine-deep">
        Retour à l'accueil
      </NuxtLink>
    </div>

    <form v-else class="mt-10" @submit.prevent="next">
      <!-- Jalons -->
      <ol class="flex gap-2" aria-label="Étapes du dépôt">
        <li v-for="(s, i) in steps" :key="s" class="flex-1">
          <span
            class="block border-b-4 pb-2 text-xs font-medium uppercase tracking-wide transition-colors duration-200"
            :class="i <= step ? 'border-pine text-ink' : 'border-line text-ink-soft/70'"
            :aria-current="i === step ? 'step' : undefined"
          >
            <span class="tnum">{{ i + 1 }}.</span> {{ s }}
          </span>
        </li>
      </ol>

      <div class="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
        <template v-if="step === 0">
          <h2 class="headline text-2xl">Quel vélo vendez-vous ?</h2>
          <PhotoScan class="mt-5" @detected="onDetected" />
          <div class="mt-6 grid gap-5">
            <div class="grid gap-1.5">
              <label for="v-univers" class="roadsign-label text-xs text-ink-soft">Univers</label>
              <select id="v-univers" v-model="form.universe" required class="rounded-lg border border-line bg-paper px-3 py-2.5" :class="scanRing">
                <option value="" disabled>Choisir…</option>
                <option v-for="u in universes" :key="u.slug" :value="u.slug">{{ u.h1 }}</option>
              </select>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="grid gap-1.5">
                <label for="v-marque" class="roadsign-label text-xs text-ink-soft">Marque</label>
                <input id="v-marque" v-model="form.brand" type="text" required placeholder="Canyon, Lapierre…" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60" :class="scanRing">
              </div>
              <div class="grid gap-1.5">
                <label for="v-modele" class="roadsign-label text-xs text-ink-soft">Modèle</label>
                <input id="v-modele" v-model="form.model" type="text" required placeholder="Ultimate CF SL 8" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60" :class="scanRing">
              </div>
            </div>
            <div class="grid gap-1.5 sm:max-w-40">
              <label for="v-annee" class="roadsign-label text-xs text-ink-soft">Année</label>
              <input id="v-annee" v-model="form.year" type="number" min="1970" max="2026" placeholder="2023" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60" :class="scanRing">
            </div>
          </div>
        </template>

        <template v-else-if="step === 1">
          <h2 class="headline text-2xl">Dans quel état ?</h2>
          <p class="mt-2 max-w-[58ch] text-sm text-ink-soft">
            Soyez précis : transmission, freins, suspensions, batterie. Les annonces honnêtes
            reçoivent deux fois moins de négociation.
          </p>
          <div class="mt-6 grid gap-5">
            <fieldset>
              <legend class="roadsign-label text-xs text-ink-soft">État général</legend>
              <div class="mt-2 grid gap-2 sm:grid-cols-2">
                <label
                  v-for="(label, value) in conditionLabels"
                  :key="value"
                  class="flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-150"
                  :class="form.condition === value ? 'border-pine bg-pine/10' : 'border-line bg-paper hover:border-pine/50'"
                >
                  <input v-model="form.condition" type="radio" name="condition" :value="value" class="accent-[#1e4d38]">
                  {{ label }}
                </label>
              </div>
            </fieldset>
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="grid gap-1.5">
                <label for="v-taille" class="roadsign-label text-xs text-ink-soft">Taille</label>
                <input id="v-taille" v-model="form.size" type="text" required placeholder="M, 54, 29 pouces…" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
              </div>
              <div class="grid gap-1.5">
                <label for="v-km" class="roadsign-label text-xs text-ink-soft">Kilométrage estimé (optionnel)</label>
                <input id="v-km" v-model="form.km" type="number" min="0" placeholder="4 500" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="step === 2">
          <h2 class="headline text-2xl">Le juste prix</h2>
          <p class="mt-2 max-w-[58ch] text-sm text-ink-soft">
            Repère : −25 à −40 % la première année, puis environ −10 % par an,
            davantage si des consommables sont à prévoir.
          </p>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <label for="v-prix" class="roadsign-label text-xs text-ink-soft">Votre prix (€)</label>
              <input id="v-prix" v-model="form.price" type="number" min="1" required placeholder="1 490" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
            </div>
            <div class="grid gap-1.5">
              <label for="v-prix-neuf" class="roadsign-label text-xs text-ink-soft">Prix neuf constaté (optionnel)</label>
              <input id="v-prix-neuf" v-model="form.originalPrice" type="number" min="1" placeholder="2 500" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
            </div>
          </div>
          <p v-if="decote" class="tnum mt-4 inline-block rounded-xl bg-pine/10 px-3 py-2 text-sm font-medium">
            Décote affichée sur l'annonce : −{{ decote }} % — un argument qui rassure les acheteurs.
          </p>
        </template>

        <template v-else>
          <h2 class="headline text-2xl">Où et comment vous joindre ?</h2>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <label for="v-ville" class="roadsign-label text-xs text-ink-soft">Ville</label>
              <input id="v-ville" v-model="form.city" type="text" required placeholder="Marseille" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
            </div>
            <div class="grid gap-1.5">
              <label for="v-email" class="roadsign-label text-xs text-ink-soft">E-mail</label>
              <input id="v-email" v-model="form.email" type="email" required placeholder="vous@exemple.fr" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
            </div>
          </div>
          <p class="mt-4 text-sm text-ink-soft">
            Démo : rien n'est envoyé ni stocké. Sur la version complète, l'e-mail sert à la
            messagerie sécurisée entre acheteur et vendeur.
          </p>
        </template>

        <div class="mt-8 flex items-center justify-between gap-4">
          <button
            v-if="step > 0"
            type="button"
            class="pressable rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium transition-colors duration-150 hover:border-pine"
            @click="step--"
          >
            ← Retour
          </button>
          <span v-else />
          <button
            type="submit"
            class="pressable rounded-full px-6 py-3 text-[15px] font-semibold transition-colors duration-150"
            :class="stepValid ? 'bg-pine text-white hover:bg-pine-deep' : 'cursor-not-allowed bg-line text-ink-soft'"
            :disabled="!stepValid"
          >
            {{ step === steps.length - 1 ? 'Publier l\'annonce' : 'Continuer' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
