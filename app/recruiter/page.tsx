import type { Metadata } from 'next';
import Link from 'next/link';
import { builds, featured, hire, journey, lab, site, skillsProof, spotlight, writing, type Link as L } from '@/lib/content';
import { asset } from '@/lib/path';

const DESC = `${site.name} — ${site.role}. ${hire.experience}. ${hire.location}.`;

export const metadata: Metadata = {
  title: 'Recruiter view',
  description: DESC,
  alternates: { canonical: '/recruiter/' },
  openGraph: { type: 'profile', url: '/recruiter/', title: `${site.name} — recruiter view`, description: DESC, images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${site.name}, ${site.role}` }] },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="m-0 mb-1.5 font-mono text-xs font-medium uppercase tracking-[.12em] text-[#3A3F8F]">{children}</h2>
);

function Item({ name, status, line, links }: { name: string; status: string; line: string; links: L[] }) {
  return (
    <li className="grid grid-cols-1 gap-1 border-t border-[#E6E7EE] py-2.5 sm:grid-cols-[240px_1fr_auto] sm:items-baseline sm:gap-4">
      <span className="font-mono text-sm font-medium">{name}</span>
      <span className="text-[15px] text-[#3E414C]">{line} <span className="font-mono text-[11px] text-[#6B6F80]">· {status}</span></span>
      <span className="flex gap-3 whitespace-nowrap text-[13px]">
        {links.map((l) => <a key={l.href} href={l.href} className="text-[#3A3F8F]">{l.label}</a>)}
      </span>
    </li>
  );
}

/** One plain page for recruiters: no animation, single column, prints cleanly. */
export default function Recruiter() {
  const facts = [['Roles', hire.roles], ['Experience', hire.experience], ['Location', hire.location], ['Proof', hire.proof]];
  const roles = [...journey].reverse();
  return (
    <div className="plain-page min-h-screen bg-[#F6F6F9] text-[#14151A] print:bg-white">
      <main id="main" className="mx-auto flex max-w-[980px] flex-col gap-9 px-5 pb-20 pt-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#6B6F80] print:hidden">
          <Link href="/" className="text-[#3A3F8F]">← Full portfolio</Link>
          <span>Recruiter view · one page · prints cleanly</span>
        </div>

        <header className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-[#14151A] pb-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[40px] font-bold leading-none tracking-[-0.04em] sm:text-[56px]">{site.name}</h1>
            <p className="m-0 text-xl font-medium text-[#3A3F8F]">{site.role} · Flutter · On-device AI</p>
            <p className="m-0 text-[15px] text-[#4A4E5C]">
              {site.location} · <a href={`mailto:${site.email}`} className="text-inherit">{site.email}</a> · <a href={site.linkedin} className="text-inherit">linkedin.com/in/guruprasath-j</a> · <a href={site.github} className="text-inherit">github.com/guru-prasath-j</a>
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 print:hidden">
            <a href={asset(site.resume)} className="inline-flex min-h-11 items-center rounded-xl bg-[#14151A] px-4 text-sm font-bold text-white no-underline">Download resume</a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center rounded-xl border border-[#C5C8D8] bg-white px-4 text-sm font-semibold text-[#14151A] no-underline">Email</a>
            <a href={site.linkedin} className="inline-flex min-h-11 items-center rounded-xl border border-[#C5C8D8] bg-white px-4 text-sm font-semibold text-[#14151A] no-underline">LinkedIn</a>
          </div>
        </header>

        <section aria-label="Summary" className="flex flex-col gap-3.5">
          <p className="m-0 text-lg leading-relaxed">{hire.summary}</p>
          <dl className="m-0 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-[#E6E7EE] bg-white px-4 py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-[.08em] text-[#6B6F80]">{k}</dt>
                <dd className="m-0 mt-1 text-[15px] font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Experience">
          <H2>Experience · results first</H2>
          {roles.map((r) => (
            <article key={r.org} className="grid grid-cols-1 gap-2 border-t border-[#E6E7EE] py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
              <div className="font-mono text-xs leading-relaxed text-[#6B6F80]">{r.when}<br />{r.where}</div>
              <div>
                <h3 className="m-0 text-lg font-semibold">{r.title} <span className="font-medium text-[#3A3F8F]">— {r.org}</span></h3>
                <ul className="m-0 mt-2 list-disc pl-[18px] text-[15px] leading-relaxed text-[#2A2C35]">
                  {r.points.map((p) => <li key={p}>{p}</li>)}
                  <li className="text-[#4A4E5C]">{r.body}</li>
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section aria-label="Skills and writing" className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <H2>Skills, with where they’re proven</H2>
            <ul className="m-0 list-none p-0">
              {skillsProof.map((s) => (
                <li key={s.skill} className="flex justify-between gap-3 border-t border-[#E6E7EE] py-2 text-[15px]">
                  <span className="font-semibold">{s.skill}</span><span className="text-right text-[#4A4E5C]">{s.proof}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>Writing</H2>
            <ul className="m-0 list-none p-0">
              {writing.map((w) => (
                <li key={w.href} className="border-t border-[#E6E7EE] py-2 text-[15px]">
                  <a href={w.href} className="font-semibold text-[#14151A] no-underline [border-bottom:1px_solid_#C5C8D8]">{w.title}</a>{' '}
                  <span className="font-mono text-[11px] text-[#6B6F80]">· Medium, {w.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Open-source packages">
          <H2>Open source · published packages</H2>
          <ul className="m-0 list-none p-0">
            <Item name={featured.name} status={featured.status} line={featured.line} links={featured.links} />
            <Item name={spotlight.name} status={spotlight.status} line={spotlight.line} links={spotlight.links} />
            {lab.map((p) => <Item key={p.slug} name={p.name} status={p.status} line={p.line} links={p.links} />)}
          </ul>
        </section>

        <section aria-label="Apps and agents">
          <H2>Apps &amp; agents</H2>
          <ul className="m-0 list-none p-0">
            {builds.map((p) => <Item key={p.slug} name={p.name} status={p.status} line={p.line} links={p.links} />)}
          </ul>
        </section>
      </main>
    </div>
  );
}
