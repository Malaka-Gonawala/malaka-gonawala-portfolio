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
| Framework | React + Tailwind (shadcn), or Astro + plain CSS | Not decided yet |
| UI components | shadcn, 21st.dev Magic, React Bits | Set up |
| Animation | GSAP | Skills installed |
| Hosting | GitHub Pages via GitHub Actions | Planned |
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

## Thursday, 30 October 2026

**Project:** My Portfolio Website

**Summary:** Kick-off day. The old portfolio was graded and Malaka chose to start fresh, so the useful parts were archived and the repo was set up with design skills, plugins and component sources that every cloud session can use. No site code yet.

- **Reviewed:** graded the old portfolio repo (C+, about 6/10), listed its gaps (no mobile layout, lorem-ipsum projects, missing contact and footer, broken resume link, heavy images and fonts)
- **Decided:** rebuild from scratch, current brown and gold palette is only temporary and will be replaced, keep the old repo, build on a fresh branch and swap it in as main, work through GitHub from the cloud instead of the PC, planner + executor setup for coding
- **Archived:** fonts (Melodrama, Nunito), brown and gold palette, About Me copy, skills list and skills section style, hero copy, project notes, links, portrait, ForTheRoot screenshot, favicon, old resume
- **Drafted:** a first Astro version of the site, then removed it at Malaka's request (design notes kept for reference)
- **Installed skills:** Impeccable, ui-ux-pro-max, apple-design, GSAP (8 skills), Graphify, Matt Pocock's skills (GitHub Issues tracker, default triage labels, glossary and ADR docs)
- **Added MCP servers:** shadcn, 21st.dev Magic (with a proxy fix for the cloud)
- **Added components:** React Bits (218 TypeScript + Tailwind components) in a temporary `components.js/` folder, to merge into the real setup when the site moves to React
- **Merged pull requests:** #1 design skills and MCP config, #2 21st proxy fix, #3 React Bits folder, #4 Graphify, #5 Matt Pocock's skills
- **Configured the cloud:** 21st.dev API key, allowed domains 21st.dev and reactbits.dev
- **Researched:** Claude Code automation recommendations (context7, Playwright, Prettier auto-format hook, design-conventions skill), waiting on Malaka's picks
- **Troubleshot:** Remote Control on the PC failed to start four times, so local installs were dropped in favour of the repo
- **Started:** this project diary (cover, contents, overview pages, PDF export)

**Open items:** choose a new colour palette, re-export the resume PDF (it renders blank), pick the framework, choose which automation recommendations to add, add `uv tool install graphifyy` to the cloud setup script, give project details and links.
