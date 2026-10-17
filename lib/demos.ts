// Scripted replays for the demo theatre. Each project gets a two-line phrase and three scenes.
// A scene is a list of screen items; they appear one after another on the phone.
// Add a project: give it a slug that matches lib/content.ts and write its three scenes.

export type Tone = 'ok' | 'warn' | 'info';

export type Item =
  | { kind: 'bar'; title: string; sub?: string }
  | { kind: 'user'; text: string }
  | { kind: 'ai'; text: string; source?: string }
  | { kind: 'row'; title: string; sub?: string; right?: string }
  | { kind: 'chip'; text: string; tone?: Tone }
  | { kind: 'toast'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'btn'; text: string }
  | { kind: 'banner'; text: string }
  | { kind: 'tabs'; text: string }
  | { kind: 'card'; title: string; sub?: string }
  | { kind: 'hinge' }
  | { kind: 'split'; left: string[]; right: string[] }
  | { kind: 'qr'; caption: string };

export interface Scene {
  caption: string;
  offline?: boolean;
  items: Item[];
}

export interface Demo {
  slug: string;
  group: 'Packages' | 'Apps & agents';
  kind: string;
  phrase: [string, string];
  offline?: boolean;
  scenes: Scene[];
}

export const demos: Demo[] = [
  {
    slug: 'on-device-rag', group: 'Packages', kind: 'Dart package', offline: true,
    phrase: ['Your documents,', 'searched on the phone.'],
    scenes: [
      { caption: 'Add a document — it’s chunked and embedded on the phone.', items: [
        { kind: 'bar', title: 'Docs', sub: 'on-device index' },
        { kind: 'row', title: 'lease_agreement.pdf', sub: '12 pages', right: '✓' },
        { kind: 'chip', text: 'chunking · 48 overlapping chunks' },
        { kind: 'chip', text: 'embedding · stored in the local index' },
        { kind: 'toast', text: 'Indexed on device' },
      ] },
      { caption: 'Ask a question — the top-5 chunks are retrieved locally.', items: [
        { kind: 'bar', title: 'Docs', sub: 'ask your documents' },
        { kind: 'user', text: 'What does clause 4 say?' },
        { kind: 'chip', text: 'top-5 chunks · p.4, p.4, p.5, p.2, p.9' },
        { kind: 'chip', text: 'context built · fits the model’s window' },
      ] },
      { caption: 'The answer cites its source. Nothing left the device.', items: [
        { kind: 'bar', title: 'Docs', sub: 'ask your documents' },
        { kind: 'user', text: 'What does clause 4 say?' },
        { kind: 'ai', text: 'Either side can end the agreement with 30 days’ written notice.', source: 'source · page 4' },
        { kind: 'chip', text: '0 network calls', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'flutter-accessibility-scanner', group: 'Packages', kind: 'Dart package',
    phrase: ['Accessibility bugs,', 'caught before users are.'],
    scenes: [
      { caption: 'A normal checkout screen in a debug build.', items: [
        { kind: 'bar', title: 'Checkout', sub: 'debug build' },
        { kind: 'row', title: 'Wireless earbuds', sub: 'Midnight · 1 pair', right: '₹2,499' },
        { kind: 'row', title: 'Free delivery by Friday', sub: 'Standard' },
        { kind: 'btn', text: 'Pay ₹2,499' },
      ] },
      { caption: 'The overlay walks the render tree and flags each failure.', items: [
        { kind: 'bar', title: 'Checkout', sub: 'scanning the render tree…' },
        { kind: 'chip', text: 'Image has no label', tone: 'warn' },
        { kind: 'chip', text: 'Contrast 2.9 : 1 — needs 4.5 : 1', tone: 'warn' },
        { kind: 'chip', text: 'Tap target 32 × 32 — needs 48 × 48', tone: 'warn' },
        { kind: 'btn', text: 'Pay ₹2,499' },
      ] },
      { caption: 'Every issue comes with a severity, a location and a fix.', items: [
        { kind: 'bar', title: 'Scan report', sub: '3 issues' },
        { kind: 'row', title: 'Unlabeled image', sub: 'checkout_page.dart:42', right: 'High' },
        { kind: 'code', text: "Semantics(label: 'Wireless earbuds',\n  child: Image.asset(...))" },
        { kind: 'chip', text: 'Also runs as a widget test or a CI gate', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'offline-cache-sync', group: 'Packages', kind: 'Dart package',
    phrase: ['No signal?', 'No problem.'],
    scenes: [
      { caption: 'The network drops. The app keeps working.', offline: true, items: [
        { kind: 'banner', text: 'No connection — changes are saved on the phone' },
        { kind: 'bar', title: 'Orders', sub: 'today' },
        { kind: 'row', title: 'Order #1042', sub: 'Asha · 2 items', right: 'Paid' },
        { kind: 'chip', text: 'queued in the outbox · 1 change' },
      ] },
      { caption: 'Reads come from the cache; writes wait in a durable outbox.', offline: true, items: [
        { kind: 'banner', text: 'No connection — changes are saved on the phone' },
        { kind: 'row', title: 'Order #1042', sub: 'Asha · 2 items', right: '◷ pending' },
        { kind: 'row', title: 'Order #1041', sub: 'Ravi · 1 item', right: 'Paid' },
        { kind: 'chip', text: 'survives an app restart' },
      ] },
      { caption: 'Back online: the outbox syncs once, with idempotent retries.', items: [
        { kind: 'bar', title: 'Orders', sub: 'today' },
        { kind: 'row', title: 'Order #1042', sub: 'Asha · 2 items', right: '✓ synced' },
        { kind: 'row', title: 'Order #1041', sub: 'Ravi · 1 item', right: 'Paid' },
        { kind: 'toast', text: 'Synced 1 change · no duplicates' },
      ] },
    ],
  },
  {
    slug: 'iphone-duo-adapt', group: 'Packages', kind: 'Dart package',
    phrase: ['One app,', 'every fold.'],
    scenes: [
      { caption: 'Folded: a normal phone layout with a bottom bar.', items: [
        { kind: 'bar', title: 'Inbox', sub: '3 unread' },
        { kind: 'row', title: 'Design review', sub: 'Tomorrow, 10 am' },
        { kind: 'row', title: 'Release notes', sub: 'v1.4 is out' },
        { kind: 'tabs', text: 'Inbox · Search · Settings' },
      ] },
      { caption: 'Unfolded: the bar becomes a side rail and the list gets a detail pane.', items: [
        { kind: 'split', left: ['Inbox', 'Design review', 'Release notes'], right: ['Design review', 'Tomorrow, 10 am — bring the latest build.'] },
      ] },
      { caption: 'Tabletop posture: content on top, controls below the hinge.', items: [
        { kind: 'card', title: 'Design review', sub: 'Tomorrow, 10 am' },
        { kind: 'hinge' },
        { kind: 'btn', text: 'Reply' },
        { kind: 'chip', text: 'fold-aware, from one line of setup', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'flutter-ios-bridge-mcp', group: 'Packages', kind: 'MCP server · PyPI',
    phrase: ['iOS builds,', 'no Mac required.'],
    scenes: [
      { caption: 'From Windows or Linux, ask your AI agent to ship.', items: [
        { kind: 'bar', title: 'AI agent', sub: 'connected to flutter-ios-bridge' },
        { kind: 'user', text: 'Ship 1.4.0 to TestFlight' },
      ] },
      { caption: 'The agent drives the iOS pipeline through the MCP server.', items: [
        { kind: 'bar', title: 'AI agent', sub: 'working…' },
        { kind: 'chip', text: 'build ipa on a macOS runner' },
        { kind: 'chip', text: 'sign via App Store Connect API' },
        { kind: 'chip', text: 'upload to TestFlight' },
      ] },
      { caption: 'The build lands on testers’ iPhones.', items: [
        { kind: 'bar', title: 'TestFlight' },
        { kind: 'row', title: 'MyApp 1.4.0 (12)', sub: 'Ready to test', right: 'Install' },
        { kind: 'toast', text: 'No Mac needed' },
      ] },
    ],
  },
  {
    slug: 'feeledger', group: 'Apps & agents', kind: 'Native Android + iOS', offline: true,
    phrase: ['Fees collected,', 'books kept private.'],
    scenes: [
      { caption: 'See who owes what this month.', items: [
        { kind: 'bar', title: 'Students', sub: 'October' },
        { kind: 'row', title: 'Aarav', sub: 'Maths · Mon, Wed', right: '₹1,500 due' },
        { kind: 'row', title: 'Meera', sub: 'Physics · Tue', right: 'Paid' },
        { kind: 'row', title: 'Kabir', sub: 'Maths · Fri', right: '₹1,200 due' },
      ] },
      { caption: 'Tap a student to show a UPI QR for the exact amount.', items: [
        { kind: 'bar', title: 'Collect fee', sub: 'Aarav · October' },
        { kind: 'qr', caption: 'Scan to pay ₹1,500' },
      ] },
      { caption: 'Mark it paid — the entry is stored encrypted, with no server.', items: [
        { kind: 'bar', title: 'Ledger', sub: 'October' },
        { kind: 'row', title: 'Aarav · ₹1,500', sub: 'UPI · today', right: '✓' },
        { kind: 'chip', text: 'fields encrypted with the device keystore', tone: 'ok' },
        { kind: 'chip', text: 'no INTERNET permission', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'brainsync-ai', group: 'Apps & agents', kind: 'Flutter + FastAPI',
    phrase: ['Chapters in,', 'flashcards out.'],
    scenes: [
      { caption: 'Upload a chapter as a PDF.', items: [
        { kind: 'bar', title: 'Library', sub: 'Biology' },
        { kind: 'row', title: 'Chapter 3 · Cells.pdf', sub: '18 pages', right: 'uploading…' },
        { kind: 'chip', text: 'ingesting in the background' },
      ] },
      { caption: 'It becomes a summary and a deck of flashcards.', items: [
        { kind: 'bar', title: 'Chapter 3 · Cells', sub: 'flashcards' },
        { kind: 'card', title: 'What do mitochondria produce?', sub: 'tap to flip' },
        { kind: 'chip', text: '24 cards generated', tone: 'ok' },
      ] },
      { caption: 'Ask anything — answers are grounded in the chapter.', items: [
        { kind: 'bar', title: 'Chat', sub: 'Chapter 3' },
        { kind: 'user', text: 'Why is ATP called energy currency?' },
        { kind: 'ai', text: 'Cells spend ATP to power most reactions, then recharge it.', source: 'from page 7' },
      ] },
    ],
  },
  {
    slug: 'pocketmind', group: 'Apps & agents', kind: 'Flutter · on-device LLM', offline: true,
    phrase: ['Answers in', 'airplane mode.'],
    scenes: [
      { caption: 'Airplane mode is on.', items: [
        { kind: 'banner', text: 'Airplane mode' },
        { kind: 'bar', title: 'PocketMind', sub: 'notes · 42 files' },
      ] },
      { caption: 'Ask a question about your notes.', items: [
        { kind: 'banner', text: 'Airplane mode' },
        { kind: 'user', text: 'Summarise my lab report' },
        { kind: 'chip', text: 'retrieving from the local index…' },
      ] },
      { caption: 'A quantized model answers on the phone — zero network calls.', items: [
        { kind: 'banner', text: 'Airplane mode' },
        { kind: 'user', text: 'Summarise my lab report' },
        { kind: 'ai', text: 'Values are in range except Vitamin D, which page 2 flags as low.', source: 'from lab_report.pdf' },
        { kind: 'chip', text: '0 network calls', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'ai-code-review-agent', group: 'Apps & agents', kind: 'LangGraph agent',
    phrase: ['Reviews that', 'write themselves.'],
    scenes: [
      { caption: 'A pull request is opened.', items: [
        { kind: 'bar', title: 'PR #42', sub: 'Add caching layer' },
        { kind: 'row', title: 'cache.py', right: '+86 −4' },
        { kind: 'row', title: 'api.py', right: '+12 −2' },
      ] },
      { caption: 'The agent picks its own tools to check the change.', items: [
        { kind: 'bar', title: 'Review agent', sub: 'thinking…' },
        { kind: 'chip', text: 'semantic repo search · 3 related files' },
        { kind: 'chip', text: 'Semgrep · 1 finding', tone: 'warn' },
        { kind: 'chip', text: 'pytest · 18 passed', tone: 'ok' },
      ] },
      { caption: 'It posts the review on the PR.', items: [
        { kind: 'bar', title: 'PR #42', sub: 'review' },
        { kind: 'ai', text: 'Invalidate the cache on write — stale reads at cache.py:88.', source: 'review agent' },
        { kind: 'chip', text: 'tracks which suggestions get accepted' },
      ] },
    ],
  },
  {
    slug: 'self-healing-rag-eval', group: 'Apps & agents', kind: 'LangGraph · research',
    phrase: ['It checks', 'its own answers.'],
    scenes: [
      { caption: 'A first answer comes back.', items: [
        { kind: 'bar', title: 'Ask', sub: 'docs' },
        { kind: 'user', text: 'How do refunds work?' },
        { kind: 'ai', text: 'Refunds are processed.', source: 'draft' },
      ] },
      { caption: 'A critic scores it as weak and re-retrieves.', items: [
        { kind: 'bar', title: 'Critic' },
        { kind: 'chip', text: 'grounding score 0.42 — too low', tone: 'warn' },
        { kind: 'chip', text: 're-retrieving with a rewritten query' },
      ] },
      { caption: 'The retry is grounded and passes.', items: [
        { kind: 'bar', title: 'Ask', sub: 'docs' },
        { kind: 'user', text: 'How do refunds work?' },
        { kind: 'ai', text: 'Refunds reach the original card within 5–7 working days.', source: 'policy.md · §3' },
        { kind: 'chip', text: 'grounding score 0.91 ✓', tone: 'ok' },
      ] },
    ],
  },
  {
    slug: 'gmail-ai-assistant', group: 'Apps & agents', kind: 'Flutter + Ollama',
    phrase: ['Replies that', 'sound like you.'],
    scenes: [
      { caption: 'An email arrives.', items: [
        { kind: 'bar', title: 'Inbox' },
        { kind: 'row', title: 'Priya', sub: 'Can we move the call to Thursday?', right: '10:12' },
      ] },
      { caption: 'A local model drafts a reply in your voice.', items: [
        { kind: 'bar', title: 'Reply', sub: 'Priya' },
        { kind: 'chip', text: 'drafting with Llama 3 · on your machine' },
      ] },
      { caption: 'Review the draft and send.', items: [
        { kind: 'bar', title: 'Reply', sub: 'Priya' },
        { kind: 'ai', text: 'Thursday works — 4 pm? I’ll send an invite.', source: 'draft in your voice' },
        { kind: 'btn', text: 'Send' },
      ] },
    ],
  },
];

export const demoBySlug = (slug: string) => demos.find((d) => d.slug === slug);
