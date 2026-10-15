'use client';

import { useEffect, useRef } from 'react';

const DEPTH = ['#262B45', '#22263D', '#1E2236', '#1A1D2F', '#161927', '#131520', '#10121A'];
const LINES = [['I', 'put', 'AI'], ['inside', 'the'], ['phone', 'in', 'your', 'hand.']];

/** The hero headline with real extrusion. The cursor acts as a light: the depth falls away from it. */
export default function LitHeadline({ id }: { id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nx = 0.3, ny = 0.3, hx = 0.3, hy = 0.3, raf = 0;
    const move = (e: PointerEvent) => { nx = e.clientX / window.innerWidth - 0.5; ny = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', move, { passive: true });
    const tick = () => {
      raf = requestAnimationFrame(tick);
      hx += (nx - hx) * 0.08; hy += (ny - hy) * 0.08;
      const el = ref.current; if (!el) return;
      const sh = DEPTH.map((c, i) => `${(-hx * (i + 1) * 1.6).toFixed(1)}px ${(-hy * (i + 1) * 1.6 + (i + 1) * 0.5).toFixed(1)}px 0 ${c}`);
      sh.push(`${(-hx * 30).toFixed(0)}px ${(-hy * 30 + 18).toFixed(0)}px 40px rgba(0,0,0,.55)`);
      el.style.textShadow = sh.join(', ');
      if (!reduce) el.style.transform = `perspective(1200px) rotateY(${(hx * 8).toFixed(2)}deg) rotateX(${(-hy * 6).toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, []);

  let d = 0;
  return (
    <h1 id={id} ref={ref} className="m-0 text-[46px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[80px]">
      {LINES.map((line, li) => (
        <span key={li} className="block">
          {line.map((w) => (
            <span key={w} className={`word ${w === 'AI' ? 'text-accent' : ''}`} style={{ animationDelay: `${(d += 0.07)}s` }}>
              {w}&nbsp;
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
