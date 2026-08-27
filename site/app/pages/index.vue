<script setup lang="ts">
import { bikes, getBike } from '~/data/bikes'
import { universes } from '~/data/universes'
import { formatPrice, mixHex } from '~/utils/site'

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
    <!-- Premier viewport : l'aplat — une affiche rouge, un vélo hors champ -->
    <section class="dot-grid-light relative overflow-hidden bg-flame text-white">
      <!-- Légende verticale de marge -->
      <p class="text-vertical roadsign-label absolute right-4 top-1/2 hidden -translate-y-1/2 text-[11px] tracking-[0.18em] text-white/55 xl:block" aria-hidden="true">
        Le marché du vélo d'occasion vérifié · France
      </p>

      <!-- Le vélo géant, coupé par le bord droit -->
      <NuxtLink
        :to="`/annonce/${hero.slug}`"
        class="group absolute -right-[16%] bottom-[-4%] z-0 hidden w-[62vw] max-w-4xl no-underline md:block"
        :aria-label="`Voir l'annonce du jour : ${hero.title}`"
      >
        <div class="transition-transform duration-250 ease-(--ease-out-strong) group-hover:-translate-x-3">
          <BikeIllustration kind="route" color="#fdfdfb" ink="#7a1f0c" :label="`Silhouette du ${hero.title}`" />
        </div>
        <!-- Sticker prix de l'annonce réelle -->
        <span class="absolute left-[8%] top-[4%] flex -rotate-3 items-center gap-3 rounded-2xl bg-card py-2.5 pl-4 pr-5 text-ink shadow-(--shadow-lift-lg) transition-transform duration-200 ease-(--ease-out-strong) group-hover:rotate-0">
          <span class="tnum headline text-xl">{{ formatPrice(hero.price) }}</span>
          <span class="text-sm leading-tight text-ink-soft">{{ hero.title }}<br><s class="tnum">{{ formatPrice(hero.originalPrice!) }}</s> neuf · annonce du jour</span>
        </span>
      </NuxtLink>

      <div class="relative z-10 mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
        <h1 class="headline rise-in text-[clamp(50px,8.6vw,118px)] leading-[0.96] text-white">
          Le vélo qu'il<br>
          vous faut a déjà<br>
          <span class="text-outline-white">roulé</span><span class="text-white">.</span>
        </h1>
        <p class="rise-in mt-6 max-w-[42ch] text-lg font-medium leading-relaxed text-white/90">
          Des vélos d'occasion inspectés sous toutes les coutures, vendus par des
          particuliers soigneux, des boutiques et des loueurs qui garantissent.
        </p>

        <div class="rise-in-late mt-8 max-w-xl">
          <SearchBox />
        </div>

        <div class="rise-in-late mt-6 flex flex-wrap items-center gap-3">
          <NuxtLink
            to="/#annonces"
            class="pressable rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white no-underline"
          >
            Explorer les annonces
          </NuxtLink>
          <NuxtLink
            to="/vendre"
            class="pressable rounded-full border-2 border-white/70 px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:border-white hover:bg-white/10"
          >
            Vendre mon vélo
          </NuxtLink>
        </div>

        <ul class="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/85">
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

        <!-- Mobile : le vélo déborde sous le contenu -->
        <NuxtLink
          :to="`/annonce/${hero.slug}`"
          class="relative -mb-20 mt-10 block w-[128%] no-underline md:hidden"
          :aria-label="`Voir l'annonce du jour : ${hero.title}`"
        >
          <BikeIllustration kind="route" color="#fdfdfb" ink="#7a1f0c" />
          <span class="absolute left-[6%] top-0 flex -rotate-3 items-center gap-2 rounded-xl bg-card px-3 py-2 text-ink shadow-(--shadow-lift-lg)">
            <span class="tnum headline text-base">{{ formatPrice(hero.price) }}</span>
            <span class="text-xs leading-tight text-ink-soft">{{ hero.title }}</span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <UniverseMarquee />

    <!-- Rail d'univers -->
    <section id="univers" class="scroll-mt-20 border-b border-line bg-card/60 py-14">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="headline text-5xl sm:text-6xl">Choisissez votre univers<span class="text-flame">.</span></h2>
            <p class="mt-3 max-w-[52ch] text-ink-soft">
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
          <h2 class="headline text-5xl sm:text-6xl">Elles viennent d'arriver<span class="text-flame">.</span></h2>
          <p class="mt-3 max-w-[52ch] text-ink-soft">
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

    <UniverseMarquee variant="slogan" />

    <!-- Bloc conversion : vendre — encre pleine largeur -->
    <section class="relative overflow-hidden bg-ink text-card">
      <div class="mx-auto grid max-w-6xl items-center gap-x-16 px-4 sm:px-6 lg:grid-cols-[3fr_2fr]">
        <div class="py-16 lg:py-20">
          <p class="roadsign-label text-xs text-card/50">Vendre sur Biclette</p>
          <h2 class="headline mt-4 max-w-lg text-5xl text-card sm:text-6xl">
            Votre vélo dort&nbsp;? Il vaut <span class="text-outline-light">de l'argent</span><span class="text-flame">.</span>
          </h2>
          <ol class="mt-8 space-y-4">
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
            class="pressable mt-9 inline-block rounded-full bg-flame px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-colors duration-150 hover:bg-flame-deep"
          >
            Déposer mon annonce — gratuit
          </NuxtLink>
        </div>
        <div class="relative hidden h-full items-center self-stretch lg:flex" aria-hidden="true">
          <svg class="absolute -right-32 -top-16" width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="172" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
            <circle cx="190" cy="190" r="112" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
          </svg>
          <div class="w-[120%]">
            <BikeIllustration kind="gravel" :color="mixHex('#131512', '#ffffff', 0.86)" ink="#5a5f5a" />
          </div>
          <span class="tnum absolute bottom-10 right-0 rotate-2 rounded-full bg-flame px-4 py-2 text-sm font-bold text-white">
            En ligne en 5 min
          </span>
        </div>
      </div>
    </section>

    <!-- Lots de fin de saison : l'angle Biclette -->
    <section class="border-b border-line py-16">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="roadsign-label text-xs text-flame-deep">L'exclusivité Biclette</p>
            <h2 class="headline mt-3 text-5xl sm:text-6xl">Les lots de <span class="text-outline">fin de saison</span><span class="text-flame">.</span></h2>
            <p class="mt-4 max-w-[58ch] leading-relaxed text-ink-soft">
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
      <h2 class="headline text-5xl sm:text-6xl">
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
