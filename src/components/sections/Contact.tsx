"use client";

import { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuGlobe, LuMail } from "react-icons/lu";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL = "eustachehema119@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/EustacheH90", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eustache-hema-24a080253", Icon: FaLinkedin },
];

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ink backdrop-blur transition placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export function Contact() {
  const reduce = useReducedMotion();
  const startedAt = useRef(0);
    useEffect(() => {
        startedAt.current = Date.now(); // lu côté navigateur uniquement
    }, []);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [year, setYear] = useState<number | null>(null);
useEffect(() => {
  setYear(new Date().getFullYear());
}, []);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.7, delay, ease: [0.2, 0.9, 0.2, 1] as const },
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-8 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
          {/* Left: pitch + links */}
          <motion.div {...reveal()}>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Let’s build something <span className="text-accent">great</span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              Have a project, a role, or just a question? Send me a message and I’ll get back to you within
              48 hours.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4 text-lg transition hover:text-accent"
                >
                  <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-accent">
                    <LuMail className="size-5" aria-hidden="true" />
                  </span>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-4 text-lg text-muted">
                <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <LuGlobe className="size-5" aria-hidden="true" />
                </span>
                Available worldwide, remote-friendly
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            {...reveal(0.1)}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8"
          >
            {status === "success" ? (
              <div role="status" className="py-10 text-center">
                <p className="font-display text-3xl font-extrabold text-accent">Message sent!</p>
                <p className="mx-auto mt-3 max-w-xs text-muted">
                  Thanks for reaching out. I’ll reply to you by email very soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    startedAt.current = Date.now();
                    setStatus("idle");
                  }}
                  className="mt-6 rounded-full border border-white/20 px-6 py-2.5 font-medium transition hover:border-accent"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* Honeypot: invisible to humans, bots tend to fill it */}
                <div aria-hidden="true" className="absolute left-[-9999px]">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={6}
                    placeholder="Tell me about your project, your timeline, and your budget if you have one."
                    className={`${field} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-accent px-7 py-3.5 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_#ff6a2b] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>

                <p role="alert" aria-live="polite" className="min-h-5 text-sm text-red-400">
                  {status === "error" ? error : ""}
                </p>
              </form>
            )}
          </motion.div>
        </div>

        <footer className="mt-24 border-t border-white/10 pt-8 text-sm text-muted">
            © {year ?? ""} Eustache HEMA. Built with Next.js and deployed on Vercel.
        </footer>
      </div>
    </section>
  );
}