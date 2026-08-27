<template>
  <div class="flex min-h-screen flex-col">
    <!--
      THESIS: un showroom, pas une brocante — le vélo est exposé comme un produit
      premium et chaque écran pousse vers deux gestes : consulter, déposer.
      Refuse le collage petites-annonces (vrac, bordures, tampons).
      OWN-WORLD: blanc galerie sur papier pierre, une seule couleur d'action
      (rouge flamme #e8401a), Archivo étiré pour la voix, Hanken Grotesk pour le
      texte, vélos SVG deux-tons sur socles teintés, ombres portées douces.
      STORY: le visiteur comprend « de beaux vélos d'occasion, vérifiés », choisit
      son univers ou cherche, et voit qu'il peut vendre en 5 minutes.
      FIRST VIEWPORT: promesse + recherche + double CTA à gauche, vélo vedette
      sur socle avec sa carte prix à droite, rail d'univers amorcé dessous.
      FORM: showroom premium épuré — direction verrouillée par le client.
      FINISH: unreviewed and undocumented is unfinished; this build ends with the
      finish review, the verdict, DESIGN.md, and every shipping raster carrying
      its provenance.
    -->
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
