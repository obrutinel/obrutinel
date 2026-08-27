<script setup lang="ts">
import { bikes, getBike } from '~/data/bikes'
import { universes } from '~/data/universes'
import { formatPrice } from '~/utils/site'

usePageSeo({
  title: "Vélos d'occasion entre particuliers, boutiques et loueurs",
  description:
    "Achetez et vendez des vélos d'occasion vérifiés : VTT, route, gravel, VAE, cargo… Annonces de particuliers, boutiques et loueurs pros qui déstockent leur flotte en fin de saison.",
})

const selection = [...bikes].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo).slice(0, 8)
const lots = bikes.filter(b => b.lot).slice(0, 3)

// Vélo vedette du hero : une vraie annonce, cliquable.
const hero = getBike('canyon-ultimate-cf-sl-2023')!
</script>

<template>
  <div>
    <!-- Premier viewport : la promesse, la recherche, le vélo vedette -->
    <section class="relative overflow-hidden">
      <!-- Le motif de la marque, à l'échelle de la page -->
      <svg class="pointer-events-none absolute -right-40 -top-56 hidden lg:block" width="620" height="620" viewBox="0 0 620 620" fill="none" aria-hidden="true">
        <circle cx="310" cy="310" r="288" stroke="#e2e2d8" stroke-width="2" />
        <circle cx="310" cy="310" r="196" stroke="#e2e2d8" stroke-width="2" />
        <g fill="#e2e2d8">
          <circle cx="310" cy="68" r="9" /><circle cx="540" cy="235" r="9" /><circle cx="452" cy="505" r="9" /><circle cx="168" cy="505" r="9" /><circle cx="80" cy="235" r="9" />
        </g>
      </svg>
      <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[11fr_9fr] lg:pb-20 lg:pt-16">
        <div class="rise-in">
          <p class="roadsign-label text-xs text-flame-deep">
            Le marché du vélo d'occasion vérifié
          </p>
          <h1 class="headline mt-4 text-[44px] sm:text-6xl lg:text-7xl">
            Le vélo qu'il vous faut<br>
            a déjà <span class="text-outline">roulé</span><span class="text-flame">.</span>
          </h1>
          <p class="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Des vélos d'occasion inspectés sous toutes les coutures, vendus par des
            particuliers soigneux, des boutiques et des loueurs qui garantissent.
          </p>

          <div class="mt-8 max-w-xl">
            <SearchBox />
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/#annonces"
              class="pressable rounded-full bg-flame px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-flame-deep"
            >
              Explorer les annonces
            </NuxtLink>
            <NuxtLink
              to="/vendre"
              class="pressable rounded-full border border-ink/20 bg-card px-6 py-3.5 text-[15px] font-semibold text-ink no-underline transition-colors duration-150 hover:border-ink"
            >
              Vendre mon vélo
            </NuxtLink>
          </div>

          <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Vendeurs identifiés
            </li>
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Pros contrôlés &amp; garantis
            </li>
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Décote affichée
            </li>
          </ul>
        </div>

        <!-- Le vélo vedette, exposé comme en vitrine -->
        <NuxtLink :to="`/annonce/${hero.slug}`" class="rise-in-late group relative block no-underline" :aria-label="`Voir l'annonce ${hero.title}`">
          <div class="relative overflow-hidden rounded-3xl border border-line bg-card p-6 pb-10 shadow-(--shadow-lift) transition-shadow duration-250 ease-(--ease-out-strong) group-hover:shadow-(--shadow-lift-lg)">
            <!-- La roue en écho : un grand cercle teinté derrière le vélo -->
            <div
              class="absolute left-1/2 top-[46%] aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              :style="{ backgroundColor: `color-mix(in srgb, ${hero.color} 14%, #f6f6f1)` }"
              aria-hidden="true"
            />
            <div class="relative transition-transform duration-250 ease-(--ease-out-strong) group-hover:scale-[1.02]">
              <BikeIllustration kind="route" :color="hero.color" :label="`Silhouette du ${hero.title}`" />
            </div>
            <!-- Carte prix de l'annonce réelle -->
            <div class="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-card py-2.5 pl-4 pr-5 shadow-(--shadow-lift)">
              <span class="tnum headline text-xl">{{ formatPrice(hero.price) }}</span>
              <span class="text-sm leading-tight text-ink-soft">{{ hero.title }}<br><s class="tnum">{{ formatPrice(hero.originalPrice!) }}</s> neuf</span>
            </div>
            <span class="roadsign-label absolute right-5 top-5 -rotate-3 rounded-full bg-ink px-3.5 py-2 text-[10.5px] text-card transition-transform duration-200 ease-(--ease-out-strong) group-hover:rotate-0">
              Annonce du jour
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <UniverseMarquee />

    <!-- Rail d'univers -->
    <section id="univers" class="scroll-mt-20 border-y border-line bg-card/60 py-14">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="headline text-4xl sm:text-5xl">Choisissez votre univers<span class="text-flame">.</span></h2>
            <p class="mt-2 max-w-[52ch] text-ink-soft">
              Chaque discipline a son marché, ses marques, ses points de contrôle.
              Entrez par la bonne porte.
            </p>
          </div>
          <p class="tnum text-sm text-ink-soft">{{ universes.length }} univers · {{ bikes.length }} annonces</p>
        </div>
      </div>
      <div class="mx-auto mt-8 max-w-6xl overflow-x-auto px-4 pb-4 sm:px-6" style="scrollbar-width: thin">
        <div class="flex snap-x snap-mandatory gap-4">
          <UniverseCard v-for="u in universes" :key="u.slug" :universe="u" />
        </div>
      </div>
    </section>

    <!-- Dernières annonces -->
    <section id="annonces" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="headline text-4xl sm:text-5xl">Elles viennent d'arriver<span class="text-flame">.</span></h2>
          <p class="mt-2 max-w-[52ch] text-ink-soft">
            Les belles occasions partent vite — celles-ci sont en ligne depuis moins de deux semaines.
          </p>
        </div>
        <NuxtLink to="/velos/vtt" class="pressable rounded-full border border-ink/20 bg-card px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-150 hover:border-ink">
          Toutes les annonces →
        </NuxtLink>
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BikeCard v-for="b in selection" :key="b.slug" :bike="b" />
      </div>
    </section>

    <!-- Bloc conversion : vendre -->
    <section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div class="grid overflow-hidden rounded-3xl bg-ink text-card lg:grid-cols-[3fr_2fr]">
        <div class="p-8 sm:p-12">
          <p class="roadsign-label text-xs text-card/50">Vendre sur Recyclette</p>
          <h2 class="headline mt-3 max-w-md text-4xl text-card sm:text-5xl">
            Votre vélo dort ? Il vaut <span class="text-outline-light">de l'argent</span><span class="text-flame">.</span>
          </h2>
          <ol class="mt-7 space-y-4">
            <li class="flex gap-4">
              <span class="tnum headline mt-0.5 text-lg text-flame">1</span>
              <p class="max-w-[52ch] text-card/80">Décrivez votre vélo en 4 étapes guidées — cinq minutes, montre en main.</p>
            </li>
            <li class="flex gap-4">
              <span class="tnum headline mt-0.5 text-lg text-flame">2</span>
              <p class="max-w-[52ch] text-card/80">Fixez le juste prix : nous affichons la décote face au prix neuf constaté.</p>
            </li>
            <li class="flex gap-4">
              <span class="tnum headline mt-0.5 text-lg text-flame">3</span>
              <p class="max-w-[52ch] text-card/80">Votre annonce paraît dans le bon univers, devant des acheteurs qui cherchent exactement ça.</p>
            </li>
          </ol>
          <NuxtLink
            to="/vendre"
            class="pressable mt-8 inline-block rounded-full bg-flame px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-flame-deep"
          >
            Déposer mon annonce — gratuit
          </NuxtLink>
        </div>
        <div class="relative hidden items-center justify-center overflow-hidden bg-[#1d201c] p-10 lg:flex" aria-hidden="true">
          <!-- Le motif plateau, en creux dans la nuit de l'atelier -->
          <svg class="absolute -right-24 -top-24" width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="172" stroke="#ffffff" stroke-opacity="0.07" stroke-width="2" />
            <circle cx="190" cy="190" r="112" stroke="#ffffff" stroke-opacity="0.07" stroke-width="2" />
          </svg>
          <div class="w-full max-w-sm">
            <BikeIllustration kind="gravel" color="#a66b2e" ink="#e9e9e2" />
          </div>
          <span class="tnum absolute bottom-8 right-8 rotate-2 rounded-full bg-flame px-4 py-2 text-sm font-semibold text-white">
            En ligne en 5 min
          </span>
        </div>
      </div>
    </section>

    <!-- Lots de fin de saison : l'angle Recyclette -->
    <section class="border-y border-line bg-card/60 py-16">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="roadsign-label text-xs text-flame-deep">L'exclusivité Recyclette</p>
            <h2 class="headline mt-3 text-4xl sm:text-5xl">Les lots de fin de saison<span class="text-flame">.</span></h2>
            <p class="mt-3 max-w-[58ch] leading-relaxed text-ink-soft">
              Chaque automne, les loueurs renouvellent leur flotte : des vélos d'une ou deux
              saisons, suivis chaque semaine par des mécaniciens, révisés avant la vente et
              garantis. Le meilleur rapport qualité-prix de l'occasion.
            </p>
          </div>
          <NuxtLink to="/pro" class="pressable rounded-full border border-ink/20 bg-card px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-150 hover:border-ink">
            Vous êtes loueur ? Déstockez →
          </NuxtLink>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BikeCard v-for="b in lots" :key="b.slug" :bike="b" />
        </div>
      </div>
    </section>

    <!-- Réassurance -->
    <section class="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr]">
      <h2 class="headline text-4xl sm:text-5xl">
        L'occasion, sans les mauvaises surprises<span class="text-flame">.</span>
      </h2>
      <dl class="divide-y divide-line">
        <div class="grid gap-1 py-5 first:pt-0 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs">Vendeurs identifiés</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Particulier, boutique ou loueur professionnel : le statut du vendeur est affiché
            sur chaque annonce, avec son historique et sa localisation.
          </dd>
        </div>
        <div class="grid gap-1 py-5 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs">État détaillé</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Kilométrage, consommables, entretien, capacité de batterie pour les VAE :
            les annonces disent ce qu'un essai ne montre pas, prix neuf constaté à l'appui.
          </dd>
        </div>
        <div class="grid gap-1 py-5 last:pb-0 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs">Pros contrôlés &amp; garantis</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Les vélos vendus par les boutiques et loueurs partenaires sont révisés en atelier
            et garantis de 3 à 12 mois. La confiance du neuf, la décote de l'occasion.
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
