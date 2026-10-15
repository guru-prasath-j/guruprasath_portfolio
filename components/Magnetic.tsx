'use client';

import { useRef, type ReactNode } from 'react';

/** Pulls its child a few pixels toward the cursor. Desktop only; no effect with reduced motion. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="magnetic inline-block"
      onMouseMove={(e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ''; }}
    >
      {children}
    </span>
  );
}
