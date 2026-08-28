<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: is404.value ? 'Page introuvable' : 'Erreur',
  robots: 'noindex',
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper text-ink">
    <AppHeader />
    <main class="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div class="h-32 w-56" aria-hidden="true">
        <BikeIllustration kind="route" color="#1e4d38" />
      </div>
      <p class="roadsign-label mt-6 text-sm text-amber">
        {{ is404 ? 'Erreur 404' : `Erreur ${error.statusCode}` }}
      </p>
      <h1 class="headline mt-2 text-balance text-4xl sm:text-5xl">
        {{ is404 ? 'Ce col n\'existe pas' : 'Crevaison en cours de route' }}
      </h1>
      <p class="mx-auto mt-4 max-w-[48ch] leading-relaxed text-ink-soft">
        {{ is404
          ? "La page que vous cherchez a été déplacée, vendue, ou n'a jamais existé. Reprenez la route depuis l'accueil ou explorez les univers."
          : 'Quelque chose a déraillé de notre côté. Réessayez dans un instant.' }}
      </p>
      <button type="button" class="pressable mt-8 rounded-full bg-pine px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-pine-deep" @click="clearError({ redirect: '/' })">
        Retour à l'accueil
      </button>
    </main>
    <AppFooter />
  </div>
</template>
