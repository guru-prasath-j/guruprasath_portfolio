# guruprasath-portfolio

Personal portfolio of **Guruprasath J**, AI Mobile Engineer. It's a dark, motion-led site with:

- a **particle sculpture** hero: about 2,400 points morph between "AI", a phone, a neural network, a chat bubble, a spinning wireframe globe and "GP". It autoplays every 5 seconds, has play/pause and shape buttons, moves aside when you push it with the cursor, and scatters when you click.
- a **headline with real depth**. It tilts toward the cursor, and its extrusion falls away from it as if the cursor were a light.
- a **working 3D stack** for `on_device_rag`: a scanned vector store, the top-5 matches glowing, beams carrying them up through context and model to the Flutter screen. It breathes on its own, opens on hover, and has a "Hold it open" button.
- a **custom cursor** (dot plus ring) that shows *drag*, *turn*, *play*, *view* or *explode* over interactive pieces, and a **click burst** of points on every click.
- a **3D phone** that streams an on-device chat answer, a draggable **3D skill cube**, lab cards that **flip up in 3D** and tilt to the cursor, a perspective grid floor, a cursor glow, magnetic buttons and counting numbers, a **demo theatre** (every project has a ▶ Watch demo that replays it on the 3D phone; scripts live in `lib/demos.ts`, deep-linkable as `#demo-<slug>`), and a **3D career staircase** for the journey (the top step is left open for the next team).
- a case study with a **3D chunking scene**, a **3D animated pipeline** and a reading-progress bar.

All motion stops when the visitor's device asks for reduced motion (the hero starts paused, with ▶ to play). The custom cursor only appears on devices with a mouse. Without JavaScript, the content still renders fully.

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

The site lives at **https://guru-prasath-j.github.io/guruprasath_portfolio/**. It's a project site, so the workflow builds with `BASE_PATH=/guruprasath_portfolio`, and `site.url` in `lib/content.ts` matches.

One-time setup: in the repo, go to **Settings → Pages → Source** and select **GitHub Actions**.

**Moving to a user site:** if you move the code to a repo named `guru-prasath-j.github.io`, set `BASE_PATH: ""` in the workflow and `site.url` to `https://guru-prasath-j.github.io`.

To try the sub-path build locally:

```bash
BASE_PATH=/guruprasath_portfolio npm run build
npx serve out   # then open the URL it prints + /guruprasath_portfolio/
```

## Recruiter-friendly extras

- **Hire card** under the hero: roles, experience, location, notice period, proof, and resume / email / LinkedIn buttons. Edit `hire` in `lib/content.ts`.
- **Recruiter view** at `/recruiter/`: one plain, printable page with no animation.
- **Skills, with proof**: each skill linked to where it's used (`skillsProof` in `lib/content.ts`).
- **Phone contact bar**: Email + Resume pinned to the bottom on phones once you scroll past the hero.
- **Link preview**: `public/og.png` (1200 × 630) is used for Open Graph and Twitter cards on every page.

## Live pub.dev stats

`npm run build` first runs `scripts/fetch-stats.mjs`, which reads the 30-day download count from
`https://pub.dev/api/packages/<name>/score` and saves it to `lib/stats.json`. If pub.dev can't be reached,
the last saved number is kept. The deploy workflow also rebuilds once a day, so the number stays current.
Run `npm run fetch-stats` to refresh it locally.

## Structure

```
app/                    pages, layout (SEO + Open Graph), sitemap, robots, 404
  work/on-device-rag/   case study
components/             EmbeddingCloud, ExplodedStack, TiltCard, Pipeline, Marquee, Nav…
lib/content.ts          every word on the site
tests/                  Vitest content checks
```
