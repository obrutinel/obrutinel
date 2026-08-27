<script setup lang="ts">
import { universes } from '~/data/universes'
import { SITE_BASELINE } from '~/utils/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-card">
    <div class="h-[3px] w-full" style="background: repeating-linear-gradient(90deg, var(--color-borne) 0 26px, transparent 26px 44px)" aria-hidden="true" />
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <NuxtLink to="/" class="flex items-center gap-2.5 no-underline" aria-label="Recyclette, accueil">
          <BrandMark :size="30" />
          <span class="font-display text-2xl font-bold uppercase tracking-wide">Recyclette</span>
        </NuxtLink>
        <p class="mt-3 max-w-xs text-sm leading-relaxed text-card/70">
          {{ SITE_BASELINE }}. Le marché du vélo d'occasion entre particuliers,
          boutiques et loueurs professionnels.
        </p>
        <p class="mt-6 text-xs text-card/50">
          Site de démonstration — les annonces présentées sont fictives.
        </p>
      </div>

      <nav aria-label="Univers de vélos">
        <h2 class="roadsign-label text-sm text-borne">Les univers</h2>
        <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <li v-for="u in universes" :key="u.slug">
            <NuxtLink :to="`/velos/${u.slug}`" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-borne">
              {{ u.h1 }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Recyclette">
        <h2 class="roadsign-label text-sm text-borne">Recyclette</h2>
        <ul class="mt-4 space-y-2.5">
          <li><NuxtLink to="/vendre" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-borne">Vendre un vélo</NuxtLink></li>
          <li><NuxtLink to="/pro" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-borne">Boutiques & loueurs : déstockez</NuxtLink></li>
          <li><NuxtLink to="/comment-ca-marche" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-borne">Comment ça marche</NuxtLink></li>
          <li><NuxtLink to="/a-propos" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-borne">À propos</NuxtLink></li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-card/10">
      <p class="mx-auto max-w-6xl px-4 py-5 text-xs text-card/50 sm:px-6">
        © {{ year }} Recyclette — km 0 du vélo d'occasion.
      </p>
    </div>
  </footer>
</template>
