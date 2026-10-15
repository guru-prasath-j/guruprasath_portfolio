/** A document that splits into overlapping chunks, which lift into 3D and fly into the index. CSS only. */
export default function ChunkSplit() {
  const chunks = Array.from({ length: 6 });
  return (
    <figure
      role="img"
      aria-label="A document splits into six overlapping chunks that lift away and move into the vector index."
      className="reveal relative m-0 flex h-[420px] items-center justify-center overflow-hidden rounded-[28px] border border-[#161927] bg-band"
      style={{ perspective: 1400 }}
    >
      <div className="relative h-[300px] w-[240px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(28deg) rotateY(-24deg)' }}>
        {chunks.map((_, i) => (
          <div
            key={i}
            className="chunk absolute inset-x-0 rounded-lg border border-[#3B4377] bg-[#151829] px-3 py-2"
            style={{ top: i * 48, height: 56, animationDelay: `${i * 0.18}s`, ['--dx' as string]: `${(i % 2 ? 1 : -1) * (80 + i * 14)}px`, ['--dz' as string]: `${60 + i * 30}px` }}
          >
            <div className="mb-1.5 h-1.5 w-4/5 rounded bg-[#2E3352]" />
            <div className="h-1.5 w-3/5 rounded bg-[#2E3352]" />
            <span className="absolute right-2 top-1.5 font-mono text-[10px] text-accent">#{i + 1}</span>
          </div>
        ))}
      </div>
      <figcaption className="absolute bottom-4 left-5 font-mono text-xs text-faint">chunk → overlap → embed</figcaption>
    </figure>
  );
}
