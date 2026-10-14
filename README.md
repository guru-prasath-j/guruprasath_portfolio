# guruprasath-portfolio

Personal portfolio of **Guruprasath J**, AI Mobile Engineer. It's a dark, motion-led site with:

- a live **3D embedding space** in the hero. It's drawn on a 2D canvas (no WebGL), and a query point retrieves its top-5 neighbours.
- an **exploded 3D stack** for `on_device_rag`. Hover over it on desktop, or tap the button on touch screens.
- **tilt-to-cursor** project cards, a scrolling stack marquee, and CSS-only scroll reveals.
- a case-study page with a **3D animated pipeline** and a reading-progress bar.

All motion stops when the visitor's device asks for reduced motion. Without JavaScript, the content still renders fully.

**Stack:** Next.js 14 (App Router, static export), TypeScript, Tailwind CSS, Vitest. There's no animation library; motion is CSS plus one canvas.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # content checks + list of remaining placeholders
npm run build      # static site in ./out
```

## Edit content

All copy, links and projects live in [`lib/content.ts`](lib/content.ts).

- Values written as `TODO('…')` are placeholders. The UI hides them, so no dead links or "TODO" text ships, and `npm test` prints the list of what's left.
- Case-study metrics stay `null` until you've measured them. The page then shows an empty dashed box instead of a made-up number.
- Put your resume at `public/Guruprasath_J_Resume.pdf`.
- Design tokens (colours and fonts) are in [`tailwind.config.ts`](tailwind.config.ts). Motion lives in [`app/globals.css`](app/globals.css).

## Deploy (GitHub Pages)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds, type-checks, tests and publishes on every push to `main`.

1. Create the repo **`guru-prasath-j.github.io`**, so the site lives at `https://guru-prasath-j.github.io`.
2. Push this code to `main`.
3. In the repo, go to **Settings → Pages → Source** and select **GitHub Actions**.

**Using a different repo name** (for example `portfolio`): set `BASE_PATH: "/portfolio"` in the workflow, and change `site.url` in `lib/content.ts` to match.

## Structure

```
app/                    pages, layout (SEO + Open Graph), sitemap, robots, 404
  work/on-device-rag/   case study
components/             EmbeddingCloud, ExplodedStack, TiltCard, Pipeline, Marquee, Nav…
lib/content.ts          every word on the site
tests/                  Vitest content checks
```
