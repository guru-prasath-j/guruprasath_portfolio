'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/content';
import { asset } from '@/lib/path';

/** Phones only: Email + Resume pinned to the bottom once the hero has scrolled away. */
export default function ContactBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hire-h');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <nav
      aria-label="Quick contact"
      className={`contact-bar fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-[18px] border border-line2 bg-[rgba(13,15,22,.92)] p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,.6)] backdrop-blur-md sm:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[130%] opacity-0'}`}
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <a href={`mailto:${site.email}`} tabIndex={show ? 0 : -1} className="flex min-h-12 items-center justify-center rounded-xl bg-accent text-[15px] font-bold text-bg no-underline">Email me</a>
      <a href={asset(site.resume)} tabIndex={show ? 0 : -1} className="flex min-h-12 items-center justify-center rounded-xl border border-line2 text-[15px] font-semibold no-underline">Resume</a>
    </nav>
  );
}
