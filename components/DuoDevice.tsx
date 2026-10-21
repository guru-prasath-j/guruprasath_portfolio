'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// A dual-screen iPhone concept. Scene 0: folded (one screen). 1: open flat. 2: book posture.
const ANGLE = [-180, 0, -62];
const SHIFT = [113, 0, 36];
const LABEL = ['folded', 'open flat', 'book posture'];

const Row = ({ t, sub, right, on = false }: { t: string; sub: string; right?: string; on?: boolean }) => (
  <div className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 ${on ? 'border-accent bg-[#D4D7F5]' : 'border-[#E1E3EC] bg-white'}`}>
    <span className="flex min-w-0 flex-col"><span className="text-[12.5px] font-semibold">{t}</span><span className="text-[10.5px] opacity-70">{sub}</span></span>
    {right && <span className="text-[10.5px] font-semibold">{right}</span>}
  </div>
);

const Mail = ({ footer }: { footer: ReactNode }) => (
  <div className="flex flex-1 flex-col gap-2.5 px-3.5 pt-3">
    <span className="font-mono text-[9.5px] text-[#3A3F8F]">INBOX › DESIGN REVIEW</span>
    <span className="text-[17px] font-bold leading-tight">Design review</span>
    <span className="text-[11px] opacity-70">Priya · tomorrow, 10 am</span>
    <span className="text-xs leading-relaxed">Bring the latest build and the hinge test notes. We’ll walk the fold-aware layouts on a real device.</span>
    {footer}
  </div>
);

function Screen({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute top-0 box-border flex h-[460px] w-[220px] flex-col overflow-hidden rounded-[26px] border-8 border-[#1A1D2B] bg-[#F1F2F7] text-bg shadow-[0_30px_60px_-30px_rgba(140,151,255,.45)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function DuoDevice({ scene }: { scene: number }) {
  const body = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const s = Math.max(0, Math.min(2, scene));

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, cx = 0, cy = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const iy = reduce ? -8 : Math.sin(t / 2600) * 8 - 6;
      const ix = reduce ? 8 : Math.cos(t / 3000) * 3 + 8;
      cx += (target.current.x * 24 + iy - cx) * 0.06;
      cy += (-target.current.y * 16 + ix - cy) * 0.06;
      if (body.current) body.current.style.transform = `rotateY(${cx.toFixed(2)}deg) rotateX(${cy.toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const status = (
    <div className="flex justify-between px-3.5 pt-2 font-mono text-[9.5px] text-[#4A4E63]">
      <span>9:41</span><span>{s === 0 ? 'folded' : s === 1 ? 'unfolded · 180°' : 'book · 118°'}</span>
    </div>
  );

  return (
    <div
      data-cursor="turn"
      className="flex h-[640px] w-full items-center justify-center"
      style={{ perspective: 1600 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        target.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      }}
      onPointerLeave={() => { target.current = { x: 0, y: 0 }; }}
    >
      <div className="origin-center scale-[0.72] sm:scale-100">
        <div ref={body} className="relative h-[470px] w-[460px]" style={{ transformStyle: 'preserve-3d' }}>
          <div className="duo-move absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `translateX(${SHIFT[s]}px)` }}>
            {/* left screen */}
            <Screen className="left-[10px]" style={{ transform: 'translateZ(1px)' }}>
              {status}
              {s === 0 && (
                <div className="relative flex flex-1 flex-col gap-2.5 px-3 pt-3">
                  <span className="text-base font-bold">Inbox</span>
                  <span className="-mt-2 text-[10.5px] opacity-70">3 unread</span>
                  <Row t="Design review" sub="Tomorrow, 10 am" right="2" />
                  <Row t="Release notes" sub="v1.4 is out" />
                  <Row t="Team lunch" sub="Friday, 1 pm" />
                  <div className="absolute inset-x-2.5 bottom-3 flex justify-around rounded-2xl border border-[#E1E3EC] bg-white py-2.5 font-mono text-[9.5px]">
                    <span className="font-bold text-[#3A3F8F]">Inbox</span><span>Search</span><span>Settings</span>
                  </div>
                </div>
              )}
              {s === 1 && (
                <div className="flex flex-1 gap-2 pl-1.5 pr-2.5 pt-3">
                  <div className="flex w-11 flex-none flex-col items-center gap-3.5 border-r border-[#E1E3EC] pt-1.5">
                    {['Inbox', 'Search', 'Settings'].map((n, i) => (
                      <span key={n} className={`flex flex-col items-center gap-1 font-mono text-[8.5px] ${i ? 'text-[#6B7088]' : 'text-[#3A3F8F]'}`}>
                        <span className={`h-[22px] w-[22px] rounded-[7px] ${i ? 'bg-[#E4E6F0]' : 'bg-[#D4D7F5]'}`} />{n}
                      </span>
                    ))}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                    <span className="text-base font-bold">Inbox</span>
                    <Row t="Design review" sub="Tomorrow, 10 am" right="2" on />
                    <Row t="Release notes" sub="v1.4 is out" />
                    <Row t="Team lunch" sub="Friday, 1 pm" />
                  </div>
                </div>
              )}
              {s === 2 && <Mail footer={<span className="font-mono text-[9.5px] text-[#6B7088]">content stays on this screen</span>} />}
            </Screen>
            {/* hinge */}
            <div aria-hidden="true" className="absolute left-[228px] top-[14px] h-[432px] w-1.5 rounded bg-gradient-to-b from-[#2A2E44] via-[#3B4377] to-[#2A2E44] transition-opacity duration-500" style={{ opacity: s === 0 ? 0 : 1 }} />
            {/* right screen, swings on the hinge */}
            <Screen className="duo-swing left-[236px]" style={{ transformOrigin: '-4px 50%', transform: `rotateY(${ANGLE[s]}deg)`, backfaceVisibility: 'hidden' }}>
              {status}
              {s === 1 && <Mail footer={<span className="mb-3.5 mt-auto rounded-xl bg-accent py-2.5 text-center text-[12.5px] font-bold">Reply</span>} />}
              {s === 2 && (
                <div className="flex flex-1 flex-col gap-2.5 px-3 py-3.5">
                  <span className="font-mono text-[9.5px] text-[#3A3F8F]">QUICK REPLY</span>
                  {['Sounds good — see you at 10.', 'Can we push to 11?', 'I’ll bring the build.'].map((t) => (
                    <span key={t} className="rounded-xl border border-[#E1E3EC] bg-white px-2.5 py-2 text-xs">{t}</span>
                  ))}
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <span className="rounded-xl bg-accent py-2.5 text-center text-xs font-bold">Reply</span>
                    <span className="rounded-xl bg-[#E4E6F0] py-2.5 text-center text-xs font-semibold">Forward</span>
                  </div>
                  <span className="text-center font-mono text-[9.5px] text-[#6B7088]">controls on this one</span>
                </div>
              )}
            </Screen>
          </div>
          <span className="absolute inset-x-0 -bottom-9 text-center font-mono text-[11px] text-faint">dual-screen iPhone concept · {LABEL[s]}</span>
        </div>
      </div>
    </div>
  );
}
