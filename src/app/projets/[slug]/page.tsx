import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        alternates: { canonical: `/projets/${slug}` },
        openGraph: { title: p.title, description: p.summary, url: `/projets/${slug}` },
      }
    : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const blocks = [
    { label: "The problem", text: p.problem },
    { label: "My role", text: p.role },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/#projets" className="text-muted transition hover:text-accent">
        ← All projects
      </Link>

      <p className="mt-10 font-mono text-sm text-muted">
        {p.kind} · {p.year}
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
        {p.title}
      </h1>
      <p className="mt-5 max-w-2xl text-xl text-muted">{p.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="rounded-full border border-white/10 px-3 py-1 font-mono text-sm text-muted">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {blocks.map((b) => (
          <section key={b.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="font-display text-xl font-bold text-accent">{b.label}</h2>
            <p className="mt-3 text-muted">{b.text}</p>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-6">
        <h2 className="font-display text-xl font-bold text-accent">The result</h2>
        <p className="mt-3 text-lg">{p.result}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {p.links.live && (
          <a
            href={p.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-7 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_#ff6a2b]"
          >
            Visit the site →
          </a>
        )}
        {p.links.repo && (
          <a
            href={p.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-7 py-3 font-medium transition hover:-translate-y-0.5 hover:border-accent"
          >
            Source code
          </a>
        )}
      </div>
    </main>
  );
}