<script setup lang="ts">
usePageSeo({
  title: 'Comment ça marche — acheter et vendre un vélo d\'occasion',
  description:
    "Acheter ou vendre un vélo d'occasion sur Biclette : univers clairs, annonces détaillées, vendeurs identifiés, vélos pros contrôlés et garantis. Le mode d'emploi complet.",
})

const buySteps = [
  {
    title: 'Entrez par votre univers',
    text: "VTT, route, gravel, VAE, cargo… chaque univers regroupe ses annonces, ses conseils d'achat et ses points de contrôle spécifiques. Vous comparez ce qui est comparable.",
  },
  {
    title: 'Lisez l\'annonce comme un pro',
    text: "Kilométrage, consommables, entretien, décote par rapport au neuf, diagnostic batterie pour les VAE : nos annonces structurées disent ce qu'une photo ne montre pas.",
  },
  {
    title: 'Choisissez votre niveau de confiance',
    text: "Particulier soigneux, boutique qui contrôle sur 30 points, loueur qui fournit le carnet d'entretien de flotte : le statut du vendeur et la garantie éventuelle sont affichés sur chaque annonce.",
  },
  {
    title: 'Essayez, puis roulez',
    text: "Contactez le vendeur via la messagerie, essayez le vélo, vérifiez le numéro Bicycode. Les vélos pros partent avec facture et garantie de 3 à 12 mois.",
  },
]

const sellSteps = [
  {
    title: 'Décrivez votre vélo en 4 étapes',
    text: 'Notre formulaire guidé vous demande ce que les acheteurs veulent savoir — pas plus, pas moins. Cinq minutes chrono.',
  },
  {
    title: 'Fixez le juste prix',
    text: "Nous affichons la décote par rapport au prix neuf constaté : un vélo bien positionné se vend en jours, pas en mois.",
  },
  {
    title: 'Vendez dans le bon univers',
    text: "Votre gravel est vu par des gens qui cherchent un gravel. Pas noyé entre un lave-linge et une voiture sans permis.",
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'Comment ça marche' }]" />

    <header class="mt-6 max-w-3xl">
      <h1 class="headline text-balance text-4xl sm:text-5xl">
        Comment ça marche
      </h1>
      <p class="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-soft">
        Biclette est une place de marché dédiée au vélo d'occasion. Notre métier :
        que l'acheteur sache exactement ce qu'il achète, et que le vendeur — particulier,
        boutique ou loueur — trouve son acheteur vite et au juste prix.
      </p>
    </header>

    <section class="mt-12" aria-labelledby="acheter-title">
      <h2 id="acheter-title" class="headline text-3xl">Acheter</h2>
      <ol class="mt-6 grid gap-4 md:grid-cols-2">
        <li v-for="(s, i) in buySteps" :key="s.title" class="rounded-2xl border border-line bg-card p-6">
          <p class="tnum headline text-3xl text-pine" aria-hidden="true">{{ i + 1 }}</p>
          <h3 class="mt-2 headline text-xl">{{ s.title }}</h3>
          <p class="mt-2 max-w-[58ch] leading-relaxed text-ink-soft">{{ s.text }}</p>
        </li>
      </ol>
    </section>

    <section class="mt-14" aria-labelledby="vendre-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="roadsign-label text-xs text-pine">Roulez, revendez, recommencez</p>
          <h2 id="vendre-title" class="headline mt-1 text-3xl">Vendre</h2>
        </div>
        <NuxtLink to="/vendre" class="text-sm font-medium no-underline hover:underline">
          Déposer une annonce →
        </NuxtLink>
      </div>
      <ol class="mt-6 grid gap-4 md:grid-cols-3">
        <li v-for="(s, i) in sellSteps" :key="s.title" class="rounded-2xl border border-line bg-card p-6">
          <p class="tnum headline text-3xl text-pine" aria-hidden="true">{{ i + 1 }}</p>
          <h3 class="mt-2 headline text-xl">{{ s.title }}</h3>
          <p class="mt-2 leading-relaxed text-ink-soft">{{ s.text }}</p>
        </li>
      </ol>
    </section>

    <section class="mt-14 rounded-3xl bg-pine-deep p-8 text-card sm:p-10" aria-labelledby="pro-title">
      <h2 id="pro-title" class="headline text-3xl text-card">Et les pros ?</h2>
      <p class="mt-3 max-w-[65ch] leading-relaxed text-card/80">
        Boutiques et loueurs vendent sur Biclette avec un badge professionnel, leurs
        contrôles atelier et leur garantie mis en avant. Les loueurs déstockent leurs flottes
        par lots en fin de saison — des vélos récents, suivis par des mécaniciens, à prix décotés.
      </p>
      <NuxtLink to="/pro" class="pressable mt-6 inline-block rounded-full bg-card px-6 py-3 text-[15px] font-semibold text-pine-deep no-underline transition-colors duration-150 hover:bg-white">
        Découvrir l'espace pro
      </NuxtLink>
    </section>
  </div>
</template>
