export type Lang = 'fr' | 'en' | 'de';

export const translations = {
  fr: {
    // ── Navigation ──
    nav: {
      home: 'Accueil',
      approach: 'Notre approche',
      technology: 'Technologie',
      performance: 'Performances',
      contact: 'Contact',
      contact_cta: 'Prendre contact',
      resources: 'Ressources',
      faq: 'FAQ',
      referral: 'Programme de parrainage',
      calculator: 'Calculatrice composée',
      risks: 'Avertissements sur les risques',
    },

    // ── Hero ──
    hero: {
      badge: 'Trading systématique quantitatif — Suisse',
      title1: 'La précision des algorithmes.',
      title2: 'La rigueur des marchés.',
      subtitle:
        'Nous concevons et opérons des stratégies quantitatives systématiques qui exploitent les patterns statistiques du marché des changes grâce à l\'exécution algorithmique automatisée.',
      cta_primary: 'Découvrir notre approche',
      cta_secondary: 'Consulter nos performances',
      scroll_indicator: 'Défiler pour découvrir',
    },

    // ── Stats / KPIs ──
    stats: {
      title: 'Résultats déclarés',
      subtitle: 'Track record réel et vérifié sur EUR/USD depuis 2022',
      disclaimer:
        'Les performances passées ne préjugent pas des performances futures et ne constituent pas un indicateur fiable des résultats futurs. Ces chiffres sont déclarés par Summit One et soumis à validation documentaire indépendante.',
      items: [
        {
          value: '+8,76 %',
          label: 'Rendement mensuel moyen',
          description: 'Moyenne déclarée depuis 2022',
        },
        {
          value: '3,40',
          label: 'Profit Factor',
          description: 'Rapport gains bruts / pertes brutes',
        },
        {
          value: '71 %',
          label: 'Taux de réussite',
          description: 'Positions longues clôturées en profit',
        },
        {
          value: '11,28 %',
          label: 'Drawdown maximal',
          description: 'Recul maximal depuis un point haut',
        },
      ],
    },

    // ── Philosophy ──
    philosophy: {
      badge: 'Notre philosophie',
      title: 'L\'excellence par la discipline quantitative',
      subtitle:
        'Chaque décision repose sur des règles prédéfinies, validées statistiquement, et exécutées sans intervention humaine.',
      items: [
        {
          title: 'Décision quantitative',
          body: 'Nos décisions de trading reposent exclusivement sur des signaux mathématiques objectifs, éliminant tout biais comportemental.',
        },
        {
          title: 'Discipline algorithmique',
          body: 'Les algorithmes exécutent les règles de la stratégie avec une rigueur absolue, indépendamment des conditions émotionnelles de marché.',
        },
        {
          title: 'Exécution systématique',
          body: 'Chaque ordre est passé selon des paramètres prédéfinis : taille, timing, niveaux stop — sans arbitraire.',
        },
        {
          title: 'Contrôle des risques',
          body: 'Les paramètres de risque sont définis a priori et surveillés en continu. Le drawdown maximal est une contrainte de conception, pas une conséquence.',
        },
        {
          title: 'Monitoring continu',
          body: 'Les performances et les indicateurs de risque sont suivis en temps réel, avec des alertes configurées sur les seuils critiques.',
        },
      ],
    },

    // ── Process ──
    process: {
      badge: 'Notre processus',
      title: 'De la recherche à l\'exécution',
      subtitle:
        'Un processus rigoureux en quatre étapes, de l\'identification des patterns à la surveillance continue.',
      steps: [
        {
          number: '01',
          title: 'Identification',
          body: 'Analyse statistique des séries temporelles EUR/USD pour identifier les patterns récurrents présentant une significativité statistique robuste.',
        },
        {
          number: '02',
          title: 'Modélisation',
          body: 'Développement et validation des stratégies sur données historiques étendues. Backtesting rigoureux, optimisation des paramètres, contrôle de la robustesse.',
        },
        {
          number: '03',
          title: 'Exécution',
          body: 'Déploiement automatisé via l\'infrastructure Vantage Markets. L\'algorithme exécute les décisions sans intervention humaine, selon des règles prédéfinies.',
        },
        {
          number: '04',
          title: 'Surveillance',
          body: 'Monitoring continu des paramètres de risque et de performance. Toute déviation significative déclenche une procédure de révision.',
        },
      ],
    },

    // ── Tech overview ──
    tech: {
      badge: 'Infrastructure',
      title: 'Technologie et environnement',
      subtitle: 'Une infrastructure dédiée au trading algorithmique sur le marché des changes.',
      items: [
        { label: 'Marché', value: 'EUR/USD' },
        { label: 'Infrastructure', value: 'Vantage Markets' },
        { label: 'Origine', value: 'Suisse' },
        { label: 'Track record', value: 'Depuis 2022' },
      ],
    },

    // ── Différenciation ──
    ecosystem: {
      badge: 'Différenciation',
      title: 'Ce qu\'est Summit One et ce qui ne l\'est pas',
      intro:
        'Summit One est une plateforme de copy trading avec des bots programmés par IA pour le trading automatisé.',
      not_label: 'Summit One n\'est expressément PAS :',
      not_items: [
        {
          title: 'Pas un courtier',
          body: 'Summit One n\'est ni une banque ni un courtier. Les utilisateurs créent leurs propres comptes auprès de courtiers partenaires.',
        },
        {
          title: 'Pas de gestion d\'actifs',
          body: 'Summit One n\'a pas accès direct aux fonds des clients.',
        },
        {
          title: 'Pas un service de trading manuel',
          body: 'Summit One repose sur des algorithmes de trading entièrement automatisés, et non sur le trading manuel.',
        },
        {
          title: 'Aucun conseil financier',
          body: 'Summit One ne propose pas de conseils d\'investissement individuels.',
        },
        {
          title: 'Aucune garantie de victoire',
          body: 'Les rendements ciblés mentionnés ne sont pas garantis. Le trading comporte un risque de perte.',
        },
        {
          title: 'Pas un service de signal pur',
          body: 'Summit One copie les transactions automatiquement au lieu d\'envoyer seulement des signaux.',
        },
      ],
      distinction:
        'Summit One se distingue des autres fournisseurs de bots de trading par : des algorithmes d\'IA développés en Suisse, un modèle de frais de performance sans coûts fixes, un historique en temps réel de plus de 4 ans.',
    },

    // ── FAQ ──
    faq: {
      badge: 'Questions fréquentes',
      title: 'Comprendre le trading quantitatif',
      items: [
        {
          q: "Comment puis-je commencer avec Summit One ?",
          a: "Simple, suivez ces étapes :\n1. Envoyez-nous un message.\n2. Ensuite, nous vous enverrons les étapes pour ouvrir votre compte de trading auprès de notre courtier.\n3. Ensemble, nous allons lier votre compte à la stratégie choisie.\n4. Installez-vous confortablement et regardez votre produit choisi agir pour vous.\n\n(Nos experts sont là pour vous accompagner tout au long du processus.)",
        },
        {
          q: "Quel est l\'investissement minimum ?",
          a: "L\'investissement minimum est de 5 000 CHF. Cela vous permet de suivre l\'une de nos trois stratégies disponibles. Ce montant sert à établir une gestion consciencieuse des risques.",
        },
        {
          q: "Ai-je accès à mon investissement / à mon argent à un moment donné ?",
          a: "Oui. Vos fonds restent à tout moment sur votre propre compte de trading, ouvert à votre nom auprès du courtier partenaire. Summit One n\'a pas d\'accès direct à vos fonds : vous gardez le contrôle et pouvez les retirer quand vous le souhaitez.",
        },
        {
          q: "Puis-je arrêter ou sortir du copy trading à tout moment ?",
          a: "Oui, vous pouvez vous désabonner de nos services à tout moment et retirer ou augmenter votre capital. Il n\'y a pas de durée minimale.",
        },
        {
          q: "Qu\'est-ce que le trading systématique quantitatif ?",
          a: "Le trading systématique quantitatif consiste à utiliser des modèles mathématiques et statistiques pour prendre des décisions de trading selon des règles prédéfinies, sans intervention émotionnelle. Les décisions sont entièrement automatisées.",
        },
        {
          q: "Comment fonctionne une stratégie algorithmique ?",
          a: "Un algorithme de trading analyse en continu les données de marché, identifie les conditions correspondant aux règles de la stratégie, et exécute automatiquement les ordres d\'achat ou de vente selon des paramètres définis.",
        },
        {
          q: "Sur quel marché intervient Summit One ?",
          a: "Summit One intervient exclusivement sur la paire de devises EUR/USD, l\'une des paires les plus liquides au monde, via l\'infrastructure Vantage Markets.",
        },
        {
          q: "Qu\'est-ce qu\'un backtesting ?",
          a: "Le backtesting est un processus de simulation d\'une stratégie sur des données historiques, permettant d\'évaluer ses performances passées et sa robustesse avant tout déploiement réel.",
        },
        {
          q: "Qu\'est-ce qu\'un Profit Factor ?",
          a: "Le Profit Factor est le rapport entre les gains bruts totaux et les pertes brutes totales sur une période donnée. Un Profit Factor de 3,40 signifie que pour chaque unité monétaire perdue, 3,40 unités ont été gagnées.",
        },
        {
          q: "Comment interpréter un taux de réussite ?",
          a: "Le taux de réussite indique la proportion de positions clôturées en profit. Le chiffre communiqué (71 %) concerne spécifiquement les positions longues. Ce taux seul ne suffit pas à évaluer une stratégie : la taille des gains et des pertes est également déterminante.",
        },
        {
          q: "Qu\'est-ce qu\'un drawdown ?",
          a: "Le drawdown désigne le recul de la valorisation depuis son point haut précédent. Un drawdown maximal de 11,28 % signifie que la valorisation a reculé au maximum de 11,28 % depuis un sommet avant de remonter.",
        },
        {
          q: "Comment accéder à la stratégie ?",
          a: "La stratégie développée par Summit One est accessible via un réseau de partenaires distributeurs sélectionnés. Contactez-nous pour obtenir des informations sur les modalités d\'accès.",
        },
        {
          q: "Quels sont les risques du trading Forex ?",
          a: "Le marché des changes est soumis à des fluctuations significatives. Le trading avec effet de levier amplifie les gains potentiels mais également les pertes. Il est possible de perdre tout ou partie du capital investi. Les systèmes automatisés ne garantissent pas de résultats.",
        },
        {
          q: "Quel est le rôle de Summit One ?",
          a: "Summit One est l\'éditeur et développeur de la stratégie algorithmique. Il conçoit, maintient et déploie les algorithmes de trading. Son activité est celle d\'un éditeur de solutions logicielles financières, distincte d\'un gestionnaire de fonds ou d\'un conseiller financier.",
        },
      ],
    },

    // ── Parrainage ──
    referral: {
      badge: 'Programme de parrainage',
      title: 'Recommandez Summit One et recevez jusqu\'à 50 % des frais de commission',
      subtitle: 'Partagez votre expérience du copy trading et soyez récompensé jusqu\'à 50 % des frais de commission.',
      steps: [
        {
          number: '01',
          title: 'Recommandation',
          body: 'La personne que vous recommandez indique votre nom lors de son inscription. Vous êtes alors automatiquement enregistré dans notre programme de parrainage.',
        },
        {
          number: '02',
          title: 'Gains',
          body: 'Lorsque la personne recommandée réalise un profit sur son compte de trading, vous recevez jusqu\'à 50 % des frais de commission qu\'elle verse.',
        },
        {
          number: '03',
          title: 'Versement',
          body: 'Les modalités et la fréquence de versement vous sont communiquées lors de votre inscription au programme.',
        },
      ],
      description1: 'Pourquoi participer : le programme récompense les utilisateurs qui font confiance à Summit One et souhaitent partager leur expérience du copy trading.',
      description2: 'Transparence : les conditions du programme sont communiquées clairement à l\'adhésion, sans système à plusieurs niveaux dissimulé.',
      cta: 'Rejoindre le programme',
    },

    // ── Calculator ──
    calculator: {
      badge: 'Calculatrice composée',
      title: 'Simulez la croissance de votre capital',
      subtitle: 'Estimez l\'évolution de votre capital en fonction d\'un rendement mensuel hypothétique et d\'une durée d\'investissement.',
      disclaimer: 'Cette simulation est fournie à titre indicatif uniquement. Elle ne constitue pas une projection de résultats réels ni une promesse de performance. Les performances passées ne préjugent pas des performances futures.',
      initial_label: 'Capital initial (CHF)',
      rate_label: 'Rendement mensuel hypothétique (%)',
      years_label: 'Durée (années)',
      result_label: 'Capital simulé',
      growth_label: 'Croissance simulée',
      simulate: 'Simuler',
    },

    // ── CTA Section ──
    cta: {
      badge: 'Prise de contact',
      title: 'Découvrez une approche quantitative des marchés.',
      subtitle:
        'Notre équipe est disponible pour présenter notre méthodologie, répondre à vos questions et évaluer la pertinence de notre approche pour votre situation.',
      btn: 'Prendre contact',
      secondary: 'Consulter les performances',
      disclaimer: 'Les informations transmises restent strictement confidentielles.',
    },

    // ── Approach page ──
    approach: {
      hero_title: 'Notre approche',
      hero_subtitle: 'Une méthodologie quantitative rigoureuse, fondée sur la recherche statistique et l\'exécution algorithmique.',
      sections: [
        {
          title: 'Trading systématique',
          body: 'Contrairement au trading manuel, qui repose sur le jugement subjectif d\'un opérateur, le trading systématique suit des règles prédéfinies et immuables. Chaque décision — entrée, sortie, taille de position — est déterminée a priori par la stratégie.\n\nCette discipline élimine les biais cognitifs inhérents à la décision humaine : surconfiance, aversion aux pertes, biais de confirmation. La régularité et la cohérence d\'exécution sont des avantages structurels du trading systématique.',
        },
        {
          title: 'Recherche quantitative',
          body: 'La base de notre approche est l\'identification de patterns statistiques récurrents sur le marché des changes. Ces patterns sont des configurations de prix présentant une probabilité de réalisation statistiquement significative, mesurable sur des historiques de données étendus.\n\nLa recherche quantitative repose sur l\'analyse rigoureuse de séries temporelles, de tests statistiques de significativité et de validation par echantillonnage hors-échantillon pour éviter le sur-ajustement.',
        },
        {
          title: 'Discipline algorithmique',
          body: 'Une fois les règles de la stratégie définies et validées, leur implémentation algorithmique garantit une exécution parfaitement fidèle, sans interprétation ni adaptation.\n\nLes algorithmes de Summit One s\'exécutent selon des règles strictes : conditions d\'entrée précises, paramètres de stop-loss définis, cibles de profit déterminées. L\'absence d\'intervention humaine pendant l\'exécution est une condition de cohérence.',
        },
        {
          title: 'Gestion du risque',
          body: 'La maîtrise du risque n\'est pas une considération a posteriori mais un paramètre central de la conception de la stratégie. Les contraintes de drawdown maximal, de taille de position et d\'exposition sont définies avant le déploiement.\n\nLe monitoring continu des paramètres de risque permet de détecter toute dérive par rapport au comportement attendu. Les seuils d\'alerte sont configurés pour déclencher une révision avant que les pertes n\'atteignent des niveaux critiques.',
        },
        {
          title: 'Processus de validation',
          body: 'Avant tout déploiement réel, chaque stratégie fait l\'objet d\'un backtesting rigoureux sur des données historiques étendues. Ce processus permet d\'évaluer les performances passées, la stabilité des résultats selon les conditions de marché et la robustesse face aux variations de paramètres.\n\nLa validation sur données hors-échantillon est une étape critique pour distinguer les patterns véritables des artefacts statistiques. Summit One applique des critères de validation stricts avant de considérer une stratégie prête pour le déploiement.',
        },
      ],
    },

    // ── Technology page ──
    technology: {
      hero_title: 'Technologie & Stratégie',
      hero_subtitle: 'De la recherche statistique à l\'exécution automatisée : l\'infrastructure technique de Summit One.',
      sections: [
        {
          title: 'Recherche et développement',
          body: 'Summit One développe ses propres stratégies algorithmiques. Le processus de R&D comprend l\'analyse de données historiques, l\'identification de patterns statistiques, le développement de modèles et leur validation.',
        },
        {
          title: 'Analyse statistique',
          body: 'L\'analyse des séries temporelles EUR/USD permet d\'identifier des patterns récurrents présentant une significativité statistique. Ces patterns sont filtrés par de multiples critères de robustesse avant validation.',
        },
        {
          title: 'Backtesting rigoureux',
          body: 'Chaque stratégie est testée sur des historiques de données étendus. Le backtesting inclut des tests de robustesse, des analyses de sensibilité aux paramètres et des validations hors-échantillon.',
        },
        {
          title: 'Exécution automatisée',
          body: 'L\'infrastructure d\'exécution automatisée garantit l\'entrée et la sortie des positions selon les règles définies, sans latence comportementale ni interprétation humaine.',
        },
        {
          title: 'Infrastructure',
          body: 'Les stratégies sont déployées depuis la Suisse via Vantage Markets, sur la paire EUR/USD. L\'environnement technique est conçu pour la fiabilité, la stabilité et la réactivité.',
        },
        {
          title: 'Monitoring',
          body: 'Le suivi continu des paramètres de risque et de performance permet de détecter toute anomalie et de maintenir les stratégies dans leurs paramètres de fonctionnement définis.',
        },
      ],
      illustration_note: 'Illustration — Représentation schématique du flux de décision algorithmique. Non représentatif de l\'architecture réelle.',
    },

    // ── Performance page ──
    performance: {
      hero_title: 'Performances',
      hero_subtitle: 'Track record réel sur EUR/USD — données Myfxbook.',
      table_title: 'Indicateurs de performance',
      table_note: 'Ces chiffres sont issus du compte Myfxbook Helvora Trader. Les performances passées ne préjugent pas des performances futures.',
      definitions_title: 'Définitions et méthodologie',
      methodology_title: 'Note méthodologique',
      methodology: [
        { label: 'Période d\'observation', value: 'Track record depuis 2022 (EUR/USD)' },
        { label: 'Instrument', value: 'EUR/USD (Forex)' },
        { label: 'Infrastructure', value: 'Vantage Markets' },
        { label: 'Origine', value: 'Suisse' },      ],
      risk_note: 'AVERTISSEMENT IMPORTANT — Les performances passées ne préjugent pas des performances futures et ne constituent pas un indicateur fiable des résultats futurs. Le trading Forex avec effet de levier implique un risque élevé de perte. Il est possible de perdre tout ou partie du capital. Ces informations sont fournies à titre indicatif uniquement et ne constituent pas un conseil financier.',
      month_labels: ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'],
      year_label: 'Année',
      myfxbook_verified: 'Compte en direct vérifié par Myfxbook',
      myfxbook_updated: 'Dernière mise à jour des données : novembre 2026 — Les données mensuelles sont mises à jour manuellement après validation.',
      data_pending: 'Données en cours de validation documentaire. Elles seront publiées dès leur confirmation.',
      kpi_avg_return_label: 'Rendement mensuel moyen',
      kpi_avg_return_desc: 'Moyenne déclarée depuis 2022',
      kpi_pf_label: 'Profit Factor',
      kpi_pf_desc: 'Gains bruts / pertes brutes',
      kpi_wr_label: 'Taux de réussite',
      kpi_wr_desc: 'Positions longues en profit',
      kpi_dd_label: 'Drawdown maximal',
      kpi_dd_desc: 'Recul maximal depuis un pic',
      definitions: [
        {
          term: 'Rendement mensuel moyen',
          def: 'Moyenne arithmétique des rendements mensuels sur la période d\'observation. La méthode de calcul précise (Time-Weighted Return, etc.) sera précisée lors de la validation documentaire.',
        },
        {
          term: 'Profit Factor',
          def: 'Rapport entre la somme des gains bruts et la somme des pertes brutes sur la période d\'observation. Un Profit Factor supérieur à 1 indique que les gains sont supérieurs aux pertes.',
        },
        {
          term: 'Taux de réussite (Win Rate)',
          def: 'Proportion de positions clôturées en profit. Le taux de 71 % communiqué concerne spécifiquement les positions longues. Le taux de réussite global peut différer.',
        },
        {
          term: 'Drawdown maximal',
          def: 'Recul maximal de la valorisation depuis un précédent point haut sur la période d\'observation. Exprimé en pourcentage du pic de valorisation. Ce chiffre est un indicateur du risque de perte temporaire, non une garantie de perte maximale future.',
        },
      ],
    },

    // ── Contact page ──
    contact: {
      hero_title: 'Contact',
      hero_subtitle: 'Notre équipe est disponible pour répondre à vos questions et vous présenter notre approche.',
      address_title: 'Coordonnées',
      form_title: 'Envoyer un message',
      form: {
        first_name: 'Prénom',
        last_name: 'Nom',
        email: 'Adresse e-mail',
        phone: 'Téléphone',
        country: 'Pays',
        type: 'Nature de la demande',
        message: 'Message',
        consent: 'J\'accepte que mes données soient utilisées pour traiter ma demande conformément à la politique de confidentialité.',
        submit: 'Envoyer le message',
        success: 'Votre message a été envoyé. Nous vous répondrons dans les meilleurs délais.',
        error: 'Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement par e-mail.',
        required: 'Champ obligatoire',
      },
      types: [
        'Présentation de la stratégie',
        'Informations techniques',
        'Partenariat de distribution',
        'Demande professionnelle',
        'Autre',
      ],
      appointment_title: 'Prendre rendez-vous',
      appointment_body: 'Nous proposons des rendez-vous à distance (visioconférence) et en présentiel en Suisse. Fuseau horaire européen. Contactez-nous pour convenir d\'un rendez-vous adapté à votre situation.',
    },

    // ── Legal ──
    legal: {
      title: 'Mentions légales',
      risk_title: 'Avertissements sur les risques',
      privacy_title: 'Politique de confidentialité',
    },

    // ── Footer ──
    footer: {
      tagline: 'Trading systématique quantitatif depuis la Suisse.',
      links_title: 'Navigation',
      useful_links_title: 'Liens',
      legal_title: 'Informations légales',
      risk_warning: 'Les performances passées ne préjugent pas des performances futures. Le trading Forex implique un risque élevé de perte.',
      copyright: '© {year} Summit One. Tous droits réservés.',
      built_in: 'Développé en Suisse',
    },

    // ── 404 ──
    not_found: {
      title: 'Page introuvable',
      subtitle: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
      cta: 'Retour à l\'accueil',
    },

    // ── Aneto chatbot ──
    aneto: {
      title: 'Aneto',
      subtitle: 'Assistant Summit One',
      welcome: 'Bonjour, je suis Aneto, l\'assistant automatisé de Summit One. Je suis là pour vous présenter notre approche et répondre à vos questions.\n\nNote : je suis un assistant automatisé. Je ne fournis pas de conseil financier personnalisé.',
      placeholder: 'Posez votre question...',
      send: 'Envoyer',
      disclaimer: 'Aneto est un assistant automatisé. Il ne fournit aucun conseil financier.',
      responses: {
        approach: 'Summit One conçoit et déploie des stratégies de trading systématique quantitatif sur le marché des changes (EUR/USD). Nous exploitons des patterns statistiques récurrents via des algorithmes d\'exécution automatisée.',
        performance: 'Sur 45 mois de track record : +8,76 % de rendement mensuel moyen déclaré, Profit Factor 3,40, taux de réussite 71 % (positions longues), drawdown maximal 11,28 %. Ces chiffres sont déclarés et soumis à validation. Les performances passées ne garantissent pas les résultats futurs.',
        contact: 'Pour nous contacter : summit.one.contact@gmail.com | +41 78 441 54 20 | Suisse. Vous pouvez aussi utiliser le formulaire de contact sur notre site.',
        default: 'Je peux vous renseigner sur l\'approche de Summit One, nos indicateurs de performance, ou vous orienter vers notre équipe. Que souhaitez-vous savoir ?',
      },
    },
  },

  // ══════════════════════════════════════════
  en: {
    nav: {
      home: 'Home',
      approach: 'Our approach',
      technology: 'Technology',
      performance: 'Performance',
      contact: 'Contact',
      contact_cta: 'Get in touch',
      resources: 'Resources',
      faq: 'FAQ',
      referral: 'Referral programme',
      calculator: 'Compound calculator',
      risks: 'Risk warnings',
    },
    hero: {
      badge: 'Systematic quantitative trading — Switzerland',
      title1: 'Algorithmic precision.',
      title2: 'Market discipline.',
      subtitle:
        'We design systematic quantitative strategies that exploit statistical regularities observed in the foreign exchange market, through automated algorithmic execution.',
      cta_primary: 'Discover our approach',
      cta_secondary: 'View performance',
      scroll_indicator: 'Scroll to explore',
    },
    stats: {
      title: 'Declared results',
      subtitle: 'Real, verified track record on EUR/USD since 2022',
      disclaimer:
        'Past performance is not indicative of future results. These figures are declared by Summit One and subject to independent documentary validation.',
      items: [
        { value: '+8.76%', label: 'Avg. monthly return', description: 'Declared average since 2022' },
        { value: '3.40', label: 'Profit Factor', description: 'Gross gains / gross losses ratio' },
        { value: '71%', label: 'Win rate', description: 'Long positions closed in profit' },
        { value: '11.28%', label: 'Max drawdown', description: 'Maximum decline from a peak' },
      ],
    },
    philosophy: {
      badge: 'Our philosophy',
      title: 'Excellence through quantitative discipline',
      subtitle: 'Every decision rests on predefined, statistically validated rules, executed without human intervention.',
      items: [
        { title: 'Quantitative decision-making', body: 'Trading decisions rely exclusively on objective mathematical signals, eliminating all behavioral bias.' },
        { title: 'Algorithmic discipline', body: 'Algorithms execute the strategy rules with absolute rigor, independent of market emotional conditions.' },
        { title: 'Systematic execution', body: 'Every order is placed according to predefined parameters: size, timing, stop levels — no arbitrariness.' },
        { title: 'Risk control', body: 'Risk parameters are defined upfront and monitored continuously. Maximum drawdown is a design constraint, not a consequence.' },
        { title: 'Continuous monitoring', body: 'Performance and risk indicators are tracked in real time, with alerts configured on critical thresholds.' },
      ],
    },
    process: {
      badge: 'Our process',
      title: 'From research to execution',
      subtitle: 'A rigorous four-step process, from pattern identification to continuous monitoring.',
      steps: [
        { number: '01', title: 'Identification', body: 'Statistical analysis of EUR/USD time series to identify recurring patterns with robust statistical significance.' },
        { number: '02', title: 'Modelling', body: 'Strategy development and validation on extended historical data. Rigorous backtesting, parameter optimization, robustness control.' },
        { number: '03', title: 'Execution', body: 'Automated deployment via Vantage Markets infrastructure. The algorithm executes decisions without human intervention.' },
        { number: '04', title: 'Monitoring', body: 'Continuous monitoring of risk and performance parameters. Any significant deviation triggers a review procedure.' },
      ],
    },
    tech: {
      badge: 'Infrastructure',
      title: 'Technology and environment',
      subtitle: 'A dedicated infrastructure for algorithmic trading on the foreign exchange market.',
      items: [
        { label: 'Market', value: 'EUR/USD' },
        { label: 'Infrastructure', value: 'Vantage Markets' },
        { label: 'Origin', value: 'Switzerland' },
        { label: 'Track record', value: 'Since 2022' },
      ],
    },
    ecosystem: {
      badge: 'Differentiation',
      title: 'What Summit One is — and what it is not',
      intro: 'Summit One is a copy trading platform with AI-programmed bots for automated trading.',
      not_label: 'Summit One is expressly NOT:',
      not_items: [
        { title: 'Not a broker', body: 'Summit One is neither a bank nor a broker. Users open their own accounts with partner brokers.' },
        { title: 'No asset management', body: 'Summit One has no direct access to client funds.' },
        { title: 'Not a manual trading service', body: 'Summit One relies on fully automated trading algorithms, not manual trading.' },
        { title: 'No financial advice', body: 'Summit One does not provide individual investment advice.' },
        { title: 'No guaranteed returns', body: 'Targeted returns mentioned are not guaranteed. Trading involves a risk of loss.' },
        { title: 'Not a pure signal service', body: 'Summit One copies trades automatically instead of only sending signals.' },
      ],
      distinction: 'Summit One stands out from other trading bot providers through: AI algorithms developed in Switzerland, a performance-fee model with no fixed costs, and a real-time track record of more than 4 years.',
    },
    faq: {
      badge: 'FAQ',
      title: 'Understanding quantitative trading',
      items: [
        { q: 'How can I get started with Summit One?', a: 'Simply follow these steps:\n1. Send us a message.\n2. We will then send you the steps to open your trading account with our broker.\n3. Together, we will link your account to the chosen strategy.\n4. Sit back and watch your chosen product work for you.\n\n(Our experts are there to support you throughout the process.)' },
        { q: 'What is the minimum investment?', a: 'The minimum investment is CHF 5,000. This allows you to follow one of our three available strategies. This amount supports conscientious risk management.' },
        { q: 'Do I have access to my investment / my money at any given time?', a: 'Yes. Your funds remain at all times in your own trading account, opened in your name with the partner broker. Summit One has no direct access to your funds: you keep control and can withdraw them whenever you wish.' },
        { q: 'Can I stop or exit copy trading at any time?', a: 'Yes, you can unsubscribe from our services at any time and withdraw or increase your capital. There is no minimum duration.' },
        { q: 'What is systematic quantitative trading?', a: 'Systematic quantitative trading uses mathematical and statistical models to make trading decisions according to predefined rules, without emotional intervention. Decisions are fully automated.' },
        { q: 'How does an algorithmic strategy work?', a: 'A trading algorithm continuously analyzes market data, identifies conditions matching the strategy rules, and automatically executes buy or sell orders according to defined parameters.' },
        { q: 'Which market does Summit One operate on?', a: 'Summit One focuses exclusively on the EUR/USD currency pair, one of the most liquid in the world, via the Vantage Markets infrastructure.' },
        { q: 'What is backtesting?', a: 'Backtesting is a simulation process of a strategy on historical data, allowing evaluation of past performance and robustness before any real deployment.' },
        { q: 'What is a Profit Factor?', a: 'The Profit Factor is the ratio between total gross gains and total gross losses over a given period. A Profit Factor of 3.40 means that for every unit of currency lost, 3.40 units were gained.' },
        { q: 'How should a win rate be interpreted?', a: 'The win rate indicates the proportion of positions closed in profit. The figure communicated (71%) specifically concerns long positions. This rate alone is insufficient to evaluate a strategy.' },
        { q: 'What is a drawdown?', a: 'Drawdown refers to the decline in valuation from a previous peak. A maximum drawdown of 11.28% means valuation declined at most 11.28% from a peak before recovering.' },
        { q: 'How can I access the strategy?', a: 'The strategy developed by Summit One is accessible through a network of selected distribution partners. Contact us for information on access conditions.' },
        { q: 'What are the risks of Forex trading?', a: 'The foreign exchange market is subject to significant fluctuations. Leveraged trading amplifies potential gains but also losses. It is possible to lose all or part of the invested capital.' },
        { q: "What is Summit One's role?", a: "Summit One is the publisher and developer of the algorithmic strategy. Its activity is that of a financial software publisher, distinct from a fund manager or financial advisor." },
      ],
    },
    cta: {
      badge: 'Get in touch',
      title: 'Discover a quantitative approach to markets.',
      subtitle: 'Our team is available to present our methodology, answer your questions, and assess the relevance of our approach for your situation.',
      btn: 'Get in touch',
      secondary: 'View performance',
      disclaimer: 'Information shared remains strictly confidential.',
    },
    approach: {
      hero_title: 'Our approach',
      hero_subtitle: 'A rigorous quantitative methodology, based on statistical research and algorithmic execution.',
      sections: [
        { title: 'Systematic trading', body: 'Unlike manual trading, which relies on the subjective judgment of an operator, systematic trading follows predefined and immutable rules. Each decision — entry, exit, position size — is determined in advance by the strategy.\n\nThis discipline eliminates the cognitive biases inherent to human decision-making: overconfidence, loss aversion, confirmation bias.' },
        { title: 'Quantitative research', body: 'The foundation of our approach is the identification of statistically recurring patterns on the foreign exchange market. These patterns are price configurations with statistically significant probability of occurrence, measurable on extended historical data.' },
        { title: 'Algorithmic discipline', body: 'Once the strategy rules are defined and validated, their algorithmic implementation guarantees perfectly faithful execution, without interpretation or adaptation.' },
        { title: 'Risk management', body: 'Risk control is not an afterthought but a central parameter of strategy design. Maximum drawdown constraints, position sizing and exposure limits are defined before deployment.' },
        { title: 'Validation process', body: 'Before any real deployment, each strategy undergoes rigorous backtesting on extended historical data. Out-of-sample validation is a critical step to distinguish genuine patterns from statistical artifacts.' },
      ],
    },
    technology: {
      hero_title: 'Technology & Strategy',
      hero_subtitle: 'From statistical research to automated execution: the technical infrastructure of Summit One.',
      sections: [
        { title: 'Research and development', body: 'Summit One develops its own algorithmic strategies. The R&D process includes historical data analysis, statistical pattern identification, model development and validation.' },
        { title: 'Statistical analysis', body: 'Analysis of EUR/USD time series identifies recurring patterns with statistical significance. These patterns are filtered by multiple robustness criteria before validation.' },
        { title: 'Rigorous backtesting', body: 'Each strategy is tested on extended historical data, including robustness tests, parameter sensitivity analyses, and out-of-sample validations.' },
        { title: 'Automated execution', body: 'The automated execution infrastructure ensures positions are entered and exited according to defined rules, without behavioral latency or human interpretation.' },
        { title: 'Infrastructure', body: 'Strategies are deployed from Switzerland via Vantage Markets, on the EUR/USD pair. The technical environment is designed for reliability, stability, and responsiveness.' },
        { title: 'Monitoring', body: 'Continuous monitoring of risk and performance parameters detects any anomaly and maintains strategies within their defined operating parameters.' },
      ],
      illustration_note: 'Illustration — Schematic representation of algorithmic decision flow. Not representative of the actual architecture.',
    },
    performance: {
      hero_title: 'Performance',
      hero_subtitle: 'Real track record on EUR/USD — Myfxbook data.',
      table_title: 'Performance indicators',
      table_note: 'These figures come from the Helvora Trader Myfxbook account. Past performance is not indicative of future results.',
      definitions_title: 'Definitions and methodology',
      methodology_title: 'Methodological note',
      methodology: [
        { label: 'Observation period', value: 'Track record since 2022 (EUR/USD)' },
        { label: 'Instrument', value: 'EUR/USD (Forex)' },
        { label: 'Infrastructure', value: 'Vantage Markets' },
        { label: 'Origin', value: 'Switzerland' },      ],
      risk_note: 'IMPORTANT WARNING — Past performance is not indicative of future results. Leveraged Forex trading involves a high risk of loss. It is possible to lose all or part of the invested capital. This information is provided for indicative purposes only and does not constitute financial advice.',
      month_labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      year_label: 'Year',
      myfxbook_verified: 'Live account verified by Myfxbook',
      myfxbook_updated: 'Last data update: November 2026 — Monthly data is updated manually after validation.',
      data_pending: 'Data pending documentary validation. It will be published once confirmed.',
      kpi_avg_return_label: 'Average monthly return',
      kpi_avg_return_desc: 'Declared average since 2022',
      kpi_pf_label: 'Profit Factor',
      kpi_pf_desc: 'Gross gains / gross losses',
      kpi_wr_label: 'Win rate',
      kpi_wr_desc: 'Long positions in profit',
      kpi_dd_label: 'Maximum drawdown',
      kpi_dd_desc: 'Maximum retracement from peak',
      definitions: [
        { term: 'Average monthly return', def: 'Arithmetic average of monthly returns over the observation period. ' },
        { term: 'Profit Factor', def: 'Ratio between the sum of gross gains and the sum of gross losses over the observation period. A Profit Factor above 1 indicates gains exceed losses.' },
        { term: 'Win Rate', def: 'Proportion of positions closed in profit. The 71% figure specifically concerns long positions. The overall win rate may differ.' },
        { term: 'Maximum Drawdown', def: 'Maximum decline in valuation from a previous peak over the observation period. Expressed as a percentage of the peak valuation.' },
      ],
    },
    contact: {
      hero_title: 'Contact',
      hero_subtitle: 'Our team is available to answer your questions and present our approach.',
      address_title: 'Contact details',
      form_title: 'Send a message',
      form: {
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email address',
        phone: 'Phone',
        country: 'Country',
        type: 'Nature of inquiry',
        message: 'Message',
        consent: 'I agree that my data will be used to process my request in accordance with the privacy policy.',
        submit: 'Send message',
        success: 'Your message has been sent. We will respond as soon as possible.',
        error: 'An error occurred. Please try again or contact us directly by email.',
        required: 'Required field',
      },
      types: ['Strategy presentation', 'Technical information', 'Distribution partnership', 'Professional inquiry', 'Other'],
      appointment_title: 'Schedule an appointment',
      appointment_body: 'We offer remote (video conference) and in-person appointments in Switzerland. European time zone. Contact us to arrange an appointment suited to your situation.',
    },
    legal: { title: 'Legal notices', risk_title: 'Risk warnings', privacy_title: 'Privacy policy' },
    footer: {
      tagline: 'Systematic quantitative trading from Switzerland.',
      links_title: 'Navigation',
      useful_links_title: 'Links',
      legal_title: 'Legal information',
      risk_warning: 'Past performance is not indicative of future results. Forex trading involves a high risk of loss.',
      copyright: '© {year} Summit One. All rights reserved.',
      built_in: 'Developed in Switzerland',
    },
    referral: {
      badge: 'Referral programme',
      title: 'Recommend Summit One and earn up to 50% of commission fees',
      subtitle: 'Share your copy trading experience and be rewarded with up to 50% of commission fees.',
      steps: [
        { number: '01', title: 'Referral', body: 'The person you recommend enters your name when signing up. You are then automatically registered in our referral programme.' },
        { number: '02', title: 'Earnings', body: 'When the referred person makes a profit on their trading account, you receive up to 50% of the commission fees they pay.' },
        { number: '03', title: 'Payment', body: 'Payment terms and frequency are communicated when you join the programme.' },
      ],
      description1: 'Why join: the programme rewards users who trust Summit One and want to share their copy trading experience.',
      description2: 'Transparency: programme terms are clearly communicated at signup, with no hidden multi-level scheme.',
      cta: 'Join the programme',
    },
    calculator: {
      badge: 'Compound calculator',
      title: 'Simulate your capital growth',
      subtitle: 'Estimate how your capital could evolve based on a hypothetical monthly return and an investment duration.',
      disclaimer: 'This simulation is provided for indicative purposes only. It does not constitute a projection of real results or a promise of performance. Past performance is not indicative of future results.',
      initial_label: 'Initial capital (CHF)',
      rate_label: 'Hypothetical monthly return (%)',
      years_label: 'Duration (years)',
      result_label: 'Simulated capital',
      growth_label: 'Simulated growth',
      simulate: 'Simulate',
    },
    not_found: { title: 'Page not found', subtitle: 'The page you are looking for does not exist or has been moved.', cta: 'Back to home' },
    aneto: {
      title: 'Aneto',
      subtitle: 'Summit One Assistant',
      welcome: "Hello, I\'m Aneto, Summit One\'s automated assistant. I\'m here to present our approach and answer your questions.\n\nNote: I am an automated assistant. I do not provide personalized financial advice.",
      placeholder: 'Ask your question...',
      send: 'Send',
      disclaimer: 'Aneto is an automated assistant. It provides no financial advice.',
      responses: {
        approach: 'Summit One designs and deploys systematic quantitative trading strategies on the foreign exchange market (EUR/USD), exploiting recurring statistical patterns through automated algorithmic execution.',
        performance: 'Over 45 months of track record: +8.76% average monthly return declared, Profit Factor 3.40, 71% win rate (long positions), 11.28% max drawdown. These figures are declared and subject to validation. Past performance does not guarantee future results.',
        contact: 'Contact us: summit.one.contact@gmail.com | +41 78 441 54 20 | Switzerland. You can also use the contact form on our site.',
        default: "I can tell you about Summit One\'s approach, our performance indicators, or direct you to our team. What would you like to know?",
      },
    },
  },

  // ══════════════════════════════════════════
  de: {
    nav: {
      home: 'Startseite',
      approach: 'Unser Ansatz',
      technology: 'Technologie',
      performance: 'Performance',
      contact: 'Kontakt',
      contact_cta: 'Kontakt aufnehmen',
      resources: 'Ressourcen',
      faq: 'FAQ',
      referral: 'Empfehlungsprogramm',
      calculator: 'Zinseszinsrechner',
      risks: 'Risikohinweise',
    },
    hero: {
      badge: 'Systematischer quantitativer Handel — Schweiz',
      title1: 'Algorithmische Präzision.',
      title2: 'Disziplin der Märkte.',
      subtitle:
        'Wir entwickeln systematische quantitative Strategien, die statistische Regelmäßigkeiten auf dem Devisenmarkt durch automatisierte algorithmische Ausführung nutzen.',
      cta_primary: 'Unseren Ansatz entdecken',
      cta_secondary: 'Performance ansehen',
      scroll_indicator: 'Scrollen zum Erkunden',
    },
    stats: {
      title: 'Deklarierte Ergebnisse',
      subtitle: 'Realer, verifizierter Track-Record auf EUR/USD seit 2022',
      disclaimer:
        'Vergangene Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse. Diese Zahlen werden von Summit One deklariert und unterliegen einer unabhängigen dokumentarischen Validierung.',
      items: [
        { value: '+8,76 %', label: 'Ø monatliche Rendite', description: 'Deklarierter Durchschnitt seit 2022' },
        { value: '3,40', label: 'Profit Factor', description: 'Bruttogenwinne / Bruttoverluste' },
        { value: '71 %', label: 'Trefferquote', description: 'Long-Positionen mit Gewinn geschlossen' },
        { value: '11,28 %', label: 'Maximaler Drawdown', description: 'Maximaler Rückgang vom Höchststand' },
      ],
    },
    philosophy: {
      badge: 'Unsere Philosophie',
      title: 'Exzellenz durch quantitative Disziplin',
      subtitle: 'Jede Entscheidung basiert auf vordefinierten, statistisch validierten Regeln, die ohne menschliche Intervention ausgeführt werden.',
      items: [
        { title: 'Quantitative Entscheidung', body: 'Handelsentscheidungen basieren ausschließlich auf objektiven mathematischen Signalen und eliminieren alle Verhaltensfehler.' },
        { title: 'Algorithmische Disziplin', body: 'Algorithmen führen die Strategieregeln mit absoluter Strenge aus, unabhängig von emotionalen Marktbedingungen.' },
        { title: 'Systematische Ausführung', body: 'Jede Order wird nach vordefinierten Parametern platziert: Größe, Timing, Stop-Levels — kein Ermessensspielraum.' },
        { title: 'Risikokontrolle', body: 'Risikoparameter werden im Voraus definiert und kontinuierlich überwacht. Der maximale Drawdown ist eine Designbeschränkung, keine Folge.' },
        { title: 'Kontinuierliches Monitoring', body: 'Performance- und Risikoindikatoren werden in Echtzeit verfolgt, mit konfigurierten Alarmen an kritischen Schwellenwerten.' },
      ],
    },
    process: {
      badge: 'Unser Prozess',
      title: 'Von der Forschung zur Ausführung',
      subtitle: 'Ein rigoroser vierstufiger Prozess, von der Mustererkennung bis zur kontinuierlichen Überwachung.',
      steps: [
        { number: '01', title: 'Identifikation', body: 'Statistische Analyse von EUR/USD-Zeitreihen zur Identifizierung wiederkehrender Muster mit robuster statistischer Signifikanz.' },
        { number: '02', title: 'Modellierung', body: 'Strategieentwicklung und -validierung auf ausgedehnten historischen Daten. Rigoroses Backtesting, Parameteroptimierung, Robustheitskontrolle.' },
        { number: '03', title: 'Ausführung', body: 'Automatisierte Bereitstellung über die Vantage Markets Infrastruktur. Der Algorithmus führt Entscheidungen ohne menschliche Intervention aus.' },
        { number: '04', title: 'Überwachung', body: 'Kontinuierliche Überwachung von Risiko- und Performance-Parametern. Jede signifikante Abweichung löst ein Überprüfungsverfahren aus.' },
      ],
    },
    tech: {
      badge: 'Infrastruktur',
      title: 'Technologie und Umgebung',
      subtitle: 'Eine dedizierte Infrastruktur für algorithmischen Handel auf dem Devisenmarkt.',
      items: [
        { label: 'Markt', value: 'EUR/USD' },
        { label: 'Infrastruktur', value: 'Vantage Markets' },
        { label: 'Herkunft', value: 'Schweiz' },
        { label: 'Track Record', value: 'Seit 2022' },
      ],
    },
    ecosystem: {
      badge: 'Differenzierung',
      title: 'Was Summit One ist — und was nicht',
      intro: 'Summit One ist eine Copy-Trading-Plattform mit KI-programmierten Bots für automatisierten Handel.',
      not_label: 'Summit One ist ausdrücklich KEIN:',
      not_items: [
        { title: 'Kein Broker', body: 'Summit One ist weder eine Bank noch ein Broker. Nutzer eröffnen eigene Konten bei Partnerbrokern.' },
        { title: 'Keine Vermögensverwaltung', body: 'Summit One hat keinen direkten Zugriff auf Kundengelder.' },
        { title: 'Kein manueller Trading-Service', body: 'Summit One basiert auf vollständig automatisierten Handelsalgorithmen, nicht auf manuellem Trading.' },
        { title: 'Keine Finanzberatung', body: 'Summit One bietet keine individuellen Anlageberatungen.' },
        { title: 'Keine Gewinngarantie', body: 'Genannte Zielrenditen sind nicht garantiert. Trading birgt ein Verlustrisiko.' },
        { title: 'Kein reiner Signalservice', body: 'Summit One kopiert Trades automatisch, statt nur Signale zu senden.' },
      ],
      distinction: 'Summit One unterscheidet sich durch: in der Schweiz entwickelte KI-Algorithmen, ein Performance-Gebührenmodell ohne Fixkosten und einen Echtzeit-Track-Record von mehr als 4 Jahren.',
    },
    faq: {
      badge: 'Häufige Fragen',
      title: 'Quantitativen Handel verstehen',
      items: [
        { q: 'Wie kann ich mit Summit One starten?', a: 'Einfach, folgen Sie diesen Schritten:\n1. Senden Sie uns eine Nachricht.\n2. Anschließend senden wir Ihnen die Schritte zur Eröffnung Ihres Handelskontos bei unserem Broker.\n3. Gemeinsam verknüpfen wir Ihr Konto mit der gewählten Strategie.\n4. Lehnen Sie sich zurück und beobachten Sie, wie Ihr gewähltes Produkt für Sie arbeitet.\n\n(Unsere Experten begleiten Sie während des gesamten Prozesses.)' },
        { q: 'Wie hoch ist die Mindestanlage?', a: 'Die Mindestanlage beträgt 5.000 CHF. Damit können Sie eine unserer drei verfügbaren Strategien verfolgen. Dieser Betrag dient einem gewissenhaften Risikomanagement.' },
        { q: 'Habe ich Zugriff auf meine Anlage / mein Geld zu einem bestimmten Zeitpunkt?', a: 'Ja. Ihre Gelder bleiben jederzeit auf Ihrem eigenen Handelskonto, das auf Ihren Namen beim Partnerbroker eröffnet wurde. Summit One hat keinen direkten Zugriff auf Ihre Gelder: Sie behalten die Kontrolle und können sie jederzeit abheben.' },
        { q: 'Kann ich das Copy Trading jederzeit beenden oder aussteigen?', a: 'Ja, Sie können unsere Dienste jederzeit abbestellen und Ihr Kapital abheben oder erhöhen. Es gibt keine Mindestdauer.' },
        { q: 'Was ist systematischer quantitativer Handel?', a: 'Systematischer quantitativer Handel verwendet mathematische und statistische Modelle, um Handelsentscheidungen nach vordefinierten Regeln ohne emotionale Eingriffe zu treffen.' },
        { q: 'Wie funktioniert eine algorithmische Strategie?', a: 'Ein Handelsalgorithmus analysiert kontinuierlich Marktdaten, identifiziert Bedingungen entsprechend den Strategieregeln und führt automatisch Kauf- oder Verkaufsaufträge aus.' },
        { q: 'Auf welchem Markt operiert Summit One?', a: 'Summit One ist ausschließlich auf dem Währungspaar EUR/USD tätig, einem der liquidesten der Welt, über die Vantage Markets Infrastruktur.' },
        { q: 'Was ist Backtesting?', a: 'Backtesting ist ein Simulationsprozess einer Strategie auf historischen Daten, der die Bewertung vergangener Leistungen und Robustheit vor dem realen Einsatz ermöglicht.' },
        { q: 'Was ist ein Profit Factor?', a: 'Der Profit Factor ist das Verhältnis zwischen Brutto-Gesamtgewinnen und Brutto-Gesamtverlusten. Ein Profit Factor von 3,40 bedeutet, dass für jede verlorene Einheit 3,40 Einheiten gewonnen wurden.' },
        { q: 'Wie ist eine Trefferquote zu interpretieren?', a: 'Die Trefferquote gibt den Anteil der mit Gewinn geschlossenen Positionen an. Der kommunizierte Wert (71 %) betrifft speziell Long-Positionen.' },
        { q: 'Was ist ein Drawdown?', a: 'Ein Drawdown bezeichnet den Rückgang der Bewertung von einem vorherigen Höchststand. Ein maximaler Drawdown von 11,28 % bedeutet, dass die Bewertung maximal 11,28 % vom Höchststand zurückgegangen ist.' },
        { q: 'Wie kann ich auf die Strategie zugreifen?', a: 'Die von Summit One entwickelte Strategie ist über ein Netzwerk ausgewählter Vertriebspartner zugänglich. Kontaktieren Sie uns für Informationen zu den Zugangsbedingungen.' },
        { q: 'Was sind die Risiken des Forex-Handels?', a: 'Der Devisenmarkt unterliegt erheblichen Schwankungen. Der Hebelhandel verstärkt potenzielle Gewinne, aber auch Verluste. Es ist möglich, das gesamte investierte Kapital zu verlieren.' },
        { q: 'Was ist die Rolle von Summit One?', a: 'Summit One ist Herausgeber und Entwickler der algorithmischen Strategie. Seine Tätigkeit ist die eines Herausgebers von Finanzsoftware.' },
      ],
    },
    cta: {
      badge: 'Kontakt aufnehmen',
      title: 'Entdecken Sie einen quantitativen Ansatz für die Märkte.',
      subtitle: 'Unser Team steht zur Verfügung, um unsere Methodik vorzustellen und Ihre Fragen zu beantworten.',
      btn: 'Kontakt aufnehmen',
      secondary: 'Performance ansehen',
      disclaimer: 'Übermittelte Informationen bleiben streng vertraulich.',
    },
    approach: {
      hero_title: 'Unser Ansatz',
      hero_subtitle: 'Eine rigorose quantitative Methodik, basierend auf statistischer Forschung und algorithmischer Ausführung.',
      sections: [
        { title: 'Systematischer Handel', body: 'Im Gegensatz zum manuellen Handel folgt der systematische Handel vordefinierten und unveränderlichen Regeln. Jede Entscheidung wird im Voraus durch die Strategie bestimmt.' },
        { title: 'Quantitative Forschung', body: 'Grundlage unseres Ansatzes ist die Identifizierung statistisch wiederkehrender Muster auf dem Devisenmarkt.' },
        { title: 'Algorithmische Disziplin', body: 'Sobald die Strategieregeln definiert und validiert sind, garantiert ihre algorithmische Implementierung eine perfekt getreue Ausführung.' },
        { title: 'Risikomanagement', body: 'Risikokontrolle ist ein zentraler Parameter der Strategiegestaltung. Drawdown-Grenzen und Positionsgrößen werden vor der Bereitstellung definiert.' },
        { title: 'Validierungsprozess', body: 'Vor jedem realen Einsatz wird jede Strategie rigorosem Backtesting auf ausgedehnten historischen Daten unterzogen.' },
      ],
    },
    technology: {
      hero_title: 'Technologie & Strategie',
      hero_subtitle: 'Von der statistischen Forschung zur automatisierten Ausführung.',
      sections: [
        { title: 'Forschung und Entwicklung', body: 'Summit One entwickelt eigene algorithmische Strategien. Der F&E-Prozess umfasst historische Datenanalyse, Mustererkennung und Modellvalidierung.' },
        { title: 'Statistische Analyse', body: 'Analyse von EUR/USD-Zeitreihen zur Identifizierung wiederkehrender Muster mit statistischer Signifikanz.' },
        { title: 'Rigoroses Backtesting', body: 'Jede Strategie wird auf ausgedehnten historischen Daten mit Robustheitstests und Out-of-Sample-Validierungen getestet.' },
        { title: 'Automatisierte Ausführung', body: 'Die automatisierte Ausführungsinfrastruktur stellt sicher, dass Positionen gemäß definierten Regeln eröffnet und geschlossen werden.' },
        { title: 'Infrastruktur', body: 'Strategien werden aus der Schweiz über Vantage Markets auf dem EUR/USD-Paar eingesetzt.' },
        { title: 'Monitoring', body: 'Kontinuierliche Überwachung der Risiko- und Performance-Parameter erkennt Anomalien und hält Strategien innerhalb ihrer definierten Betriebsparameter.' },
      ],
      illustration_note: 'Illustration — Schematische Darstellung des algorithmischen Entscheidungsflusses. Nicht repräsentativ für die tatsächliche Architektur.',
    },
    performance: {
      hero_title: 'Performance',
      hero_subtitle: 'Realer Track-Record auf EUR/USD — Myfxbook-Daten.',
      table_title: 'Performance-Indikatoren',
      table_note: 'Diese Zahlen stammen vom Myfxbook-Konto Helvora Trader. Vergangene Wertentwicklungen sind kein Indikator für zukünftige Ergebnisse.',
      definitions_title: 'Definitionen und Methodik',
      methodology_title: 'Methodischer Hinweis',
      methodology: [
        { label: 'Beobachtungszeitraum', value: 'Track-Record seit 2022 (EUR/USD)' },
        { label: 'Instrument', value: 'EUR/USD (Forex)' },
        { label: 'Infrastruktur', value: 'Vantage Markets' },
        { label: 'Herkunft', value: 'Schweiz' },
      ],
      risk_note: 'WICHTIGER HINWEIS — Vergangene Wertentwicklungen sind kein zuverlässiger Indikator für zukünftige Ergebnisse. Der gehebelte Forex-Handel birgt ein hohes Verlustrisiko. Es ist möglich, das gesamte investierte Kapital zu verlieren.',
      month_labels: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
      year_label: 'Jahr',
      myfxbook_verified: 'Live-Konto verifiziert durch Myfxbook',
      myfxbook_updated: 'Letzte Datenaktualisierung: November 2026 — Monatliche Daten werden nach Validierung manuell aktualisiert.',
      data_pending: 'Daten werden derzeit dokumentarisch validiert. Sie werden nach Bestätigung veröffentlicht.',
      kpi_avg_return_label: 'Durchschnittliche Monatsrendite',
      kpi_avg_return_desc: 'Deklarierter Durchschnitt seit 2022',
      kpi_pf_label: 'Profit Factor',
      kpi_pf_desc: 'Bruttogewinne / Bruttoverluste',
      kpi_wr_label: 'Erfolgsquote',
      kpi_wr_desc: 'Long-Positionen mit Gewinn',
      kpi_dd_label: 'Maximaler Drawdown',
      kpi_dd_desc: 'Maximaler Rückgang vom Höchststand',
      definitions: [
        { term: 'Durchschnittliche monatliche Rendite', def: 'Arithmetisches Mittel der monatlichen Renditen über den Beobachtungszeitraum.' },
        { term: 'Profit Factor', def: 'Verhältnis zwischen Brutto-Gesamtgewinnen und Brutto-Gesamtverlusten.' },
        { term: 'Trefferquote (Win Rate)', def: 'Anteil der mit Gewinn geschlossenen Positionen. Der Wert von 71% betrifft speziell Long-Positionen.' },
        { term: 'Maximaler Drawdown', def: 'Maximaler Rückgang der Bewertung von einem vorherigen Höchststand.' },
      ],
    },
    contact: {
      hero_title: 'Kontakt',
      hero_subtitle: 'Unser Team steht zur Beantwortung Ihrer Fragen zur Verfügung.',
      address_title: 'Kontaktdaten',
      form_title: 'Nachricht senden',
      form: {
        first_name: 'Vorname',
        last_name: 'Nachname',
        email: 'E-Mail-Adresse',
        phone: 'Telefon',
        country: 'Land',
        type: 'Art der Anfrage',
        message: 'Nachricht',
        consent: 'Ich stimme zu, dass meine Daten gemäß der Datenschutzrichtlinie zur Bearbeitung meiner Anfrage verwendet werden.',
        submit: 'Nachricht senden',
        success: 'Ihre Nachricht wurde gesendet. Wir werden uns so schnell wie möglich bei Ihnen melden.',
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
        required: 'Pflichtfeld',
      },
      types: ['Strategiepräsentation', 'Technische Informationen', 'Vertriebspartnerschaft', 'Professionelle Anfrage', 'Sonstiges'],
      appointment_title: 'Termin vereinbaren',
      appointment_body: 'Wir bieten Remote-Termine (Videokonferenz) und persönliche Termine in der Schweiz an. Europäische Zeitzone. Kontaktieren Sie uns für einen auf Ihre Situation zugeschnittenen Termin.',
    },
    legal: { title: 'Impressum', risk_title: 'Risikohinweise', privacy_title: 'Datenschutzrichtlinie' },
    footer: {
      tagline: 'Systematischer quantitativer Handel aus der Schweiz.',
      links_title: 'Navigation',
      useful_links_title: 'Links',
      legal_title: 'Rechtliche Informationen',
      risk_warning: 'Vergangene Wertentwicklungen sind kein Indikator für zukünftige Ergebnisse.',
      copyright: '© {year} Summit One. Alle Rechte vorbehalten.',
      built_in: 'Entwickelt in der Schweiz',
    },
    referral: {
      badge: 'Empfehlungsprogramm',
      title: 'Empfehlen Sie Summit One und erhalten Sie bis zu 50 % der Provisionen',
      subtitle: 'Teilen Sie Ihre Copy-Trading-Erfahrung und werden Sie mit bis zu 50 % der Provisionsgebühren belohnt.',
      steps: [
        { number: '01', title: 'Empfehlung', body: 'Die von Ihnen empfohlene Person gibt Ihren Namen bei der Anmeldung an. Sie werden dann automatisch in unserem Empfehlungsprogramm erfasst.' },
        { number: '02', title: 'Verdienst', body: 'Wenn die empfohlene Person auf ihrem Handelskonto einen Gewinn erzielt, erhalten Sie bis zu 50 % der von ihr gezahlten Provisionsgebühren.' },
        { number: '03', title: 'Auszahlung', body: 'Auszahlungsmodalitäten und -frequenz werden bei der Anmeldung zum Programm mitgeteilt.' },
      ],
      description1: 'Warum teilnehmen: Das Programm belohnt Nutzer, die Summit One vertrauen und ihre Copy-Trading-Erfahrung teilen möchten.',
      description2: 'Transparenz: Die Programmbedingungen werden bei der Anmeldung klar kommuniziert, ohne verstecktes Mehrstufiges System.',
      cta: 'Programm beitreten',
    },
    calculator: {
      badge: 'Zinseszinsrechner',
      title: 'Simulieren Sie das Wachstum Ihres Kapitals',
      subtitle: 'Schätzen Sie, wie sich Ihr Kapital bei einer hypothetischen monatlichen Rendite und einer Anlagedauer entwickeln könnte.',
      disclaimer: 'Diese Simulation dient nur zu Informationszwecken. Sie stellt keine Projektion realer Ergebnisse dar. Vergangene Ergebnisse garantieren keine zukünftigen Ergebnisse.',
      initial_label: 'Anfangskapital (CHF)',
      rate_label: 'Hypothetische Monatsrendite (%)',
      years_label: 'Laufzeit (Jahre)',
      result_label: 'Simuliertes Kapital',
      growth_label: 'Simuliertes Wachstum',
      simulate: 'Simulieren',
    },
    not_found: { title: 'Seite nicht gefunden', subtitle: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', cta: 'Zurück zur Startseite' },
    aneto: {
      title: 'Aneto',
      subtitle: 'Summit One Assistent',
      welcome: 'Hallo, ich bin Aneto, der automatisierte Assistent von Summit One. Hinweis: Ich bin ein automatisierter Assistent und gebe keine persönliche Finanzberatung.',
      placeholder: 'Stellen Sie Ihre Frage...',
      send: 'Senden',
      disclaimer: 'Aneto ist ein automatisierter Assistent. Keine Finanzberatung.',
      responses: {
        approach: 'Summit One entwickelt und setzt systematische quantitative Handelsstrategien auf dem Devisenmarkt (EUR/USD) ein.',
        performance: '45 Monate Track-Record: +8,76 % monatliche Rendite, Profit Factor 3,40, Trefferquote 71 %, maximaler Drawdown 11,28 %. Vergangene Ergebnisse garantieren keine zukünftigen.',
        contact: 'Kontakt: summit.one.contact@gmail.com | +41 78 441 54 20 | Waadt, Schweiz.',
        default: 'Ich kann Ihnen über den Ansatz von Summit One, unsere Performance-Indikatoren oder eine Weiterleitung an unser Team helfen.',
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.fr;
