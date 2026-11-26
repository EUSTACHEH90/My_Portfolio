"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, PointerEvent } from "react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y / r.height) * 8}deg) rotateY(${
      (x / r.width - 0.5) * 10
    }deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
      className="list-none"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-[transform,border-color] duration-200 ease-out hover:border-accent/60"
      >
        {/* Halo orange qui suit la souris */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx) var(--my), rgba(255,106,43,.22), transparent 70%)",
          }}
        />

        {/* Visuel */}
        <div className="relative mb-5 grid h-44 place-items-center overflow-hidden rounded-xl border border-white/10 bg-surface">
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 24rem"
              className="object-cover"
            />
          ) : (
            <span className="select-none font-display text-6xl font-extrabold text-accent/70 transition group-hover:scale-110 group-hover:text-accent">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
          )}
        </div>

        <p className="font-mono text-xs text-muted">
          {project.kind} · {project.year}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
          <Link
            href={`/projets/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-white/10 px-3 py-0.5 font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>

        <span className="mt-5 font-medium text-accent transition group-hover:translate-x-1">
            View project →
        </span>
      </div>
    </motion.li>
  );
}