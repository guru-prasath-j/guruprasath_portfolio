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
  /** Short stack chips, shown on build cards. */
  tags?: string[];
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
  repo: 'https://github.com/guru-prasath-j/guruprasath_portfolio',
  linkedin: 'https://www.linkedin.com/in/guruprasath-j/',
  // Drop your PDF into /public with this exact name.
  resume: '/Guruprasath_J_Resume.pdf',
  availability: 'Open to AI-mobile roles',
  description:
    'AI Mobile Engineer building on-device RAG, quantized LLMs and the Flutter and Dart infrastructure that makes private, offline AI feel instant.',
};

export const stack = ['Flutter', 'Dart', 'On-device RAG', 'TFLite', 'Quantized LLMs', 'LangGraph', 'FastAPI', 'MCP', 'Kotlin · Compose', 'Swift · SwiftUI'];

export const featured: Project = {
  slug: 'on-device-rag',
  name: 'on_device_rag',
  status: 'Live',
  registry: 'pub.dev · 160/160 pub points · sole author',
  line: 'Retrieval-augmented generation that never leaves the phone.',
  meta: 'Ingestion, chunking, a pluggable embedding interface, vector search and context building — in pure Dart, so any Flutter app can answer questions over private documents offline.',
  links: [
    { label: 'GitHub', href: 'https://github.com/guru-prasath-j/on_device_rag' },
    { label: 'pub.dev', href: 'https://pub.dev/packages/on_device_rag' },
  ],
};

export const lab: Project[] = [
  {
    slug: 'offline-cache-sync',
    name: 'offline_cache_sync',
    status: 'Live',
    registry: 'pub.dev',
    line: 'Offline-first sync that keeps working when the network doesn’t.',
    meta: 'A durable outbox and a stale-while-revalidate cache that agree · idempotent retries, crash-injection test kit · zero-dependency core, SQLite adapter',
    links: [
      { label: 'View package', href: 'https://pub.dev/packages/offline_cache_sync' },
      { label: 'GitHub', href: 'https://github.com/guru-prasath-j/offline_cache_sync' },
    ],
  },
  {
    slug: 'iphone-duo-adapt',
    name: 'iphone_duo_adapt',
    status: 'Live',
    registry: 'pub.dev',
    line: 'Retrofit any Flutter app for foldables in one line.',
    meta: 'Native hinge bridge · bottom bar → side rail · fold-aware list/detail · posture preview, test kit, a 20-check audit CLI and auto-migration',
    links: [
      { label: 'View package', href: 'https://pub.dev/packages/iphone_duo_adapt' },
      { label: 'GitHub', href: 'https://github.com/guru-prasath-j/iphone_duo_adapt' },
    ],
  },
  {
    slug: 'flutter-ios-bridge-mcp',
    name: 'flutter-ios-bridge-mcp',
    status: 'Live',
    registry: 'PyPI',
    line: 'Ship Flutter iOS builds without owning a Mac.',
    meta: 'MCP server your AI agent drives to build, sign, test and upload to TestFlight — GitHub Actions macOS runners, App Store Connect API, remote Mac or USB iPhone',
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/flutter-ios-bridge-mcp/' },
      { label: 'GitHub', href: 'https://github.com/guru-prasath-j/flutter-ios-bridge-mcp' },
    ],
  },
];

