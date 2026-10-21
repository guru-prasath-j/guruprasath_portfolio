import stats from '@/lib/stats.json';

type Stat = { downloads30Days: number; grantedPoints?: number; fetchedAt?: string };
const table = stats as Record<string, Stat>;

/** Downloads in the last 30 days, as saved by scripts/fetch-stats.mjs at build time. */
export const liveDownloads = (pkg: string) => table[pkg]?.downloads30Days ?? 0;

/** 14400 -> "14.4k", 9800 -> "9.8k", 950 -> "950". */
export function formatCount(n: number) {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 100 ? Math.round(k) : Number(k.toFixed(1))}k`;
  }
  return String(n);
}
