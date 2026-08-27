<script setup lang="ts">
import { bikes } from '~/data/bikes'
import { sellers } from '~/data/sellers'

usePageSeo({
  title: 'Boutiques & loueurs : vendez vos vélos d\'occasion et déstockez vos flottes',
  description:
    "Espace pro Recyclette : loueurs et boutiques, publiez vos lots de fin de saison, vos reprises et vos vélos reconditionnés. Badge pro, garantie mise en avant, import de flotte.",
})

const lots = bikes.filter(b => b.lot)
const pros = sellers.filter(s => s.type !== 'particulier')
</script>

<template>
  <div>
    <section class="bg-ink text-card">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[3fr_2fr] lg:py-20">
        <div class="rise-in">
          <p class="roadsign-label text-sm text-borne">Espace pro — boutiques & loueurs</p>
          <h1 class="mt-3 max-w-xl text-balance font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
            Votre flotte<br>a une seconde<br>saison
          </h1>
          <p class="mt-5 max-w-[54ch] text-lg leading-relaxed text-card/80">
            42 % des transactions de vélos d'occasion passent déjà par des professionnels.
            Recyclette donne à vos fins de série, reprises et flottes de location la place
            qu'elles méritent : un badge pro visible, la garantie mise en avant, et des
            acheteurs qui cherchent exactement ça.
          </p>
          <a href="#contact-pro" class="pressable roadsign-label mt-8 inline-block rounded-sm bg-borne px-6 py-3.5 text-sm text-ink no-underline">
            Ouvrir un compte pro
          </a>
        </div>
        <div class="rise-in hidden lg:block" aria-hidden="true">
          <BikeIllustration kind="vtt" color="#ffd42e" ink="#fbf9f2" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 class="font-display text-3xl font-bold uppercase sm:text-4xl">Pensé pour trois métiers</h2>
      <dl class="mt-7 divide-y divide-line border-y border-line">
        <div class="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
          <dt class="roadsign-label text-sm">Loueurs</dt>
          <dd class="max-w-[68ch] leading-relaxed text-ink-soft">
            Déstockez votre flotte en fin de saison par lots : une annonce multi-tailles,
            le carnet d'entretien de flotte comme argument de vente, et le bandeau
            « Lot fin de saison » qui attire les chasseurs de bonnes affaires.
            L'import CSV de flotte arrive avec la version complète.
          </dd>
        </div>
        <div class="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
          <dt class="roadsign-label text-sm">Boutiques & ateliers</dt>
          <dd class="max-w-[68ch] leading-relaxed text-ink-soft">
            Valorisez vos reprises et votre occasion contrôlée : points de contrôle affichés,
            garantie mise en avant sur chaque annonce et sur votre page boutique.
            Les acheteurs acceptent en moyenne 17 % de plus pour un vélo contrôlé et garanti.
          </dd>
        </div>
        <div class="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
          <dt class="roadsign-label text-sm">Reconditionneurs</dt>
          <dd class="max-w-[68ch] leading-relaxed text-ink-soft">
            VAE et cargos reconditionnés : affichez le diagnostic batterie (capacité restante,
            cycles) directement dans la fiche technique — l'information n° 1 que cherchent
            les acheteurs d'électrique.
          </dd>
        </div>
      </dl>
    </section>

    <section class="border-y border-line bg-card">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="font-display text-3xl font-bold uppercase sm:text-4xl">Lots en ligne en ce moment</h2>
          <p class="tnum text-sm text-ink-soft">{{ lots.length }} lots · {{ pros.length }} vendeurs pros</p>
        </div>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BikeCard v-for="b in lots" :key="b.slug" :bike="b" />
        </div>
      </div>
    </section>

    <section id="contact-pro" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
      <div class="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <h2 class="font-display text-3xl font-bold uppercase">Ouvrir un compte pro</h2>
          <p class="mt-3 max-w-[50ch] leading-relaxed text-ink-soft">
            Dites-nous qui vous êtes, on s'occupe du reste : création de votre page vendeur,
            reprise de vos annonces existantes, formation de l'équipe en 30 minutes.
          </p>
        </div>
        <form class="grid gap-5 rounded-md border border-line bg-card p-6 sm:grid-cols-2 sm:p-8" @submit.prevent>
          <div class="grid gap-1.5">
            <label for="p-nom" class="roadsign-label text-xs text-ink-soft">Enseigne</label>
            <input id="p-nom" type="text" placeholder="Alpes Riders Location" class="rounded-sm border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
          </div>
          <div class="grid gap-1.5">
            <label for="p-metier" class="roadsign-label text-xs text-ink-soft">Métier</label>
            <select id="p-metier" class="rounded-sm border border-line bg-paper px-3 py-2.5">
              <option>Loueur</option>
              <option>Boutique / atelier</option>
              <option>Reconditionneur</option>
            </select>
          </div>
          <div class="grid gap-1.5 sm:col-span-2">
            <label for="p-email" class="roadsign-label text-xs text-ink-soft">E-mail professionnel</label>
            <input id="p-email" type="email" placeholder="contact@votre-enseigne.fr" class="rounded-sm border border-line bg-paper px-3 py-2.5 placeholder:text-ink-soft/60">
          </div>
          <div class="grid gap-1.5 sm:col-span-2">
            <label for="p-volume" class="roadsign-label text-xs text-ink-soft">Volume à vendre cette saison</label>
            <select id="p-volume" class="rounded-sm border border-line bg-paper px-3 py-2.5">
              <option>Moins de 10 vélos</option>
              <option>10 à 50 vélos</option>
              <option>50 à 200 vélos</option>
              <option>Plus de 200 vélos</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="pressable roadsign-label w-full rounded-sm bg-ink px-6 py-3.5 text-sm text-borne">
              Être rappelé (démo)
            </button>
            <p class="mt-2 text-center text-xs text-ink-soft">Démo : le formulaire n'envoie rien.</p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
