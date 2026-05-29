# Truvala Web

Landing page for [truvala.ai](https://truvala.ai) — an AI real estate startup making home buying clearer, smarter, and more transparent.

Built with Next.js (static export) and deployed to GitHub Pages.

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | Next.js | 16.x |
| UI | React | 19.x |
| Animation | Motion (Framer) | 12.x |
| Animation | GSAP | 3.x |
| Smooth scroll | Lenis | 1.x |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |

---

## Getting Started

This is a Node.js project. There is no Python, no virtual environment, no pip.

### Prerequisites

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **npm** (comes with Node)

Check your version:
```bash
node -v   # should be 18+
npm -v
```

### Install dependencies

```bash
npm install
```

This reads `package.json` and installs everything into `node_modules/`. Run this once after cloning, and again any time `package.json` changes.

### Run locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Hot-reloads on save.

> **Warning:** `next dev` is memory-heavy. If you have less than 16 GB RAM, the dev server may struggle. Use the deployed site for visual review when possible.

### Build for production

```bash
npm run build
```

Outputs a fully static site to `./out/`. This is what gets deployed to GitHub Pages.

---

## Project Structure

```
app/
├── components/
│   ├── AuroraBackground.tsx   # Canvas background — flowing lines + ambient blobs
│   ├── CountdownHero.tsx      # Home section: live countdown to July 20, 2026
│   ├── IntroOverlay.tsx       # Animated split-panel intro (plays once per session)
│   ├── Navbar.tsx             # Fixed top nav with hamburger on mobile
│   ├── SmoothScroller.tsx     # Lenis smooth scroll wrapper
│   ├── UpcomingSection.tsx    # Upcoming Products section
│   ├── WhatIsSection.tsx      # What is Truvala section
│   └── WhoWeAreSection.tsx    # Team section
├── globals.css                # Global styles, CSS variables, badge-pulse keyframe
├── layout.tsx                 # Root layout — fonts, metadata, AuroraBackground, Navbar
└── page.tsx                   # Single page — all sections stacked in scroll order

public/
└── ceo-matthew.png            # CEO headshot (used in WhoWeAreSection)

.github/
└── workflows/
    └── deploy.yml             # GitHub Actions: build + deploy to GitHub Pages on push to main
```

All pages are sections of a single scroll. Navigation links are anchor links (`#what-is-truvala`, `#who-are-we`, `#upcoming-products`).

---

## Deployment

The site deploys automatically on every push to `main` via GitHub Actions. No manual steps required.

The workflow:
1. Installs dependencies (`npm ci`)
2. Runs `npm run build` → generates `./out/`
3. Uploads `./out/` as a GitHub Pages artifact and deploys

The site is served at `truvala.ai` via a custom domain (configured in `public/CNAME`).

To deploy: just push to `main`.

---

## Key Constraints

- **Static export only** — `next.config.ts` sets `output: "export"`. Server-side features (`getServerSideProps`, API routes, middleware) are not available.
- **Images** — `next/image` optimization is disabled (`images: { unoptimized: true }`). Required for static export compatibility.
- **No basePath** — the site is served from the domain root via custom domain. Do not add `basePath` or `assetPrefix`.

---

## Working with the Codebase

### Adding a new section

1. Create `app/components/YourSection.tsx` as a `'use client'` component
2. Give it a wrapping `<section id="your-section">` for anchor nav
3. Import and add it to `app/page.tsx` in scroll order
4. Add a nav link in `app/components/Navbar.tsx` under `NAV_LINKS`

### Updating the countdown date

In `app/components/CountdownHero.tsx`, change the `TARGET` constant:

```ts
const TARGET = new Date('2026-07-20T09:00:00')
```

### Adding team members

In `app/components/WhoWeAreSection.tsx`, add to the `team` array:

```ts
{
  name: 'First Last',
  title: 'Role',
  photo: '/their-photo.png',  // place image in /public
  bio: 'Bio text here.',
},
```

---

## Claude

This project was built using **Claude Code** (Anthropic's CLI) with the `claude-sonnet-4-6` model.

### CLAUDE.md / AGENTS.md

`CLAUDE.md` references `AGENTS.md`, which tells Claude to read the Next.js docs in `node_modules/next/dist/docs/` before writing code. This is important because Next.js 16 has breaking changes from the version Claude was trained on.

### Tools used during development

| Tool | Purpose |
|---|---|
| `Read` / `Edit` / `Write` | File editing |
| `Bash` | Running `tsc --noEmit`, `git`, file operations |
| `mcp__playwright__*` | Browser automation for visual verification |
| `Agent (Explore)` | Codebase search when scope was unclear |

### Skills available

Install these Claude Code skills if working on the frontend:

| Skill | When to use |
|---|---|
| `impeccable` | UI redesigns, visual polish, component layout |
| `ui-ux-pro-max` | Design system decisions, responsive layout, accessibility |
| `verify` | Confirm a visual change works before pushing |
| `run` | Launch the dev server from within a Claude session |
| `code-review` | Pre-push review of a diff |

Install a skill via Claude Code:
```
/install-skill impeccable
```

### Recommended model

Use **Claude Sonnet 4.6** (`claude-sonnet-4-6`) for day-to-day work. Opus 4 for complex multi-file refactors.

### Memory

Claude Code maintains a project memory at `.claude/projects/…/memory/`. This stores context about the project, user preferences, and feedback accumulated during development. It is not committed to the repo.
