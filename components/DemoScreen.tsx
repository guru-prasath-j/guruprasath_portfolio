import type { Item, Scene, Tone } from '@/lib/demos';

const tone: Record<Tone, string> = {
  ok: 'bg-[rgba(30,158,114,.12)] text-[#136A4D] border-[#1E9E72]',
  warn: 'bg-[rgba(255,157,108,.16)] text-[#9A4A1F] border-[#E07A45]',
  info: 'bg-[rgba(91,96,190,.10)] text-[#3A3F8F] border-accent',
};

/** A tiny, deterministic QR-like pattern: decorative only. */
function Qr() {
  let s = 5;
  const cells = Array.from({ length: 81 }, (_, i) => {
    const r = Math.floor(i / 9), c = i % 9;
    const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
    s = (s * 16807) % 2147483647;
    return finder ? !(r % 6 === 1 && c % 6 === 1) : s % 3 === 0;
  });
  return (
    <span aria-hidden="true" className="mx-auto mt-1.5 grid h-[126px] w-[126px] grid-cols-9 gap-0.5">
      {cells.map((on, i) => <span key={i} className={`rounded-[1px] ${on ? 'bg-bg' : 'bg-white'}`} />)}
    </span>
  );
}

function Piece({ it }: { it: Item }) {
  switch (it.kind) {
    case 'bar':
      return <div className="px-0.5 pb-1.5"><div className="text-[17px] font-bold">{it.title}</div>{it.sub && <div className="text-[11px] opacity-70">{it.sub}</div>}</div>;
    case 'user':
      return <div className="max-w-[82%] self-end rounded-[16px_16px_4px_16px] bg-bg px-3 py-2 text-[13px] text-ink">{it.text}</div>;
    case 'ai':
      return (
        <div className="flex max-w-[88%] flex-col gap-1 self-start rounded-[16px_16px_16px_4px] bg-[#D4D7F5] px-3 py-2 text-[13px] leading-snug">
          <span>{it.text}</span>{it.source && <span className="font-mono text-[10px] text-[#3A3F8F]">{it.source}</span>}
        </div>
      );
    case 'row':
      return (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-[#E1E3EC] bg-white px-3 py-2.5 text-[13px]">
          <span className="min-w-0"><span className="block font-medium">{it.title}</span>{it.sub && <span className="block text-[11px] opacity-70">{it.sub}</span>}</span>
          {it.right && <span className="shrink-0 text-xs font-semibold">{it.right}</span>}
        </div>
      );
    case 'chip':
      return <div className={`self-start rounded-full border px-3 py-1 font-mono text-[10.5px] ${tone[it.tone ?? 'info']}`}>{it.text}</div>;
    case 'toast':
      return <div className="self-center rounded-full bg-bg px-4 py-2 text-xs text-ink">{it.text}</div>;
    case 'code':
      return <pre className="m-0 whitespace-pre-wrap rounded-xl bg-surface px-3 py-2.5 font-mono text-[10.5px] text-[#B7BEFF]">{it.text}</pre>;
    case 'btn':
      return <div className="rounded-[14px] bg-accent px-3.5 py-2.5 text-center text-[13px] font-bold text-bg">{it.text}</div>;
    case 'banner':
      return <div className="rounded-[10px] bg-bg px-3 py-2 font-mono text-[11px] text-ink">{it.text}</div>;
    case 'tabs':
      return <div className="rounded-xl border border-[#E1E3EC] bg-white px-3 py-2.5 text-center font-mono text-[11px]">{it.text}</div>;
    case 'card':
      return <div className="flex flex-col items-center gap-1.5 rounded-[18px] border border-[#E1E3EC] bg-white px-4 py-6 text-center"><span className="text-base font-bold">{it.title}</span>{it.sub && <span className="text-[11px] opacity-70">{it.sub}</span>}</div>;
    case 'hinge':
      return <div aria-hidden="true" className="rounded-sm bg-[#1A1D2B] py-0.5 text-center font-mono text-[9px] text-faint">hinge</div>;
    case 'split':
      return (
        <div className="flex gap-2.5 rounded-xl border border-[#E1E3EC] bg-white p-3 text-xs">
          <div className="flex flex-1 flex-col gap-1 border-r-2 border-[#1A1D2B] pr-2.5">
            {it.left.map((l, i) => <span key={l} className={i === 0 ? 'font-bold' : ''}>{l}</span>)}
          </div>
          <div className="flex flex-[1.4] flex-col gap-1">
            {it.right.map((r, i) => <span key={r} className={i === 0 ? 'font-bold' : ''}>{r}</span>)}
          </div>
        </div>
      );
    case 'qr':
      return <div className="flex flex-col items-center rounded-[18px] border border-[#E1E3EC] bg-white p-4 text-sm font-bold">{it.caption}<Qr /></div>;
  }
}

/** One scene on the phone screen. `shown` items are visible; the rest wait just below. */
export default function DemoScreen({ scene, shown, offline }: { scene: Scene; shown: number; offline: boolean }) {
  return (
    <div className={`flex h-[calc(100%-32px)] flex-col transition-colors duration-500 ${offline ? 'bg-[#E9EAF0]' : 'bg-[#F1F2F7]'}`}>
      <div className="flex justify-between px-5 pt-2 font-mono text-[10px] text-[#4A4E63]">
        <span>9:41</span>
        <span className="flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${offline ? 'bg-[#E07A45]' : 'bg-[#1E9E72]'}`} />{offline ? 'offline' : 'online'}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3.5 pt-3.5 text-bg">
        {scene.items.map((it, i) => (
          <div
            key={`${scene.caption}-${i}`}
            className="demo-item flex flex-col"
            style={{ opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateY(10px)' }}
          >
            <Piece it={it} />
          </div>
        ))}
      </div>
    </div>
  );
}
