import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import EmbeddingCloud from '@/components/EmbeddingCloud';
import ExplodedStack from '@/components/ExplodedStack';
import TiltCard from '@/components/TiltCard';
import StatusBadge from '@/components/StatusBadge';
import SmartLink from '@/components/SmartLink';
import { featured, isTodo, journey, lab, numbers, site, stack } from '@/lib/content';
import { asset } from '@/lib/path';

const HEADLINE = [['I', 'put', 'AI'], ['inside', 'the'], ['phone', 'in', 'your', 'hand.']];

const btnPrimary = 'rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg no-underline transition-transform hover:-translate-y-0.5';
const btnGhost = 'rounded-xl border border-line2 px-6 py-3.5 font-medium no-underline transition-colors hover:border-accent';

export default function Home() {
  let d = 0;
  return (
    <>
      <Nav />
      <main id="main">
        {/* ---------- Hero ---------- */}
        <section aria-labelledby="hero-h" className="mx-auto flex max-w-page flex-wrap items-center gap-6 px-5 pb-10 pt-6 sm:px-8 lg:min-h-[760px]">
          <div className="relative z-10 flex min-w-0 flex-[1_1_520px] flex-col gap-7">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
              <span className="pulse h-2 w-2 rounded-full bg-live" />
              {site.availability} · {site.location}
            </p>
            <h1 id="hero-h" className="m-0 text-[46px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[80px]">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.map((w) => (
                    <span key={w} className={`word ${w === 'AI' ? 'text-accent' : ''}`} style={{ animationDelay: `${(d += 0.07)}s` }}>
                      {w}&nbsp;
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="word m-0 max-w-[520px] text-lg leading-relaxed text-muted sm:text-[19px]" style={{ animationDelay: '.75s' }}>
              {site.name} — {site.description.charAt(0).toLowerCase() + site.description.slice(1)}
            </p>
            <div className="word flex flex-wrap gap-3" style={{ animationDelay: '.9s' }}>
              <a href="#work" className={btnPrimary}>See the work ↓</a>
              <a href={asset(site.resume)} className={btnGhost}>Resume</a>
              <a href={site.github} className={btnGhost} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="h-[360px] min-w-0 flex-[1_1_520px] sm:h-[620px]">
            <EmbeddingCloud />
          </div>
        </section>

        <Marquee items={stack} />

        {/* ---------- Featured ---------- */}
        <section id="work" aria-labelledby="work-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <h2 id="work-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Featured<br /><span className="text-dim">build.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">Pull the stack apart to see the layers I built, from the Flutter screen down to the vector store.</p>
          </div>

          <article aria-labelledby="p1" className="reveal flex flex-wrap items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface p-6 sm:p-12">
            <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <StatusBadge status={featured.status} />
                <span className="font-mono text-xs text-faint">{featured.registry}</span>
              </div>
              <h3 id="p1" className="m-0 font-mono text-3xl font-medium tracking-[-0.03em] sm:text-[40px]">{featured.name}</h3>
              <p className="m-0 text-xl font-medium leading-snug sm:text-[22px]">{featured.line}</p>
              <p className="m-0 text-muted">{featured.meta}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link href="/work/on-device-rag/" className={btnPrimary}>Read the case study →</Link>
                {featured.links.map((l) => (
                  <SmartLink key={l.href} href={l.href} className={btnGhost}>{l.label}</SmartLink>
                ))}
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_420px]">
              <ExplodedStack />
            </div>
          </article>
        </section>

        {/* ---------- Lab ---------- */}
        <section id="lab" aria-labelledby="lab-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <h2 id="lab-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              The lab<span className="text-accent">.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">Packages, tools and experiments. Move your cursor over a card.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lab.map((p, i) => (
              <TiltCard key={p.slug} className="reveal flex min-h-[300px] flex-col gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="font-mono text-6xl font-medium leading-none text-[#1E2232]">{String(i + 1).padStart(2, '0')}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="m-0 break-words font-mono text-xl font-medium sm:text-[22px]">{p.name}</h3>
                <p className="m-0 text-lg font-medium leading-snug">{p.line}</p>
                <p className="m-0 text-[15px] text-muted">{p.meta}</p>
                <div className="mt-auto flex gap-5">
                  {p.links.map((l) => (
                    <SmartLink key={l.label} href={l.href} className="font-semibold text-accent no-underline hover:underline">{l.label} →</SmartLink>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ---------- Numbers ---------- */}
        <section aria-label="Results" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label} className="border-t border-line2 pt-6">
                <div className="text-6xl font-semibold leading-none tracking-[-0.05em] sm:text-[72px]">
                  {n.value}<span className="text-accent">{n.unit}</span>
                </div>
                <p className="m-0 mt-2.5 text-muted">{n.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Journey ---------- */}
        <section id="journey" aria-labelledby="j-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <h2 id="j-h" className="reveal m-0 mb-12 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
            Journey<span className="text-accent">.</span>
          </h2>
          <ol className="m-0 flex list-none flex-col gap-12 border-l border-line2 py-0 pl-8 pr-0">
            {journey.map((r) => (
              <li key={r.title} className="reveal relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[39px] top-2 h-[13px] w-[13px] rounded-full ${r.current ? 'bg-accent shadow-[0_0_0_6px_#161A33]' : 'bg-dim'}`}
                />
                <p className="m-0 font-mono text-[13px] text-faint">{r.when} · {r.where}</p>
                <h3 className="my-1.5 text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{r.title}</h3>
                {r.body && !isTodo(r.body) && <p className="m-0 max-w-[720px] text-muted">{r.body}</p>}
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" aria-labelledby="c-h" className="mx-auto max-w-page px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="reveal flex flex-col gap-9">
            <p className="m-0 font-mono text-[13px] text-faint">Got an AI-mobile product in mind?</p>
            <h2 id="c-h" className="m-0 text-[54px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[120px]">
              Let’s build<br /><span className="text-accent">something smart.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3.5">
              <a href={`mailto:${site.email}`} className="rounded-2xl bg-ink px-7 py-4 text-lg font-semibold text-bg no-underline">{site.email}</a>
              <a href={site.linkedin} className={btnGhost} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.github} className={btnGhost} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={asset(site.resume)} className={btnGhost}>Resume</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
