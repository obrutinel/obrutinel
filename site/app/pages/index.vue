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
const hero = getBike('specialized-stumpjumper-evo-2023')!
</script>

<template>
  <div>
    <!-- Premier viewport : la brume, les crêtes, la promesse -->
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-56 sm:h-72" aria-hidden="true">
        <RidgeScape tone="light" />
      </div>

      <div class="relative mx-auto grid max-w-6xl items-center gap-x-12 gap-y-10 px-4 pb-36 pt-14 sm:px-6 sm:pb-44 lg:grid-cols-[11fr_9fr] lg:pb-48 lg:pt-20">
        <div class="rise-in">
          <p class="roadsign-label text-xs text-pine">
            Le marché du vélo d'occasion vérifié
          </p>
          <h1 class="headline mt-4 max-w-xl text-balance text-[42px] sm:text-6xl lg:text-[64px]">
            Le vélo qu'il vous faut
            a&nbsp;déjà <span class="text-pine">roulé.</span>
          </h1>
          <p class="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Des vélos d'occasion inspectés sous toutes les coutures, vendus par des
            particuliers soigneux, des boutiques et des loueurs qui garantissent.
          </p>

          <div class="mt-8 max-w-xl">
            <SearchBox />
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/#annonces"
              class="pressable rounded-full bg-pine px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-pine-deep"
            >
              Explorer les annonces
            </NuxtLink>
            <NuxtLink
              to="/vendre"
              class="pressable rounded-full border border-ink/20 bg-card px-6 py-3.5 text-[15px] font-semibold text-ink no-underline transition-colors duration-150 hover:border-pine hover:text-pine"
            >
              Vendre mon vélo
            </NuxtLink>
          </div>

          <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" class="text-pine" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Vendeurs identifiés
            </li>
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" class="text-pine" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Pros contrôlés &amp; garantis
            </li>
            <li class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" class="text-pine" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.6" /><path d="M5.5 9.3l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Décote affichée
            </li>
          </ul>
        </div>

        <!-- Le vélo vedette, posé devant la crête -->
        <NuxtLink :to="`/annonce/${hero.slug}`" class="rise-in-late group relative block no-underline" :aria-label="`Voir l'annonce ${hero.title}`">
          <div class="relative overflow-hidden rounded-3xl border border-line bg-card shadow-(--shadow-lift) transition-shadow duration-250 ease-(--ease-out-strong) group-hover:shadow-(--shadow-lift-lg)">
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-60" aria-hidden="true">
              <RidgeScape tone="light" :sun="false" />
            </div>
            <span class="roadsign-label absolute right-4 top-4 rounded-full bg-pine px-3 py-1.5 text-[10.5px] text-white">
              Annonce du jour
            </span>
            <div class="relative px-6 pb-2 pt-8">
              <div class="mx-auto aspect-16/10 max-w-sm transition-transform duration-250 ease-(--ease-out-strong) group-hover:scale-[1.02]">
                <BikeIllustration kind="vtt" :color="hero.color" :label="`Silhouette du ${hero.title}`" />
              </div>
            </div>
            <div class="relative flex items-end justify-between gap-3 px-6 pb-6">
              <div>
                <p class="font-semibold leading-snug">{{ hero.title }}</p>
                <p class="tnum text-sm text-ink-soft">{{ hero.year }} · {{ hero.size }} · {{ hero.city }}</p>
              </div>
              <PriceTag :price="hero.price" :original-price="hero.originalPrice" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Rail d'univers -->
    <section id="univers" class="scroll-mt-20 border-y border-line bg-card/70 py-14">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="headline text-3xl sm:text-4xl">Choisissez votre univers</h2>
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
          <h2 class="headline text-3xl sm:text-4xl">Elles viennent d'arriver</h2>
          <p class="mt-2 max-w-[52ch] text-ink-soft">
            Les belles occasions partent vite — celles-ci sont en ligne depuis moins de deux semaines.
          </p>
        </div>
        <NuxtLink to="/velos/vtt" class="pressable rounded-full border border-ink/20 bg-card px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-150 hover:border-pine hover:text-pine">
          Toutes les annonces →
        </NuxtLink>
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BikeCard v-for="b in selection" :key="b.slug" :bike="b" />
      </div>
    </section>

    <!-- Bloc conversion : vendre — le soir en altitude -->
    <section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div class="relative overflow-hidden rounded-3xl bg-pine-deep text-card">
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-90" aria-hidden="true">
          <RidgeScape tone="dark" />
        </div>
        <div class="relative grid gap-x-16 p-8 sm:p-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <p class="roadsign-label text-xs text-card/55">Vendre sur Biclette</p>
            <h2 class="headline mt-3 max-w-md text-3xl text-card sm:text-4xl">
              Votre vélo dort&nbsp;? Il vaut de l'argent.
            </h2>
            <ol class="mt-7 space-y-4">
              <li class="flex gap-4">
                <span class="tnum headline mt-0.5 text-lg text-amber-soft">1</span>
                <p class="max-w-[52ch] text-card/85">Décrivez votre vélo en 4 étapes guidées — cinq minutes, montre en main.</p>
              </li>
              <li class="flex gap-4">
                <span class="tnum headline mt-0.5 text-lg text-amber-soft">2</span>
                <p class="max-w-[52ch] text-card/85">Fixez le juste prix : nous affichons la décote face au prix neuf constaté.</p>
              </li>
              <li class="flex gap-4">
                <span class="tnum headline mt-0.5 text-lg text-amber-soft">3</span>
                <p class="max-w-[52ch] text-card/85">Votre annonce paraît dans le bon univers, devant des acheteurs qui cherchent exactement ça.</p>
              </li>
            </ol>
            <NuxtLink
              to="/vendre"
              class="pressable mt-8 inline-block rounded-full bg-card px-6 py-3.5 text-[15px] font-semibold text-pine-deep no-underline transition-colors duration-150 hover:bg-white"
            >
              Déposer mon annonce — gratuit
            </NuxtLink>
          </div>
          <div class="relative hidden items-center lg:flex" aria-hidden="true">
            <div class="w-full">
              <BikeIllustration kind="gravel" color="#9db8a4" ink="#0e2419" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lots de fin de saison : l'angle Biclette -->
    <section class="border-y border-line bg-card/70 py-16">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="roadsign-label text-xs text-amber">L'exclusivité Biclette</p>
            <h2 class="headline mt-3 text-3xl sm:text-4xl">Les lots de fin de saison</h2>
            <p class="mt-3 max-w-[58ch] leading-relaxed text-ink-soft">
              Chaque automne, les loueurs renouvellent leur flotte : des vélos d'une ou deux
              saisons, suivis chaque semaine par des mécaniciens, révisés avant la vente et
              garantis. Le meilleur rapport qualité-prix de l'occasion.
            </p>
          </div>
          <NuxtLink to="/pro" class="pressable rounded-full border border-ink/20 bg-card px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-150 hover:border-pine hover:text-pine">
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
      <h2 class="headline text-3xl sm:text-4xl">
        L'occasion, sans les mauvaises surprises
      </h2>
      <dl class="divide-y divide-line">
        <div class="grid gap-1 py-5 first:pt-0 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs text-pine">Vendeurs identifiés</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Particulier, boutique ou loueur professionnel : le statut du vendeur est affiché
            sur chaque annonce, avec son historique et sa localisation.
          </dd>
        </div>
        <div class="grid gap-1 py-5 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs text-pine">État détaillé</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Kilométrage, consommables, entretien, capacité de batterie pour les VAE :
            les annonces disent ce qu'un essai ne montre pas, prix neuf constaté à l'appui.
          </dd>
        </div>
        <div class="grid gap-1 py-5 last:pb-0 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt class="roadsign-label pt-1 text-xs text-pine">Pros contrôlés &amp; garantis</dt>
          <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
            Les vélos vendus par les boutiques et loueurs partenaires sont révisés en atelier
            et garantis de 3 à 12 mois. La confiance du neuf, la décote de l'occasion.
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
