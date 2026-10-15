// Everything a visitor reads lives here. Edit this file, not the components.
// Values wrapped in TODO() are placeholders: `npm test` lists them so nothing ships half-filled by accident.

export const TODO = (hint: string) => `TODO: ${hint}`;
export const isTodo = (v: string) => v.startsWith('TODO:');

export type Status = 'Live' | 'Prototype' | 'In progress' | 'Research';

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  status: Status;
  registry?: string;
  line: string;
  meta: string;
  links: Link[];
}

export const site = {
  name: 'Guruprasath J',
  handle: 'guru.prasath',
  role: 'AI Mobile Engineer',
  location: 'Bengaluru',
  // Must match where Pages serves the site (BASE_PATH in .github/workflows/deploy.yml).
  url: 'https://guru-prasath-j.github.io/guruprasath_portfolio',
  email: 'guruprasathjay@gmail.com',
  github: 'https://github.com/guru-prasath-j',
  linkedin: 'https://www.linkedin.com/in/guruprasath-j/',
  // Drop your PDF into /public with this exact name.
  resume: '/Guruprasath_J_Resume.pdf',
  availability: 'Open to AI-mobile roles',
  description:
    'Flutter engineer building on-device RAG, quantized LLMs and the Dart infrastructure that makes private, offline AI feel instant.',
};

export const stack = ['Flutter', 'Dart', 'On-device RAG', 'TFLite', 'Quantized LLMs', 'FastAPI', 'MCP', 'Kotlin · Swift'];

export const featured: Project = {
  slug: 'on-device-rag',
  name: 'on_device_rag',
  status: 'Live',
  registry: 'pub.dev · sole author',
  line: 'Retrieval-augmented generation that never leaves the phone.',
  meta: 'Ingestion, chunking, a pluggable embedding interface, vector search and context building — in pure Dart, so any Flutter app can answer questions over private documents offline.',
  links: [
    { label: 'GitHub', href: 'https://github.com/guru-prasath-j/on_device_rag' },
    { label: 'pub.dev', href: 'https://pub.dev/packages/on_device_rag' },
  ],
};

export const lab: Project[] = [
  {
    slug: 'flutter-accessibility-scanner',
    name: 'flutter_accessibility_scanner',
    status: 'Live',
    registry: 'pub.dev',
    line: 'Catches WCAG 2.1 failures before your users do.',
    meta: 'Static analysis for semantics, contrast and tap targets · ~12k downloads a month',
    links: [{ label: 'View package', href: 'https://pub.dev/packages/flutter_accessibility_scanner' }],
  },
  {
    slug: 'offline-cache-sync',
    name: 'offline_cache_sync',
    status: 'Live',
    registry: 'pub.dev',
    line: 'Offline-first sync that keeps working when the network doesn’t.',
    meta: 'Dependency-free core · SQLite adapter · pub workspace monorepo',
    links: [{ label: 'View repo', href: 'https://github.com/guru-prasath-j/offline_cache_sync' }],
  },
  {
    slug: 'pocketmind',
    name: 'PocketMind',
    status: 'Prototype',
    line: 'A quantized LLM assistant running entirely on the phone.',
    meta: 'Flutter · platform channels · model size vs. memory trade-offs',
    links: [{ label: 'See prototype', href: TODO('PocketMind repo URL') }],
  },
  {
    slug: 'flutter-ios-bridge-mcp',
    name: 'flutter-ios-bridge-mcp',
    status: 'Live',
    registry: 'PyPI',
    line: 'Ship Flutter iOS builds without owning a Mac.',
    meta: 'MCP server your AI agent drives to build, sign and upload',
    links: [{ label: 'View repo', href: 'https://github.com/guru-prasath-j/flutter-ios-bridge-mcp' }],
  },
];

export const numbers = [
  { value: '−47', unit: '%', label: 'App size on a production health app — 150 MB down to 80 MB' },
  { value: '12k', unit: '/mo', label: 'Downloads of flutter_accessibility_scanner on pub.dev' },
  { value: '160', unit: '/160', label: 'Pub points on offline_cache_sync' },
];

export interface Role {
  when: string;
  where: string;
  title: string;
  body?: string;
  current?: boolean;
}

export const journey: Role[] = [
  {
    when: 'Oct 2025 → now',
    where: 'Bengaluru',
    title: 'SDE-1, Flutter & AI Mobile — Nuvo.ai',
    body: 'Building the HealthJini doctor app and Business Jini for Meril Life Sciences’ digital arm. Native Kotlin and Swift plugins, offline-first data, and a 150 → 80 MB size cut.',
    current: true,
  },
  {
    when: 'Jul 2024 → Sep 2025',
    where: 'Chennai',
    title: 'Flutter Engineer — Thinq24 Innovations',
    body: TODO('one line on what you shipped at Thinq24'),
  },
  { when: '2024', where: 'Vellore', title: 'B.E. Computer Science — Annai Mira College' },
];

export const caseStudy = {
  timeline: TODO('start → latest release'),
  problem:
    'Flutter developers who want “chat with your documents” usually stand up a Python service for chunking, embeddings and vector search. That adds latency, hosting cost and — for health, finance or personal notes — a privacy problem. There was no idiomatic Dart package that did retrieval on the device.',
  constraints: [
    { title: 'Pure Dart', body: 'Runs anywhere Dart runs; no native build step for the core.' },
    { title: 'Mobile memory', body: 'Index and model must coexist with the app on mid-range phones.' },
    { title: 'Offline', body: 'Retrieval must work with no network at all.' },
    { title: 'Model-agnostic', body: 'Apps bring their own embedding and generation models.' },
  ],
  implementation: TODO('chunking strategy, vector storage/search, and the public API — one short paragraph each'),
  snippet: '// TODO: paste the quick-start snippet from the README —\n//       the real API, not an illustration',
  tradeoffs: [
    { title: 'Pure Dart vs. native index', body: 'Chose portability over raw search speed.' },
    { title: 'Interfaces vs. bundled models', body: 'Smaller package, no model lock-in; apps do more setup.' },
    { title: 'Chunk size', body: 'Smaller chunks sharpen recall but put more vectors in memory.' },
  ],
  reliability: TODO('empty index, unsupported file, embedder failure, no chunk above threshold — what the API returns'),
  // Leave value null until measured; the page shows an empty dashed box.
  metrics: [
    { label: 'Recall@k', value: null as string | null },
    { label: 'Query latency', value: null as string | null },
    { label: 'Index memory', value: null as string | null },
  ],
  next: 'Published on pub.dev as an open-source package. Next: hybrid keyword + vector search, a persistent index, and benchmarks across devices.',
};
