'use client';

import { useState } from 'react';
import { isTodo, journey, site } from '@/lib/content';

const SIZE = 140;
const GAP = 150;
const HEIGHTS = [36, 84, 132, 180];

const badge: Record<string, string> = {
  Education: 'border-[#B7BEFF] text-[#B7BEFF]',
  Work: 'border-live text-live',
  Next: 'border-accent text-accent',
};

/**
 * Career as a 3D staircase: each step up is a stage, the top step is left open for the next team.
 * Step tops are real buttons; the card beside it shows the selected stage.
 */
export default function JourneyStairs() {
  const initial = Math.max(0, journey.findIndex((s) => s.current));
  const [sel, setSel] = useState(initial);
  const d = journey[sel];
  const points = d.points.filter((p) => !isTodo(p));
  const last = journey.length - 1;

  return (
    <div className="relative flex flex-wrap items-center gap-8 overflow-hidden rounded-[28px] border border-[#161927] bg-band p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(#141726 1px, transparent 1px), linear-gradient(90deg, #141726 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 30% 60%, #000 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 30% 60%, #000 0%, transparent 70%)',
        }}
      />

      {/* ---------- staircase ---------- */}
      <div data-cursor="view" className="relative flex h-[340px] min-w-0 flex-[1_1_520px] items-center justify-center sm:h-[560px]" style={{ perspective: 1600 }}>
        <div className="origin-center scale-[0.55] sm:scale-100">
          <div className="stairs relative h-[150px] w-[600px]" style={{ transformStyle: 'preserve-3d' }}>
            {journey.map((s, i) => {
              const on = i === sel;
              const ghost = s.kind === 'Next';
              const h = HEIGHTS[i] ?? HEIGHTS[HEIGHTS.length - 1];
              const edge = ghost ? '1px dashed #3B4377' : '1px solid #232842';
              return (
                <div
                  key={s.org}
                  className="absolute top-0 transition-transform duration-500"
                  style={{ left: i * GAP, width: SIZE, height: SIZE, transformStyle: 'preserve-3d', transform: `translateZ(${on ? 26 : 0}px)` }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute rounded-full transition-opacity duration-500"
                    style={{ left: -30, top: -30, width: 200, height: 200, transform: 'translateZ(1px)', opacity: on ? 1 : 0, background: 'radial-gradient(circle, rgba(140,151,255,.45) 0%, rgba(140,151,255,0) 65%)' }}
                  />
                  {/* front wall */}
                  <div
                    aria-hidden="true"
                    className="absolute box-border"
                    style={{ left: 0, top: SIZE, width: SIZE, height: h, border: edge, transformOrigin: '50% 0', transform: 'rotateX(90deg)', background: ghost ? 'rgba(26,31,61,.15)' : on ? '#5560C8' : '#151829' }}
                  />
                  {/* side wall */}
                  <div
                    aria-hidden="true"
                    className="absolute box-border"
                    style={{ left: SIZE, top: 0, width: h, height: SIZE, border: edge, transformOrigin: '0 50%', transform: 'rotateY(-90deg)', background: ghost ? 'rgba(26,31,61,.1)' : on ? '#3E47A3' : '#10121D' }}
                  />
                  {/* top: the button */}
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={on}
                    aria-label={`${s.title}, ${s.org}, ${s.when}`}
                    className="absolute inset-0 box-border flex flex-col items-start justify-between rounded-md p-3.5 text-left transition-colors duration-300"
                    style={{
                      transform: `translateZ(${h}px)`,
                      background: on ? '#8C97FF' : ghost ? 'rgba(13,15,22,.4)' : '#1A1F3D',
                      color: on ? '#07080C' : '#E9EAF0',
                      border: ghost && !on ? '1.5px dashed #8C97FF' : `1px solid ${on ? '#8C97FF' : '#2E3352'}`,
                    }}
                  >
                    <span className="font-mono text-[11px] opacity-80">{s.current ? 'Work · now' : s.kind}</span>
                    <span className="text-[26px] font-semibold leading-none tracking-[-0.03em]">{s.year}</span>
                    <span className="text-xs font-medium">{s.short}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-3.5 left-4 font-mono text-xs text-faint">2+ years shipping Flutter · click a step</span>
      </div>

      {/* ---------- detail card ---------- */}
      <article
        aria-live="polite"
        className={`relative flex min-w-0 flex-[1_1_380px] flex-col gap-4 rounded-[22px] border bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(140,151,255,.45)] sm:p-8 ${d.kind === 'Next' ? 'border-accent' : 'border-line'}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className={`rounded-full border px-3 py-1 font-mono text-[11px] ${badge[d.kind]}`}>{d.current ? 'Work · now' : d.kind}</span>
          <span className="font-mono text-xs text-faint">{d.when} · {d.where}</span>
        </div>
        <div>
          <h3 className="m-0 text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{d.title}</h3>
          <p className="m-0 mt-1 text-lg font-medium text-accent">{d.org}</p>
        </div>
        <p className="m-0 text-muted">{d.body}</p>
        {points.length > 0 && (
          <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="rounded-xl border border-line bg-[#121526] px-3.5 py-3 text-sm leading-snug">{p}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1.5">
          {d.tags.map((t) =>
            d.kind === 'Next' ? (
              <a key={t} href="#contact" className="rounded-md border border-accent px-2.5 py-1 font-mono text-xs text-accent no-underline">{t}</a>
            ) : (
              <span key={t} className="rounded-md border border-line2 px-2.5 py-1 font-mono text-xs text-soft">{t}</span>
            ),
          )}
          {d.kind === 'Next' && (
            <a href={`mailto:${site.email}`} className="rounded-md border border-line2 px-2.5 py-1 font-mono text-xs text-soft no-underline hover:border-accent">{site.email}</a>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 border-t border-line pt-4">
          <button type="button" onClick={() => setSel((v) => Math.max(0, v - 1))} disabled={sel === 0} className="min-h-11 rounded-xl border border-line2 px-4 text-sm transition-colors enabled:hover:border-accent disabled:opacity-40">← Earlier</button>
          <span className="font-mono text-xs text-faint">{sel + 1} / {journey.length}</span>
          <button type="button" onClick={() => setSel((v) => Math.min(last, v + 1))} disabled={sel === last} className="min-h-11 rounded-xl border border-line2 px-4 text-sm transition-colors enabled:hover:border-accent disabled:opacity-40">Later →</button>
        </div>
      </article>
    </div>
  );
}
