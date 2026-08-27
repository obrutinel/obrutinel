<script setup lang="ts">
usePageSeo({
  title: 'À propos — pourquoi Recyclette existe',
  description:
    "Recyclette veut faire du vélo d'occasion un achat aussi sûr que le neuf : univers clairs, annonces honnêtes, pros identifiés. Notre histoire et nos convictions.",
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
    <Breadcrumbs :items="[{ label: 'À propos' }]" />

    <header class="mt-6 max-w-3xl">
      <h1 class="text-balance font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
        Chaque vélo mérite<br>une seconde saison
      </h1>
    </header>

    <div class="mt-8 grid gap-12 lg:grid-cols-[3fr_2fr]">
      <div class="max-w-[65ch] space-y-5 leading-relaxed text-ink-soft">
        <p>
          Des millions de vélos dorment dans les garages français pendant que d'autres
          cyclistes renoncent au neuf devant les étiquettes. Entre les deux, un marché de
          l'occasion énorme mais mal outillé : annonces généralistes sans les infos qui
          comptent, méfiance sur l'état réel, vélos volés, prix au doigt mouillé.
        </p>
        <p>
          Recyclette est né d'une conviction simple : <strong class="text-ink">acheter un vélo
          d'occasion devrait être aussi rassurant qu'acheter un vélo neuf</strong> — et souvent
          plus malin. Un cadre bien entretenu roule vingt ans ; sa décote, elle, est faite
          dès la troisième année.
        </p>
        <p>
          Alors nous avons construit une place de marché de spécialistes : des univers par
          discipline plutôt qu'un vrac généraliste, des annonces structurées qui disent le
          kilométrage, les consommables et la capacité de batterie, et une place entière
          pour les professionnels — boutiques qui contrôlent et garantissent, loueurs qui
          déstockent des flottes entretenues chaque semaine.
        </p>
        <p>
          Ce site est aujourd'hui un prototype de démonstration. La suite : messagerie
          sécurisée, paiement avec dépôt fiduciaire, argus de l'occasion et import de
          flottes pour les loueurs.
        </p>
      </div>

      <aside class="space-y-4">
        <div class="rounded-md border border-line bg-card p-6">
          <h2 class="roadsign-label text-sm text-ink-soft">Nos convictions</h2>
          <ul class="mt-4 divide-y divide-line">
            <li class="py-3 font-display text-lg font-semibold leading-snug first:pt-0">La transparence vend mieux que la retouche photo.</li>
            <li class="py-3 font-display text-lg font-semibold leading-snug">Un pro qui garantit mérite d'être vu comme tel.</li>
            <li class="py-3 font-display text-lg font-semibold leading-snug last:pb-0">Le meilleur vélo pour la planète est celui qui existe déjà.</li>
          </ul>
        </div>
        <div class="rounded-md bg-borne p-6">
          <h2 class="font-display text-2xl font-bold uppercase">Envie d'essayer ?</h2>
          <p class="mt-2 text-sm leading-relaxed text-ink/80">
            Parcourez les univers ou déposez une annonce de démonstration.
          </p>
          <NuxtLink to="/#univers" class="pressable roadsign-label mt-4 inline-block rounded-sm bg-ink px-5 py-2.5 text-sm text-borne no-underline">
            Voir les univers
          </NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>
