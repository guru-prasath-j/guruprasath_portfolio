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
import ScannerScreen from '@/components/ScannerScreen';
import SkillCube from '@/components/SkillCube';
import CountUp from '@/components/CountUp';
import Magnetic from '@/components/Magnetic';
import JourneyStairs from '@/components/JourneyStairs';
import DemoProvider, { WatchDemo } from '@/components/DemoTheatre';
import HireCard from '@/components/HireCard';
import SkillsProof from '@/components/SkillsProof';
import ContactBar from '@/components/ContactBar';
import { builds, featured, lab, numbers, site, spotlight, stack, writing } from '@/lib/content';
import { asset } from '@/lib/path';

const btnPrimary = 'rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg no-underline transition-transform hover:-translate-y-0.5';
const btnGhost = 'rounded-xl border border-line2 px-6 py-3.5 font-medium no-underline transition-colors hover:border-accent';
const textLink = 'font-semibold text-accent no-underline hover:underline';

/** Package names break after underscores, never mid-word. */
function Pkg({ name }: { name: string }) {
  const parts = name.split('_');
  return <>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <>_<wbr /></>}</span>)}</>;
}

/** "also on pub.dev as flutter_…" for packages published under two names. */
function Alias({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <span className="font-mono text-xs text-faint">
      also on pub.dev as <a href={`https://pub.dev/packages/${name}`} target="_blank" rel="noopener noreferrer" className="text-soft">{name}</a>
    </span>
  );
}

