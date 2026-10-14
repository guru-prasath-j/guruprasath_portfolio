import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/work/on-device-rag/'].map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' }));
}
