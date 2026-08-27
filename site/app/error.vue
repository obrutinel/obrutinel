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
        <BikeIllustration kind="route" color="#c03018" />
      </div>
      <p class="roadsign-label mt-6 text-sm text-cartouche">
        {{ is404 ? 'Erreur 404' : `Erreur ${error.statusCode}` }}
      </p>
      <h1 class="mt-2 text-balance font-display text-4xl font-bold uppercase sm:text-5xl">
        {{ is404 ? 'Cette route ne mène nulle part' : 'Crevaison en cours de route' }}
      </h1>
      <p class="mx-auto mt-4 max-w-[48ch] leading-relaxed text-ink-soft">
        {{ is404
          ? "La page que vous cherchez a été déplacée, vendue, ou n'a jamais existé. Reprenez la route depuis l'accueil ou explorez les univers."
          : 'Quelque chose a déraillé de notre côté. Réessayez dans un instant.' }}
      </p>
      <button type="button" class="pressable roadsign-label mt-8 rounded-sm bg-ink px-6 py-3.5 text-sm text-borne" @click="clearError({ redirect: '/' })">
        Retour à l'accueil
      </button>
    </main>
    <AppFooter />
  </div>
</template>
