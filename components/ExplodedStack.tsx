'use client';

import { useEffect, useRef, useState } from 'react';

const GRID = 7;
const STEP = 40;
const PAD = 30;
const TOP_K: [number, number][] = [[2, 3], [3, 3], [3, 2], [4, 4], [2, 4]];
const isTop = (r: number, c: number) => TOP_K.some(([a, b]) => a === r && b === c);
const pos = (n: number) => PAD + n * STEP;

/**
 * The featured project as a working machine: a vector store being scanned, retrieval picking
 * the top-5, beams carrying them up through context + model to the Flutter screen.
 * Breathes on its own, opens fully on hover, tilts toward the pointer; a button holds it open.
 */
export default function ExplodedStack() {
  const [locked, setLocked] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const beams = useRef<(HTMLDivElement | null)[]>([]);
  const st = useRef({ cur: 70, hover: false, locked: false, px: 0, py: 0, cpx: 0, cpy: 0 });

  useEffect(() => { st.current.locked = locked; }, [locked]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scale = () => (window.innerWidth < 640 ? 0.66 : 1);
    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const s = st.current;
      const auto = reduce ? 70 : 70 + 40 * Math.sin(t / 1400);
      s.cur += ((s.hover || s.locked ? 150 : auto) - s.cur) * 0.08;
      s.cpx += (s.px - s.cpx) * 0.08; s.cpy += (s.py - s.cpy) * 0.08;
      const wob = reduce ? 0 : Math.sin(t / 3000) * 3;
      const k = scale();
      if (stackRef.current) stackRef.current.style.transform = `scale(${k}) rotateX(${(58 - s.cpy * 16).toFixed(2)}deg) rotateZ(${(-36 + s.cpx * 24 + wob).toFixed(2)}deg)`;
      layers.current.forEach((el, i) => { if (el) el.style.transform = `translateZ(${(i * s.cur).toFixed(1)}px)`; });
      beams.current.forEach((el) => { if (el) el.style.height = `${(s.cur * 3).toFixed(1)}px`; });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const mono = 'font-mono';

  return (
    <div
      data-cursor="explode"
      className="flex w-full flex-col items-center gap-3"
      onMouseEnter={() => { st.current.hover = true; }}
      onMouseLeave={() => { const s = st.current; s.hover = false; s.px = 0; s.py = 0; }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        st.current.px = (e.clientX - r.left) / r.width - 0.5;
        st.current.py = (e.clientY - r.top) / r.height - 0.5;
      }}
    >
      <div
        role="img"
        aria-label="Exploded view of the on_device_rag stack: a vector store, retrieval picking the top-5 matches, context and model, and the Flutter chat UI, with data rising between layers."
        className="flex h-[420px] w-full items-center justify-center sm:h-[560px]"
        style={{ perspective: 1400 }}
      >
        <div ref={stackRef} className="relative h-[300px] w-[300px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* 04 · vector store */}
          <div ref={(el) => { layers.current[0] = el; }} className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#2E3352] bg-[#10121D] shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)]">
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const r = Math.floor(i / GRID), c = i % GRID;
              return (
                <span
                  key={i}
                  className={`absolute h-1 w-1 rounded-full bg-dim ${i % 5 === 0 ? 'blip' : ''}`}
                  style={{ left: pos(c) - 2, top: pos(r) - 2, animationDelay: `${(i % 9) * 0.27}s` }}
                />
              );
            })}
            <div className="scan absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_14px_#5CE1E6]" />
            <span className={`absolute bottom-3 left-4 text-xs text-faint ${mono}`}>04 · vector store · 2,048 chunks</span>
          </div>

          {/* beams from the top-5 matches up to the screen */}
          {TOP_K.map(([r, c], i) => (
            <div
              key={`b${i}`}
              ref={(el) => { beams.current[i] = el; }}
              aria-hidden="true"
              className="absolute w-0.5 bg-gradient-to-b from-[rgba(140,151,255,.85)] to-[rgba(92,225,230,.15)] shadow-[0_0_10px_rgba(140,151,255,.6)]"
              style={{ left: pos(c) - 1, top: pos(r), height: 210, transformOrigin: '50% 0', transform: 'rotateX(90deg)' }}
            >
              <span className="rise absolute -left-[3px] h-[18px] w-2 rounded bg-cyan shadow-[0_0_12px_#5CE1E6]" style={{ animationDelay: `${i * 0.28}s` }} />
            </div>
          ))}

          {/* 03 · retrieval */}
          <div ref={(el) => { layers.current[1] = el; }} className="absolute inset-0 rounded-[22px] border border-[#3B4377] bg-[rgba(26,31,61,.55)]">
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const r = Math.floor(i / GRID), c = i % GRID, hit = isTop(r, c);
              return (
                <span key={i}>
                  <span
                    className={`absolute h-1.5 w-1.5 rounded-full ${hit ? 'bg-accent shadow-[0_0_12px_#8C97FF]' : 'bg-[rgba(91,96,118,.35)]'}`}
                    style={{ left: pos(c) - 3, top: pos(r) - 3 }}
                  />
                  {hit && <span className="halo absolute h-[18px] w-[18px] rounded-full border border-accent" style={{ left: pos(c) - 9, top: pos(r) - 9, animationDelay: `${(i % 5) * 0.3}s` }} />}
                </span>
              );
            })}
            <span className={`absolute bottom-3 left-4 text-xs text-[#B7BEFF] ${mono}`}>03 · retrieval · top-5</span>
          </div>

          {/* 02 · context + model */}
          <div ref={(el) => { layers.current[2] = el; }} className="absolute inset-0 flex flex-col gap-2.5 rounded-[22px] border border-accent bg-[rgba(35,42,94,.78)] px-[22px] py-[26px]">
            <span className={`text-[11px] text-[#B7BEFF] ${mono}`}>context window</span>
            <span className="h-2.5 w-[92%] rounded bg-[#3B4377]" />
            <span className="h-2.5 w-[78%] rounded bg-[#3B4377]" />
            <span className="h-2.5 w-[86%] rounded bg-[#3B4377]" />
            <span className="shim h-2.5 w-[64%] rounded" />
            <span className={`mt-auto text-xs text-ink ${mono}`}>02 · context + quantized model</span>
          </div>

          {/* 01 · Flutter UI */}
          <div ref={(el) => { layers.current[3] = el; }} className="absolute inset-0 flex flex-col gap-2.5 rounded-[22px] bg-ink p-5 text-bg shadow-[0_0_40px_rgba(140,151,255,.35)]">
            <span className={`text-xs text-[#4A4E63] ${mono}`}>01 · Flutter UI</span>
            <span className="self-end rounded-[14px_14px_4px_14px] bg-bg px-3 py-2 text-[13px] text-ink">What does clause 4 say?</span>
            <span className="max-w-[80%] self-start rounded-[14px_14px_14px_4px] bg-[#D4D7F5] px-3 py-2 text-[13px]">
              Termination needs 30 days’ notice. <span className={`text-[11px] text-[#3A3F8F] ${mono}`}>[p.4]</span>
            </span>
            <span className={`mt-auto flex items-center gap-1.5 text-[11px] text-[#4A4E63] ${mono}`}>
              <span className="h-[7px] w-[7px] rounded-full bg-[#1E9E72]" />offline · on-device
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-pressed={locked}
        onClick={() => setLocked((v) => !v)}
        className="min-h-11 rounded-xl border border-line2 px-5 text-sm transition-colors hover:border-accent"
      >
        {locked ? 'Let it breathe' : 'Hold it open'}
      </button>
    </div>
  );
}
