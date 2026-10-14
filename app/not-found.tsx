import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-page flex-col justify-center gap-6 px-8">
      <p className="font-mono text-sm text-faint">404</p>
      <h1 className="text-5xl font-semibold tracking-tight">This page isn’t in the index.</h1>
      <Link href="/" className="w-fit rounded-xl bg-accent px-6 py-3 font-semibold text-bg no-underline">Go to the home page</Link>
    </main>
  );
}
