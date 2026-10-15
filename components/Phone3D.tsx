'use client';

import { useEffect, useRef, useState } from 'react';

const SCRIPT = [
  { q: 'Summarise my lab report', a: 'Haemoglobin and platelets are in range. Vitamin D is low — page 2 suggests a recheck in 3 months.' },
  { q: 'What does clause 4 say?', a: 'Either side can end the contract with 30 days’ written notice. Source: page 4.' },
  { q: 'Draft a reply to Priya', a: 'Thanks Priya — Thursday works. I’ll bring the revised build and the test notes.' },
];

const W = 280, H = 570, D = 16;

/** A real-thickness CSS 3D phone. The screen replays an on-device chat, streaming tokens. */
export default function Phone3D() {
  const body = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const [turn, setTurn] = useState(0);
  const [shown, setShown] = useState(0);

  // Token streaming
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = SCRIPT[turn].a.split(' ');
    if (reduce) { setShown(words.length); return; }
    setShown(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= words.length) {
        window.clearInterval(id);
        window.setTimeout(() => setTurn((t) => (t + 1) % SCRIPT.length), 2600);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [turn]);

  // Idle sway + pointer follow
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, cx = 0, cy = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const idleY = reduce ? -18 : Math.sin(t / 2200) * 18 - 14;
      const idleX = reduce ? 6 : Math.cos(t / 2800) * 5 + 6;
      cx += (target.current.x * 40 + idleY - cx) * 0.06;
      cy += (-target.current.y * 24 + idleX - cy) * 0.06;
      if (body.current) body.current.style.transform = `rotateY(${cx.toFixed(2)}deg) rotateX(${cy.toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = SCRIPT[turn];
  const words = s.a.split(' ');
  const face = 'absolute left-1/2 top-1/2';

  return (
    <div
      className="flex h-[640px] w-full items-center justify-center"
      style={{ perspective: 1600 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        target.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
      }}
      onPointerLeave={() => { target.current = { x: 0, y: 0 }; }}
    >
      <div ref={body} className="relative scale-[0.85] sm:scale-100" style={{ width: W, height: H, transformStyle: 'preserve-3d' }}>
        {/* edges */}
        <div className={face} style={{ width: D, height: H - 40, margin: `${-(H - 40) / 2}px 0 0 ${-D / 2}px`, background: '#2A2E44', transform: `rotateY(-90deg) translateZ(${W / 2 - 2}px)` }} />
        <div className={face} style={{ width: D, height: H - 40, margin: `${-(H - 40) / 2}px 0 0 ${-D / 2}px`, background: '#2A2E44', transform: `rotateY(90deg) translateZ(${W / 2 - 2}px)` }} />
        <div className={face} style={{ width: W - 40, height: D, margin: `${-D / 2}px 0 0 ${-(W - 40) / 2}px`, background: '#33384F', transform: `rotateX(90deg) translateZ(${H / 2 - 2}px)` }} />
        <div className={face} style={{ width: W - 40, height: D, margin: `${-D / 2}px 0 0 ${-(W - 40) / 2}px`, background: '#1E2130', transform: `rotateX(-90deg) translateZ(${H / 2 - 2}px)` }} />
        {/* back */}
        <div className="absolute inset-0 rounded-[44px] border border-line2 bg-[#141726]" style={{ transform: `rotateY(180deg) translateZ(${D / 2}px)` }}>
          <div className="absolute left-6 top-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#0D0F16] p-2.5">
            <span className="h-7 w-7 rounded-full border border-line2 bg-bg" /><span className="h-7 w-7 rounded-full border border-line2 bg-bg" />
            <span className="h-7 w-7 rounded-full border border-line2 bg-bg" /><span className="h-3 w-3 self-center justify-self-center rounded-full bg-[#2A2E44]" />
          </div>
        </div>
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[44px] border-[10px] border-[#1A1D2B] bg-[#F1F2F7] text-bg shadow-[0_40px_80px_-30px_rgba(140,151,255,.45)]"
          style={{ transform: `translateZ(${D / 2}px)` }}
        >
          <div className="mx-auto mt-2 h-6 w-24 rounded-full bg-[#07080C]" />
          <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] text-[#4A4E63]">
            <span>PocketMind</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#1E9E72]" />airplane mode</span>
          </div>
          <div className="flex h-[calc(100%-110px)] flex-col gap-3 px-4 pt-5" aria-live="off">
            <span key={`q${turn}`} className="bubble-in max-w-[80%] self-end rounded-[16px_16px_4px_16px] bg-[#07080C] px-3.5 py-2 text-[13px] text-ink">{s.q}</span>
            <span className="max-w-[88%] self-start rounded-[16px_16px_16px_4px] bg-[#D4D7F5] px-3.5 py-2 text-[13px] leading-snug">
              {words.slice(0, shown).join(' ')}
              {shown < words.length && <span className="caret ml-0.5 text-[#3A3F8F]">▍</span>}
            </span>
            <span className="mt-auto self-start font-mono text-[10px] text-[#4A4E63]">
              {shown < words.length ? 'generating on-device…' : `${words.length} tokens · 0 network calls`}
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-5 rounded-full border border-[#C9CCDA] bg-white px-4 py-2.5 text-[12px] text-[#8C91A8]">Ask your documents…</div>
          {/* glare */}
          <div aria-hidden="true" className="glare pointer-events-none absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
