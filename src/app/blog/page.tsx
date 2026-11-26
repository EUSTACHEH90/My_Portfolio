import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { PostCard } from "@/components/ui/PostCard";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Blog – Your Name",
  description: "Articles on web development, product work and lessons learned.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <header className="flex items-center justify-between">
        <Logo />
        <Link href="/#contact" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-accent">
          Contact
        </Link>
      </header>

      <h1 className="mt-16 font-display text-5xl font-extrabold tracking-tight md:text-6xl">
        The <span className="text-accent">blog</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Notes on web development, product work and the things I learn along the way.
      </p>

      <ul className="mt-12 grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={p.slug} post={p} index={i} />
        ))}
      </ul>
    </main>
  );
}