import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${siteUrl}/projets/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}