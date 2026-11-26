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
  cover?: string; // e.g. "/projects/saas.png" (optional, a default visual is shown otherwise)
};

export const projects: Project[] = [
  {
    slug: "booking-saas-platform",
    title: "Booking SaaS Platform",
    kind: "Web application",
    year: 2025,
    summary: "An online booking tool for small service businesses.",
    problem:
      "Teams were managing appointments by phone and spreadsheets, which caused double bookings and wasted hours every week.",
    role: "Designed the architecture, built the front end and back end, and deployed to production on Vercel.",
    result: "Cut load times in half and reached 2,000 active users within six months.",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL"],
    links: { live: "https://example.com", repo: "https://github.com/EustacheH90/project" },
  },
  {
    slug: "invoicing-api",
    title: "Automated Invoicing API",
    kind: "API and automation",
    year: 2024,
    summary: "An API that creates, sends and follows up on invoices with no manual work.",
    problem: "The accounting team spent several days each month creating invoices and chasing late payments by hand.",
    role: "Designed the API, built the job queues, wrote automated tests and the documentation.",
    result: "Saved fifteen hours a month and reduced late payments by 30%.",
    stack: ["Node.js", "Express", "Redis", "Docker"],
    links: { repo: "https://github.com/your-username/project" },
  },
  {
    slug: "component-library",
    title: "Component Library",
    kind: "Open source",
    year: 2023,
    summary: "A set of accessible, documented React components that are ready to use.",
    problem: "Every project on the team was reinventing its own buttons, forms and modals, with inconsistent accessibility.",
    role: "Created the project, designed the component API, and wrote the tests and Storybook docs.",
    result: "Adopted by four teams and earned 150 stars on GitHub.",
    stack: ["React", "TypeScript", "Storybook"],
    links: { repo: "https://github.com/your-username/project" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);