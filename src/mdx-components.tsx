import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3 className="mt-8 font-display text-2xl font-bold" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="mt-5 text-lg leading-relaxed text-muted" {...props} />
    ),
    a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) =>
      href.startsWith("/") ? (
        <Link href={href} className="text-accent underline underline-offset-4" {...props} />
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
          {...props}
        />
      ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-lg text-muted marker:text-accent" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg text-muted marker:text-accent" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="mt-6 border-l-4 border-accent pl-5 text-xl italic text-ink" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-ink" {...props} />,
    hr: () => <hr className="my-10 border-white/10" />,
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-accent" {...props} />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-ink"
        {...props}
      />
    ),
    ...components,
  };
}