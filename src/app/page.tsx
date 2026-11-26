import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { siteConfig, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteUrl,
  image: `${siteUrl}/avatar.jpg`,
  sameAs: [siteConfig.github, siteConfig.linkedin],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "Web development"],
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Projects />
      <Services />
      <Blog />
      <Contact />
    </main>
  );
}