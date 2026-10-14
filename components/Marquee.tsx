export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <section aria-label="Technologies" className="overflow-hidden border-y border-[#161927] bg-band">
      <div className="marquee flex w-max gap-8 whitespace-nowrap py-4 text-xl font-medium tracking-tight text-dim sm:gap-14 sm:py-6 sm:text-[28px]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-14" aria-hidden={i >= items.length}>
            <span>{t}</span><span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
