import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Pipeline from '@/components/Pipeline';
import StatusBadge from '@/components/StatusBadge';
import SmartLink from '@/components/SmartLink';
import { caseStudy as cs, featured, isTodo } from '@/lib/content';

export const metadata: Metadata = {
  title: 'on_device_rag — case study',
  description: 'Designing reusable, on-device retrieval infrastructure for Dart and Flutter.',
  alternates: { canonical: '/work/on-device-rag/' },
};

const SECTIONS = [
  ['problem', 'Problem'],
  ['constraints', 'Constraints'],
  ['implementation', 'Implementation'],
  ['tradeoffs', 'Trade-offs'],
  ['reliability', 'Reliability'],
  ['evaluation', 'Evaluation'],
  ['next', 'Results & next'],
] as const;

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`h-${id}`} className="reveal flex scroll-mt-8 flex-col gap-4">
      <span className="font-mono text-sm text-accent">{String(n).padStart(2, '0')}</span>
      <h2 id={`h-${id}`} className="m-0 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-[40px]">{title}</h2>
      {children}
    </section>
  );
}

const Pending = ({ text }: { text: string }) =>
  isTodo(text) ? <p className="m-0 rounded-xl border border-dashed border-[#3A3F57] p-4 text-sm text-faint">Write-up coming soon.</p> : <p className="m-0 text-soft">{text}</p>;

