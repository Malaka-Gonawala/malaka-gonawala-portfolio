---
name: project-conventions
description: House rules for Malaka's portfolio (malakagonawala.dev). Use whenever writing, styling, reviewing or planning any part of the site, its components, copy or assets.
user-invocable: false
---

# Portfolio project conventions

The full rulebook is `docs/rules/rules.md`. Strict rules (S) are never broken; Necessary rules (N) only with a written reason. This skill is the short version for day-to-day site work. Where they differ, `docs/rules/rules.md` wins.

## Before coding

- **No site code until Malaka says go** (S1). "Continue" or "ok" is not a go.
- **Stack is decided** (S6): React + Vite with prerendering, no backend, static on GitHub Pages, domain malakagonawala.dev. Tailwind, shadcn and GSAP are still open (checklist 3.8-3.10). Don't assume them until they're decided.
- **Preview first** (S21): show today vs the expected result before building. For visual work, use the labelled grid like `plan/examples/preview-grid-example.png`, with phone 390 dark, phone 390 light and desktop 1280 rows. Mark one option [REC] (S22).

## Look

- **Fonts:** Melodrama for headings, Nunito for body text (O1). Ship only woff2, in the weights actually used. The files are in `/mnt/project-files/portfolio-archive/fonts/`.
- **Colour:** the old dark brown + gold palette is temporary. Ask Malaka before building on any palette (N9). Once one is chosen, use tokens (CSS custom properties) and never raw hex in components.
- **No skill proficiency bars** (O7).
- **Responsive from the start.** The old site overflowed on phones. Check 390 px and 1280 px.

## Content

- **Never invent content** (S9). Malaka's own copy is carried over word for word. No made-up testimonials, stats, clients, emails or project details. Mark any placeholder clearly and flag it to Malaka.
- **Private details stay private** (S19): no phone, address or personal email without Malaka's OK.
- **Reuse the archive** (O2): `/mnt/project-files/portfolio-archive/` has the About copy, hero copy, project notes, links, images and resume.

## Quality bar

- **Accessibility** (N14): semantic HTML, alt text, visible keyboard focus, AA contrast, logical heading order, and `prefers-reduced-motion` support for every animation (GSAP, React Bits).
- **Performance** (N15): optimised images, only the font weights used, Lighthouse 90+ before merge.
- **No trackers or third-party scripts** (S18). No CDN script may break the page if it fails to load.
- **Licensed assets only** (S20). Note the source of every font, image, icon and component.
- **No new npm package without a one-line reason** in the PR (N16).
- **Before every code PR** (N13): build, lint and tests pass. Visual changes get phone and desktop screenshots, using the preinstalled Node Playwright + Chromium (O4).

## Repo

- React Bits components stay in the temporary `components.js/` folder until shadcn is set up (O3).
- Don't touch `CNAME` (it keeps malakagonawala.dev online) or hand-edit `package-lock.json`. A hook blocks both.
- One task per branch and PR (O8). Only Malaka merges (S14).
