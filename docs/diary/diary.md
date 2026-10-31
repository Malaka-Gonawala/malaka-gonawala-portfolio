---
title: "My Portfolio Website"
subtitle: "Project Diary"
author: "Malaka Gonawala"
date: "Started 30 October 2026"
---

# Project Overview {.front}

## Goal

Build a brand-new personal portfolio website from scratch, replacing the old half-finished site. There is no hard deadline; the aim is to have something working within about two weeks of 30 October 2026.

## Owner

Malaka Gonawala (GitHub: Malaka-Gonawala)

## Repository and domain

- **Repository:** [github.com/Malaka-Gonawala/malaka-gonawala-portfolio](https://github.com/Malaka-Gonawala/malaka-gonawala-portfolio)
- **Domain:** malakagonawala.dev, hosted on GitHub Pages
- **Plan:** the new site is built on a fresh, empty branch of the same repo and swapped in as `main` when ready, so the live site keeps running meanwhile.

## Tech stack

| Area | Choice | Status |
|---|---|---|
| Framework | React with Vite, prerendered for SEO | Decided |
| Styling | Tailwind | Open (Phase 3) |
| UI components | shadcn, plus 21st.dev Magic and React Bits as sources | shadcn open (Phase 3) |
| Animation | GSAP | Open (Phase 3) |
| Contact | Custom letter-style form plus a visible email (malaka@malakagonawala.dev, forwarded to Gmail) | Decided |
| Hosting | Static site on GitHub Pages via GitHub Actions, no backend | Decided |
| Fonts | Melodrama (headings), Nunito (body), self-hosted woff2 | Archived |
| Palette | Dark brown and gold (temporary, to be replaced) | Needs a new palette |

## Site sections (planned)

Hero, About, Skills, Projects (ForTheRoot, Cavalleria su Due Ruote, Russian Roulette in Java), Lab, Resume, Contact, Footer. Separate pages: Resume, Privacy, Accessibility statement. The final site map is set in Phase 3.

## Project phases

1. Tools (done 31 October)
2. Grill (done 31 October, brief approved)
3. Planning
4. Design and prototype
5. Content
6. Build in React
7. Polish
8. Launch
9. Maintain
10. Launch video (made with Motion and HyperFrames, for LinkedIn and Instagram)

## Tools

- **Connected apps:** Figma, Google Drive, Gmail, Google Calendar, Claude Docs, GitHub
- **Skills (in the repo):** Impeccable, ui-ux-pro-max, apple-design, GSAP (8 skills), Graphify, Matt Pocock's skills, React skills (shadcn, react-best-practices, composition-patterns, web-design-guidelines, webapp-testing), project-conventions
- **Plugins and agents:** frontend-design, typescript-lsp, ui-reviewer subagent
- **Hooks and automation:** Prettier auto-format, deploy-file protection, GitHub Action that rebuilds the diary PDF
- **MCP servers (in the repo):** shadcn, 21st.dev Magic, context7
- **Cloud environment:** `TWENTY_FIRST_API_KEY` and `CONTEXT7_API_KEY` set; 21st.dev, reactbits.dev, ui.shadcn.com and context7.com in Allowed domains; setup script installs graphify and typescript-language-server

## Workflow rules

The full rules, approved by Malaka on 31 October 2026, are in `plan/rules.md` in the project files and in `docs/rules/` in the repo. They are grouped as Strict (only Malaka changes them), Necessary (broken only with a written reason) and Other.

Key strict rules: no site code until Malaka says go, never commit secrets, only Malaka merges pull requests, nothing leaves the project or gets deleted without Malaka's OK, preview every task before building it, and every choice comes with a recommendation.

# Daily Entries {.front}

<!-- ENTRIES: newest entry goes at the bottom. Each entry starts with "## <date>". -->

## Friday, 30 October 2026

**Project:** My Portfolio Website

**Summary:** Kick-off day. The old portfolio was graded and Malaka chose to start fresh, so the useful parts were archived and the repo was set up with design skills, plugins, MCP servers and component sources that every cloud session can use. No site code yet.

- **Reviewed:** graded the old portfolio repo (C+, about 6/10), listed its gaps (no mobile layout, lorem-ipsum projects, missing contact and footer, broken resume link, heavy images and fonts)
- **Decided:** rebuild from scratch, build in the old repo on a fresh branch and swap it in as main, React as the framework, work through GitHub from the cloud instead of the PC, no coding until Malaka says go, planner + executor setup for coding, brown and gold palette is only temporary
- **Archived:** fonts (Melodrama, Nunito), old palette tokens, About Me copy, skills list and skills section style, hero copy, project notes, links, portrait, ForTheRoot screenshot, favicon, old resume
- **Cleaned up:** project folder tidied, first Astro draft of the site removed (design notes kept for reference)
- **Installed skills:** Impeccable, ui-ux-pro-max, apple-design, GSAP (8 skills), Graphify, Matt Pocock's skills (GitHub Issues tracker, default triage labels, glossary and ADR docs)
- **Added MCP servers:** shadcn, 21st.dev Magic (with a proxy fix for the cloud)
- **Added components:** React Bits (218 TypeScript + Tailwind components) in a temporary `components.js/` folder, to merge into the real setup when the site is built in React
- **Merged pull requests:** #1 design skills and MCP config, #2 21st proxy fix, #3 React Bits folder, #4 Graphify, #5 Matt Pocock's skills
- **Configured the cloud:** 21st.dev API key, allowed domains 21st.dev and reactbits.dev, shadcn and 21st MCPs tested working
- **Troubleshot:** Remote Control on the PC failed to start several times, so local installs were dropped in favour of the repo
- **Wrote docs:** Claude Code automation recommendations, this project diary (repo copy opened as PR #6)

**Open items:** choose a new colour palette, re-export the resume PDF (it renders blank), choose which automation recommendations to add, add `uv tool install graphifyy` to the cloud setup script, give project details and links.

## Saturday, 31 October 2026

**Project:** My Portfolio Website

**Summary:** Tooling and planning day. Phase 1 (Tools) was finished and verified, Malaka was grilled on goals, audience, sections and reference sites, and the one-page brief was approved. The project plan (now 10 phases), the shared checklist and the project rules were set up. No site code yet.

- **Installed tools:** React skills (shadcn, react-best-practices, composition-patterns, web-design-guidelines, webapp-testing), frontend-design plugin, typescript-lsp plugin, context7 MCP, Prettier auto-format and deploy-file protection hooks, project-conventions skill, ui-reviewer subagent, GitHub Action that rebuilds the diary PDF
- **Configured the cloud:** setup script installs graphify and typescript-language-server, allowed domains ui.shadcn.com and context7.com, context7 API key, full environment check (17 skills, 3 plugins, 3 MCP servers)
- **Fixed:** browser testing points at the built-in Playwright, CLAUDE.md fallback for sessions where repo skills don't load
- **Cleaned up:** removed stray `a.txt` and `desktop.ini`, created the GitHub triage labels, archived the full v1 site to the project archive
- **Grilled Malaka:** 50 questions on goals, audience and sections, 55 reference sites collected, one-page brief approved
- **Decided:** no backend (static site on GitHub Pages), Vite instead of Next.js with prerendering, contact as a custom letter-style form plus a visible email, malaka@malakagonawala.dev forwarded to Gmail, old About Me copy scrapped, new Lab, Resume, Privacy and Accessibility statement pages, apple-design skill confirmed, nothing else to install, a cookieless visitor counter showing visitors right now and total visitors, with a private stats view for Malaka
- **Planned:** 9-phase plan approved, then a 10th phase added for a launch video (Motion and HyperFrames, for LinkedIn and Instagram), shared project checklist, project rules approved (strict, necessary, other) and copied into the repo
- **Updated the diary:** corrected the 30 October entry, front pages now say React + Vite with no backend
- **Merged pull requests:** #7 React skills, #8 typescript-lsp, #9 context7, #10 Playwright note, #11 diary fix, #12, #13, #15, #16, #22 and #23 project rules, #14 triage labels, #17 stray files, #18 hooks, #19 conventions skill and reviewer, #20 diary PDF action, #21 CLAUDE.md fallback

**Open items:** Phase 3 planning (site map, first-version scope, milestones), Tailwind, shadcn and GSAP yes/no, pick an email-forwarding service, pick a cookieless visitor-counter service, new colour palette, re-export the resume PDF, project details and links.