export default function Home() {
  return (
    <DemoProvider>
      <Nav />
      <main id="main">
        {/* ---------- Hero ---------- */}
        <div className="relative overflow-hidden">
        <div aria-hidden="true" className="floor" />
        <section aria-labelledby="name-h" className="relative mx-auto flex max-w-page flex-wrap items-center gap-6 px-5 pb-10 pt-6 sm:px-8 lg:min-h-[720px]">
          <div className="relative z-10 flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <div className="rise flex flex-col gap-2.5">
              <span className="font-mono text-[13px] tracking-[.16em] text-accent">HI, I’M</span>
              <h1 id="name-h" className="name-grad m-0 whitespace-nowrap text-[42px] font-bold leading-[0.95] tracking-[-0.05em] min-[400px]:text-[46px] sm:text-[72px] lg:text-[84px]">{site.name}</h1>
              <span className="text-lg font-medium text-soft sm:text-xl">{site.role} <span className="text-dim">·</span> Flutter <span className="text-dim">·</span> On-device AI</span>
            </div>
            <LitHeadline id="hero-h" />
            <p className="rise m-0 max-w-[520px] text-lg leading-relaxed text-muted sm:text-[19px]" style={{ animationDelay: '.75s' }}>
              {site.description.replace(/^AI Mobile Engineer building/, 'Building')}
            </p>
            <div className="rise flex flex-wrap gap-3" style={{ animationDelay: '.9s' }}>
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

        <HireCard />

        <Marquee items={stack} />

        {/* ---------- Featured builds: two projects, alternating sides ---------- */}
        <section id="work" aria-labelledby="work-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <h2 id="work-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Featured<br /><span className="text-dim">builds.</span>
            </h2>
            <p className="m-0 max-w-[400px] text-muted">Two projects I lead with: an on-device RAG engine, and an accessibility scanner other developers ship in their apps.</p>
          </div>

          <div className="flex flex-col gap-7">
            <article aria-labelledby="p1" className="reveal flex flex-wrap items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface p-5 sm:p-12">
              <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-4xl font-medium leading-none text-accent sm:text-[44px]">01</span>
                  <span className="font-mono text-xs tracking-[.06em] text-faint">/ 02 · ON-DEVICE RAG ENGINE</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge status={featured.status} />
                  <span className="font-mono text-xs text-faint">{featured.registry}</span>
                </div>
                <h3 id="p1" className="m-0 break-words font-mono text-3xl font-medium tracking-[-0.03em] sm:text-[40px]"><Pkg name={featured.name} /></h3>
                <Alias name={featured.alias} />
                <p className="m-0 text-xl font-medium leading-snug sm:text-[22px]">{featured.line}</p>
                <p className="m-0 text-muted">{featured.meta}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Magnetic><Link href="/work/on-device-rag/" className={`inline-block ${btnPrimary}`}>Read the case study →</Link></Magnetic>
                  <WatchDemo slug={featured.slug} />
                </div>
                <div className="flex flex-wrap gap-5">
                  {featured.links.map((l) => (
                    <SmartLink key={l.href} href={l.href} className={textLink}>{l.label} →</SmartLink>
                  ))}
                </div>
              </div>
              <div className="min-w-0 flex-[1_1_420px]">
                <ExplodedStack />
              </div>
            </article>

            <article aria-labelledby="p2" className="reveal flex flex-wrap items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface p-5 sm:p-12">
              <div className="order-2 min-w-0 flex-[1_1_420px] lg:order-1">
                <Phone3D><ScannerScreen /></Phone3D>
              </div>
              <div className="order-1 flex min-w-0 flex-[1_1_400px] flex-col gap-4 lg:order-2">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-4xl font-medium leading-none text-accent sm:text-[44px]">02</span>
                  <span className="font-mono text-xs tracking-[.06em] text-faint">/ 02 · ACCESSIBILITY SCANNER</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge status={spotlight.status} />
                  <span className="font-mono text-xs text-faint">{spotlight.registry}</span>
                </div>
                <h3 id="p2" className="m-0 font-mono text-[24px] font-medium tracking-[-0.03em] sm:text-[36px]"><Pkg name={spotlight.name} /></h3>
                <p className="m-0 text-xl font-medium leading-snug sm:text-[22px]">Used in other people’s apps. <span className="text-muted">{spotlight.line}</span></p>
                <p className="m-0 text-muted">{spotlight.meta}</p>
                <dl className="m-0 grid grid-cols-3 gap-4">
                  {spotlight.stats.map((st) => (
                    <div key={st.label} className="flex flex-col-reverse border-t border-line2 pt-3">
                      <dt className="flex items-center gap-1.5 text-sm text-muted">
                        {'live' in st && st.live && <span className="pulse h-1.5 w-1.5 flex-none rounded-full bg-live" />}{st.label}
                      </dt>
                      <dd className="m-0 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"><CountUp value={st.value} /></dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Magnetic><a href={spotlight.article} target="_blank" rel="noopener noreferrer" className={`inline-block ${btnPrimary}`}>Read the story →</a></Magnetic>
                  <WatchDemo slug="flutter-accessibility-scanner" />
                </div>
                <div className="flex flex-wrap gap-5">
                  {spotlight.links.map((l) => (
                    <SmartLink key={l.href} href={l.href} className={textLink}>{l.label} →</SmartLink>
                  ))}
                </div>
                <p className="m-0 font-mono text-xs text-faint">Download count read live from pub.dev. The phone replays the in-app overlay.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ---------- Lab ---------- */}
        <section id="lab" aria-labelledby="lab-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <h2 id="lab-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Open source<span className="text-accent">.</span><br /><span className="text-dim">Published packages.</span>
            </h2>
            <p className="m-0 max-w-[400px] text-muted">Packages I publish and maintain on pub.dev and PyPI, free for any developer to install. Move your cursor over a card.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {lab.map((p, i) => (
              <div key={p.slug} className="reveal-3d flex">
              <TiltCard className="flex min-h-[300px] flex-1 flex-col gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="font-mono text-6xl font-medium leading-none text-[#1E2232]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex items-center gap-2.5">
                    {p.registry && <span className="font-mono text-xs text-faint">{p.registry}</span>}
                    <StatusBadge status={p.status} />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="m-0 break-words font-mono text-xl font-medium sm:text-[22px]"><span className="sweep"><Pkg name={p.name} /></span></h3>
                  <Alias name={p.alias} />
                </div>
                <p className="m-0 text-lg font-medium leading-snug">{p.line}</p>
                <p className="m-0 text-[15px] text-muted">{p.meta}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                  <WatchDemo slug={p.slug} />
                  {p.links.map((l) => (
                    <SmartLink key={l.label} href={l.href} className="font-semibold text-accent no-underline hover:underline">{l.label} →</SmartLink>
                  ))}
                </div>
              </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Builds ---------- */}
        <section id="builds" aria-labelledby="b-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <h2 id="b-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Apps &amp; agents<span className="text-accent">.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">Native apps, full-stack AI products and agent experiments — each one on GitHub. Hit ▶ Watch demo to see one run.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((p) => (
              <article key={p.slug} aria-labelledby={`b-${p.slug}`} className="reveal lift flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 id={`b-${p.slug}`} className="m-0 text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="m-0 font-medium leading-snug">{p.line}</p>
                <p className="m-0 text-[15px] text-muted">{p.meta}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => <span key={t} className="rounded-md border border-line2 px-2.5 py-1 font-mono text-xs text-soft">{t}</span>)}
                  </div>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                  <WatchDemo slug={p.slug} />
                  {p.links.map((l) => (
                    <SmartLink key={l.label} href={l.href} className="font-semibold text-accent no-underline hover:underline">{l.label} →</SmartLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Skills, with proof ---------- */}
        <section id="skills" aria-labelledby="s-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <h2 id="s-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Skills<span className="text-accent">,</span><br /><span className="text-dim">with proof.</span>
            </h2>
            <p className="m-0 max-w-[400px] text-muted">Each skill next to where I used it, so you can match it against your job description.</p>
          </div>
          <SkillsProof />
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
          <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label} className="border-t border-line2 pt-6">
                <div className="whitespace-nowrap text-[52px] font-semibold leading-none tracking-[-0.05em] xl:text-[60px]">
                  <CountUp value={n.value} /><span className="ml-0.5 text-[0.5em] tracking-[-0.02em] text-accent">{n.unit}</span>
                </div>
                <p className="m-0 mt-2.5 text-muted">
                  {n.label}
                  {'live' in n && n.live && (
                    <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-live"><span className="pulse h-1.5 w-1.5 rounded-full bg-live" />live from pub.dev</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Writing ---------- */}
        <section id="writing" aria-labelledby="w-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <h2 id="w-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Writing<span className="text-accent">.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">What I learned building the tools above, on Medium.</p>
          </div>
          <div className="flex flex-col gap-3">
            {writing.map((w) => (
              <a key={w.href} href={w.href} target="_blank" rel="noopener noreferrer" className="reveal lift group grid grid-cols-1 items-center gap-2 rounded-[22px] border border-line bg-surface p-6 no-underline sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-8">
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="font-mono text-xs text-faint">{w.date} · Medium</span>
                  <span className="text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">{w.title}</span>
                  <span className="text-[15px] text-muted">{w.sub}</span>
                </span>
                <span aria-hidden="true" className="text-3xl text-accent transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- Journey ---------- */}
        <section id="journey" aria-labelledby="j-h" className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-36">
          <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-5">
            <h2 id="j-h" className="m-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">
              Journey<span className="text-accent">.</span><br /><span className="text-dim">One step at a time.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-muted">Each step is a stage of the climb. Pick one to see what I did there.</p>
          </div>
          <JourneyStairs />
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
      <ContactBar />
    </DemoProvider>
  );
}
