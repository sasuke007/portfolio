<div align="center">

# `RP` &nbsp;Rohit Pandit — Portfolio

**Editorial, motion-led personal site for a Full Stack Engineer & AI Product Builder.**

[![Live](https://img.shields.io/badge/live-anestheticcoder.dev-1a1a1a?style=flat-square)](https://anestheticcoder.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-f0c040?style=flat-square)](./LICENSE)

[Live site](https://anestheticcoder.dev) · [Resume](./public/resume.pdf) · [Architecture notes](./CLAUDE.md)

</div>

---

## What this is

A single-page portfolio composed in `app/page.tsx` as a vertical stack of editorial sections — hero, projects, experience, journal, contact — with carefully tuned motion (Lenis smooth scroll + GSAP ScrollTrigger) and live status signals (Spotify "now playing", latest tweet, latest commit) in the navbar.

It's intentionally one page, intentionally static, and intentionally distinctive.

### Highlights

- **Editorial typography** — Cormorant Garamond display + Inter body, CSS-first Tailwind v4 theme tokens in `app/globals.css`.
- **WebGL hero** — pointer-driven fluid simulation (Navier-Stokes style) reveals a photo through dye splats. See `src/components/FluidPhotoReveal.tsx`.
- **Noise-lines backdrop** — fixed-layer simplex-noise GLSL field rendered once in the root layout.
- **Live status pills** — Spotify (polls every 60s), X (3h cache), GitHub (5m cache). All server-cached via Next route handlers; tokens never touch the client. See [Live status integrations](#-live-status-integrations).
- **Custom cursor** — JS-driven, replaces the native cursor on fine-pointer devices; gracefully falls back on touch.
- **shadcn/ui + Radix** — tooltips and any future primitives are headless + themed inline.

---

## Stack

| Layer | Choice |
| ----- | ------ |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Compiler enabled) |
| UI | [React 19](https://react.dev) + TypeScript (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config in `globals.css`, no `tailwind.config.*`) |
| Animation | [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll |
| Primitives | [shadcn/ui](https://ui.shadcn.com) on [Radix](https://www.radix-ui.com) |
| Validation | [Zod](https://zod.dev) for API response schemas |
| Fonts | `next/font` — Cormorant Garamond (display), Inter (body), Geist (sans) |
| Package manager | `pnpm` |

---

## Quick start

```bash
# 1. clone
git clone https://github.com/sasuke007/portfolio.git
cd portfolio

# 2. install
pnpm install

# 3. env — optional for the live-status pills (skip and they'll just not render)
cp .env.example .env.local
# fill in SPOTIFY_*, X_*, GITHUB_* if you want the navbar pills live

# 4. dev server
pnpm dev
# → http://localhost:3000

# 5. production build
pnpm build && pnpm start
```

### Commands

| Command | Purpose |
| ------- | ------- |
| `pnpm dev` | Next dev server on `:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm doctor` | `react-doctor` over the project |
| `pnpm scan` | `react-scan` against running dev server |

Type checking is wired into `pnpm build` (`tsconfig.json` has `noEmit: true`, `strict: true`). There is no separate linter / formatter / test runner.

---

## Project structure

```
app/
  page.tsx              ← the entire site, composed as a vertical stack
  layout.tsx            ← root layout: providers, navbar, noise background
  globals.css           ← Tailwind v4 @theme tokens, custom utilities
  api/
    now-playing/        ← Spotify currently-playing route handler (s-maxage=30)
    x/latest/           ← X latest tweet (s-maxage=10800)
    github/latest/      ← GitHub latest commit (s-maxage=300)
src/
  components/           ← Hero, Projects, Journal, Navbar, status pills, etc.
    ui/tooltip.tsx      ← shadcn-installed Radix tooltip primitive
  content.ts            ← all copy + structured data (identity, projects, …)
  lib/
    gsap.ts             ← single GSAP namespace; call registerGsap() before plugin use
    spotify*.ts         ← server-only fetch + Zod schemas
    x*.ts               ← server-only fetch + Zod schemas
    github*.ts          ← server-only fetch + Zod schemas
public/
  assets/               ← social icon SVGs (Spotify, X, GitHub, LinkedIn, email)
CLAUDE.md               ← deeper architecture notes for contributors / AI agents
```

---

## Live status integrations

The navbar's right cluster shows three live signals. The architectural pattern is identical for each: **browser → our Next route handler → upstream API**. Tokens stay server-side.

```
┌────────────┐    ┌────────────────────┐    ┌──────────────────┐
│  Browser   │───▶│  /api/now-playing  │───▶│  Spotify API     │
│  (poll)    │    │  (edge-cached 30s) │    │  + token refresh │
└────────────┘    └────────────────────┘    └──────────────────┘
```

| Pill | Route | Cache (`s-maxage`) | Poll interval | Auth |
| ---- | ----- | ------------------ | ------------- | ---- |
| Spotify | `/api/now-playing` | 30s | 60s | OAuth refresh-token flow |
| X | `/api/x/latest` | 3h | 3h + visibility | App-only Bearer token |
| GitHub | `/api/github/latest` | 5m | 5m | Personal access token |

Each pill renders as a 32px collapsed icon and slides open on hover to reveal the live content. They're all defensive — if upstream errors, the pill simply doesn't render and the navbar collapses gracefully.

See `src/lib/spotify.ts`, `src/lib/x.ts`, `src/lib/github.ts` for the patterns.

---

## Environment variables

All variables are **server-only**. None are exposed to the browser; the route handlers proxy every upstream call.

```bash
# .env.local — never commit this file (it's gitignored)

# Spotify — Now Playing
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# X — Latest Tweet
X_BEARER_TOKEN=
X_USER_ID=
X_HANDLE=

# GitHub — Latest Commit
GITHUB_TOKEN=
GITHUB_USERNAME=
```

If any variable is missing, the corresponding pill returns `null` from its data layer and the navbar gracefully omits it. There's no hard requirement to set any of these to run the site.

---

## Architecture notes

For deeper architecture detail — the GSAP / Lenis / ScrollTrigger contract, the content-as-data pattern in `src/content.ts`, how the dev-only tooling tree-shakes, and the conventions for client vs server components — see [`CLAUDE.md`](./CLAUDE.md).

Three rules to keep coordinated when editing:

1. **GSAP namespace.** Always import from `@/lib/gsap` and call `registerGsap()` before using a plugin. Never call `gsap.registerPlugin` directly.
2. **Lenis.** Instantiated once in `LenisProvider`, which drives `lenis.raf` from `gsap.ticker` with `lagSmoothing(0)`. Do not start another rAF loop or instantiate Lenis elsewhere.
3. **Content layer.** Copy and structured data live in `src/content.ts`. Edit data there, not in components.

---

## Contributing

Issues, suggestions, and PRs are welcome — even though this is a personal site. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution flow, and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community norms. Security reports go to [SECURITY.md](./SECURITY.md).

If you're forking this as a starting point for your own portfolio: go for it. The MIT license below permits it, no attribution required (though a star is appreciated).

---

## Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com)** — for the Radix-on-top-of-Tailwind pattern that lets headless behavior coexist with bespoke design.
- **[Lenis](https://github.com/darkroomengineering/lenis)** — for smooth scrolling that doesn't feel like a hack.
- **[GSAP](https://gsap.com)** — for the animation primitives that make scroll-pinned hero sections feel inevitable.
- The fluid-simulation hero borrows ideas from Pavel Dobryakov's [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), rewritten in TypeScript and adapted to a photo-reveal use case.

---

## License

[MIT](./LICENSE) © Rohit Pandit
