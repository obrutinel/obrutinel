# DESIGN.md — Biclette, monde « Altitude »

Système constaté sur le build (accueil v6 ; les pages intérieures héritent des
tokens via les alias mais n'ont pas encore été recomposées).

## Idée directrice

L'altitude sans le folklore : un marché de vélos d'occasion posé dans un
paysage de montagne **moderne, calme et précis**. Le décor ne concurrence
jamais les annonces ; chaque écran pousse vers deux gestes — consulter,
déposer.

## Tokens (`app/assets/css/main.css`)

- **Couleurs** : brume `#f2f4f0` (fond de page), neige `#fcfdfb` (cartes),
  vert-noir `#1a201b` (texte), `#5b675e` (secondaire), lignes `#dde1d8`,
  **sapin `#1e4d38`** (unique couleur de marque : CTA, liens, labels,
  sélection) + sapin profond `#143726` (hover, bloc vendre, footer),
  **ambre `#c9701f`** + `#f0dcc3` (soft) réservés aux remises, lots et badge
  loueur. Alias hérités (`flame`, `cartouche`, `borne`, `foret`) mappés sur
  cette palette pour les pages intérieures, à résorber lors de leur refonte.
- **Par-univers** : `universes[].hue` — teinte le vélo et le socle (8 %) des
  vignettes d'univers, jamais les CTA.
- **Typo** : `Bricolage Grotesque` (display, graisse 700, tracking −0.02em →
  `.headline`, minuscules) ; `Hanken Grotesk` (texte). Prix et données en
  `tabular-nums` (`.tnum`). Pas d'uppercase display, pas d'étirement.
- **Motion** : `--ease-out-strong cubic-bezier(0.23,1,0.32,1)` ; entrées
  260 ms (`.rise-in`), hovers 150-250 ms, pression `.pressable`,
  `prefers-reduced-motion` respecté. Les crêtes ont leur propre motion :
  entrée en parallaxe étagée (la plus lointaine bouge le moins, 800 ms),
  lever de soleil (opacité + 22 px, 1,1 s différée) puis **brume en dérive
  lente** (22 s / 30 s, aller-retour) — transform/opacity uniquement, figé
  en reduced-motion.
- **Ombres** : `--shadow-lift` / `--shadow-lift-lg` (offset + flou doux).

## Motif : la ligne de crête

`RidgeScape.vue` — trois crêtes superposées + disque ambre (soleil
d'altitude), en deux tons (`light` sur brume, `dark` sur sapin profond).
**Réservé à deux emplacements** : le pied du hero (avec soleil) et le bloc
vendre (version sombre) ; en écho miniature dans la carte « annonce du jour »
et le logo (`BrandMark` : cercle sapin, crête neige, point ambre).
La texture `.contour` (courbes de niveau) est disponible pour UNE surface
par page maximum. Rien d'autre : pas de montagnes sur les cartes, pas de
marquee, pas de stickers inclinés, pas de typo au trait.

## Composants clés

- `BikeIllustration` : vélo de profil en rendu catalogue (dégradés deux tons
  via `mixHex`, roues rayonnées, transmission, ombre au sol), 11 variantes par
  `kind`, teinté par `color`, trait ajustable par `ink` (fonds sombres).
- `BikeCard` : carte neige, socle teinté 5 %, badge vendeur, remise en chip
  ambre inline (`PriceTag`), lift au hover.
- `UniverseCard` : carte neige, socle teinté 8 % de la hue, vélo à la hue,
  nom en `.headline`.
- `SellerBadge` : particulier neutre, boutique sapin, loueur ambre.
- `RidgeScape` : le décor, deux tons, `sun` optionnel.

## Règles

- Une seule couleur de marque (sapin) ; l'ambre n'apparaît que sur les
  éléments « bonne affaire » ; les hues d'univers ne servent jamais aux CTA.
- Boutons pilule, cartes `rounded-2xl/3xl`, bordure `line`, fonds calmes.
- Un seul bloc sombre par page (vendre) ; le reste respire sur brume/neige.
- La graisse et la taille portent l'emphase — pas de dégradé de texte, pas de
  glassmorphism, pas d'icônes emoji.

## Punchlines en réserve

Baselines finalistes non retenues, à faire ressortir plus tard — une punchline
max par page, jamais en concurrence avec la baseline officielle
(« L'occasion de bien rouler ») :

- **« Déjà roulé, jamais usé. »** — candidate pour le hero de `/vendre`.
- **« Roulez, revendez, recommencez. »** — candidate pour le bloc vendre ou
  `/comment-ca-marche`.
- **« Des vélos qui repartent pour un tour. »** — candidate pour `/a-propos`
  ou la section lots de fin de saison.
