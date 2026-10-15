'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type P = {
  x: number; y: number; z: number;
  fx: number; fy: number; fz: number;
  tx: number; ty: number; tz: number;
  d: number; h: number; ox: number; oy: number; vx: number; vy: number;
};
type V3 = { x: number; y: number; z: number };

export const SHAPES = [
  { name: 'AI', label: 'the intelligence I build with' },
  { name: 'Phone', label: 'the phone in your hand' },
  { name: 'Neural network', label: 'the model inside it' },
  { name: 'AI chat bubble', label: 'the assistant it becomes' },
  { name: 'Globe', label: 'the people it reaches' },
  { name: 'Initials GP', label: 'the engineer who builds it' },
] as const;

const INTERVAL = 5000;
const GLOBE = 4;

function makeRng(seed = 7) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647), s / 2147483647);
}

/** Draw a 2D shape offscreen, then sample its filled pixels as 3D points with some thickness. */
function sample(rnd: () => number, draw: (g: CanvasRenderingContext2D, S: number) => void, n: number, depth: number): V3[] {
  const S = 360;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');
  if (!g) return Array.from({ length: n }, () => ({ x: 0, y: 0, z: 0 }));
  g.fillStyle = '#fff'; g.strokeStyle = '#fff';
  draw(g, S);
  const d = g.getImageData(0, 0, S, S).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < S; y += 2) for (let x = 0; x < S; x += 2) if (d[(y * S + x) * 4 + 3] > 128) pts.push([(x / S) * 2 - 1, (y / S) * 2 - 1]);
  return Array.from({ length: n }, () => {
    const p = pts.length ? pts[Math.floor(rnd() * pts.length)] : [0, 0];
    return { x: p[0] * 1.15, y: p[1] * 1.15, z: (rnd() - 0.5) * depth };
  });
}

