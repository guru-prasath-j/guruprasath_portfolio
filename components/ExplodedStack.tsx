'use client';

import { useState } from 'react';

const LAYERS = [
  { label: '04 · vector store', cls: 'bg-[#151829] border-[#2E3352] text-faint' },
  { label: '03 · retrieval · top-k', cls: 'bg-[#1A1F3D] border-[#3B4377] text-[#B7BEFF]' },
  { label: '02 · context + model', cls: 'bg-[#232A5E] border-accent text-ink' },
];

/** The featured project pulled apart into its layers. Hover (desktop) or the button (touch) explodes it. */
export default function ExplodedStack() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const spread = open || hover ? 150 : 60;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        role="img"
        aria-label="Exploded view of four layers: Flutter UI, context and model, retrieval, and vector store."
        className="flex h-[420px] w-full items-center justify-center sm:h-[520px]"
        style={{ perspective: 1400 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="stack relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
          {LAYERS.map((l, i) => (
            <div
              key={l.label}
              className={`layer absolute inset-0 flex items-end rounded-[22px] border p-4 font-mono text-[11px] sm:text-[13px] ${l.cls}`}
              style={{ transform: `translateZ(${i * spread}px)` }}
            >
              {l.label}
            </div>
          ))}
          <div
            className="layer absolute inset-0 flex flex-col gap-2 rounded-[22px] bg-ink p-4 text-bg sm:p-5"
            style={{ transform: `translateZ(${3 * spread}px)` }}
          >
            <span className="font-mono text-[11px] text-[#4A4E63]">01 · Flutter UI</span>
            <span className="self-end rounded-[14px_14px_4px_14px] bg-bg px-3 py-1.5 text-xs text-ink sm:text-[13px]">What does clause 4 say?</span>
            <span className="max-w-[85%] self-start rounded-[14px_14px_14px_4px] bg-[#D4D7F5] px-3 py-1.5 text-xs sm:text-[13px]">
              Termination needs 30 days’ notice. <span className="font-mono text-[11px] text-[#3A3F8F]">[p.4]</span>
            </span>
            <span className="mt-auto flex items-center gap-1.5 font-mono text-[11px] text-[#4A4E63]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#1E9E72]" />offline · on-device
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-pressed={open}
        onClick={() => setOpen((v) => !v)}
        className="min-h-11 rounded-xl border border-line2 px-5 text-sm transition-colors hover:border-accent"
      >
        {open ? 'Collapse the layers' : 'Explode the layers'}
      </button>
    </div>
  );
}
