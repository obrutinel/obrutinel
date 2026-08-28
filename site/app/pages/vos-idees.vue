<script setup lang="ts">
usePageSeo({
  title: 'Vos idées pour améliorer Biclette',
  description:
    'Une idée, un problème, un détail qui vous gêne ? Dites-nous ce qui rendrait Biclette plus utile : chaque retour est lu et nourrit la feuille de route.',
})

const topics = [
  { value: 'idee', label: 'Une idée d\'amélioration' },
  { value: 'probleme', label: 'Un problème ou un bug' },
  { value: 'design', label: 'Design & lisibilité' },
  { value: 'autre', label: 'Autre chose' },
] as const

const form = reactive({
  topic: '',
  message: '',
  page: '',
  email: '',
})

const valid = computed(() => form.topic && form.message.trim().length >= 10)
const sent = ref(false)

function submit() {
  if (valid.value)
    sent.value = true
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'Vos idées' }]" />

    <header class="mt-6">
      <p class="roadsign-label text-xs text-pine">On trace la route ensemble</p>
      <h1 class="headline mt-2 text-4xl sm:text-5xl">Vos idées pour Biclette</h1>
      <p class="mt-3 max-w-[60ch] leading-relaxed text-ink-soft">
        Le site évolue chaque semaine. Une fonctionnalité qui manque, un détail
        qui vous gêne, une page peu claire : dites-le simplement — chaque
        retour est lu et nourrit la feuille de route.
      </p>
    </header>

    <div v-if="sent" class="rise-in mt-10 rounded-2xl border border-line bg-card p-8 text-center">
      <svg class="mx-auto" width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="20" stroke="#1e4d38" stroke-width="2.5" />
        <path d="M14 22.5l5.5 5.5L30 17" stroke="#1e4d38" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h2 class="headline mt-4 text-3xl">Merci pour le coup de main</h2>
      <p class="mx-auto mt-3 max-w-[52ch] leading-relaxed text-ink-soft">
        Sur le vrai Biclette, votre retour partirait directement dans la boîte
        de l'équipe. Ce site est une démonstration : rien n'est envoyé ni
        conservé.
      </p>
      <NuxtLink to="/" class="pressable mt-7 inline-block rounded-full bg-pine px-6 py-3 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-pine-deep">
        Retour à l'accueil
      </NuxtLink>
    </div>

    <form v-else class="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8" @submit.prevent="submit">
      <fieldset>
        <legend class="roadsign-label text-xs text-ink-soft">De quoi s'agit-il ?</legend>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          <label
            v-for="t in topics"
            :key="t.value"
            class="flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-150"
            :class="form.topic === t.value ? 'border-pine bg-pine/10' : 'border-line bg-paper hover:border-pine/50'"
          >
            <input v-model="form.topic" type="radio" name="topic" :value="t.value" class="accent-[#1e4d38]">
            {{ t.label }}
          </label>
        </div>
      </fieldset>

      <div class="mt-6 grid gap-1.5">
        <label for="f-message" class="roadsign-label text-xs text-ink-soft">Racontez-nous</label>
        <textarea
          id="f-message"
          v-model="form.message"
          required
          rows="5"
          minlength="10"
          placeholder="Ce qui vous aiderait, ce qui vous a gêné, ce que vous attendiez…"
          class="resize-y rounded-lg border border-line bg-paper px-3 py-2.5 leading-relaxed placeholder:text-ink-soft/60"
        />
      </div>

      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <div class="grid gap-1.5">
          <label for="f-page" class="roadsign-label text-xs text-ink-soft">Page concernée (optionnel)</label>
          <input id="f-page" v-model="form.page" type="text" placeholder="ex. la page d'une annonce" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
        </div>
        <div class="grid gap-1.5">
          <label for="f-email" class="roadsign-label text-xs text-ink-soft">E-mail (optionnel, pour vous répondre)</label>
          <input id="f-email" v-model="form.email" type="email" placeholder="vous@exemple.fr" class="rounded-lg border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
        </div>
      </div>

      <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p class="text-xs text-ink-soft">Démo : rien n'est envoyé ni stocké.</p>
        <button
          type="submit"
          class="pressable rounded-full px-6 py-3 text-[15px] font-semibold transition-colors duration-150"
          :class="valid ? 'bg-pine text-white hover:bg-pine-deep' : 'cursor-not-allowed bg-line text-ink-soft'"
          :disabled="!valid"
        >
          Envoyer mon retour
        </button>
      </div>
    </form>
  </div>
</template>
