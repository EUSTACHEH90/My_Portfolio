import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { nav } from "@/content/nav";

type Tech = { name: string; Icon: IconType; color: string; a: number };

// k = rayon de l'anneau (fraction de la taille du bloc) ; a = position de départ en degrés
const rings: { k: number; dur: string; dir: "normal" | "reverse"; items: Tech[] }[] = [
  {
    k: 0.48,
    dur: "40s",
    dir: "normal",
    items: [
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", a: 45 },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000", a: 135 },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", a: 225 },
      { name: "Docker", Icon: SiDocker, color: "#2496ED", a: 315 },
    ],
  },
  {
    k: 0.36,
    dur: "40s",
    dir: "reverse",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB", a: 90 },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", a: 210 },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", a: 330 },
    ],
  },
];

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Bolt({ id, className }: { id: string; className: string }) {
  return (
    <svg viewBox="0 0 60 100" aria-hidden="true" className={`bob absolute ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="1" stopColor="#ff4d1a" />
        </linearGradient>
      </defs>
      <path d="M32 0 L4 56 H24 L14 100 L56 38 H34 Z" fill={`url(#${id})`} />
    </svg>
  );
}

export function Hero() {
  return (
    <header id="accueil" className="relative overflow-hidden">
      <Bolt
        id="bolt-a"
        className="hidden md:block -left-6 top-[58%] h-44 rotate-[-18deg] opacity-90 drop-shadow-[0_0_30px_rgba(255,106,43,.6)]"
      />
      <Bolt
        id="bolt-b"
        className="hidden md:block -right-4 top-24 h-56 rotate-[14deg] opacity-90 drop-shadow-[0_0_30px_rgba(255,106,43,.6)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Navigation */}
        <nav aria-label="Main" className="flex items-center justify-between py-6">
          <Logo />
          <ul className="hidden gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur md:flex">
            {nav.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block rounded-full px-4 py-2 text-sm transition ${
                    i === 0 ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/cv.pdf"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur transition hover:border-accent md:inline-block"
          >
            Download my CV
          </a>
          <MobileMenu />
        </nav>

        <div className="grid items-center gap-10 pb-16 pt-6 md:grid-cols-[1.2fr_1fr] md:pb-24">
          {/* Identité */}
          <div className="@container">
            <p className="enter text-xl text-muted md:text-2xl" style={delay(0.05)}>
              Hi, i am <span className="font-medium text-accent">Eustache HEMA</span>
            </p>

            <h1
              className="enter mt-3 whitespace-nowrap font-display text-[length:7.2cqw] font-extrabold leading-[1.05] tracking-tight"
              style={delay(0.1)}
            >
              Full-stack developer
            </h1>

            <p
              className="enter mt-6 max-w-md text-base text-muted xl:max-w-none xl:whitespace-nowrap xl:text-[0.9375rem] xl:leading-relaxed"
              style={delay(0.2)}
            >
              An idea, a need, a project worth bringing to life? I turn it into a smooth,
              <br className="hidden xl:block" />
              polished web experience, down to the details you don’t even notice.
            </p>

            <div className="enter mt-8 flex flex-wrap gap-3" style={delay(0.3)}>
              <a
                href="#contact"
                className="rounded-full bg-accent px-7 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_#ff6a2b]"
              >
                Contact me →
              </a>
              <a
                href="#projets"
                className="rounded-full border border-white/20 px-7 py-3 font-medium transition hover:-translate-y-0.5 hover:border-accent"
              >
                View my projects
              </a>
            </div>

            {/* Témoignage */}
            <figure
              className="enter mt-12 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              style={delay(0.4)}
            >
              <blockquote className="text-sm text-muted">
                “Delivered on time, clean code and easy to maintain. I’d happily work with him again.”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span className="grid size-9 place-items-center rounded-full bg-accent font-bold text-black">C</span>
                <span>
                  <strong className="block font-medium">Nadya</strong>
                  <span className="text-muted">Founder, Zoomkoom</span>
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Photo + orbites */}
          <div
            className="enter relative mx-auto aspect-square w-full max-w-[34rem] md:left-12 md:top-16 md:ml-auto md:mr-0"
            style={{ "--size": "min(90vw, 34rem)", "--d": "0.15s" } as CSSProperties}
          >
            {rings.map((r) => (
              <div
                key={r.k}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: `calc(var(--size) * ${r.k * 2})`, height: `calc(var(--size) * ${r.k * 2})` }}
              >
                <div
                  className="orbit-spin relative size-full rounded-full border border-white/10"
                  style={{ "--dur": r.dur, "--dir": r.dir } as CSSProperties}
                >
                  {r.items.map((t) => (
                    <div
                      key={t.name}
                      className="absolute left-1/2 top-1/2 -ml-6 -mt-6 size-12"
                      style={{
                        transform: `rotate(${t.a}deg) translateX(calc(var(--size) * ${r.k})) rotate(${-t.a}deg)`,
                      }}
                    >
                      <div
                        className="orbit-counter grid size-full place-items-center rounded-2xl bg-white shadow-xl"
                        style={{ "--dur": r.dur, "--dir": r.dir } as CSSProperties}
                        role="img"
                        aria-label={t.name}
                        title={t.name}
                      >
                        <t.Icon className="size-6" style={{ color: t.color }} aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-accent shadow-[0_30px_80px_-20px_rgba(255,106,43,.55)]">
              <Image
                src="/avatar.jpg"
                alt="Portrait of Your Name"
                fill
                priority
                quality={75}
                sizes="(max-width: 768px) 55vw, 20rem"
                className="origin-[50%_30%] scale-125 object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}