/** Apps, agents and full-stack AI builds. */
export const builds: Project[] = [
  {
    slug: 'feeledger',
    name: 'FeeLedger',
    status: 'Live',
    line: 'UPI fee collection and a private ledger for India’s home tutors.',
    meta: 'Two fully native apps that agree on every rupee and generate byte-identical UPI QR codes. No server, no INTERNET permission; fields encrypted with Android Keystore and the iOS Secure Enclave.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'Swift', 'SwiftUI', 'CryptoKit'],
    links: [
      { label: 'Android', href: 'https://github.com/guru-prasath-j/feeledger-android' },
      { label: 'iOS', href: 'https://github.com/guru-prasath-j/feeledger-ios' },
    ],
  },
  {
    slug: 'brainsync-ai',
    name: 'BrainSync AI',
    status: 'Prototype',
    line: 'Turns study PDFs into summaries, flashcards, quizzes and a chat.',
    meta: 'Flutter → FastAPI → PostgreSQL + ChromaDB, with RAG-grounded answers, JWT auth, Alembic migrations and async ingestion.',
    tags: ['Flutter', 'FastAPI', 'GPT-4o-mini', 'ChromaDB', 'PostgreSQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/guru-prasath-j/brainsync-ai-app' }],
  },
  {
    slug: 'pocketmind',
    name: 'PocketMind',
    status: 'Prototype',
    line: 'A study assistant that answers from your notes in airplane mode.',
    meta: 'A quantized LLM and a local vector store over SQLite, both on the phone: chunk, embed, retrieve and answer with zero network calls.',
    tags: ['Flutter', 'On-device LLM', 'GGUF · TFLite', 'SQLite'],
    links: [{ label: 'GitHub', href: 'https://github.com/guru-prasath-j/pocketmind' }],
  },
  {
    slug: 'ai-code-review-agent',
    name: 'AI code review agent',
    status: 'Prototype',
    line: 'An agent that reviews pull requests and posts the review itself.',
    meta: 'LangGraph ReAct loop picks its tools — semantic repo search, Semgrep, pytest, complexity checks — then comments on the PR and tracks which suggestions get accepted.',
    tags: ['LangGraph', 'GPT-4o-mini', 'ChromaDB', 'FastAPI'],
    links: [{ label: 'GitHub', href: 'https://github.com/guru-prasath-j/ai-code-review-agent' }],
  },
  {
    slug: 'self-healing-rag-eval',
    name: 'Self-healing RAG',
    status: 'Research',
    line: 'RAG that grades its own answers and retries the weak ones.',
    meta: 'A critic node scores each answer and re-retrieves on failure; an eval-gated CI pipeline with a golden set blocks regressions. Traced end to end in Langfuse.',
    tags: ['LangGraph', 'Groq · Llama 3', 'FAISS', 'Langfuse'],
    links: [{ label: 'GitHub', href: 'https://github.com/guru-prasath-j/self-healing-rag-eval' }],
  },
  {
    slug: 'gmail-ai-assistant',
    name: 'Gmail AI Assistant',
    status: 'Prototype',
    line: 'Learns how you write and drafts replies in your voice — locally.',
    meta: 'Flutter on mobile and desktop, Gmail OAuth2 through FastAPI, and Ollama running Llama 3, Mistral or Gemma on your own machine.',
    tags: ['Flutter', 'FastAPI', 'Ollama', 'OAuth2'],
    links: [{ label: 'GitHub', href: 'https://github.com/guru-prasath-j/gmail-ai-assistant' }],
  },
];

/** Second spotlight on the home page: the package other developers actually run. */
export const spotlight = {
  name: 'flutter_accessibility_scanner',
  status: 'Live' as Status,
  registry: 'pub.dev · v1.2.0 · 160/160 pub points',
  line: 'Accessibility bugs, caught while you build.',
  meta: 'It walks the live render tree and reports WCAG 2.1 failures — missing labels, unlabeled images, low contrast, small tap targets, unfocusable controls — each with a severity, a location and a concrete fix. Use it as an in-app overlay, a one-line widget-test check, or a JSON/Markdown report that gates CI.',
  stats: [
    { value: '15k', label: 'downloads / month' },
    { value: '160', label: 'pub points' },
    { value: '6', label: 'WCAG checks' },
  ],
  links: [
    { label: 'pub.dev', href: 'https://pub.dev/packages/flutter_accessibility_scanner' },
    { label: 'GitHub', href: 'https://github.com/guru-prasath-j/flutter_accessibility_scanner' },
  ],
  article: 'https://medium.com/@guruprasathjay/i-shipped-a-flutter-package-forgot-about-it-and-a-year-later-it-had-12-000-downloads-a-month-61bfbbe8774e',
};

