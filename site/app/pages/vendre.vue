<script setup lang="ts">
import type { ScanResult } from '~/components/PhotoScan.vue'
import type { Bike } from '~/data/types'
import type { PriceExtras } from '~/utils/cote'
import { conditionLabels } from '~/data/bikes'
import { universes } from '~/data/universes'
import { suggestPrice } from '~/utils/cote'
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

// Petits plus déclarés à l'étape état : ils affinent le prix conseillé.
const extras = reactive<PriceExtras>({})
const extraOptions = computed(() => {
  const opts: { key: keyof PriceExtras, label: string }[] = [
    { key: 'drivetrain', label: 'Consommables récents (chaîne, pneus, plaquettes)' },
    { key: 'invoice', label: 'Facture d\'achat disponible' },
    { key: 'maintenance', label: 'Entretien suivi (carnet ou factures d\'atelier)' },
  ]
  if (form.universe === 'vae')
    opts.push({ key: 'battery', label: 'Batterie récente ou moins de 300 cycles' })
  return opts
})

const advice = computed(() => {
  const originalPrice = Number(form.originalPrice)
  if (!originalPrice || !form.universe || !form.year || !form.condition)
    return null
  return suggestPrice({
    universe: form.universe,
    year: Number(form.year),
    condition: form.condition as Bike['condition'],
    originalPrice,
    km: Number(form.km) || undefined,
  }, extras)
})

// Ce qui manque encore pour un conseil honnête — jamais de prix inventé.
const adviceHint = computed(() => {
  if (advice.value)
    return null
  const o = Number(form.originalPrice)
  if (!o)
    return 'Renseignez le prix neuf constaté pour obtenir un prix de vente conseillé.'
  if (o < 200 || o > 20000)
    return 'Prix neuf inhabituel : le prix conseillé est calculé entre 200 € et 20 000 €.'
  if (!form.year)
    return 'Ajoutez l\'année du vélo (étape « Le vélo ») pour obtenir un prix de vente conseillé.'
  return null
})

const priceWarning = computed(() => {
  const a = advice.value
  const p = Number(form.price)
  if (!a || !p)
    return null
  if (p > a.patient)
    return `Au-dessus de ${formatPrice(a.patient)}, votre annonce risque d'apparaître « au-dessus du marché » sur sa jauge de cote.`
  if (p < a.quick * 0.9)
    return 'Vous êtes nettement sous la fourchette : vous pouvez probablement vendre plus cher.'
  return null
})

const seasonNote = computed(() => {
  const a = advice.value
  if (!a?.season)
    return null
  return a.season === 'haute'
    ? 'C\'est la haute saison de vente pour cet univers — le conseil en tient compte (+5 %).'
    : 'Saison creuse pour cet univers : le conseil est ajusté (−5 %). Patientez quelques mois si vous n\'êtes pas pressé.'
})

/** Position d'un prix sur la fourchette min–max, en % (pour le rail). */
function railPos(value: number) {
  const a = advice.value!
  return `${8 + ((value - a.min) / (a.max - a.min)) * 84}%`
}

