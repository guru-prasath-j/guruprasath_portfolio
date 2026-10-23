import Link from 'next/link';
import { hire, site } from '@/lib/content';
import { asset } from '@/lib/path';

const facts = [
  ['Roles', hire.roles],
  ['Experience', hire.experience],
  ['Location', hire.location],
  ['Proof', hire.proof],
] as const;

/** Everything a recruiter needs in one card, right under the hero. No hover or click needed. */
export default function HireCard() {
  return (
    <section aria-labelledby="hire-h" className="relative z-10 mx-auto max-w-page px-5 pb-12 sm:px-8 sm:pb-14">
      <div className="overflow-hidden rounded-3xl border border-line2 bg-surface shadow-[0_30px_80px_-50px_rgba(140,151,255,.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 id="hire-h" className="m-0 flex items-center gap-2.5 text-lg font-semibold">
            <span className="pulse h-2 w-2 rounded-full bg-live" />Hiring? The one-minute version
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <a href={asset(site.resume)} className="inline-flex min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-bold text-bg no-underline">Download resume</a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center rounded-xl border border-line2 px-4 text-sm font-semibold no-underline hover:border-accent">Email me</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-xl border border-line2 px-4 text-sm font-semibold no-underline hover:border-accent">LinkedIn</a>
            <Link href="/recruiter/" className="inline-flex min-h-11 items-center rounded-xl border border-line2 px-4 text-sm font-semibold no-underline hover:border-accent">Quick view →</Link>
          </div>
        </div>
        <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([k, v], i) => (
            <div key={k} className={`flex flex-col gap-1.5 px-5 py-4 ${i ? 'border-t border-line sm:border-l lg:border-t-0' : ''} ${i === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}>
              <dt className="font-mono text-[11px] uppercase tracking-[.08em] text-faint">{k}</dt>
              <dd className="m-0 text-base font-medium leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