export const writing = [
  {
    title: 'I shipped a Flutter package, forgot about it, and a year later it had ~12,000 downloads a month',
    sub: 'The story of flutter_accessibility_scanner: what I built, what I got wrong, and how I rebuilt it.',
    date: 'Sep 2026',
    href: 'https://medium.com/@guruprasathjay/i-shipped-a-flutter-package-forgot-about-it-and-a-year-later-it-had-12-000-downloads-a-month-61bfbbe8774e',
  },
  {
    title: 'No Mac? You can still ship your Flutter app to iOS. I built an MCP server for it',
    sub: 'How flutter-ios-bridge-mcp lets an AI agent build, sign and upload iOS apps from Windows or Linux.',
    date: 'Sep 2026',
    href: 'https://medium.com/@guruprasathjay/no-mac-you-can-still-ship-your-flutter-app-to-ios-i-built-an-mcp-server-for-it-86fb85fa971f',
  },
];

export const numbers = [
  { value: '−66', unit: '%', label: 'APK size on a production health app — 68 MB down to 23 MB' },
  { value: '15k', unit: '/mo', label: 'Downloads of flutter_accessibility_scanner on pub.dev' },
  { value: '4', unit: '×160', label: 'Packages on pub.dev, every one at the maximum 160 pub points' },
  { value: '−85', unit: '%', label: 'Sync failures after an offline-first rebuild at Nuvo.ai' },
];

export type StepKind = 'Education' | 'Work' | 'Next';

export interface Step {
  kind: StepKind;
  current?: boolean;
  /** Big label on the top of the step. */
  year: string;
  /** Small label under the year. */
  short: string;
  when: string;
  where: string;
  title: string;
  org: string;
  body: string;
  /** Highlight tiles. TODO() entries are hidden until filled in. */
  points: string[];
  tags: string[];
}

// Bottom step first. The last step is the open one: the role you're looking for.
export const journey: Step[] = [
  {
    kind: 'Education',
    year: '2024',
    short: 'B.E. CSE',
    when: 'Graduated 2024',
    where: 'Vellore',
    title: 'B.E. Computer Science',
    org: 'Annai Mira College of Engineering',
    body: 'Where it started — computer science fundamentals, a data-science internship, a Flutter internship, and the first apps I built end to end, including a mental-health companion chatbot.',
    points: ['CGPA 8.46', 'Data Science intern · DLK Technologies, 2023', 'Flutter intern · TriPower Technology, 2024', 'Mental-health chatbot in Flutter'],
    tags: ['CS fundamentals', 'Python', 'Flutter', 'Dart'],
  },
  {
    kind: 'Work',
    year: '2024',
    short: 'Thinq24',
    when: 'Jul 2024 → Sep 2025',
    where: 'Chennai',
    title: 'Flutter Engineer',
    org: 'Thinq24 Innovations',
    body: 'Led Flutter development of the team’s flagship AI-powered HRMS, including an LLM-driven interviewer that assesses skills automatically. Named “Rising Star” four months in.',
    points: ['“Rising Star” award at 4 months', 'AI interviewer module', '3+ apps on Google Play', 'Kotlin + Swift platform plugins'],
    tags: ['Flutter', 'BLoC · GetX', 'Node.js', 'Firebase', 'GCP'],
  },
  {
    kind: 'Work',
    current: true,
    year: '2025',
    short: 'Nuvo.ai',
    when: 'Oct 2025 → now',
    where: 'Bengaluru',
    title: 'SDE-1, Flutter & AI Mobile',
    org: 'Nuvo.ai · Meril Life Sciences',
    body: 'Building the HealthJini doctor app and Business Jini for Meril Life Sciences’ digital arm: on-device voice AI for clinical workflows, offline-first data, native plugins and GitLab CI/CD that cut release time by 40%, for a user base of 10M+.',
    points: ['APK size 68 → 23 MB', 'On-device STT/TTS · 60%+ adoption in 2 months', 'Sync failures −85%', 'On-device inference −35% latency'],
    tags: ['Flutter', 'Riverpod', 'TFLite', 'ML Kit', 'Offline-first'],
  },
  {
    kind: 'Next',
    year: 'You?',
    short: 'Your team',
    when: 'Open now',
    where: 'Bengaluru · remote · abroad',
    title: 'AI Mobile Engineer',
    org: 'Your team?',
    body: 'The next step is open. I’m looking for a team building AI into mobile products — on-device models, RAG and the apps around them.',
    points: ['On-device AI', 'RAG in production', 'Flutter at scale', 'Ship fast, measure'],
    tags: ['Let’s talk'],
  },
];

