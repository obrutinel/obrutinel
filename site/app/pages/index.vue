<script setup lang="ts">
import { bikes } from '~/data/bikes'
import { sellers } from '~/data/sellers'
import { universes } from '~/data/universes'

usePageSeo({
  title: "Vélos d'occasion entre particuliers, boutiques et loueurs",
  description:
    "Achetez et vendez des vélos d'occasion vérifiés : VTT, route, gravel, VAE, cargo… Annonces de particuliers, boutiques et loueurs pros qui déstockent leur flotte en fin de saison.",
})

const selection = [...bikes].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo).slice(0, 8)
const lots = bikes.filter(b => b.lot)
const proCount = sellers.filter(s => s.type !== 'particulier').length
</script>

<template>
  <div>
    <!-- Premier viewport : la borne, l'offre, l'action -->
    <section class="bg-borne">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[7fr_5fr] lg:pb-20 lg:pt-16">
        <div class="rise-in">
          <p class="roadsign-label text-sm text-ink/70">Le marché du vélo d'occasion</p>
          <h1 class="mt-3 max-w-xl text-balance font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
            De beaux vélos.<br>Une seconde vie.
          </h1>
          <p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink/80">
            Recyclette met en relation acheteurs et vendeurs de vélos d'occasion :
            particuliers soigneux, boutiques qui contrôlent et garantissent,
            loueurs qui déstockent leur flotte en fin de saison.
          </p>
          <div class="mt-7 max-w-xl">
            <SearchBox />
          </div>
          <dl class="tnum mt-8 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <dt class="text-sm text-ink/60">Annonces vérifiées</dt>
              <dd class="font-display text-3xl font-bold">{{ bikes.length }}</dd>
            </div>
            <div>
              <dt class="text-sm text-ink/60">Univers de vélos</dt>
              <dd class="font-display text-3xl font-bold">{{ universes.length }}</dd>
            </div>
            <div>
              <dt class="text-sm text-ink/60">Pros & loueurs</dt>
              <dd class="font-display text-3xl font-bold">{{ proCount }}</dd>
            </div>
          </dl>
        </div>
        <div class="rise-in hidden lg:block" aria-hidden="true">
          <BikeIllustration kind="route" color="#17140e" class="scale-x-[-1]" />
        </div>
      </div>
    </section>

    <!-- Univers -->
    <section id="univers" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-display text-3xl font-bold uppercase sm:text-4xl">Choisissez votre univers</h2>
        <p class="max-w-[46ch] text-sm text-ink-soft">
          Chaque discipline a son marché, ses marques et ses points de contrôle.
          Entrez par la bonne porte.
        </p>
      </div>
      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniverseCard v-for="u in universes" :key="u.slug" :universe="u" />
      </div>
    </section>

    <!-- Lots fin de saison : l'angle Recyclette -->
    <section class="bg-ink text-card">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="roadsign-label text-sm text-borne">Déstockage de flottes</p>
            <h2 class="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">Les lots de fin de saison</h2>
            <p class="mt-3 max-w-[58ch] leading-relaxed text-card/75">
              Chaque automne, loueurs et boutiques renouvellent leur flotte : des vélos
              d'une ou deux saisons, entretenus toutes les semaines par des mécaniciens,
              révisés avant la vente et vendus avec garantie. Le meilleur rapport
              qualité-prix de l'occasion — et il n'existe que chez les pros.
            </p>
          </div>
          <NuxtLink to="/pro" class="roadsign-label rounded-sm border border-card/40 px-4 py-2.5 text-sm text-card no-underline transition-colors duration-150 hover:border-borne hover:text-borne">
            Vous êtes loueur ? Déstockez ici
          </NuxtLink>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BikeCard v-for="b in lots.slice(0, 3)" :key="b.slug" :bike="b" />
        </div>
      </div>
    </section>

    <!-- Dernières annonces -->
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-display text-3xl font-bold uppercase sm:text-4xl">Arrivées récentes</h2>
        <NuxtLink to="/velos/vtt" class="text-sm font-medium no-underline hover:underline">
          Parcourir tous les univers →
        </NuxtLink>
      </div>
      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BikeCard v-for="b in selection" :key="b.slug" :bike="b" />
      </div>
    </section>

    <!-- Réassurance -->
    <section class="border-y border-line bg-card">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_3fr]">
        <h2 class="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
          L'occasion,<br>sans les mauvaises<br>surprises
        </h2>
        <dl class="divide-y divide-line">
          <div class="grid gap-1 py-5 first:pt-0 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt class="roadsign-label text-sm">Vendeurs identifiés</dt>
            <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
              Particulier, boutique ou loueur professionnel : le statut du vendeur est affiché
              sur chaque annonce, avec son historique et sa localisation.
            </dd>
          </div>
          <div class="grid gap-1 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt class="roadsign-label text-sm">État détaillé</dt>
            <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
              Kilométrage, consommables, entretien, capacité de batterie pour les VAE :
              les annonces disent ce qu'un essai ne montre pas, prix neuf constaté à l'appui.
            </dd>
          </div>
          <div class="grid gap-1 py-5 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt class="roadsign-label text-sm">Pros contrôlés & garantis</dt>
            <dd class="max-w-[60ch] leading-relaxed text-ink-soft">
              Les vélos vendus par les boutiques et loueurs partenaires sont révisés en atelier
              et garantis de 3 à 12 mois. La confiance du neuf, la décote de l'occasion.
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- CTA vendre -->
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div class="flex flex-col items-start justify-between gap-6 rounded-md bg-borne px-6 py-8 sm:flex-row sm:items-center sm:px-10">
        <div>
          <h2 class="font-display text-3xl font-bold uppercase">Un vélo qui dort ? Vendez-le.</h2>
          <p class="mt-2 max-w-[52ch] text-ink/80">
            Dépôt d'annonce guidé en 4 étapes, estimation de prix par rapport au neuf,
            visibilité dans le bon univers.
          </p>
        </div>
        <NuxtLink to="/vendre" class="pressable roadsign-label shrink-0 rounded-sm bg-ink px-6 py-3.5 text-sm text-borne no-underline">
          Déposer une annonce
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
