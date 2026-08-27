<template>
  <div class="flex min-h-screen flex-col">
    <!--
      THESIS: un showroom, pas une brocante — le vélo est exposé comme un produit
      premium et chaque écran pousse vers deux gestes : consulter, déposer.
      Refuse le collage petites-annonces (vrac, bordures, tampons).
      OWN-WORLD: affiche — aplats francs (flamme, encre, papier pierre), Archivo
      étiré XXL, mots au trait, Hanken Grotesk pour le texte, vélos SVG duotone
      coupés par les bords, stickers inclinés, motif plateau, marquees.
      STORY: le visiteur comprend « de beaux vélos d'occasion, vérifiés », choisit
      son univers ou cherche, et voit qu'il peut vendre en 5 minutes.
      FIRST VIEWPORT: aplat rouge flamme plein écran, titre XXL blanc superposé
      au vélo géant hors champ à droite (sticker prix réel), recherche + double
      CTA + preuves ; légende verticale en marge.
      FORM: affiche totale — intensité choisie par le client (v5).
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
