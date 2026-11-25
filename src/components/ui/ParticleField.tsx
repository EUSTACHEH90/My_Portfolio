"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; c: number };

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const mouse = { x: -999, y: -999 };
    let w = 0, h = 0, raf = 0, running = false;
    let colors: string[] = [];
    let particles: Particle[] = [];

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = ["--coral", "--mint", "--muted"].map((v) => s.getPropertyValue(v).trim());
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = width; h = height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((w * h) / 11000));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: 1.5 + Math.random() * 2.2, c: i % 3,
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);

        if (d < 150) { // répulsion autour du curseur
          const f = ((150 - d) / 150) * 1.6 * 0.06;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) { // fils entre voisines
          const q = particles[j];
          const l = Math.hypot(p.x - q.x, p.y - q.y);
          if (l < 105) {
            ctx.globalAlpha = (1 - l / 105) * 0.35;
            ctx.strokeStyle = colors[p.c];
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        if (d < 170) { // fil vers le curseur
          ctx.globalAlpha = (1 - d / 170) * 0.7;
          ctx.strokeStyle = colors[1];
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colors[p.c];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => { draw(); if (running) raf = requestAnimationFrame(loop); };
    const start = () => { if (!running && !reduce.matches) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    const onTheme = () => { readColors(); if (!running) draw(); };

    readColors();
    resize();

    // On ne dessine que lorsque le Hero est visible à l'écran
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    const ro = new ResizeObserver(resize);
    io.observe(host); ro.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    dark.addEventListener("change", onTheme);

    return () => {
      stop(); io.disconnect(); ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      dark.removeEventListener("change", onTheme);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}