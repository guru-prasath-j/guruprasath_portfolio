import Link from 'next/link';
import { site } from '@/lib/content';

export default function Nav({ back = false }: { back?: boolean }) {
  return (
    <header className="relative z-10">
      <nav aria-label="Primary" className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight no-underline">
          guru<span className="text-accent">.</span>prasath
        </Link>
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-line bg-surface p-1.5 text-sm">
          {back ? (
            <Link href="/#work" className="rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF]">← All work</Link>
          ) : (
            <>
              <a href="#work" className="hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] sm:inline">Work</a>
              <a href="#lab" className="hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] sm:inline">Lab</a>
              <a href="#builds" className="hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] md:inline">Apps</a>
              <a href="#writing" className="hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] md:inline">Writing</a>
              <a href="#journey" className="hidden rounded-full px-4 py-2 no-underline hover:text-[#B7BEFF] sm:inline">Journey</a>
            </>
          )}
          <a href={back ? `mailto:${site.email}` : '#contact'} className="rounded-full bg-ink px-4 py-2 font-semibold text-bg no-underline">Let’s talk</a>
        </div>
      </nav>
    </header>
  );
}