function buildShapes(n: number): V3[][] {
  const rnd = makeRng(7);
  const text = (t: string, size: number) =>
    sample(rnd, (g, S) => {
      g.font = `700 ${size}px "Space Grotesk", ui-sans-serif, sans-serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(t, S / 2, S / 2 + 6);
    }, n, 0.32);

  const phone = sample(rnd, (g, S) => {
    const w = S * 0.42, h = S * 0.84, x = (S - w) / 2, y = (S - h) / 2;
    g.lineWidth = 12; g.beginPath(); g.roundRect(x, y, w, h, 34); g.stroke();
    g.beginPath(); g.roundRect(S / 2 - 26, y + 14, 52, 12, 6); g.fill();
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { g.beginPath(); g.roundRect(x + 22 + c * ((w - 44) / 3), y + 52 + r * 46, 26, 26, 8); g.fill(); }
    g.lineWidth = 4; g.beginPath(); g.roundRect(x + 20, y + h - 70, w - 40, 30, 15); g.stroke();
  }, n, 0.18);

  const sphere: V3[] = Array.from({ length: n }, (_, i) => {
    const phi = Math.acos(1 - (2 * i) / n), th = Math.PI * (1 + Math.sqrt(5)) * i;
    const shell = i % 7 === 0 ? 0.55 + rnd() * 0.35 : 1;
    const wob = 1 + 0.06 * Math.sin(th * 3) * Math.sin(phi * 5);
    const r = 0.95 * shell * wob;
    return { x: Math.sin(phi) * Math.cos(th) * r, y: Math.cos(phi) * r, z: Math.sin(phi) * Math.sin(th) * r };
  });

  const bubble = sample(rnd, (g, S) => {
    g.lineWidth = 14;
    g.beginPath(); g.roundRect(S * 0.12, S * 0.2, S * 0.66, S * 0.46, 46); g.stroke();
    g.beginPath(); g.moveTo(S * 0.24, S * 0.64); g.lineTo(S * 0.17, S * 0.82); g.lineTo(S * 0.38, S * 0.66); g.fill();
    [0.3, 0.45, 0.6].forEach((x) => { g.beginPath(); g.arc(S * x, S * 0.43, 15, 0, Math.PI * 2); g.fill(); });
    const star = (cx: number, cy: number, r: number) => {
      g.beginPath(); g.moveTo(cx, cy - r);
      g.quadraticCurveTo(cx, cy, cx + r, cy); g.quadraticCurveTo(cx, cy, cx, cy + r);
      g.quadraticCurveTo(cx, cy, cx - r, cy); g.quadraticCurveTo(cx, cy, cx, cy - r); g.fill();
    };
    star(S * 0.83, S * 0.17, 40); star(S * 0.92, S * 0.36, 18);
  }, n, 0.22);

  const lats = [-60, -30, 0, 30, 60];
  const globe: V3[] = Array.from({ length: n }, (_, i) => {
    const pick = i % 10;
    let la: number, lo: number;
    if (pick < 4) { la = (lats[i % lats.length] * Math.PI) / 180; lo = rnd() * Math.PI * 2; }
    else if (pick < 9) { lo = (Math.floor(rnd() * 12) / 12) * Math.PI * 2; la = (rnd() - 0.5) * Math.PI; }
    else { la = (rnd() - 0.5) * Math.PI * 0.8; lo = rnd() * Math.PI * 2; }
    return { x: Math.cos(la) * Math.cos(lo) * 0.92, y: -Math.sin(la) * 0.92, z: Math.cos(la) * Math.sin(lo) * 0.92 };
  });

  return [text('AI', 230), phone, sphere, bubble, globe, text('GP', 210)];
}

/**
 * ~2,400 particles that hold a 3D shape and flow into the next every 5 s.
 * Cursor pushes particles; click scatters them into the next shape.
 * Buttons give keyboard/touch control; reduced motion starts paused and skips the morph.
 */
export default function ParticleSculpture({ accent = '#8C97FF' }: { accent?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const [shape, setShape] = useState(0);
  const [paused, setPaused] = useState(false);

  const sim = useRef({
    parts: [] as P[], shapes: [] as V3[][], n: 2400, shapeI: 0,
    morphT0: -1e9, lastMorph: 0, paused: false, pointerIn: false, reduce: false,
    mx: 0, my: 0, tx: 0, ty: 0, ry: 0,
  });

  const morphTo = useCallback((i: number) => {
    const s = sim.current;
    if (!s.shapes.length) return;
    s.shapeI = i; s.morphT0 = performance.now(); s.lastMorph = s.morphT0;
    const tgt = s.shapes[i];
    for (let k = 0; k < s.n; k++) {
      const p = s.parts[k];
      p.fx = p.x; p.fy = p.y; p.fz = p.z; p.tx = tgt[k].x; p.ty = tgt[k].y; p.tz = tgt[k].z;
    }
    setShape(i);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const s = sim.current;
    s.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    s.paused = s.reduce; setPaused(s.reduce);
    s.n = window.innerWidth < 640 ? 1600 : 2400;
    const rnd = makeRng(11);
    s.shapes = buildShapes(s.n);
    s.parts = s.shapes[0].map((p) => ({
      ...p, fx: p.x, fy: p.y, fz: p.z, tx: p.x, ty: p.y, tz: p.z,
      d: rnd() * 0.35, h: rnd(), ox: 0, oy: 0, vx: 0, vy: 0,
    }));
    s.lastMorph = performance.now();

    // Rebuild text shapes once the web font is in.
    document.fonts?.ready.then(() => { s.shapes = buildShapes(s.n); morphTo(s.shapeI); });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    const col = [accent, '#5CE1E6', '#B08CFF'];
    let raf = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2), W = cv.clientWidth, H = cv.clientHeight;
      if (!W || !H) return;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const now = performance.now();
      if (s.pointerIn || s.paused) s.lastMorph = now;
      else if (now - s.lastMorph > INTERVAL) morphTo((s.shapeI + 1) % 6);
      if (progRef.current) progRef.current.style.transform = `scaleX(${s.paused ? 0 : Math.min(1, (now - s.lastMorph) / INTERVAL).toFixed(3)})`;

      s.tx += (s.mx - s.tx) * 0.06; s.ty += (s.my - s.ty) * 0.06;
      if (!s.reduce) s.ry += 0.004;
      const ay = Math.sin(s.ry) * 0.55 + s.tx * 0.9, ax = s.ty * 0.5;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = Math.min(W, H) * 0.36, f = 3.4;
      const mpx = W / 2 + s.mx * W, mpy = H / 2 + s.my * H;
      const mt = (now - s.morphT0) / 1600;
      const globeA = s.shapeI === GLOBE && !s.reduce ? (t / 2600) * Math.min(1, Math.max(0, (mt - 0.9) / 0.6)) : 0;
      const gc = Math.cos(globeA), gs = Math.sin(globeA);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < s.n; i++) {
        const p = s.parts[i];
        const k = s.reduce ? 1 : Math.min(1, Math.max(0, (mt - p.d) / 0.65));
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        const sw = Math.sin(k * Math.PI) * 0.5;
        p.x = p.fx + (p.tx - p.fx) * e + Math.cos(i + t / 400) * sw * 0.35;
        p.y = p.fy + (p.ty - p.fy) * e + Math.sin(i * 1.7 + t / 500) * sw * 0.35;
        p.z = p.fz + (p.tz - p.fz) * e;

        const br = s.reduce ? 0 : Math.sin(t / 700 + p.h * 12) * 0.008;
        let px = p.x, pz = p.z;
        if (globeA) { const ox = px; px = ox * gc - pz * gs; pz = ox * gs + pz * gc; }
        const x1 = (px + br) * cy + pz * sy, z1 = -(px + br) * sy + pz * cy;
        const y2 = (p.y + br) * cx - z1 * sx, z2 = (p.y + br) * sx + z1 * cx;
        const sc = f / (f + z2);
        let X = W / 2 + x1 * R * sc, Y = H / 2 + y2 * R * sc;

        if (s.pointerIn && !s.reduce) {
          const dx = X + p.ox - mpx, dy = Y + p.oy - mpy, d2 = dx * dx + dy * dy;
          if (d2 < 9000) { const d = Math.sqrt(d2) || 1, push = (1 - d / 95) * 2.6; p.vx += (dx / d) * push; p.vy += (dy / d) * push; }
        }
        p.vx += -p.ox * 0.06; p.vy += -p.oy * 0.06; p.vx *= 0.84; p.vy *= 0.84; p.ox += p.vx; p.oy += p.vy;
        X += p.ox; Y += p.oy;

        ctx.globalAlpha = Math.max(0.12, Math.min(1, 0.7 - z2 * 0.45)) * 0.85;
        ctx.fillStyle = col[i % 3];
        const r = (i % 11 === 0 ? 2.2 : 1.3) * sc;
        ctx.fillRect(X - r, Y - r, r * 2, r * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [accent, morphTo]);

  const togglePlay = () => {
    const s = sim.current;
    s.paused = !s.paused; s.lastMorph = performance.now();
    setPaused(s.paused);
  };

  return (
    <figure
      data-cursor="play"
      role="img"
      aria-label="Glowing particles that morph between the letters AI, a phone, a neural network sphere, an AI chat bubble, a spinning wireframe globe and the initials GP."
      className="relative m-0 h-full w-full select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect(), s = sim.current;
        s.mx = (e.clientX - r.left) / r.width - 0.5; s.my = (e.clientY - r.top) / r.height - 0.5;
        s.pointerIn = e.pointerType === 'mouse';
      }}
      onPointerLeave={() => { const s = sim.current; s.mx = 0; s.my = 0; s.pointerIn = false; }}
      onPointerDown={(e) => {
        const s = sim.current;
        if (s.reduce || (e.target as HTMLElement).closest('button')) return;
        for (const p of s.parts) { const a = Math.random() * Math.PI * 2, v = 6 + Math.random() * 16; p.vx += Math.cos(a) * v; p.vy += Math.sin(a) * v; }
        morphTo((s.shapeI + 1) % 6);
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      <figcaption className="absolute inset-x-4 bottom-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <span className="flex flex-col gap-1 font-mono text-xs text-faint">
          <span>{String(shape + 1).padStart(2, '0')} / 6</span>
          <span className="text-sm text-ink" aria-live="polite">
            {SHAPES[shape].label}<span className="caret text-cyan" aria-hidden="true">▍</span>
          </span>
        </span>
        <span role="group" aria-label="Choose a shape" className="grid grid-cols-[1.3fr_repeat(6,minmax(0,1fr))] gap-1.5 sm:flex">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={paused ? 'Play autoplay' : 'Pause autoplay'}
            className="relative h-11 overflow-hidden rounded-xl border border-accent bg-surface text-xs tracking-tighter sm:w-[52px]"
          >
            {paused ? '▶' : '❚❚'}
            <span ref={progRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent" />
          </button>
          {SHAPES.map((sh, i) => (
            <button
              key={sh.name}
              type="button"
              onClick={() => morphTo(i)}
              aria-label={sh.name}
              aria-pressed={shape === i}
              className={`h-11 rounded-xl border text-xs transition-colors sm:w-11 ${shape === i ? 'border-accent bg-accent/15' : 'border-line2 hover:border-accent'}`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
