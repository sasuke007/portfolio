# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm doctor` — run `react-doctor` over the project
- `pnpm scan` — run `react-scan` against a running dev server at localhost:3000

There is no test runner, linter, or formatter configured. Type checking happens via Next's build (`tsconfig.json` sets `noEmit: true`, `strict: true`).

## Architecture

Single-page personal portfolio. The whole site is composed in `app/page.tsx` as a vertical stack of section components imported from `src/components/`. There is no router beyond Next's App Router root and no backend — everything is static.

### Stack

- **Next.js 16** (App Router) with the **React Compiler** enabled in `next.config.mjs` (`reactCompiler: true`) — do not hand-wire `useMemo`/`useCallback`/`memo` for performance unless there is a measured reason.
- **React 19** + TypeScript strict mode. Path alias `@/*` → `src/*`.
- **Tailwind CSS v4** configured **CSS-first** in `app/globals.css` via `@theme { … }` — there is no `tailwind.config.*`. Design tokens (`--font-display`, `--color-bg`, `--text-display`, etc.) and custom utility classes (`.dot-grid`, `.label-micro`, `.marquee-left`, `.body-editorial`, …) all live in `globals.css`.
- **GSAP + ScrollTrigger** for animation, **Lenis** for smooth scrolling.
- `next/font` loads Cormorant Garamond (display) and Inter (body) and exposes them as the CSS vars referenced by the Tailwind theme.
- `next.config.mjs` sets `images.unoptimized: true` — `<Image />` will not optimize.

### Animation / scroll architecture

Three pieces work together and must stay coordinated:

1. **`src/lib/gsap.ts`** is the single source for the GSAP namespace. It exports `gsap`, `ScrollTrigger`, and an idempotent `registerGsap()`. Any component that touches `gsap` or `ScrollTrigger` should import from `@/lib/gsap` and call `registerGsap()` before using a plugin — never call `gsap.registerPlugin` directly.
2. **`src/components/LenisProvider.tsx`** wraps `<main>` in `app/layout.tsx`. It instantiates Lenis, pipes `lenis.on("scroll", ScrollTrigger.update)`, and drives `lenis.raf` from `gsap.ticker` (with `lagSmoothing(0)`). This is the only place that should own that wiring — do not instantiate Lenis or add another rAF loop elsewhere.
3. Section components (`Hero`, `Projects`, `Journal`, …) use `useGSAP` from `@gsap/react` with a `scope` ref, and build `ScrollTrigger` timelines that pin/scrub against their own section refs. Hero in particular uses a 400vh section with a sticky inner viewport and a scrubbed timeline — preserve that pattern when editing it.

### Content layer

All copy and structured data (identity, socials, tech list, projects, experience, achievements, journal photos, tools list, nav links) live in **`src/content.ts`** with TypeScript types co-located. Sections consume these exports — edit copy/data here, not in components.

### Visual / effect components

- **`FluidPhotoReveal.tsx`** — custom WebGL fluid simulation (Navier–Stokes style: advect / divergence / pressure / curl FBOs) that reveals a photo through pointer-driven dye splats. It exposes a large prop surface (`simResolution`, `densityDissipation`, `splatRadius`, `distortionScale`, …) for tuning. Used by `Hero`.
- **`NoiseLinesBackground.tsx`** — full-bleed WebGL background with a simplex-noise GLSL field. Mounted once in `app/layout.tsx` as a fixed, pointer-events-none layer behind everything.
- **`CustomCursor.tsx`** — a JS cursor. `LenisProvider` adds `cursor-custom` to `<body>` on mount, and `globals.css` hides the native cursor only at `@media (pointer: fine)`; coarse pointers fall back to the system cursor.

### Dev-only tooling

`src/components/dev/DevTools.tsx` is mounted in `app/layout.tsx` and conditionally imports `react-scan` and `react-grab` at runtime when `process.env.NODE_ENV === "development"`. Keep dev-only imports inside that gate so they tree-shake out of production.

### Conventions

- Anything that touches the DOM, `window`, refs, GSAP, or WebGL is a `"use client"` component. Server components are the default elsewhere.
- VS Code is configured (`.vscode/settings.json`) to prefer non-relative imports — use `@/...` paths over `../../...`.
- `.vscode/launch.json` contains ready-made Next.js debug configurations (server-side, client-side Chrome/Edge, attach, full-stack compound).
