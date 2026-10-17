'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Phone3D from '@/components/Phone3D';
import DemoScreen from '@/components/DemoScreen';
import StatusBadge from '@/components/StatusBadge';
import SmartLink from '@/components/SmartLink';
import { demos } from '@/lib/demos';
import { builds, featured, lab, spotlight, type Link, type Status } from '@/lib/content';

type Meta = { name: string; status: Status; line: string; links: Link[] };

// Names, status and links come from lib/content.ts so cards and demos never disagree.
const META: Record<string, Meta> = Object.fromEntries([
  [featured.slug, featured],
  ['flutter-accessibility-scanner', { ...spotlight, links: spotlight.links }],
  ...lab.map((p) => [p.slug, p]),
  ...builds.map((p) => [p.slug, p]),
].map(([slug, p]) => {
  const m = p as Meta;
  return [slug as string, { name: m.name, status: m.status, line: m.line, links: m.links }];
}));

const TICK = 480;
const HOLD = 4; // ticks to linger after the last item
const HASH = '#demo-';

const Ctx = createContext<{ open: (slug: string) => void }>({ open: () => {} });
export const useDemo = () => useContext(Ctx);

/** "▶ Watch demo" for any card. Renders nothing if the project has no demo yet. */
export function WatchDemo({ slug, className = '' }: { slug: string; className?: string }) {
  const { open } = useDemo();
  if (!demos.some((d) => d.slug === slug)) return null;
  return (
    <button
      type="button"
      onClick={() => open(slug)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-accent bg-accent/10 px-4 text-sm font-semibold text-ink transition-colors hover:bg-accent/20 ${className}`}
    >
      <span aria-hidden="true" className="text-accent">▶</span> Watch demo
    </button>
  );
}

export default function DemoProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((s: string) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSlug(s);
    history.replaceState(null, '', `${location.pathname}${location.search}${HASH}${s}`);
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    history.replaceState(null, '', `${location.pathname}${location.search}`);
    opener.current?.focus?.();
  }, []);

  // Deep links: /#demo-pocketmind opens straight onto that demo.
  useEffect(() => {
    const fromHash = () => {
      const h = location.hash;
      if (h.startsWith(HASH) && demos.some((d) => d.slug === h.slice(HASH.length))) setSlug(h.slice(HASH.length));
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const value = useMemo(() => ({ open }), [open]);
  return (
    <Ctx.Provider value={value}>
      {children}
      {slug && <Theatre slug={slug} onPick={open} onClose={close} />}
    </Ctx.Provider>
  );
}

function Theatre({ slug, onPick, onClose }: { slug: string; onPick: (s: string) => void; onClose: () => void }) {
  const di = Math.max(0, demos.findIndex((d) => d.slug === slug));
  const d = demos[di];
  const meta = META[d.slug];
  const [scene, setScene] = useState(0);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduce, setReduce] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const sc = d.scenes[scene];
  const total = sc.items.length + HOLD;

  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(r);
    if (r) { setPlaying(false); setTick(99); }
  }, []);

  // New project: start from its first scene.
  useEffect(() => { setScene(0); setTick(reduce ? 99 : 0); }, [slug, reduce]);

  // Playback
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTick((t) => {
        if (t + 1 > total) { setScene((s) => (s + 1) % d.scenes.length); return 0; }
        return t + 1;
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [playing, total, d.scenes.length]);

  const go = (i: number) => { setScene((i + d.scenes.length) % d.scenes.length); setTick(reduce || !playing ? 99 : 0); };

  // Open: lock scroll and move focus into the dialog (once).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keys: Esc closes, ←/→ step, Tab stays inside.
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') go(scene + 1);
      else if (e.key === 'ArrowLeft') go(scene - 1);
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, onClose]);

  const offline = sc.offline ?? !!d.offline;
  const shown = playing ? tick : 99;
  const progress = Math.min(100, Math.round((Math.min(shown, total) / total) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(7,8,12,.86)] backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-phrase"
        tabIndex={-1}
        className="theatre-in relative mx-auto my-6 flex max-w-page flex-col gap-6 rounded-[28px] border border-line bg-bg p-5 outline-none sm:my-10 sm:gap-8 sm:p-10"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs text-faint">See it run<span className="text-accent"> · </span>{meta?.name}</span>
            <h2 key={d.slug} id="demo-phrase" className="phrase-in m-0 text-[36px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              {d.phrase[0]}<br /><span className="text-dim">{d.phrase[1]}</span>
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close demo" className="flex h-11 w-11 items-center justify-center rounded-full border border-line2 text-lg hover:border-accent">✕</button>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[280px_minmax(0,1fr)_340px] lg:gap-7">
          {/* picker */}
          <nav aria-label="Projects" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:self-stretch lg:overflow-visible lg:px-0">
            {(['Packages', 'Apps & agents'] as const).map((g) => (
              <div key={g} className="contents lg:flex lg:flex-col lg:gap-2">
                <span className="hidden font-mono text-[11px] uppercase text-[#6B7088] lg:mb-0.5 lg:mt-2 lg:block">{g}</span>
                {demos.filter((x) => x.group === g).map((x) => {
                  const on = x.slug === d.slug;
                  return (
                    <button
                      key={x.slug}
                      type="button"
                      onClick={() => onPick(x.slug)}
                      aria-pressed={on}
                      className={`flex min-h-11 shrink-0 items-center justify-between gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors ${on ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:border-[#4B52A8]'}`}
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate font-mono text-[13px]">{META[x.slug]?.name ?? x.slug}</span>
                        <span className="hidden truncate text-xs text-faint lg:block">{x.phrase.join(' ')}</span>
                      </span>
                      {META[x.slug] && <span className="hidden lg:inline"><StatusBadge status={META[x.slug].status} /></span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* the reusable phone */}
          <div role="img" aria-label={`${meta?.name} demo, step ${scene + 1} of ${d.scenes.length}: ${sc.caption}`}>
            <Phone3D>
              <DemoScreen scene={sc} shown={shown} offline={offline} />
            </Phone3D>
          </div>

          {/* narration */}
          <aside aria-live="polite" className="flex flex-col gap-4 rounded-[22px] border border-line bg-surface p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2.5 font-mono text-[11px] text-faint">
              <span>{d.kind}</span><span>replay {scene + 1} / {d.scenes.length}</span>
            </div>
            <div>
              <div className="font-mono text-xl font-medium tracking-[-0.02em]">{meta?.name}</div>
              <p className="m-0 mt-1.5 text-soft">{meta?.line}</p>
            </div>
            <ol className="m-0 flex list-none flex-col gap-2 p-0">
              {d.scenes.map((x, i) => (
                <li key={x.caption}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === scene ? 'step' : undefined}
                    className={`flex min-h-11 w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${i === scene ? 'border-accent bg-accent/10 text-ink' : 'border-line text-muted hover:border-[#4B52A8]'}`}
                  >
                    <span className={`pt-0.5 font-mono text-[11px] ${i === scene ? 'text-accent' : 'text-[#6B7088]'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{x.caption}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="h-[3px] overflow-hidden rounded bg-line"><div className="h-[3px] bg-accent transition-[width] duration-500 ease-linear" style={{ width: `${progress}%` }} /></div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(scene - 1)} aria-label="Previous step" className="min-h-11 flex-1 rounded-xl border border-line2 hover:border-accent">←</button>
              <button
                type="button"
                onClick={() => { setPlaying((p) => !p); if (playing) setTick(99); else setTick(0); }}
                aria-label={playing ? 'Pause replay' : 'Play replay'}
                className="min-h-11 flex-[2] rounded-xl border border-accent bg-[#121526] text-sm"
              >
                {playing ? '❚❚ Pause' : '▶ Play'}
              </button>
              <button type="button" onClick={() => go(scene + 1)} aria-label="Next step" className="min-h-11 flex-1 rounded-xl border border-line2 hover:border-accent">→</button>
            </div>
            <div className="flex flex-wrap gap-3.5 border-t border-line pt-4 text-sm font-semibold">
              {meta?.links.map((l) => <SmartLink key={l.href} href={l.href} className="text-accent no-underline hover:underline">{l.label} →</SmartLink>)}
            </div>
            <span className="font-mono text-[11px] text-[#6B7088]">Illustrative replay of the real flow.</span>
          </aside>
        </div>
      </div>
    </div>
  );
}
