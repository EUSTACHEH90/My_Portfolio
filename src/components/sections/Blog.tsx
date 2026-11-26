import Link from "next/link";
import { posts } from "@/content/posts";
import { PostCard } from "@/components/ui/PostCard";

export function Blog() {
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-8 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Latest <span className="text-accent">articles</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Notes on web development, product work and the things I learn along the way.
            </p>
          </div>
          <Link
            href="/blog"
            className="rounded-full border border-white/20 px-6 py-2.5 font-medium transition hover:-translate-y-0.5 hover:border-accent"
          >
            View all articles →
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}