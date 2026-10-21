import Link from 'next/link';
import { site } from '@/lib/content';

const links = [
  { href: '#work', label: 'Work', show: 'sm:inline' },
  { href: '#lab', label: 'Open source', show: 'md:inline' },
  { href: '#builds', label: 'Apps', show: 'lg:inline' },
  { href: '#skills', label: 'Skills', show: 'lg:inline' },
  { href: '#journey', label: 'Journey', show: 'md:inline' },
];

export default function Nav({ back = false }: { back?: boolean }) {
  return (
    <header className="relative z-10">
      <nav aria-label="Primary" className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-cyan text-base font-bold tracking-tight text-bg">GP</span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight sm:text-xl">{site.name}</span>
            <span className="font-mono text-[11px] text-faint">{site.role}</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-line bg-surface p-1.5 text-sm">
          {back ? (
            <Link href="/#work" className="rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF]">← All work</Link>
          ) : (
            <>
              {links.map((l) => (
                <a key={l.href} href={l.href} className={`hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] ${l.show}`}>{l.label}</a>
              ))}
              <Link href="/recruiter/" className="hidden rounded-full border border-line2 px-4 py-2 no-underline hover:border-accent sm:inline">Recruiter view</Link>
            </>
          )}
          <a href={back ? `mailto:${site.email}` : '#contact'} className="rounded-full bg-ink px-4 py-2 font-semibold text-bg no-underline">Let’s talk</a>
        </div>
      </nav>
    </header>
  );
}
