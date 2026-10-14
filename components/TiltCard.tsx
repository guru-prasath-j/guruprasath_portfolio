'use client';

import { useRef, type ReactNode } from 'react';

/** Card that tilts toward the cursor. On touch screens it sways gently instead (see globals.css). */
export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const set = (tf: string) => { if (ref.current) ref.current.style.transform = tf; };

  return (
    <article
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={(e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        set(`perspective(1200px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateZ(20px)`);
      }}
      onMouseLeave={() => set('')}
    >
      {children}
    </article>
  );
}
