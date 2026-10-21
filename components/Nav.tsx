import Link from 'next/link';
import { site } from '@/lib/content';
import NavBrand from '@/components/NavBrand';

const links = [
  { href: '#work', label: 'Work', show: 'sm:inline' },
  { href: '#lab', label: 'Open source', show: 'md:inline' },
  { href: '#builds', label: 'Apps', show: 'lg:inline' },
  { href: '#skills', label: 'Skills', show: 'lg:inline' },
  { href: '#journey', label: 'Journey', show: 'md:inline' },
];

export default function Nav({ back = false }: { back?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-[rgba(7,8,12,.78)] backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex max-w-page items-center justify-between gap-3 px-5 py-3 sm:gap-4 sm:px-8 sm:py-4">
        <NavBrand />
        <div className="flex flex-none items-center gap-1 rounded-full border border-line bg-surface p-1.5 text-sm">
          {back ? (
            <Link href="/#work" aria-label="All work" className="whitespace-nowrap rounded-full px-3 py-2 no-underline hover:text-[#B7BEFF] sm:px-4">←<span className="hidden sm:inline"> All work</span></Link>
          ) : (
            <>
              {links.map((l) => (
                <a key={l.href} href={l.href} className={`hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] ${l.show}`}>{l.label}</a>
              ))}
              <Link href="/recruiter/" className="hidden rounded-full border border-line2 px-4 py-2 no-underline hover:border-accent sm:inline">Recruiter view</Link>
            </>
          )}
          <a href={back ? `mailto:${site.email}` : '#contact'} className="whitespace-nowrap rounded-full bg-ink px-4 py-2 font-semibold text-bg no-underline">Let’s talk</a>
        </div>
      </nav>
    </header>
  );
}
