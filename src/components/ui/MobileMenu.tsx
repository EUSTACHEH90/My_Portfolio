"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 flex flex-col bg-bg/95 px-6 pt-28 backdrop-blur-xl">
          <ul className="space-y-2">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 font-display text-3xl font-extrabold transition hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/cv.pdf"
            className="mt-8 self-start rounded-full bg-accent px-7 py-3 font-medium text-black"
          >
            Download my CV
          </a>
        </div>
      )}
    </div>
  );
}