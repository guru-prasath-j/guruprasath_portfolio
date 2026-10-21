'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/content';

/**
 * Top-left of the nav. While the big hero name is on screen: GP badge + availability.
 * Once it scrolls away: GP badge + name + availability, so the name shows once, never twice.
 * Pages without a hero name (case study, recruiter view) show the name straight away.
 */
export default function NavBrand() {
  const [pastName, setPastName] = useState(true);

  useEffect(() => {
    const name = document.getElementById('name-h');
    if (!name) { setPastName(true); return; }
    setPastName(false);
    const io = new IntersectionObserver(([e]) => setPastName(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(name);
    return () => io.disconnect();
  }, []);

  return (
    <Link href="/" aria-label={`${site.name}, ${site.role} — home`} className="flex min-h-11 min-w-0 items-center gap-3 no-underline">
      <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent to-cyan text-base font-bold tracking-tight text-bg">GP</span>
      {pastName ? (
        <span key="name" className="brand-in flex min-w-0 flex-col leading-tight">
          <span className="truncate text-base font-bold tracking-tight sm:text-lg">{site.name}</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-faint">
            <span className="pulse h-1.5 w-1.5 flex-none rounded-full bg-live" />
            <span className="xl:hidden">Open to roles</span>
            <span className="hidden xl:inline">{site.availability}</span>
          </span>
        </span>
      ) : (
        <span key="status" className="brand-in inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted sm:px-3.5 sm:text-xs">
          <span className="pulse h-2 w-2 flex-none rounded-full bg-live" />
          <span className="xl:hidden">Open to roles</span>
          <span className="hidden xl:inline">{site.availability} · {site.location}</span>
        </span>
      )}
    </Link>
  );
}
