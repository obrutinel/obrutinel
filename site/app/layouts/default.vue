<template>
  <div class="flex min-h-screen flex-col">
    <!--
      THESIS: l'altitude sans le folklore — un marché de vélos d'occasion posé
      dans un paysage de montagne moderne, calme et précis ; chaque écran
      pousse vers deux gestes : consulter, déposer. Refuse le kitsch outdoor
      (bois, écussons, photos de sommets partout) comme le vrac petites-annonces.
      OWN-WORLD: brume claire et neige, vert sapin comme unique couleur de
      marque, pointe d'ambre pour les bonnes affaires, Bricolage Grotesque pour
      la voix, Hanken Grotesk pour le texte, vélos SVG deux-tons ; le seul décor
      est la ligne de crête (RidgeScape), réservée au hero et au bloc vendre.
      STORY: le visiteur comprend « de beaux vélos d'occasion, vérifiés »,
      choisit son univers ou cherche, et voit qu'il peut vendre en 5 minutes.
      FIRST VIEWPORT: promesse + recherche + double CTA à gauche, carte de
      l'annonce du jour à droite, crêtes et soleil d'altitude en pied de hero.
      FORM: montagne moderne sobre — direction demandée par le client (v6).
      FINISH: unreviewed and undocumented is unfinished; this build ends with
      the finish review, the verdict, DESIGN.md, and every shipping raster
      carrying its provenance.
    -->
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