export default function CaseStudy() {
  return (
    <>
      <div aria-hidden="true" className="sticky top-0 z-20 h-[3px] bg-[#11131C]">
        <div className="progress h-[3px] bg-accent" />
      </div>
      <Nav back />
      <main id="main" className="text-[17px] leading-[1.65] sm:text-lg">
        {/* ---------- Hero ---------- */}
        <section aria-labelledby="cs-h" className="relative mx-auto max-w-page px-5 pb-10 pt-14 sm:px-8 sm:pt-[72px]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-5 hidden h-[520px] w-[520px] md:block" style={{ perspective: 1000 }}>
            <div className="orbit relative h-full w-full rounded-full border border-dashed border-line2" style={{ transform: 'rotateX(70deg)' }}>
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-accent" />
              <span className="absolute -bottom-1 left-[30%] h-2 w-2 rounded-full bg-cyan" />
              <span className="absolute -right-1 top-[40%] h-2 w-2 rounded-full bg-dim" />
            </div>
          </div>
          <div className="relative flex max-w-[900px] flex-col gap-6">
            <div className="word flex items-center gap-2.5" style={{ animationDelay: '.05s' }}>
              <StatusBadge status={featured.status} />
              <span className="font-mono text-xs text-faint">Case study · 6 min read</span>
            </div>
            <h1 id="cs-h" className="m-0 break-words font-mono text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-8xl">
              <span className="word" style={{ animationDelay: '.12s' }}>on_device</span>
              <span className="word text-accent" style={{ animationDelay: '.24s' }}>_rag</span>
            </h1>
            <p className="word m-0 text-xl leading-snug text-soft sm:text-[28px]" style={{ animationDelay: '.4s' }}>
              Reusable retrieval infrastructure for Dart and Flutter — so private documents get searched and answered on the device.
            </p>
          </div>
          <dl className="word relative m-0 mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" style={{ animationDelay: '.55s' }}>
            {[
              ['Role', 'Sole author & maintainer'],
              ['Stack', 'Pure Dart · Flutter'],
              ['Timeline', isTodo(cs.timeline) ? '—' : cs.timeline],
            ].map(([k, v]) => (
              <div key={k} className="lift rounded-[18px] border border-line bg-surface p-5">
                <dt className="font-mono text-[11px] text-faint">{k}</dt>
                <dd className="m-0 text-[17px] font-medium">{v}</dd>
              </div>
            ))}
            <div className="lift rounded-[18px] border border-line bg-surface p-5">
              <dt className="font-mono text-[11px] text-faint">Links</dt>
              <dd className="m-0 flex gap-4 text-[17px] font-medium">
                {featured.links.map((l) => <SmartLink key={l.href} href={l.href} className="hover:text-[#B7BEFF]">{l.label}</SmartLink>)}
              </dd>
            </div>
          </dl>
        </section>

        {/* ---------- Pipeline ---------- */}
        <section aria-labelledby="h-arch" className="mx-auto max-w-page px-5 pt-20 sm:px-8 sm:pt-24">
          <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-5">
            <h2 id="h-arch" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[56px]">
              How a question<br /><span className="text-dim">travels.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-base text-muted">Two paths share one store. Each step lights up as data moves through it.</p>
          </div>
          <Pipeline />
        </section>

        {/* ---------- Write-up ---------- */}
        <div className="mx-auto flex max-w-page flex-wrap items-start gap-16 px-5 py-24 sm:px-8 sm:py-32">
          <nav aria-label="On this page" className="hidden max-w-[240px] flex-[1_1_200px] flex-col gap-1 font-mono text-sm lg:sticky lg:top-10 lg:flex">
            <span className="mb-2.5 text-[11px] text-[#6B7088]">On this page</span>
            {SECTIONS.map(([id, label], i) => (
              <a key={id} href={`#${id}`} className="border-l-2 border-line py-2 pl-3.5 text-muted no-underline hover:border-accent hover:text-ink">
                {String(i + 1).padStart(2, '0')} {label}
              </a>
            ))}
          </nav>

          <article className="flex min-w-0 max-w-[800px] flex-[999_1_560px] flex-col gap-20">
            <Section id="problem" n={1} title="RAG shouldn’t need a server.">
              <p className="m-0 text-soft">{cs.problem}</p>
            </Section>

            <Section id="constraints" n={2} title="Four hard limits.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cs.constraints.map((c) => (
                  <div key={c.title} className="lift rounded-[20px] border border-line bg-surface p-6">
                    <h3 className="m-0 text-xl font-semibold">{c.title}</h3>
                    <p className="m-0 text-[15px] text-muted">{c.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="implementation" n={3} title="What I built.">
              <Pending text={cs.implementation} />
              <div className="overflow-hidden rounded-[18px] border border-line bg-surface" style={{ transform: 'perspective(1200px) rotateX(4deg)' }}>
                <div className="flex items-center gap-2 border-b border-line px-4 py-3.5 font-mono text-xs text-faint">
                  <span className="h-2.5 w-2.5 rounded-full bg-line2" /><span className="h-2.5 w-2.5 rounded-full bg-line2" /><span className="h-2.5 w-2.5 rounded-full bg-line2" />
                  <span className="ml-2.5">example.dart</span>
                </div>
                <pre className="m-0 overflow-x-auto px-5 py-6 font-mono text-[15px] leading-[1.7] text-faint"><code>{cs.snippet}</code></pre>
              </div>
            </Section>

            <Section id="tradeoffs" n={4} title="What I gave up, on purpose.">
              <div className="flex flex-col gap-3">
                {cs.tradeoffs.map((t) => (
                  <div key={t.title} className="lift grid grid-cols-1 gap-2 rounded-[18px] border border-line bg-surface px-6 py-5 sm:grid-cols-[240px_1fr] sm:gap-6">
                    <h3 className="m-0 text-lg font-semibold">{t.title}</h3>
                    <p className="m-0 text-base text-muted">{t.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="reliability" n={5} title="When things go wrong.">
              <Pending text={cs.reliability} />
            </Section>

            <Section id="evaluation" n={6} title="Measured, not demoed.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {cs.metrics.map((m) => (
                  <div key={m.label} className={`rounded-[18px] p-5 ${m.value ? 'border border-line bg-surface' : 'border border-dashed border-[#3A3F57]'}`}>
                    <div className="font-mono text-[11px] text-faint">{m.label}</div>
                    <div className="text-4xl font-semibold tracking-[-0.03em]">{m.value ?? '—'}</div>
                  </div>
                ))}
              </div>
              <p className="m-0 text-sm text-[#6B7088]">Empty boxes stay empty until measured. Each number names its device and dataset.</p>
            </Section>

            <Section id="next" n={7} title="Shipped. What’s next.">
              <p className="m-0 text-soft">{cs.next}</p>
            </Section>

            <Link href="/#lab" className="reveal lift flex items-center justify-between rounded-3xl border border-line bg-surface p-8 no-underline">
              <span>
                <span className="block font-mono text-xs text-faint">Next</span>
                <span className="block text-3xl font-semibold tracking-[-0.03em]">See the rest of the lab</span>
              </span>
              <span aria-hidden="true" className="text-4xl text-accent">→</span>
            </Link>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
