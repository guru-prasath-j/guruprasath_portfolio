'use client';

import { useEffect, useRef } from 'react';

/** Soft light that trails the pointer on desktop. Hidden on touch and with reduced motion. */
export default function CursorGlow() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    let x = -999, y = -999, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12;
      if (el.current) el.current.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    if (el.current) el.current.style.opacity = '1';
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, rgba(140,151,255,.10) 0%, rgba(140,151,255,0) 60%)' }}
    />
  );
}
