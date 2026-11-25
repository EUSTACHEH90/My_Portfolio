export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: number;
  summary: string;
  problem: string;
  role: string;
  result: string;
  stack: string[];
  links: { live?: string; repo?: string };
  cover?: string; // ex. "/projects/saas.png" (facultatif, sinon un visuel par défaut s’affiche)
};

export const projects: Project[] = [
  {
    slug: "plateforme-saas",
    title: "Plateforme SaaS de réservation",
    kind: "Application web",
    year: 2025,
    summary: "Un outil de réservation en ligne pour de petites entreprises de services.",
    problem:
      "Les équipes géraient leurs rendez-vous par téléphone et sur des tableurs, avec des doubles réservations et beaucoup de temps perdu.",
    role: "Conception de l’architecture, développement front et back, mise en production sur Vercel.",
    result: "Temps de chargement divisé par deux et 2 000 utilisateurs actifs en six mois.",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL"],
    links: { live: "https://example.com", repo: "https://github.com/votre-compte/projet" },
    // cover: "/projects/mon-appli.png", pour ajouter une image sur les projets
  },
  {
    slug: "api-facturation",
    title: "API de facturation automatisée",
    kind: "API et automatisation",
    year: 2024,
    summary: "Une API qui génère, envoie et relance les factures sans intervention manuelle.",
    problem: "Le service comptable passait plusieurs jours par mois à créer et relancer des factures à la main.",
    role: "Conception de l’API, files de tâches, tests automatisés et documentation.",
    result: "Quinze heures économisées par mois et 30 % de retards de paiement en moins.",
    stack: ["Node.js", "Express", "Redis", "Docker"],
    links: { repo: "https://github.com/votre-compte/projet" },
  },
  {
    slug: "bibliotheque-composants",
    title: "Bibliothèque de composants",
    kind: "Open source",
    year: 2023,
    summary: "Un jeu de composants React accessibles, documentés et prêts à l’emploi.",
    problem: "Chaque projet de l’équipe réinventait ses boutons, formulaires et modales, avec des écarts d’accessibilité.",
    role: "Création du projet, API des composants, tests et documentation Storybook.",
    result: "Adoptée par quatre équipes et 150 étoiles sur GitHub.",
    stack: ["React", "TypeScript", "Storybook"],
    links: { repo: "https://github.com/EUSTACHEH90/projet" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);