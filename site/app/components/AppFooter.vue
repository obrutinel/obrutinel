<script setup lang="ts">
import { universes } from '~/data/universes'
import { SITE_BASELINE } from '~/utils/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="overflow-hidden bg-ink text-card">
    <!-- Le nom, à l'échelle du mur -->
    <p class="headline text-outline-light -mb-[0.12em] select-none whitespace-nowrap text-center text-[12.2vw] leading-none" aria-hidden="true">
      biclette
    </p>
    <div class="mx-auto grid max-w-6xl gap-10 border-t border-card/10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <NuxtLink to="/" class="flex items-center gap-2.5 no-underline" aria-label="Biclette, accueil">
          <BrandMark :size="30" tone="light" />
          <span class="headline text-[22px] text-card">biclette</span>
        </NuxtLink>
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-card/65">
          {{ SITE_BASELINE }}. Achetez et vendez de beaux vélos entre
          particuliers, boutiques et loueurs professionnels.
        </p>
        <p class="mt-6 text-xs text-card/40">
          Site de démonstration — les annonces présentées sont fictives.
        </p>
      </div>

      <nav aria-label="Univers de vélos">
        <h2 class="roadsign-label text-xs text-card/50">Les univers</h2>
        <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <li v-for="u in universes" :key="u.slug">
            <NuxtLink :to="`/velos/${u.slug}`" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-card">
              {{ u.h1 }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Biclette">
        <h2 class="roadsign-label text-xs text-card/50">Biclette</h2>
        <ul class="mt-4 space-y-2.5">
          <li><NuxtLink to="/vendre" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-card">Vendre un vélo</NuxtLink></li>
          <li><NuxtLink to="/pro" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-card">Boutiques & loueurs : déstockez</NuxtLink></li>
          <li><NuxtLink to="/comment-ca-marche" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-card">Comment ça marche</NuxtLink></li>
          <li><NuxtLink to="/a-propos" class="text-sm text-card/80 no-underline transition-colors duration-150 hover:text-card">À propos</NuxtLink></li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-card/10">
      <p class="mx-auto max-w-6xl px-4 py-5 text-xs text-card/40 sm:px-6">
        © {{ year }} Biclette — l'occasion de bien rouler.
      </p>
    </div>
  </footer>
</template>
