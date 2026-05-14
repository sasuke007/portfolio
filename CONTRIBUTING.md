# Contributing

Thanks for being interested in this project. This is a personal portfolio, so the bar for *new features* is intentionally narrow — but **bug reports, fixes, accessibility improvements, and small DX wins are very welcome.**

## TL;DR

1. Open an issue first for anything non-trivial. A 30-second sanity check saves both of us time.
2. Fork → branch → PR. Keep PRs focused on a single concern.
3. The site must build cleanly (`pnpm build`) and behave correctly in the browser — there's no test runner, so the dev server is the source of truth.

---

## What's in scope

✅ **Welcome contributions**
- Bug fixes — broken layouts, accessibility regressions, console errors
- Typos in `src/content.ts` or in this README
- Performance improvements with a clear before/after measurement
- Documentation clarifications in `README.md` or `CLAUDE.md`
- Dependency bumps that aren't breaking
- Build / tooling fixes (CI workflows, Next config, type errors)
- Accessibility wins — ARIA, focus management, reduced-motion paths

❌ **Out of scope**
- Visual redesigns ("make the hero blue") — design decisions are personal
- New sections / new features — please discuss in an issue first
- Switching frameworks or animation libraries
- Removing the editorial typography / serif display font
- Adding analytics, trackers, or third-party scripts

If you're unsure where your idea falls, open a [discussion or issue](https://github.com/sasuke007/portfolio/issues/new/choose) and ask.

---

## Development setup

Prerequisites: **Node 20+** and **pnpm 9+**.

```bash
git clone https://github.com/<your-fork>/portfolio.git
cd portfolio
pnpm install
pnpm dev          # → http://localhost:3000
```

The site runs end-to-end without any environment variables. The live-status navbar pills (Spotify / X / GitHub) will simply not render until their respective env vars are set; everything else works.

### Useful commands

| Command | When to use it |
| ------- | -------------- |
| `pnpm dev` | Local development |
| `pnpm build` | Run before opening a PR — must be clean |
| `pnpm start` | Sanity-check the production build |
| `pnpm doctor` | `react-doctor` over the project |
| `pnpm scan` | `react-scan` against running dev server (find unnecessary re-renders) |

There is no linter or test runner. Type checking happens via `pnpm build`.

---

## Branching & commit style

- Branch off `main`. Branch names should be descriptive: `fix/spotify-pill-mobile-tap`, `docs/clarify-lenis-setup`.
- Commit messages are **lowercase, imperative, concise** — match the style in `git log --oneline`:
  ```
  add noise-lines background; full-bleed fluid reveal with velocity-driven smear
  tune fluid reveal: faster dissipation, larger splat radius
  fix spotify pill collapse on touch outside-tap
  ```
- Keep commits focused. Refactors and feature changes shouldn't ride in the same commit.
- If a commit was AI-pair-programmed, add a `Co-Authored-By:` trailer.

---

## Pull request flow

1. Open an issue describing the bug or proposed change (link it from the PR).
2. Fork → create branch → commit → push.
3. Open a PR against `main`. Use the [PR template](./.github/PULL_REQUEST_TEMPLATE.md).
4. CI (if configured) and a manual review will run. For UI changes, attach a before/after screenshot or short screen-capture.
5. Once approved, squash-and-merge is preferred.

### What to include in your PR description

- **Summary** — one or two sentences. Focus on *why*, not just *what*.
- **Test plan** — what you did to verify the change works. For UI changes, a screenshot or short video is worth a thousand words.
- **Risk** — anything reviewers should look at carefully.

---

## Code conventions

The project is small enough that there's no formal style guide, but a few things to keep coordinated:

- **Server vs client components.** Anything that touches the DOM, `window`, refs, GSAP, or WebGL is `"use client"`. Server components are the default elsewhere.
- **GSAP namespace.** Always import from `@/lib/gsap` and call `registerGsap()` before using a plugin. Don't call `gsap.registerPlugin` directly.
- **Lenis is owned by `LenisProvider`.** Don't instantiate Lenis or add another rAF loop elsewhere.
- **Tailwind v4 is CSS-first.** Theme tokens and custom utilities live in `app/globals.css`. There is no `tailwind.config.*`.
- **Content layer.** Copy and structured data live in `src/content.ts`. Edit data there, not in components.
- **React Compiler is on.** Don't hand-wire `useMemo`/`useCallback`/`memo` for "performance" without a measured reason — the compiler handles it.
- **Imports use the `@/*` alias.** Prefer `@/components/Foo` over `../../../components/Foo`.

For deeper conventions and architecture, read [CLAUDE.md](./CLAUDE.md).

---

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser + OS
- Screenshots / console errors if any

## Reporting security vulnerabilities

**Do not open a public issue.** See [SECURITY.md](./SECURITY.md) for the responsible disclosure flow.

---

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be kind; assume good faith.

---

Thanks again. Even a typo fix is appreciated. 🙏
