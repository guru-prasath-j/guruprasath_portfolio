'use client';

import { useEffect, useRef } from 'react';

type P3 = { x: number; y: number; z: number };
type Point = P3 & { c: number };

const LABELS = ['Flutter', 'RAG', 'On-device', 'Agents', 'Data', 'Embeddings'];

/** Deterministic point cloud so the first frame is identical on every load. */
function buildCloud(perCluster: number, noise: number) {
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647), s / 2147483647);
  const g = () => (rnd() + rnd() + rnd() - 1.5) * 0.55;
  const clusters = LABELS.map((name, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / LABELS.length);
    const th = Math.PI * (1 + Math.sqrt(5)) * i;
    return { name, x: Math.sin(phi) * Math.cos(th), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(th) };
  });
  const pts: Point[] = [];
  clusters.forEach((c, ci) => {
    for (let k = 0; k < perCluster; k++) pts.push({ x: c.x + g() * 0.6, y: c.y + g() * 0.6, z: c.z + g() * 0.6, c: ci });
  });
  for (let k = 0; k < noise; k++) pts.push({ x: (rnd() - 0.5) * 2.4, y: (rnd() - 0.5) * 2.4, z: (rnd() - 0.5) * 2.4, c: -1 });
  return { clusters, pts };
}

/**
 * A rotating 3D embedding space drawn on a 2D canvas (no WebGL dependency).
 * A query point hops between clusters and links to its 5 nearest neighbours —
 * a literal picture of what retrieval does.
 */
export default function EmbeddingCloud({ accent = '#8C97FF', compact = false }: { accent?: string; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { clusters, pts } = buildCloud(compact ? 34 : 46, compact ? 0 : 60);
    const q: P3 = { x: 0, y: 0, z: 0 };
    let qi = 0, last = 0, ry = 0, tx = 0, ty = 0, raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = cv.clientWidth, H = cv.clientHeight;
      if (!W || !H) return;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (!reduce) ry += 0.0025;
      tx += (pointer.current.x - tx) * 0.06;
      ty += (pointer.current.y - ty) * 0.06;
      const ay = ry + tx * 0.9, ax = -0.25 + ty * 0.6;

      if (!reduce && t - last > 3200) { qi = (qi + 1) % clusters.length; last = t; }
      const tc = clusters[qi];
      const k = reduce ? 1 : 0.035;
      q.x += (tc.x * 0.92 - q.x) * k; q.y += (tc.y * 0.92 - q.y) * k; q.z += (tc.z * 0.92 - q.z) * k;

      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = Math.min(W, H) * 0.34, f = 3.2;
      const proj = (p: P3) => {
        const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        const sc = f / (f + z2);
        return { X: W / 2 + x1 * R * sc, Y: H / 2 + y2 * R * sc, z: z2, s: sc };
      };

      const nn = new Set(
        pts.map((p, i) => ({ i, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
          .sort((a, b) => a.d - b.d).slice(0, 5).map((o) => o.i),
      );
      const P = pts.map(proj);
      const Q = proj(q);

      ctx.lineWidth = 1; ctx.strokeStyle = accent; ctx.globalAlpha = 0.75;
      nn.forEach((i) => { ctx.beginPath(); ctx.moveTo(Q.X, Q.Y); ctx.lineTo(P[i].X, P[i].Y); ctx.stroke(); });

      P.map((_, i) => i).sort((a, b) => P[b].z - P[a].z).forEach((i) => {
        const p = P[i], hit = nn.has(i), noise = pts[i].c < 0;
        const depth = Math.max(0.15, Math.min(1, 0.75 - p.z * 0.35));
        ctx.globalAlpha = hit ? 1 : depth * (noise ? 0.45 : 0.85);
        ctx.fillStyle = hit ? accent : noise ? '#3A3F57' : '#8C91A8';
        ctx.beginPath(); ctx.arc(p.X, p.Y, (hit ? 4 : 2.1) * p.s, 0, Math.PI * 2); ctx.fill();
      });

      ctx.font = `500 ${compact ? 10 : 12}px "JetBrains Mono", ui-monospace, monospace`;
      clusters.forEach((c, i) => {
        const p = proj({ x: c.x * 1.32, y: c.y * 1.32, z: c.z * 1.32 });
        ctx.globalAlpha = Math.max(0.25, Math.min(1, 0.8 - p.z * 0.4));
        ctx.fillStyle = i === qi ? accent : '#6B7088';
        ctx.fillText(c.name, p.X - 24, p.Y);
      });

      ctx.globalAlpha = 1; ctx.fillStyle = '#5CE1E6';
      ctx.beginPath(); ctx.arc(Q.X, Q.Y, 6 * Q.s, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.25;
      ctx.beginPath(); ctx.arc(Q.X, Q.Y, (14 + 4 * Math.sin(t / 300)) * Q.s, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [accent, compact]);

  return (
    <figure
      role="img"
      aria-label="A rotating 3D embedding space: clusters for Flutter, RAG, on-device, agents and data, with a query point linking to its five nearest neighbours."
      className="relative m-0 h-full w-full cursor-grab touch-none"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      }}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      <figcaption className="absolute bottom-3 left-4 flex flex-col gap-1 font-mono text-xs text-faint">
        <span>embedding space · live</span>
        <span className="text-ink">query → top-5 neighbours<span className="caret text-cyan">▍</span></span>
      </figcaption>
    </figure>
  );
}
