'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts from 0 to the number in `value` (keeps any sign/suffix) when scrolled into view. */
export default function CountUp({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const decimals = m && m[2].includes('.') ? m[2].split('.')[1].length : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(m ? Number(m[2]) : 0);

  useEffect(() => {
    if (!m || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const end = Number(m[2]);
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        const v = end * (1 - Math.pow(1 - p, 3));
        setN(decimals ? Number(v.toFixed(decimals)) : Math.round(v));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!m) return <span>{value}</span>;
  return <span ref={ref} aria-label={value}><span aria-hidden="true">{m[1]}{decimals ? n.toFixed(decimals) : n}{m[3]}</span></span>;
}
