import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/content/posts";
import { formatDate } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post
    ? {
        title: post.title,
        description: post.summary,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
          type: "article",
          title: post.title,
          description: post.summary,
          publishedTime: post.date,
          url: `/blog/${slug}`,
        },
      }
    : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 pb-24">
      <header className="flex items-center justify-between">
        <Logo />
        <Link href="/blog" className="text-muted transition hover:text-accent">
          ← All articles
        </Link>
      </header>

      <article className="mt-16">
        <p className="font-mono text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <ul className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-white/10 pt-2">
          <Content />
        </div>
      </article>

      <div className="mt-16 rounded-2xl border border-accent/40 bg-accent/10 p-6">
        <p className="font-display text-2xl font-bold">Enjoyed this article?</p>
        <p className="mt-2 text-muted">Let’s talk about your project.</p>
        <Link
          href="/#contact"
          className="mt-4 inline-block rounded-full bg-accent px-7 py-3 font-medium text-black transition hover:-translate-y-0.5"
        >
          Get in touch →
        </Link>
      </div>
    </main>
  );
}