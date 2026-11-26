"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post, index }: { post: Post; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
      className="list-none"
    >
      <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/60">
        <p className="font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-muted">{post.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-5 self-start font-medium text-accent transition group-hover:translate-x-1">
          Read article →
        </span>
      </article>
    </motion.li>
  );
}