const justUsedPrice = ref(false)
function usePrice(value: number) {
  form.price = String(value)
  justUsedPrice.value = true
  setTimeout(() => {
    justUsedPrice.value = false
  }, 1600)
}
const priceRing = computed(() =>
  justUsedPrice.value ? 'ring-2 ring-pine/40 transition-shadow duration-500' : 'transition-shadow duration-500')

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
            <fieldset>
              <legend class="roadsign-label text-xs text-ink-soft">Les petits plus (optionnel — ils affinent le prix conseillé)</legend>
              <div class="mt-2 grid gap-2 sm:grid-cols-2">
                <label
                  v-for="opt in extraOptions"
                  :key="opt.key"
                  class="flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors duration-150"
                  :class="extras[opt.key] ? 'border-pine bg-pine/10' : 'border-line bg-paper hover:border-pine/50'"
                >
                  <input v-model="extras[opt.key]" type="checkbox" class="shrink-0 accent-[#1e4d38]">
                  {{ opt.label }}
                </label>
              </div>
            </fieldset>
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
              <label for="v-prix-neuf" class="roadsign-label text-xs text-ink-soft">Prix neuf constaté (optionnel)</label>
              <input id="v-prix-neuf" v-model="form.originalPrice" type="number" min="1" placeholder="2 500" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
            </div>
            <div class="grid gap-1.5">
              <label for="v-prix" class="roadsign-label text-xs text-ink-soft">Votre prix (€)</label>
              <input id="v-prix" v-model="form.price" type="number" min="1" required placeholder="1 490" class="tnum rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60" :class="priceRing">
            </div>
          </div>

          <!-- Prix conseillé : uniquement quand le calcul est honnêtement possible. -->
          <div v-if="advice" class="rise-in mt-6 rounded-xl border border-line bg-paper p-5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 class="headline text-lg">Prix de vente conseillé</h3>
              <p class="tnum text-xs text-ink-soft">
                Fourchette du marché : {{ formatPrice(advice.min) }} – {{ formatPrice(advice.max) }}
              </p>
            </div>

            <div
              class="relative mt-4 h-2 rounded-full"
              style="background: linear-gradient(90deg, #1e4d38 0%, #6f9683 32%, #dde1d8 50%, #e2c194 72%, #c9701f 100%)"
              aria-hidden="true"
            >
              <span class="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pine bg-card" :style="{ left: railPos(advice.quick) }" />
              <span class="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-soft bg-card" :style="{ left: railPos(advice.patient) }" />
            </div>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div class="rounded-lg border border-line bg-card p-4">
                <p class="roadsign-label text-xs text-pine">Vente rapide</p>
                <p class="tnum headline mt-1 text-2xl">{{ formatPrice(advice.quick) }}</p>
                <p class="mt-1 text-xs text-ink-soft">Part généralement en ~1 semaine.</p>
                <button type="button" class="pressable mt-3 rounded-full border border-pine px-4 py-1.5 text-xs font-semibold text-pine transition-colors duration-150 hover:bg-pine hover:text-white" @click="usePrice(advice.quick)">
                  Utiliser ce prix
                </button>
              </div>
              <div class="rounded-lg border border-line bg-card p-4">
                <p class="roadsign-label text-xs text-ink-soft">Prix patient</p>
                <p class="tnum headline mt-1 text-2xl">{{ formatPrice(advice.patient) }}</p>
                <p class="mt-1 text-xs text-ink-soft">Comptez plutôt 3 à 4 semaines.</p>
                <button type="button" class="pressable mt-3 rounded-full border border-line px-4 py-1.5 text-xs font-semibold transition-colors duration-150 hover:border-pine hover:text-pine" @click="usePrice(advice.patient)">
                  Utiliser ce prix
                </button>
              </div>
            </div>

            <p v-if="seasonNote" class="mt-4 text-sm text-ink-soft">{{ seasonNote }}</p>
            <p v-if="priceWarning" class="mt-3 rounded-lg bg-amber-soft/60 px-3 py-2 text-sm text-amber-deep">
              {{ priceWarning }}
            </p>

            <details class="mt-4 text-xs text-ink-soft">
              <summary class="cursor-pointer font-medium underline-offset-2 hover:text-ink hover:underline">
                Comment est calculé ce prix ?
              </summary>
              <p class="mt-2 max-w-[58ch] leading-relaxed">
                Prix neuf constaté × courbe de décote de l'univers selon l'âge
                × état général × kilométrage × saison, plus vos petits plus
                (consommables, factures, entretien{{ form.universe === 'vae' ? ', batterie' : '' }}).
                Estimation heuristique de démonstration : sur le vrai Biclette,
                elle sera calibrée en continu avec les prix de vente réels.
              </p>
            </details>
          </div>
          <p v-else-if="adviceHint" class="mt-5 rounded-lg border border-dashed border-line bg-paper px-3.5 py-2.5 text-sm text-ink-soft">
            {{ adviceHint }}
          </p>

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
