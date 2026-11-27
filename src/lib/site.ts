export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "Eustache HEMA",
  jobTitle: "Full-stack developer",
  description:
    "Full-stack developer specialized in React, Next.js and Node.js. Selected projects, freelance services and articles.",
  github: "https://github.com/EustacheH90",
  linkedin: "https://www.linkedin.com/in/eustache-hema-24a080253",
};