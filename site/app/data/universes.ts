import type { Universe } from './types'

export const universes: Universe[] = [
  {
    slug: 'vtt',
    name: 'VTT',
    h1: "VTT d'occasion",
    tagline: 'Semi-rigides, tout-suspendus, enduro et XC',
    intro:
      "Trouvez un VTT d'occasion vérifié : semi-rigides pour débuter, tout-suspendus pour l'enduro ou le cross-country. Chaque annonce précise l'état de la transmission, des suspensions et des freins, avec le type de vendeur affiché clairement — particulier, boutique ou loueur professionnel qui déstocke sa flotte.",
    metaDescription:
      "VTT d'occasion vérifiés : semi-rigides, tout-suspendus, enduro, XC. Annonces de particuliers, boutiques et loueurs pros avec état détaillé et prix transparents.",
    kind: 'vtt',
    faq: [
      {
        q: "Que vérifier avant d'acheter un VTT d'occasion ?",
        a: "Les points d'usure coûteux : la transmission (chaîne, cassette, plateaux), l'état des suspensions (entretien récent ?), les roulements de direction et de boîtier, et les plaquettes de frein. Sur Recyclette, chaque annonce détaille ces points et les vélos vendus par des pros sont contrôlés.",
      },
      {
        q: "Un VTT de location est-il une bonne affaire ?",
        a: "Souvent, oui : les loueurs entretiennent leur flotte toute la saison avec des mécaniciens dédiés, puis revendent des vélos récents à prix décoté. L'historique d'entretien est connu, ce qu'un particulier peut rarement fournir.",
      },
      {
        q: 'Quelle taille de VTT choisir ?',
        a: 'Fiez-vous à la taille indiquée sur chaque annonce (S à XL) et à votre entrejambe plutôt qu\'à votre taille seule. En cas de doute entre deux tailles, préférez la plus petite en VTT : le vélo sera plus maniable.',
      },
    ],
  },
  {
    slug: 'velo-route',
    name: 'Route',
    h1: "Vélos de route d'occasion",
    tagline: 'Carbone, alu, endurance et compétition',
    intro:
      "Le vélo de route est le roi de l'occasion : un cadre carbone entretenu perd peu de ses qualités et beaucoup de son prix. Comparez les groupes (Shimano 105, Ultegra, SRAM Rival…), le kilométrage et l'état réel, annoncés noir sur blanc par des vendeurs identifiés.",
    metaDescription:
      "Vélos de route d'occasion : carbone et aluminium, Shimano 105 à Dura-Ace. Annonces détaillées avec kilométrage, taille et décote réelle par rapport au neuf.",
    kind: 'route',
    faq: [
      {
        q: "Le carbone d'occasion est-il fiable ?",
        a: "Un cadre carbone sans choc est très durable. Inspectez les zones de contrainte (boîtier, douille de direction, haubans) et demandez l'historique. Les vélos vendus par des boutiques sur Recyclette sont passés au contrôle.",
      },
      {
        q: 'Quelle décote pour un vélo de route ?',
        a: "Comptez 25 à 40 % la première année, puis environ 10 % par an. Nos annonces affichent le prix neuf constaté à côté du prix demandé pour juger la décote d'un coup d'œil.",
      },
      {
        q: 'Quel budget pour un premier vélo de route ?',
        a: "Entre 500 et 900 € en occasion, vous trouvez un cadre aluminium récent avec un groupe Shimano Tiagra ou 105 — l'équivalent d'un vélo neuf à 1 400 €.",
      },
    ],
  },
  {
    slug: 'gravel',
    name: 'Gravel',
    h1: "Gravel d'occasion",
    tagline: 'Bikepacking, chemins et route mixte',
    intro:
      "Le gravel d'occasion permet de s'équiper pour l'aventure sans le ticket d'entrée du neuf. Cintres évasés, pneus de 40 mm et plus, fixations pour sacoches : chaque annonce précise les montages et l'usage réel qu'en faisait le vendeur.",
    metaDescription:
      "Gravels d'occasion pour le bikepacking et les chemins : annonces vérifiées de particuliers et de pros, avec détail des montages, tailles et état des consommables.",
    kind: 'gravel',
    faq: [
      {
        q: 'Gravel ou vélo de route : que choisir en occasion ?',
        a: "Si plus de 20 % de vos sorties quittent l'asphalte, le gravel s'impose : géométrie plus stable, dégagements de pneus généreux, points de fixation. Sinon, un vélo de route sera plus vif et souvent moins cher à niveau de gamme égal.",
      },
      {
        q: 'Quels points contrôler sur un gravel d\'occasion ?',
        a: "Comme un vélo de route, plus l'usure spécifique du tout-chemin : jeu de direction, roulements de roues et état des pneus tubeless. Le passage des gaines internes mérite aussi un coup d'œil.",
      },
    ],
  },
  {
    slug: 'velo-ville',
    name: 'Ville',
    h1: "Vélos de ville d'occasion",
    tagline: 'Vélotaf, hollandais et pliants',
    intro:
      "Pour le vélotaf ou les courses, un vélo de ville d'occasion rend le même service que le neuf pour deux fois moins cher. Cadres ouverts, porte-bagages, éclairage dynamo, pliants pour le train : filtrez par équipement et par proximité.",
    metaDescription:
      "Vélos de ville et pliants d'occasion pour le vélotaf : hollandais, single-speed urbains, Brompton. Annonces locales avec équipements détaillés.",
    kind: 'ville',
    faq: [
      {
        q: "Quel prix pour un bon vélo de ville d'occasion ?",
        a: "De 150 € pour un vélo simple et sain à 600 € pour un hollandais tout équipé (dynamo, porte-bagages, antivol de cadre). Au-delà, regardez du côté des VAE d'occasion.",
      },
      {
        q: 'Comment éviter les vélos volés ?',
        a: "Exigez le numéro d'identification Bicycode et la facture d'origine quand elle existe. Sur Recyclette, les vendeurs professionnels vérifient systématiquement le fichier des vélos volés avant la mise en vente.",
      },
    ],
  },
  {
    slug: 'vae',
    name: 'VAE',
    h1: "Vélos électriques d'occasion",
    tagline: 'VAE ville, VTT AE et reconditionnés',
    intro:
      "Un VAE neuf coûte en moyenne plus de 2 000 € : l'occasion et le reconditionné changent la donne. Chaque annonce indique la capacité de batterie, le nombre de cycles de charge quand il est connu, et la motorisation (Bosch, Shimano, Bafang…). Les VAE vendus par des pros sont testés et garantis.",
    metaDescription:
      "VAE d'occasion et reconditionnés : batterie et cycles de charge annoncés, moteurs Bosch et Shimano, garantie sur les vélos vendus par des professionnels.",
    kind: 'vae',
    faq: [
      {
        q: "Comment juger la batterie d'un VAE d'occasion ?",
        a: "Demandez la capacité restante (un diagnostic en boutique la mesure précisément) et le nombre de cycles. Une batterie Bosch tient environ 500 à 800 cycles complets ; à 60 € du cycle de vie restant, faites le calcul face au prix demandé.",
      },
      {
        q: 'VAE reconditionné ou occasion entre particuliers ?',
        a: "Le reconditionné coûte environ 15 % de plus mais inclut un contrôle complet, une batterie testée et une garantie de 6 à 12 mois. Pour un VAE, où la batterie représente un tiers de la valeur, cette assurance vaut souvent le surcoût.",
      },
      {
        q: "Quelles aides pour un VAE d'occasion ?",
        a: "Plusieurs collectivités subventionnent l'achat d'un VAE d'occasion vendu par un professionnel (facture exigée). Vérifiez les aides de votre région, département et métropole avant l'achat.",
      },
    ],
  },
  {
    slug: 'velo-enfant',
    name: 'Enfant',
    h1: "Vélos enfant d'occasion",
    tagline: 'Draisiennes, 12 à 26 pouces',
    intro:
      "Un vélo enfant sert deux saisons puis dort au garage : l'occasion est une évidence. Draisiennes, 14, 16, 20, 24 pouces : trouvez la bonne taille près de chez vous, et revendez-le au prochain quand il devient trop petit.",
    metaDescription:
      "Vélos enfant d'occasion par taille de roues : draisiennes, 14 à 26 pouces. Annonces locales, vélos légers de qualité (Woom, Btwin, Frog) à petit prix.",
    kind: 'enfant',
    faq: [
      {
        q: 'Quelle taille de roues pour quel âge ?',
        a: "En repère : draisienne dès 2 ans, 14 pouces vers 3-4 ans, 16 pouces vers 4-6 ans, 20 pouces vers 6-8 ans, 24 pouces vers 8-11 ans. L'enfant doit poser les deux pieds au sol selle en position basse.",
      },
      {
        q: 'Pourquoi privilégier un vélo enfant léger ?',
        a: "Un enfant de 20 kg sur un vélo de 12 kg, c'est un adulte sur un vélo de 25 kg. Les marques légères (Woom, Frog, Kubikes) se revendent très bien : leur coût réel par saison est souvent inférieur à un vélo lourd premier prix.",
      },
    ],
  },
  {
    slug: 'bmx',
    name: 'BMX',
    h1: "BMX d'occasion",
    tagline: 'Race, street et park',
    intro:
      "BMX race pour la piste, street et park pour les modules : le marché de l'occasion regorge de montages soignés revendus par des riders exigeants. Pegs, rotors et pièces custom sont détaillés dans chaque annonce.",
    metaDescription:
      "BMX d'occasion race, street et park : montages détaillés, tailles de top tube précisées, annonces de riders et de boutiques spécialisées.",
    kind: 'bmx',
    faq: [
      {
        q: 'BMX race ou street : quelle différence ?',
        a: "Le race est léger et rigide, taillé pour l'explosivité sur piste ; le street/park est renforcé pour encaisser les impacts, souvent plus lourd. Les deux ne s'échangent pas : choisissez selon votre pratique.",
      },
    ],
  },
  {
    slug: 'triathlon',
    name: 'Triathlon',
    h1: "Vélos de triathlon et CLM d'occasion",
    tagline: 'Chrono, contre-la-montre et prolongateurs',
    intro:
      "Les vélos de chrono et de triathlon décotent fort : leurs propriétaires roulent peu en dehors des compétitions et renouvellent souvent. Résultat, des machines aérodynamiques très haut de gamme accessibles en occasion à une fraction du neuf.",
    metaDescription:
      "Vélos de triathlon et contre-la-montre d'occasion : cadres aéro, prolongateurs, capteurs de puissance. Le haut de gamme chrono à prix d'occasion.",
    kind: 'triathlon',
    faq: [
      {
        q: 'Un vélo de chrono peut-il servir au quotidien ?',
        a: "Non : la position est radicale et le comportement nerveux. C'est un vélo de spécialiste pour les triathlons et les CLM. Pour un usage mixte, regardez plutôt un vélo de route aéro dans l'univers Route.",
      },
    ],
  },
  {
    slug: 'fixie',
    name: 'Fixie',
    h1: "Fixies et singlespeeds d'occasion",
    tagline: 'Pignon fixe, singlespeed et vintage urbain',
    intro:
      "Simples, légers, presque sans entretien : les fixies et singlespeeds d'occasion sont parfaits pour la ville plate. Beaucoup sont des montages uniques sur des cadres acier vintage — chaque annonce liste les composants.",
    metaDescription:
      "Fixies et singlespeeds d'occasion : montages sur cadres acier, roues hautes, moyeux flip-flop. Le vélo urbain minimaliste à petit prix.",
    kind: 'fixie',
    faq: [
      {
        q: 'Fixie ou singlespeed pour débuter ?',
        a: "Singlespeed (roue libre) : vous gardez le freinage classique et la possibilité d'arrêter de pédaler. La plupart des moyeux flip-flop permettent de passer en pignon fixe plus tard en retournant la roue.",
      },
    ],
  },
  {
    slug: 'velo-cargo',
    name: 'Cargo',
    h1: "Vélos cargo et longtails d'occasion",
    tagline: 'Biporteurs, longtails et familiales',
    intro:
      "Le vélo cargo remplace une deuxième voiture — et son prix neuf s'en ressent. En occasion, biporteurs et longtails électriques deviennent accessibles aux familles. Les loueurs et boutiques qui renouvellent leur flotte sont une source de cargos récents, entretenus et garantis.",
    metaDescription:
      "Vélos cargo d'occasion : biporteurs, longtails, triporteurs électriques. Cargos de flottes professionnelles entretenus, l'alternative à la deuxième voiture.",
    kind: 'cargo',
    faq: [
      {
        q: 'Longtail ou biporteur pour transporter deux enfants ?',
        a: "Le longtail (enfants derrière) se conduit comme un vélo classique et se gare partout. Le biporteur (caisse à l'avant) offre plus de volume et un contact visuel avec les enfants, mais demande un temps d'adaptation et de la place.",
      },
      {
        q: "Que vérifier sur un cargo électrique d'occasion ?",
        a: "La batterie (comme tout VAE), mais aussi les rayons et jantes arrière — très sollicités par la charge — et l'état de la transmission. Un cargo ex-flotte professionnelle a l'avantage d'un carnet d'entretien suivi.",
      },
    ],
  },
  {
    slug: 'pieces-equipement',
    name: 'Pièces & équipement',
    h1: "Pièces vélo et équipement d'occasion",
    tagline: 'Roues, groupes, cockpits, textile',
    intro:
      "Paires de roues carbone, groupes complets, périphériques et équipement : la pièce d'occasion fait vivre les vélos deux fois plus longtemps. Compatibilités et usure sont détaillées dans chaque annonce pour acheter sans mauvaise surprise.",
    metaDescription:
      "Pièces vélo d'occasion : roues carbone, groupes Shimano et SRAM, cockpits, selles. Compatibilités détaillées, vendeurs identifiés.",
    kind: 'pieces',
    faq: [
      {
        q: "Quelles pièces acheter d'occasion sans risque ?",
        a: "Roues (après contrôle du voile et des pistes de freinage), cintres et potences aluminium, selles, dérailleurs. Évitez d'occasion : chaînes, cassettes, plaquettes et câbles — ces consommables se remplacent neufs pour quelques dizaines d'euros.",
      },
    ],
  },
]

export function getUniverse(slug: string) {
  return universes.find(u => u.slug === slug)
}

export function universeKind(slug: string) {
  return getUniverse(slug)?.kind ?? 'route'
}
