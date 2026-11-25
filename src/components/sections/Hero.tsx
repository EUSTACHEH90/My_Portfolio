"use client";

import { motion, useReducedMotion } from "motion/react";

const TITLE = "Je construis des produits web qui comptent.";

const paths = [
  { label: "Voir mes projets", href: "#projets", primary: true },
  { label: "Travaillons ensemble", href: "#services" },
  { label: "Lire le blog", href: "#blog" },
];

export function Hero() {
  const reduce = useReducedMotion();
  let index = 0; // compteur global pour échelonner les lettres

  return (
    <header className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6">
      <h1
        aria-label={TITLE}
        className="max-w-[14ch] font-display text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[1.02] tracking-tight"
      >
        {TITLE.split(" ").map((word, w) => (
          <span
            key={w}
            aria-hidden="true"
            className="mr-[0.25em] -mb-[0.14em] inline-block overflow-hidden whitespace-nowrap pb-[0.14em] align-top"
          >
            {word.split("").map((char, c) => (
              <motion.span
                key={c}
                className="inline-block transition-colors hover:text-coral"
                initial={reduce ? false : { y: "110%", rotate: 6 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1], delay: index++ * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.p
        className="mt-8 max-w-xl text-xl text-muted"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Développeur full-stack : React, Next.js et Node.js. Pour les équipes qui recrutent, les clients qui
        ont un produit à lancer et la communauté qui aime comprendre.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap gap-3"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {paths.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className={
              p.primary
                ? "rounded-full bg-coral px-6 py-3 font-medium text-white transition hover:-translate-y-0.5"
                : "rounded-full border-2 border-ink px-6 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-ink hover:text-bg"
            }
          >
            {p.label}
          </a>
        ))}
      </motion.div>
    </header>
  );
}