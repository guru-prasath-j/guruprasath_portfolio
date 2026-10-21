'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const W = 280, H = 570, D = 16;

/** A real-thickness CSS 3D phone that sways and follows the pointer. Whatever you pass in is its screen. */
export default function Phone3D({ children }: { children: ReactNode }) {
  const body = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  // Idle sway + pointer follow
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, cx = 0, cy = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const idleY = reduce ? -18 : Math.sin(t / 2200) * 18 - 14;
      const idleX = reduce ? 6 : Math.cos(t / 2800) * 5 + 6;
      cx += (target.current.x * 40 + idleY - cx) * 0.06;
      cy += (-target.current.y * 24 + idleX - cy) * 0.06;
      if (body.current) body.current.style.transform = `rotateY(${cx.toFixed(2)}deg) rotateX(${cy.toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const face = 'absolute left-1/2 top-1/2';

  return (
    <div
      data-cursor="turn"
      className="flex h-[640px] w-full items-center justify-center"
      style={{ perspective: 1600 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        target.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      }}
      onPointerLeave={() => { target.current = { x: 0, y: 0 }; }}
    >
      <div ref={body} className="relative scale-[0.85] sm:scale-100" style={{ width: W, height: H, transformStyle: 'preserve-3d' }}>
        {/* edges */}
        <div className={face} style={{ width: D, height: H - 40, margin: `${-(H - 40) / 2}px 0 0 ${-D / 2}px`, background: '#2A2E44', transform: `rotateY(-90deg) translateZ(${W / 2 - 2}px)` }} />
        <div className={face} style={{ width: D, height: H - 40, margin: `${-(H - 40) / 2}px 0 0 ${-D / 2}px`, background: '#2A2E44', transform: `rotateY(90deg) translateZ(${W / 2 - 2}px)` }} />
        <div className={face} style={{ width: W - 40, height: D, margin: `${-D / 2}px 0 0 ${-(W - 40) / 2}px`, background: '#33384F', transform: `rotateX(90deg) translateZ(${H / 2 - 2}px)` }} />
        <div className={face} style={{ width: W - 40, height: D, margin: `${-D / 2}px 0 0 ${-(W - 40) / 2}px`, background: '#1E2130', transform: `rotateX(-90deg) translateZ(${H / 2 - 2}px)` }} />
        {/* back */}
        <div className="absolute inset-0 rounded-[44px] border border-line2 bg-[#141726]" style={{ transform: `rotateY(180deg) translateZ(${D / 2}px)`, backfaceVisibility: 'hidden' }}>
          <div className="absolute left-6 top-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#0D0F16] p-2.5">
            <span className="h-7 w-7 rounded-full border border-line2 bg-bg" /><span className="h-7 w-7 rounded-full border border-line2 bg-bg" />
            <span className="h-7 w-7 rounded-full border border-line2 bg-bg" /><span className="h-3 w-3 self-center justify-self-center rounded-full bg-[#2A2E44]" />
          </div>
        </div>
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[44px] border-[10px] border-[#1A1D2B] bg-[#F1F2F7] text-bg shadow-[0_40px_80px_-30px_rgba(140,151,255,.45)]"
          style={{ transform: `translateZ(${D / 2}px)`, backfaceVisibility: 'hidden' }}
        >
          <div className="mx-auto mt-2 h-6 w-24 rounded-full bg-[#07080C]" />
          {children}
          {/* glare */}
          <div aria-hidden="true" className="glare pointer-events-none absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
