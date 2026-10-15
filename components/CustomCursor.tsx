'use client';

import { useEffect, useRef } from 'react';

const SIZES: Record<string, number> = { '': 38, link: 64, drag: 84, turn: 84, play: 84, view: 92, explode: 96 };
type Burst = { x: number; y: number; t0: number; parts: { a: number; v: number; c: string }[] };

/**
 * Dot + trailing ring cursor that grows over links and shows a verb over interactive pieces
 * (set with data-cursor="drag" etc.), plus a ripple-and-points burst on every click.
 * Only on fine pointers; the native cursor is untouched on touch screens.
 */
export default function CustomCursor({ accent = '#8C97FF' }: { accent?: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const fx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) document.documentElement.classList.add('has-cursor');

    let x = -999, y = -999, rx = -999, ry = -999, size = 38, mode = '', down = 0, raf = 0;
    const bursts: Burst[] = [];

    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current && ring.current) { dot.current.style.opacity = mode && mode !== 'link' ? '0' : '1'; ring.current.style.opacity = '1'; }
    };
    const out = (e: PointerEvent) => {
      if (!e.relatedTarget && dot.current && ring.current) { dot.current.style.opacity = '0'; ring.current.style.opacity = '0'; }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest || !ring.current || !label.current || !dot.current) return;
      const tagged = t.closest('[data-cursor]');
      const m = t.closest('a, button') ? 'link' : tagged?.getAttribute('data-cursor') ?? '';
      if (m === mode) return;
      mode = m; size = SIZES[m] ?? 38;
      const filled = !!m && m !== 'link';
      ring.current.style.width = ring.current.style.height = `${size}px`;
      ring.current.style.backgroundColor = filled ? accent : m === 'link' ? 'rgba(140,151,255,.16)' : 'rgba(140,151,255,0)';
      ring.current.style.borderColor = m ? accent : 'rgba(233,234,240,.55)';
      label.current.textContent = filled ? m : '';
      dot.current.style.opacity = filled ? '0' : '1';
    };
    const press = (e: PointerEvent) => {
      down = performance.now();
      if (reduce) return;
      bursts.push({
        x: e.clientX, y: e.clientY, t0: down,
        parts: Array.from({ length: 16 }, (_, i) => ({ a: (Math.PI * 2 * i) / 16 + Math.random() * 0.4, v: 2.2 + Math.random() * 3.2, c: i % 3 === 0 ? '#5CE1E6' : accent })),
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', out, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (fine && dot.current && ring.current) {
        const k = reduce ? 1 : 0.18;
        rx += (x - rx) * k; ry += (y - ry) * k;
        const s = performance.now() - down < 160 ? 0.72 : 1;
        dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        ring.current.style.transform = `translate(${rx - size / 2}px, ${ry - size / 2}px) scale(${s})`;
      }
      const cv = fx.current;
      const ctx = cv?.getContext('2d');
      if (!cv || !ctx) return;
      if (!bursts.length) { if (cv.dataset.dirty) { ctx.clearRect(0, 0, cv.width, cv.height); delete cv.dataset.dirty; } return; }
      const dpr = Math.min(window.devicePixelRatio || 1, 2), W = window.innerWidth, H = window.innerHeight;
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); cv.dataset.dirty = '1';
      const now = performance.now();
      for (let i = bursts.length - 1; i >= 0; i--) if (now - bursts[i].t0 > 800) bursts.splice(i, 1);
      for (const b of bursts) {
        const p = (now - b.t0) / 800, e = 1 - Math.pow(1 - p, 3);
        ctx.strokeStyle = accent; ctx.lineWidth = 2 * (1 - p) + 0.5;
        ctx.globalAlpha = (1 - p) * 0.9; ctx.beginPath(); ctx.arc(b.x, b.y, 6 + e * 70, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = (1 - p) * 0.4; ctx.beginPath(); ctx.arc(b.x, b.y, 4 + e * 38, 0, Math.PI * 2); ctx.stroke();
        for (const q of b.parts) {
          const d = q.v * 22 * e, px = b.x + Math.cos(q.a) * d, py = b.y + Math.sin(q.a) * d;
          if (p < 0.45) { ctx.globalAlpha = (0.45 - p) * 1.4; ctx.lineWidth = 1; ctx.strokeStyle = q.c; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(px, py); ctx.stroke(); }
          ctx.globalAlpha = 1 - p; ctx.fillStyle = q.c; ctx.beginPath(); ctx.arc(px, py, 2.6 * (1 - p) + 0.6, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', out);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', press);
    };
  }, [accent]);

  return (
    <>
      <canvas ref={fx} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-screen w-screen" />
      <div ref={dot} aria-hidden="true" className="cursor-part pointer-events-none fixed left-0 top-0 z-[62] h-2 w-2 rounded-full bg-accent opacity-0" />
      <div
        ref={ring}
        aria-hidden="true"
        className="cursor-part cursor-ring pointer-events-none fixed left-0 top-0 z-[61] flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-[rgba(233,234,240,.55)] font-mono text-[11px] font-medium text-bg opacity-0"
      >
        <span ref={label} />
      </div>
    </>
  );
}
