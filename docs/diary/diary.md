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
| UI components | shadcn, 21st.dev Magic, React Bits | Set up |
| Animation | GSAP | Skills installed |
| Hosting | Static site on GitHub Pages via GitHub Actions, no backend | Decided |
| Fonts | Melodrama (headings), Nunito (body), self-hosted woff2 | Archived |
| Palette | Dark brown and gold (temporary, to be replaced) | Needs a new palette |

## Site sections (planned)

Hero, About, Skills, Projects (ForTheRoot, Cavalleria, Russian Roulette), Resume, Contact.

## Tools

- **Connected apps:** Figma, Google Drive, Gmail, Google Calendar, Claude Docs, GitHub
- **Design skills (in the repo):** Impeccable, ui-ux-pro-max, apple-design, GSAP (8 skills), Graphify, Matt Pocock's skills
- **MCP servers (in the repo):** shadcn, 21st.dev Magic
- **Cloud environment:** `TWENTY_FIRST_API_KEY` set; `21st.dev` and `reactbits.dev` in Allowed domains

## Workflow rules

- All work happens through GitHub from the cloud, not the local PC folder. Pull locally to stay in sync.
- No site code is written until Malaka says go.
- Any new skill, plugin or MCP server is committed into the repo (`.claude/` or `.mcp.json`). API keys never go in the repo.
- When coding starts, a planner session talks to Malaka and an executor session writes the code, reporting in 1 to 2 lines.
- Saying **"update diary"** adds or refreshes that day's entry in this diary.

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
