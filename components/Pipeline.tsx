const INDEX = ['Document', 'Chunker', 'Embedder ⟨i⟩', 'Vector store'];
const QUERY = ['Question', 'Embed', 'Top-k', 'Context'];

function Row({ title, steps, offset, packet, last }: { title: string; steps: string[]; offset: number; packet: string; last?: string }) {
  const cols = steps.length + (last ? 1 : 0);
  return (
    <div className="flex flex-col gap-3" style={{ transformStyle: 'preserve-3d' }}>
      <span className="font-mono text-xs text-faint">{title}</span>
      <div className="relative grid gap-3 sm:gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, transformStyle: 'preserve-3d' }}>
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[#262B45]">
          <span className="packet absolute -top-1 h-2 w-2 rounded-full" style={{ background: packet, animationDelay: `${offset / 2}s` }} />
        </div>
        {steps.map((s, i) => (
          <div key={s} className="step relative rounded-xl border border-[#262B45] bg-[#121526] px-2 py-4 text-xs font-medium sm:px-4 sm:py-5 sm:text-base" style={{ animationDelay: `${offset + i * 0.55}s` }}>{s}</div>
        ))}
        {last && <div className="relative rounded-xl bg-ink px-2 py-4 text-xs font-semibold text-bg sm:px-4 sm:py-5 sm:text-base" style={{ transform: 'translateZ(40px)' }}>{last}</div>}
      </div>
    </div>
  );
}

export default function Pipeline() {
  return (
    <figure
      role="img"
      aria-label="Indexing path: document, chunker, embedder, vector store. Query path: question, embed, top-k search, context, generate."
      className="reveal m-0 flex h-[420px] items-center justify-center overflow-hidden rounded-[28px] border border-[#161927] bg-band sm:h-[560px]"
      style={{ perspective: 1600 }}
    >
      <div className="plane flex w-[92%] max-w-[960px] flex-col gap-10 sm:gap-16">
        <Row title="indexing · on add" steps={INDEX} offset={0} packet="#5CE1E6" />
        <Row title="query · per question" steps={QUERY} offset={2.4} packet="#8C97FF" last="Generate" />
      </div>
    </figure>
  );
}
