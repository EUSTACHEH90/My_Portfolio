"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
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
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <div
            id="mobile-menu"
            className="menu-in fixed inset-x-4 z-50 rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-2xl backdrop-blur-xl"
            style={{ top: "calc(env(safe-area-inset-top, 0px) + 5.25rem)" }}
          >
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/5 hover:text-accent"
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-sm text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="/cv.pdf"
              className="mt-2 block rounded-xl bg-accent px-4 py-3 text-center text-sm font-medium text-black"
            >
              Download my CV
            </a>
          </div>
        </>
      )}
    </div>
  );
}