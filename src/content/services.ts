import type { IconType } from "react-icons";
import { LuLayoutDashboard, LuServer, LuGauge, LuRocket } from "react-icons/lu";

export type Service = {
  title: string;
  description: string;
  points: string[];
  Icon: IconType;
};

export const services: Service[] = [
  {
    title: "Custom web applications",
    description: "From internal dashboards to full SaaS products, a smooth app built around your exact needs.",
    points: ["React and Next.js", "Authentication and payments", "Production deployment on Vercel"],
    Icon: LuLayoutDashboard,
  },
  {
    title: "APIs and back end",
    description: "A solid foundation for your data and integrations, documented and easy to evolve.",
    points: ["Node.js and SQL databases", "Third-party integrations", "Automated testing"],
    Icon: LuServer,
  },
  {
    title: "High-performance websites",
    description: "A fast, well-ranked and pleasant site that makes people want to get in touch.",
    points: ["Polished design and animations", "Technical SEO", "Works on every screen"],
    Icon: LuRocket,
  },
  {
    title: "Audits and optimization",
    description: "I go through your site or codebase, then fix whatever is slowing your users down.",
    points: ["Performance and Core Web Vitals", "Accessibility", "Prioritized action plan"],
    Icon: LuGauge,
  },
];

export const steps = [
  { title: "Discovery", text: "We talk about your needs, your goals and your constraints. No commitment." },
  { title: "Proposal", text: "I send you a clear quote with the scope, the timeline and the price." },
  { title: "Development", text: "I build in stages with regular demos, so you can validate as we go." },
  { title: "Delivery", text: "Launch, documentation and support after go-live." },
];