import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import ParticleSculpture from '@/components/ParticleSculpture';
import LitHeadline from '@/components/LitHeadline';
import ExplodedStack from '@/components/ExplodedStack';
import TiltCard from '@/components/TiltCard';
import StatusBadge from '@/components/StatusBadge';
import SmartLink from '@/components/SmartLink';
import Phone3D from '@/components/Phone3D';
import SkillCube from '@/components/SkillCube';
import CountUp from '@/components/CountUp';
import Magnetic from '@/components/Magnetic';
import { featured, isTodo, journey, lab, numbers, site, stack } from '@/lib/content';
import { asset } from '@/lib/path';

const btnPrimary = 'rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg no-underline transition-transform hover:-translate-y-0.5';
const btnGhost = 'rounded-xl border border-line2 px-6 py-3.5 font-medium no-underline transition-colors hover:border-accent';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* ---------- Hero ---------- */}
        <div className="relative overflow-hidden">
        <div aria-hidden="true" className="floor" />
        <section aria-labelledby="hero-h" className="relative mx-auto flex max-w-page flex-wrap items-center gap-6 px-5 pb-10 pt-6 sm:px-8 lg:min-h-[760px]">
          <div className="relative z-10 flex min-w-0 flex-[1_1_520px] flex-col gap-7">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
              <span className="pulse h-2 w-2 rounded-full bg-live" />
              {site.availability} · {site.location}
            </p>
            <LitHeadline id="hero-h" />
            <p className="word m-0 max-w-[520px] text-lg leading-relaxed text-muted sm:text-[19px]" style={{ animationDelay: '.75s' }}>
              {site.name} — {site.description.charAt(0).toLowerCase() + site.description.slice(1)}
            </p>
            <div className="word flex flex-wrap gap-3" style={{ animationDelay: '.9s' }}>
              <Magnetic><a href="#work" className={`inline-block ${btnPrimary}`}>See the work ↓</a></Magnetic>
              <a href={asset(site.resume)} className={btnGhost}>Resume</a>
              <a href={site.github} className={btnGhost} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="h-[460px] min-w-0 flex-[1_1_520px] sm:h-[620px]">
            <ParticleSculpture />
          </div>
        </section>
        </div>

        <Marquee items={stack} />

        {/* ---------- Featured ---------- */}
        <section id="work" aria-labelledby="work-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <h2 id="work-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Featured<br /><span className="text-dim">build.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">The stack breathes on its own. Hover it and it pulls fully apart — watch the top-5 matches rise from the vector store to the screen.</p>
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
                <Magnetic><Link href="/work/on-device-rag/" className={`inline-block ${btnPrimary}`}>Read the case study →</Link></Magnetic>
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

        {/* ---------- On the phone ---------- */}
        <section aria-labelledby="phone-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="flex flex-wrap items-center gap-10">
            <div className="reveal flex min-w-0 flex-[1_1_380px] flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <StatusBadge status="Prototype" />
                <span className="font-mono text-xs text-faint">PocketMind</span>
              </div>
              <h2 id="phone-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
                Answers in<br /><span className="text-dim">airplane mode.</span>
              </h2>
              <p className="m-0 max-w-[460px] text-muted">
                A quantized model and an on-device index, so questions about private documents never touch a server. Move your cursor to turn the phone.
              </p>
              <p className="m-0 font-mono text-xs text-faint">Illustrative replay of the prototype’s chat flow.</p>
            </div>
            <div className="min-w-0 flex-[1_1_420px]">
              <Phone3D />
            </div>
          </div>
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
              <div key={p.slug} className="reveal-3d flex">
              <TiltCard className="flex min-h-[300px] flex-1 flex-col gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="font-mono text-6xl font-medium leading-none text-[#1E2232]">{String(i + 1).padStart(2, '0')}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="m-0 break-words font-mono text-xl font-medium sm:text-[22px]"><span className="sweep">{p.name}</span></h3>
                <p className="m-0 text-lg font-medium leading-snug">{p.line}</p>
                <p className="m-0 text-[15px] text-muted">{p.meta}</p>
                <div className="mt-auto flex gap-5">
                  {p.links.map((l) => (
                    <SmartLink key={l.label} href={l.href} className="font-semibold text-accent no-underline hover:underline">{l.label} →</SmartLink>
                  ))}
                </div>
              </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Toolkit ---------- */}
        <section aria-labelledby="tk-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="flex flex-wrap items-center gap-10">
            <div className="min-w-0 flex-[1_1_420px]"><SkillCube /></div>
            <div className="reveal flex min-w-0 flex-[1_1_380px] flex-col gap-5">
              <h2 id="tk-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
                Six sides<br /><span className="text-dim">of one stack.</span>
              </h2>
              <p className="m-0 max-w-[460px] text-muted">
                Flutter and Dart on the surface, retrieval and quantized models underneath, FastAPI and MCP when the work needs a server or an agent.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Numbers ---------- */}
        <section aria-label="Results" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label} className="border-t border-line2 pt-6">
                <div className="text-6xl font-semibold leading-none tracking-[-0.05em] sm:text-[72px]">
                  <CountUp value={n.value} /><span className="text-accent">{n.unit}</span>
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
          <ol className="relative m-0 flex list-none flex-col gap-12 border-l border-line2 py-0 pl-8 pr-0">
            <span aria-hidden="true" className="journey-line absolute -left-px top-0 h-full w-px bg-accent" />
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
              <Magnetic strength={0.2}><a href={`mailto:${site.email}`} className="inline-block rounded-2xl bg-ink px-7 py-4 text-lg font-semibold text-bg no-underline">{site.email}</a></Magnetic>
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
