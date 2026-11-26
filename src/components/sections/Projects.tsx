import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projets" className="scroll-mt-8 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Selected <span className="text-accent">projects</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          A few recent projects, with the problem I started from, my role and the result.
        </p>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}