export const caseStudy = {
  timeline: 'Jun 2026 → v0.2.1 (Oct 2026)',
  problem:
    'Flutter developers who want “chat with your documents” usually stand up a Python service for chunking, embeddings and vector search. That adds latency, hosting cost and — for health, finance or personal notes — a privacy problem. There was no idiomatic Dart package that did retrieval on the device.',
  constraints: [
    { title: 'Pure Dart', body: 'Runs anywhere Dart runs; no native build step for the core.' },
    { title: 'Mobile memory', body: 'Index and model must coexist with the app on mid-range phones.' },
    { title: 'Offline', body: 'Retrieval must work with no network at all.' },
    { title: 'Model-agnostic', body: 'Apps bring their own embedding and generation models.' },
  ],
  implementation:
    'TextChunker splits text into sentence-aware, overlapping chunks, and can keep paragraphs whole for Markdown and FAQs. Each chunk is embedded and kept in a VectorStore; the built-in InMemoryVectorStore does cosine search, metadata filters and MMR re-ranking for diversity, and saves to JSON with embeddings that stay stable across platforms. PromptBuilder then fits the best chunks into a character budget sized for small on-device context windows. All of it sits behind one RagEngine — addDocument, retrieve, query, queryStream — and three small interfaces, so any LLM, embedder or database plugs in.',
  snippet: `final engine = RagEngine(languageModel: MyLLM());

await engine.addDocument(
  id: 'flutter',
  text: 'Flutter is an open-source UI toolkit by Google. ...',
);

final result = await engine.query('What is Flutter?');
print(result.answer);
print(result.sourceDocumentIds); // [flutter]

// Stream tokens, filter by metadata, drop weak matches:
await for (final token in engine.queryStream(
  'What happens next?',
  where: (doc) => doc.metadata['book'] == 'A',
  minScore: 0.1,
)) {
  stdout.write(token);
}`,
  tradeoffs: [
    { title: 'Pure Dart vs. native index', body: 'Chose portability over raw search speed.' },
    { title: 'Interfaces vs. bundled models', body: 'Ships only a lexical hashing embedder, so RagEngine() works with zero setup and zero dependencies; semantic quality comes from the model you plug in.' },
    { title: 'Chunk size', body: 'Smaller chunks sharpen recall but put more vectors in memory.' },
  ],
  reliability:
    'An empty index or a zero topK returns no chunks instead of throwing, and when nothing clears minScore the prompt says “No relevant context found.” so the model can decline rather than invent an answer. Asking without a language model throws a StateError that points you to retrieve(). Mismatched embedding sizes, a chunk stored without an embedding, or a diversity value outside 0–1 fail fast with an ArgumentError.',
  // Leave value null until measured; the page shows an empty dashed box.
  metrics: [
    { label: 'Recall@k', value: null as string | null },
    { label: 'Query latency', value: null as string | null },
    { label: 'Index memory', value: null as string | null },
  ],
  next: 'Published on pub.dev at 160/160 pub points, with CI on every push. Next: hybrid keyword + vector search, a database-backed store, and recall and latency benchmarks across devices.',
};
