"use client";

import { motion, useReducedMotion } from "motion/react";
import { services, steps } from "@/content/services";

export function Services() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.7, delay, ease: [0.2, 0.9, 0.2, 1] as const },
  });

  return (
    <section id="services" className="scroll-mt-8 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div {...reveal()}>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            What I can do <span className="text-accent">for you</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            I work with startups, freelancers and teams who want a reliable web product, delivered on time.
          </p>
        </motion.div>

        {/* Services */}
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              {...reveal(i * 0.08)}
              className="group relative list-none overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/60"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(255,106,43,.25),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-black">
                <s.Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        {/* Process */}
        <motion.h3 {...reveal()} className="mt-24 font-display text-3xl font-extrabold tracking-tight">
          How we work together
        </motion.h3>

        <ol className="relative mt-10 grid gap-8 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-accent/60 via-white/15 to-accent/60 md:block"
          />
          {steps.map((s, i) => (
            <motion.li key={s.title} {...reveal(i * 0.1)} className="relative list-none">
              <span className="relative z-10 grid size-10 place-items-center rounded-full border border-accent bg-surface font-mono text-sm text-accent">
                {i + 1}
              </span>
              <h4 className="mt-4 font-display text-xl font-bold">{s.title}</h4>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </motion.li>
          ))}
        </ol>

        {/* Call to action */}
        <motion.div
          {...reveal()}
          className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent/40 bg-accent/10 p-8 backdrop-blur-md md:flex-row md:items-center md:p-10"
        >
          <div>
            <h3 className="font-display text-3xl font-extrabold tracking-tight">Got a project in mind?</h3>
            <p className="mt-2 max-w-md text-muted">
              Tell me about your idea in a few lines and I’ll get back to you within 48 hours with first ideas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-7 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_#ff6a2b]"
            >
              Let’s talk about it →
            </a>
            <a
              href="#projets"
              className="rounded-full border border-white/20 px-7 py-3 font-medium transition hover:-translate-y-0.5 hover:border-accent"
            >
              See my projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}