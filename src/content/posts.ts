export type Post = {
  slug: string; // doit correspondre au nom du fichier : src/content/blog/<slug>.mdx
  title: string;
  date: string; // AAAA-MM-JJ
  summary: string;
  tags: string[];
  readingTime: string;
};

const all: Post[] = [
  {
    slug: "building-my-portfolio-with-nextjs",
    title: "Building my portfolio with Next.js and Vercel",
    date: "2026-11-20",
    summary: "The stack, the animation choices and the mistakes I made while building this site.",
    tags: ["Next.js", "Vercel", "Motion"],
    readingTime: "4 min read",
  },
  {
    slug: "lessons-from-shipping-a-booking-saas",
    title: "Three lessons from shipping a booking SaaS",
    date: "2026-10-05",
    summary: "What I would do again, and what I would change, after taking a product from idea to 2,000 users.",
    tags: ["SaaS", "Node.js", "Product"],
    readingTime: "5 min read",
  },
];

// Du plus récent au plus ancien
export const posts = [...all].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);