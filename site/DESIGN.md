# DESIGN.md — Biclette, monde « showroom graphique »

Système constaté sur le build (accueil refondu ; les autres pages héritent des
tokens et composants mais n'ont pas encore été recomposées).

## Idée directrice

Un showroom, pas une brocante : le vélo est exposé comme un produit premium,
et la marque parle fort par la typographie et son motif — jamais par l'ornement.
Chaque écran pousse vers deux gestes : **consulter** et **déposer** une annonce.

## Tokens (`app/assets/css/main.css`)

- **Couleurs** : `ink #131512`, `ink-soft #62665e`, `paper #f2f2ec` (fond de page),
  `card #fdfdfb` (surfaces), `line #e2e2d8`, **`flame #e8401a`** (unique couleur
  d'action : CTA primaires, points de titre, stickers, chiffres d'étapes),
  `flame-deep #c8340f` (hover, texte sur clair).
- **Par-univers** : `universes[].hue` — pleine couleur sur les tuiles du rail,
  teinte à 5-14 % sur les socles d'illustration.
- **Typo** : `Archivo Variable` (display, `font-stretch 122 %`, graisse 700,
  tracking −0.025em → utilitaire `.headline`) ; `Hanken Grotesk` (texte).
  Prix et données en `tabular-nums` (`.tnum`).
- **Motion** : `--ease-out-strong cubic-bezier(0.23,1,0.32,1)` ; entrées 260 ms
  (`.rise-in`), hovers 150-250 ms, pression `.pressable` (scale 0.97, 160 ms),
  tout respecte `prefers-reduced-motion`.
- **Ombres** : `--shadow-lift` / `--shadow-lift-lg` (offset + flou doux, jamais
  de halo).

## Motif de marque

Le **plateau de pédalier** (anneau + cinq trous + axe) : logo `BrandMark`,
favicon, séparateurs du marquee, cercles décoratifs géants (hero, bloc vendre),
« roue en écho » (grand cercle teinté derrière le vélo vedette).

Tics graphiques : **point final flamme** sur les titres de section ; **mot au
trait** (`.text-outline`, `-webkit-text-stroke`) pour un accent par écran maxi ;
**mot en boîte flamme** (`.mark-flame`, inclinée −1,5°) réservé au H1 ;
stickers légèrement inclinés (−2/−6°) qui se redressent au hover ; **macaron
de remise** rond flamme sur les cartes ; **double marquee** (univers sur encre
+ slogan sur flamme, sens inverse) ; vélos qui **débordent du cadre** (tuiles
d'univers, cercle du hero) ; trame de points `.dot-grid` sur le hero ; wordmark
géant au trait en tête de footer.

## Composants clés

- `BikeIllustration` : vélo de profil en rendu catalogue (dégradé deux tons via
  `mixHex`, roues rayonnées, cassette/dérailleur, ombre au sol), décliné en 11
  variantes par `kind`, teinté par `color`, trait ajustable par `ink` (fonds
  sombres) — duotone sur les tuiles d'univers.
- `BikeCard` : carte blanche, socle teinté 5 %, badge vendeur, prix `.headline`,
  lift au hover (translate −2px + ombre + vélo scale 1.03).
- `UniverseCard` : bloc pleine couleur `hue`, vélo duotone, texte blanc (ou ink
  sur teinte claire — seuil de luminance 0.55).
- `UniverseMarquee` : bandeau noir défilant (36 s, linéaire), noms cliquables,
  figé si `prefers-reduced-motion`.

## Punchlines en réserve

Baselines finalistes non retenues, à faire ressortir plus tard sur le site —
une punchline max par page, jamais en concurrence avec la baseline officielle
(« L'occasion de bien rouler ») :

- **« Déjà roulé, jamais usé. »** — candidate pour le hero de `/vendre` ou une
  campagne (désamorce l'objection sur l'état).
- **« Roulez, revendez, recommencez. »** — déjà en germe dans le marquee
  slogan ; candidate pour le bloc vendre ou `/comment-ca-marche`.
- **« Des vélos qui repartent pour un tour. »** — candidate pour `/a-propos`
  ou la section lots de fin de saison.

## Règles

- Une seule couleur d'action ; les hues d'univers ne servent jamais aux CTA.
- La graisse et la taille portent l'emphase — pas de dégradé de texte, pas de
  glassmorphism, pas d'icônes emoji.
- Boutons pilule (`rounded-full`), cartes `rounded-2xl/3xl`, bordure `line`.
- Un accent au trait et un pic de densité par écran ; le reste reste calme.
