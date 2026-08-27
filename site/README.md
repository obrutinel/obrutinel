# Biclette — l'occasion de bien rouler

Prototype frontend haute-fidélité d'une place de marché de vélos d'occasion
mettant en relation **particuliers**, **boutiques/ateliers** et **loueurs qui
déstockent leur flotte en fin de saison** (l'angle différenciant du projet).

> Site 100 % statique (SSG) et ultra optimisé SEO. Les annonces sont des
> données de démonstration fictives mais réalistes.

## Lancer le projet

```bash
cd site
pnpm install
pnpm dev        # développement — http://localhost:3000
pnpm generate   # build statique → .output/public
npx serve .output/public
```

## Stack

- **Nuxt 4** (Vue 3) en **génération statique** : 129 routes pré-rendues en HTML,
  compatible plus tard avec un backend Laravel (API ou Inertia).
- **Tailwind CSS v4** — tokens de design dans `app/assets/css/main.css`
  (changer la marque = changer ce fichier).
- **Fonts self-hostées** (@fontsource) : Barlow Condensed (display) + Barlow (texte).
- Zéro dépendance d'images externes : les vélos sont des **illustrations SVG
  paramétriques** (`app/components/BikeIllustration.vue`), déclinées par univers
  et teintées par la couleur réelle du vélo.

## Design

Monde visuel « Altitude » (voir `DESIGN.md`) : montagne moderne et sobre —
brume claire, vert sapin comme unique couleur de marque, pointe d'ambre pour
les bonnes affaires, Bricolage Grotesque pour la voix, ligne de crête
(`RidgeScape`) comme seul décor (hero + bloc vendre).
Construit en suivant les skills [Impeccable](https://github.com/pbakaus/impeccable)
et [Emil Kowalski](https://github.com/emilkowalski/skills) (copiés dans
`.claude/skills/` à la racine du dépôt) : easing personnalisés, transitions
< 300 ms, `tabular-nums` sur les prix, états hover/focus/vide, `prefers-reduced-motion`.

## SEO

- HTML pré-rendu pour chaque page (contenu indexable sans JavaScript).
- `useSeoMeta` par page : title, description, canonical, Open Graph, Twitter.
- **JSON-LD schema.org** : `Organization` + `WebSite` (global), `ItemList` +
  `FAQPage` + `BreadcrumbList` (pages univers), `Product` + `Offer` (annonces),
  `LocalBusiness` (vendeurs pros).
- `sitemap.xml` généré (`server/routes/sitemap.xml.ts`) + `robots.txt`.
- Maillage interne : breadcrumbs, univers liés, footer complet, URLs françaises.
- Performance : fonts en `font-display: swap`, quasi aucun JS bloquant, zéro CLS.

## Structure

```
site/
├── app/
│   ├── assets/css/main.css      # tokens design (couleurs, typo, easing)
│   ├── components/              # BikeCard, BikeIllustration, PriceTag…
│   ├── composables/useSeo.ts    # usePageSeo() + useJsonLd()
│   ├── data/                    # universes, bikes (34 annonces), sellers
│   ├── pages/
│   │   ├── index.vue            # accueil
│   │   ├── velos/[universe].vue # landing SEO par univers + filtres
│   │   ├── annonce/[slug].vue   # fiche vélo (Product JSON-LD)
│   │   ├── vendeur/[slug].vue   # page vendeur / boutique / loueur
│   │   ├── vendre.vue           # dépôt d'annonce en 4 étapes (maquette)
│   │   ├── pro.vue              # landing boutiques & loueurs
│   │   ├── comment-ca-marche.vue
│   │   └── a-propos.vue
│   └── error.vue                # 404
├── server/routes/sitemap.xml.ts
└── public/                      # robots.txt, favicon.svg
```

## Cibles identifiées (recherche marché 2025-2026)

| Profil | Besoin | Réponse Biclette |
| --- | --- | --- |
| Sportif budget serré (VTT/route) | Décote transparente, état réel | Prix neuf constaté + fiche technique détaillée |
| Urbain / vélotafeur | Confiance, VAE abordable | Diagnostic batterie affiché, pros garantis |
| Parents | Renouveler les tailles chaque saison | Univers enfant par taille de roues |
| Familles (cargo) | Gros ticket → réassurance | Cargos ex-flotte avec carnet d'entretien |
| Loueurs / boutiques | Écouler flottes et reprises | Lots fin de saison, badge pro, garantie mise en avant |

Concurrents observés : Leboncoin (volume, zéro spécialisation), Troc-Vélo,
Buycycle, Upway (VAE reconditionné), Decathlon Occasion. ~42 % des transactions
d'occasion passent déjà par des pros — segment que le site met au premier plan.

## Roadmap (V2+)

1. Backend Laravel (API annonces, comptes, messagerie sécurisée).
2. Upload photos + vraie publication d'annonces.
3. Paiement séquestre + expédition (modèle Buycycle).
4. **Cote & score « bonne affaire »** (façon Argus / La Centrale) — voir ci-dessous.
5. Import CSV de flotte pour les loueurs, favoris & alertes.
6. Image Open Graph par annonce (rendu des illustrations en PNG).

### Cote & score « bonne affaire »

Objectif : afficher sur chaque annonce si le prix demandé est une bonne
affaire par rapport au marché, comme la cote auto.

**Phase 1 — score heuristique (faisable dès le prototype, sans données
externes)** : prix théorique = prix neuf constaté × courbe de décote par
univers (route/VTT ≈ −30 % la 1re année puis −10 %/an ; VAE plus rapide car
batterie ; enfant/ville plus douce) × facteur état × facteur kilométrage
(± selon km/an vs médiane de l'univers) × bonus garantie pro. Score = écart
entre prix demandé et prix théorique → 4 étiquettes : Très bonne affaire /
Bonne affaire / Prix du marché / Au-dessus du marché. Transparent : la fiche
explique le calcul (levier de confiance + SEO).

**Phase 2 — cote statistique réelle.** Données à constituer :

| Donnée | Source | Usage |
| --- | --- | --- |
| Prix neuf de référence (marque/modèle/millésime/montage) | catalogues constructeurs, archives revendeurs, saisie vendeur vérifiée | point de départ de la décote |
| Prix de vente réels (pas seulement affichés) | les transactions Biclette elles-mêmes ; en amorçage : prix affichés × durée de vie de l'annonce sur les grandes plateformes | calibrer la courbe réelle |
| Attributs de l'annonce | déjà dans le modèle : année, état, km, groupe, taille, région, type vendeur ; VAE : capacité batterie/cycles | variables explicatives |
| Volume par segment | ≥ ~100 ventes par segment (univers × gamme de prix) pour une cote fiable ; en dessous, fallback heuristique phase 1 | choix du modèle affiché |

Modèle : régression hédonique ou gradient boosting par univers, réentraîné
mensuellement ; intervalle de confiance affiché plutôt qu'un prix unique.
Pages « Cote vélo [marque modèle année] » générées = très gros levier SEO
(le trafic Argus/La Centrale de l'occasion vélo est quasi vacant).
