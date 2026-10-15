'use client';

import { useEffect, useRef } from 'react';

const FACES: { label: string; sub: string; tf: string }[] = [
  { label: 'Flutter', sub: 'UI · state · channels', tf: 'rotateY(0deg)' },
  { label: 'Dart', sub: 'packages · isolates', tf: 'rotateY(90deg)' },
  { label: 'RAG', sub: 'chunk · embed · retrieve', tf: 'rotateY(180deg)' },
  { label: 'TFLite', sub: 'quantized · on-device', tf: 'rotateY(-90deg)' },
  { label: 'FastAPI', sub: 'AI backends', tf: 'rotateX(90deg)' },
  { label: 'MCP', sub: 'agent tooling', tf: 'rotateX(-90deg)' },
];

/** A draggable 3D cube of the stack. Spins on its own until you grab it. */
export default function SkillCube({ size = 220 }: { size?: number }) {
  const cube = useRef<HTMLDivElement>(null);
  const st = useRef({ rx: -22, ry: 32, vx: 0, vy: 0.18, drag: false, lx: 0, ly: 0 });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) st.current.vy = 0;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const s = st.current;
      if (!s.drag) {
        s.ry += s.vy; s.rx += s.vx;
        s.vx *= 0.95;
        s.vy += ((reduce ? 0 : 0.18) - s.vy) * 0.02;
      }
      if (cube.current) cube.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const h = size / 2;
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        role="img"
        aria-label="A 3D cube with faces for Flutter, Dart, RAG, TFLite, FastAPI and MCP. Drag to spin it."
        className="cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ perspective: 1000, width: size * 1.8, height: size * 1.8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onPointerDown={(e) => { const s = st.current; s.drag = true; s.lx = e.clientX; s.ly = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => {
          const s = st.current; if (!s.drag) return;
          const dx = e.clientX - s.lx, dy = e.clientY - s.ly;
          s.ry += dx * 0.5; s.rx -= dy * 0.5; s.vy = dx * 0.25; s.vx = -dy * 0.25;
          s.lx = e.clientX; s.ly = e.clientY;
        }}
        onPointerUp={() => { st.current.drag = false; }}
        onPointerCancel={() => { st.current.drag = false; }}
      >
        <div ref={cube} className="relative" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
          {FACES.map((f, i) => (
            <div
              key={f.label}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl border p-5"
              style={{
                transform: `${f.tf} translateZ(${h}px)`,
                background: i % 2 ? 'rgba(26,31,61,.92)' : 'rgba(13,15,22,.92)',
                borderColor: i === 2 ? '#8C97FF' : '#2E3352',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="font-mono text-[11px] text-faint">{f.sub}</span>
              <span className="text-4xl font-semibold tracking-[-0.03em]">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="font-mono text-xs text-faint">drag to spin</span>
    </div>
  );
}
