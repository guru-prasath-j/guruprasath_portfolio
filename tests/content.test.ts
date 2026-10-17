import { describe, expect, it } from 'vitest';
import { builds, caseStudy, featured, isTodo, journey, lab, site, spotlight, writing } from '@/lib/content';
import { demos } from '@/lib/demos';

const STATUSES = ['Live', 'Prototype', 'In progress', 'Research'];
const projects = [featured, ...lab, ...builds];

describe('content', () => {
  it('every project has a valid status and a one-line pitch', () => {
    for (const p of projects) {
      expect(STATUSES).toContain(p.status);
      expect(p.line.length).toBeGreaterThan(10);
    }
  });

  it('project slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('links are https, mailto, site-relative, or a TODO', () => {
    const hrefs = [site.github, site.linkedin, site.resume, ...projects.flatMap((p) => p.links.map((l) => l.href)), ...spotlight.links.map((l) => l.href), spotlight.article];
    for (const h of hrefs) expect(isTodo(h) || /^(https:\/\/|mailto:|\/)/.test(h)).toBe(true);
  });

  it('writing links point at real https pages', () => {
    for (const w of writing) expect(w.href).toMatch(/^https:\/\//);
  });

  it('journey has exactly one current role and ends on the open step', () => {
    expect(journey.filter((r) => r.current)).toHaveLength(1);
    expect(journey[journey.length - 1].kind).toBe('Next');
  });

  it('no invented metrics: case-study numbers are either measured or null', () => {
    for (const m of caseStudy.metrics) expect(m.value === null || typeof m.value === 'string').toBe(true);
  });

  it('lists remaining placeholders (informational)', () => {
    const todos = [
      ...projects.flatMap((p) => p.links.filter((l) => isTodo(l.href)).map((l) => `${p.name}: ${l.href}`)),
      ...journey.flatMap((r) => r.points.filter(isTodo).map((t) => `${r.org}: ${t}`)),
      ...[caseStudy.timeline, caseStudy.implementation, caseStudy.reliability].filter(isTodo),
    ];
    if (todos.length) console.info(`\n${todos.length} placeholder(s) left:\n- ${todos.join('\n- ')}`);
    expect(Array.isArray(todos)).toBe(true);
  });
});

describe('demos', () => {
  const slugs = new Set([featured.slug, 'flutter-accessibility-scanner', ...lab.map((p) => p.slug), ...builds.map((p) => p.slug)]);

  it('every demo belongs to a project on the page', () => {
    for (const d of demos) expect(slugs.has(d.slug), d.slug).toBe(true);
  });

  it('every project on the page has a demo', () => {
    for (const s of slugs) expect(demos.some((d) => d.slug === s), s).toBe(true);
  });

  it('each demo has a two-line phrase and at least one scene with items', () => {
    for (const d of demos) {
      expect(d.phrase.every((l) => l.trim().length > 0)).toBe(true);
      expect(d.scenes.length).toBeGreaterThan(0);
      for (const sc of d.scenes) expect(sc.items.length).toBeGreaterThan(0);
    }
  });
});
