import { site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-[#161927]">
      <div className="mx-auto flex max-w-page flex-wrap justify-between gap-3 px-5 pb-28 pt-6 sm:pb-6 font-mono text-xs text-[#6B7088] sm:px-8">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href={site.repo} className="no-underline hover:text-ink">Source on GitHub</a>
      </div>
    </footer>
  );
}
