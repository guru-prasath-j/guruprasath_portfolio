'use client';

import { useEffect, useState } from 'react';

type Id = 'image' | 'contrast' | 'tap';

const FINDINGS: { id: Id; severity: 'critical' | 'high'; wcag: string; what: string; fix: string }[] = [
  { id: 'image', severity: 'high', wcag: '1.1.1', what: 'Image without description', fix: 'Add semanticLabel: "Wireless earbuds"' },
  { id: 'contrast', severity: 'high', wcag: '1.4.3', what: 'Low text contrast · 1.9:1', fix: 'Darken the text to reach 4.5:1' },
  { id: 'tap', severity: 'critical', wcag: '2.5.5', what: 'Small tap target · 26×26', fix: 'Grow the button to at least 48×48' },
];

const SEV = { critical: '#E5484D', high: '#F5A524' };

// 0 scanning · 1–3 one finding each · 4 summary
const STEPS = FINDINGS.length + 2;

/** Phone screen: a checkout page being scanned by flutter_accessibility_scanner's in-app overlay. Illustrative. */
export default function ScannerScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(STEPS - 1); return; }
    const id = window.setTimeout(() => setStep((s) => (s + 1) % STEPS), step === STEPS - 1 ? 3600 : step === 0 ? 1600 : 2200);
    return () => window.clearTimeout(id);
  }, [step]);

  const found = FINDINGS.slice(0, Math.max(0, Math.min(step, FINDINGS.length)));
  const current = step >= 1 && step <= FINDINGS.length ? FINDINGS[step - 1] : null;
  const done = step === STEPS - 1;

  const ring = (id: Id) => {
    const f = found.find((x) => x.id === id);
    if (!f) return {};
    const on = current?.id === id;
    return { outline: `${on ? 3 : 2}px solid ${SEV[f.severity]}`, outlineOffset: 3, boxShadow: on ? `0 0 0 8px ${SEV[f.severity]}33` : 'none' };
  };

  return (
    <div className="relative h-[calc(100%-32px)]" aria-hidden="true">
      <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] text-[#4A4E63]">
        <span>Checkout</span>
        <span>debug build</span>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3">
          <span className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-[#8C97FF] to-[#5CE1E6] transition-all duration-300" style={ring('image')} />
          <span className="flex flex-col">
            <span className="text-[14px] font-semibold">Wireless earbuds</span>
            <span className="text-[12px] text-[#4A4E63]">Midnight · 1 pair</span>
          </span>
        </div>

        <span className="self-start rounded px-0.5 text-[13px] text-[#C4C6CF] transition-all duration-300" style={ring('contrast')}>Free delivery by Friday</span>

        <div className="flex items-center justify-between rounded-2xl bg-white p-3">
          <span className="text-[13px]">Quantity</span>
          <span className="flex items-center gap-3">
            <span className="text-[14px] font-semibold">1</span>
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#E4E6F0] text-[14px] transition-all duration-300" style={ring('tap')}>+</span>
          </span>
        </div>

        <span
          className="mt-1 rounded-2xl bg-[#07080C] py-3.5 text-center text-[14px] font-semibold text-ink transition-all duration-300"
          style={done ? { outline: '2px solid #1E9E72', outlineOffset: 3 } : {}}
        >
          Pay ₹2,499
        </span>
      </div>

      {step === 0 && <span className="scanline pointer-events-none absolute inset-x-0 top-8 h-12 bg-gradient-to-b from-transparent to-[#8C97FF55]" />}

      {/* finding sheet */}
      <div className="absolute inset-x-3 bottom-4 min-h-[112px] rounded-2xl bg-[#07080C] p-3.5 text-ink shadow-[0_-10px_30px_-10px_rgba(0,0,0,.4)]">
        {step === 0 && (
          <div className="flex h-full flex-col gap-1.5">
            <span className="font-mono text-[10px] text-faint">flutter_accessibility_scanner</span>
            <span className="text-[13px] font-semibold">Scanning the render tree…</span>
            <span className="text-[11px] text-muted">semantics · images · contrast · tap targets · focus</span>
          </div>
        )}
        {current && (
          <div key={current.id} className="bubble-in flex flex-col gap-1.5">
            <span className="flex items-center justify-between font-mono text-[10px]">
              <span style={{ color: SEV[current.severity] }}>● {current.severity}</span>
              <span className="text-faint">WCAG {current.wcag} · {step}/{FINDINGS.length}</span>
            </span>
            <span className="text-[13px] font-semibold">{current.what}</span>
            <span className="text-[11px] text-muted">Fix: {current.fix}</span>
          </div>
        )}
        {done && (
          <div className="bubble-in flex flex-col gap-1.5">
            <span className="font-mono text-[10px] text-faint">report.summary</span>
            <span className="text-[13px] font-semibold">3 issues · 1 critical, 2 high</span>
            <span className="text-[11px] text-[#5CE1B9]">✓ Pay button passes every check</span>
          </div>
        )}
      </div>
    </div>
  );
}
