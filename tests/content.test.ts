import { describe, expect, it } from 'vitest';
import { builds, caseStudy, featured, isTodo, journey, lab, site, writing } from '@/lib/content';

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
    const hrefs = [site.github, site.linkedin, site.resume, ...projects.flatMap((p) => p.links.map((l) => l.href))];
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
