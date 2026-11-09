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
| Framework | React with Vite, prerendered for SEO, English and Italian (`/it/`) | Decided |
| Styling | Tailwind CSS v4, design tokens as CSS variables | Decided |
| UI components | shadcn as a toolbox only (restyled), plus 21st.dev Magic and React Bits as sources | Decided |
| Animation | GSAP with cubic-bezier eases | Decided |
| Fonts | Melodrama (headings), Satoshi (body), JetBrains Mono (underside), self-hosted woff2 | Decided |
| Palette | Charcoal and stone front with gold buttons and forest links; dark-forest underside | Decided |
| Contact | Letter-style form on Web3Forms (free plan) plus a visible email | Decided |
| Email | malaka@malakagonawala.dev forwarded to Gmail with Namecheap | Set up around 24 November |
| Visitor counter | GoatCounter (cookieless, private stats) | Decided |
| Hosting | Static site on GitHub Pages via GitHub Actions, no backend at launch | Decided |
| Release 2 backend | Cloudflare Workers (free plan): AI assistant on Claude Haiku 5.5 (5 EUR/month cap), own visitor counter, admin page | Planned |

## Site map

Home (intro, featured work with all 5 projects, the "two sides" moment, work with me, skills, footer), project pages, Lab, About, Resume, Contact, Privacy, Accessibility statement, 404. Every page in English and Italian.

## Milestones

- Preview: around 17 November 2026
- Launch: Saturday 28 November 2026
- Release 2: by 19 December 2026

## Project phases

1. Tools (done 31 October)
2. Grill (done 31 October, brief approved)
3. Planning (done 1 November, plan approved)
4. Design and prototype
5. Content
6. Build in React
7. Polish
8. Launch
9. Maintain
10. Launch video (made with Motion and HyperFrames, for LinkedIn and Instagram)
11. Release 2 (AI site assistant, own backend, visitor count, admin page)

## Tools

- **Connected apps:** Figma, Google Drive, Gmail, Google Calendar, Claude Docs, GitHub
- **Skills (in the repo):** Impeccable, ui-ux-pro-max, apple-design, GSAP (8 skills), Graphify, Matt Pocock's skills, React skills (shadcn, react-best-practices, composition-patterns, web-design-guidelines, webapp-testing), project-conventions, motion-framer
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

## Sunday, 1 November 2026

**Project:** My Portfolio Website

**Summary:** Planning and design day. Phase 3 (Planning) was finished and the plan was approved. Phase 4 (Design and prototype) chose the palette, fonts, layout, navigation and lead projects. A clickable HTML prototype went from version 1 to version 13. No site code yet.

- **Planned:** site map, first-version scope and milestones approved (preview around 17 November, launch Saturday 28 November, Release 2 by 19 December), Phase 3 plan approved, a new Phase 11 "Release 2" added (small serverless backend for an AI site assistant, a first-party visitor count and a login admin page)
- **Decided:** Tailwind CSS v4, shadcn as a toolbox only, Web3Forms for the contact form at launch, GoatCounter as the launch visitor counter, Namecheap email forwarding, Claude Haiku 5.5 for the Release 2 assistant with a 5 EUR/month cap, Cloudflare Workers free plan for the Release 2 backend, GSAP (with cubic-bezier eases everywhere) for animation, replacing the earlier Motion pick
- **Designed:** palette (charcoal and stone front with gold buttons and forest links, a dark-forest underside), fonts (Melodrama headings, Satoshi body, JetBrains Mono for the underside; Nunito dropped), layout (the name fills the first screen, then splits as the projects pass through, no pinning on phone), navigation (Flip to the underside plus the name with a "/ section" line, 60px on desktop and 20px on phone), lead projects (forvalue and ForTheRoot, or bendata-theme and forvalue if the client allows)
- **Built the prototype:** clickable HTML prototype, versions 1 to 13: the name is slashed in two and the first project pops up between the halves with a bounce, an x-ray lens shows the code underneath, the intro and the flip menu reveal the underside tile by tile, the Underneath section opens and closes with a growing circle, live screenshots inside browser and phone frames, Windows PowerShell lines on the underside
- **Installed skills:** motion-framer (later replaced by GSAP for animation)
- **Merged pull requests:** #24 diary, #25, #26 and #27 project rules, #28 motion-framer skill

**Open items:** approve the prototype (4.5), try flipping the whole site horizontally for the Underneath section, find a transition that works better than square tiles on tall or wide screens, set up Namecheap email forwarding (around 24 November), ask the bendata client for permission, real screenshots for holoservice and Shitos Barber, re-export the resume PDF.

## Monday, 2 November 2026

**Project:** My Portfolio Website

**Summary:** Prototype and transition day. Prototype B was dropped and prototype A was revised up to version 20. After two rounds of transition ideas didn't land, 151 portfolio sites were researched and three transition pairs were built and reviewed. Malaka likes the address bar and hex dump pair; the final pick is still open. No site code yet.

- **Dropped:** prototype B (the blackjack dealer), back to prototype A
- **Revised the prototype:** [prototype A](https://claude.ai/artifact/R4MynH6CFo4pMYwAaZPUMd) versions 17 to 20, smaller project card that grows with scroll, name to /Work transition, x-ray lens fix, site flip for the Underneath section, deck and index list for projects, Work with me redesigned as rows
- **Researched:** two rounds of transition options (round 1 felt like PowerPoint, round 2 felt boring), 151 portfolio sites studied, a critic reviewed every idea
- **Built transition pairs:** [Build + Collapse](https://claude.ai/artifact/JBkpFiAueQAc8JURm7Rn96) (Malaka loved it, archived), [Address bar + Hex dump](https://claude.ai/artifact/MXwfAYFPbhNkUaRzVdpTv4) (browser window stays pinned and retypes the address for each project with a load bar and blur-in), [Alt text + Accessibility tree](https://claude.ai/artifact/EFeoX6eAm9PFBFDApzUhWk), rejected tries archived (3D Skyline, Redacted/Firewall, Focus)
- **Decided:** prototype B scrapped, Malaka likes the hex dump Underneath and the address-bar flow for every project, rule S26 (only the owner thread edits the diary, the checklist or the rules)
- **Updated the diary:** front pages show the decided stack, site map, milestones and 11 phases, new web page version of the diary
- **Merged pull requests:** #30 rules sync (GSAP for site animation, S26), #31 diary sync

**Open items:** Malaka's final transition pick, then add it to prototype A, prototype approval (4.5), horizontal flip and tile transition ideas (4.8, 4.9), Namecheap email forwarding (around 24 November).

## Wednesday, 4 November 2026

**Project:** My Portfolio Website

**Summary:** Short design and rules day. The address-bar transition demo was reworked so only the two featured projects get the full treatment, and the rule for which model talks to Malaka changed. No site code yet.

- **Decided:** only forvalue and ForTheRoot get the full address-bar treatment (the URL types, Enter, the page blur-loads), then the bar types /work/other-projects and the rest load as one list (holoservice, Shitos Barber, Antigravity bike, Pretty Sri Lanka "where it all started", Experiments with 7 builds), project descriptions are placeholders for now
- **Revised the prototype:** [Address bar + Hex dump](https://claude.ai/artifact/MXwfAYFPbhNkUaRzVdpTv4) transition demo to version 3
- **Changed rules:** S16, threads talk to Malaka on Sonnet 5.5 medium by default and step up to Opus 5.5 medium for research, planning and design, the coordinator stays on Opus 5.5
- **Opened pull requests:** #33 rules sync for S16 (waiting for merge)

**Open items:** Malaka's final transition pick, then add it to [prototype A](https://claude.ai/artifact/R4MynH6CFo4pMYwAaZPUMd) (version 20), prototype approval (4.5), horizontal flip idea (4.8), project descriptions, Namecheap email forwarding (around 24 November).

## Thursday, 5 November 2026

**Project:** My Portfolio Website

**Summary:** Transition labs day. Labs were built for the menus, the offers section and the footer, each checked by a critic, and Malaka picked one option for each. Prototype A went to version 22 with all of them built in, and now waits for Malaka's review. No site code yet.

- **Built transition labs:** Lab A (browser style) and Lab B (terminal style) for menus, offers and footers, offers lab C in a separate thread, a critic reviewed each option
- **Decided:** tab-overview menu on wide screens (over 700px), PowerShell split-flap menu on phones, odometer for the offers section (after waterfall, git diff, screen reader and contrast check were rejected), [hex decode footer](https://claude.ai/artifact/6Ts5CgZjrMMwP5awP5TZbj) built from the real footer's pixels like the Underneath section (the first UTF-8 version was rejected and redone)
- **Revised the prototype:** [prototype A](https://claude.ai/artifact/R4MynH6CFo4pMYwAaZPUMd) versions 21 and 22, with the new menus, odometer offers and hex decode footer built in

**Open items:** Malaka's review of prototype A version 22, prototype approval (4.5), tablet widths not tested yet, horizontal flip idea (4.8), merge PR #33 (rules) and PR #34 (diary), Namecheap email forwarding (around 24 November).

## Friday, 6 November 2026

**Project:** My Portfolio Website

**Summary:** Loader, menu and projects day. Two more labs were built and you picked the loader, the menus and the other-projects layout, then all of them were built into prototype A, now at version 24. It waits for your approval. No site code yet.

- **Built labs:** [Lab D](https://claude.ai/artifact/BciPdcEQpmXLtqrz7Z6p5r) for the loader and menus, [Lab E](https://claude.ai/artifact/AdVQQdfLgXSE79UvDUTGae) for the other projects
- **Decided:** address-bar loader L5 (the address bar types the path, Enter, a gold line, the word flies back to the header, the page blur-loads), desktop tab-bar menu D2, phone line-feed menu M2 (cd site and cd .. commands, the visitor's local date and time), split pane E1 for the other projects (list on the left, fixed preview on the right, 250 ms hover rest, name colour changes instantly, hidden on phones), circle transitions dropped as off-style, cursor-following preview rejected as overstimulating
- **Revised the prototype:** [prototype A](https://claude.ai/artifact/R4MynH6CFo4pMYwAaZPUMd) version 23 (split pane built in) and version 24 (loader and both menus built in), tested on desktop and phone
- **Changed rules:** S16 enforced in every thread (Sonnet 5.5 medium by default, Opus 5.5 medium for complex work), S24 now only a one-line link to the checklist and rules, S27 read only the current checklist phase, S28 one-line plain compliance reports
- **Merged pull requests:** #34 diary (4 and 5 November), #33 and #35 rules sync

**Open items:** prototype approval (4.5), tablet widths and reduced motion not tested yet, horizontal flip idea (4.8), project descriptions, Namecheap email forwarding (around 24 November).

## Saturday, 7 November 2026

**Project:** My Portfolio Website

**Summary:** Prototype A was approved at version 27, which completes Phase 4, and Phase 5 (content) started with the hero approved. Two new rules were added. No site code yet.

- **Approved:** [prototype A](https://claude.ai/artifact/R4MynH6CFo4pMYwAaZPUMd) version 27 (4.5), scroll speed S3 (60%), Phase 4 complete (17 of 17 items)
- **Revised the prototype:** versions 25 to 27 (scroll speed, X-ray alignment, /top bug, loader offset, hero without load animation, menu colour, menu-to-loader harmony, reduced-motion fixes)
- **Tested:** tablet widths 768 to 1024px (no breakage, no tablet-specific design), reduced motion (4 problems found: Underneath background, intro colliding with the Flip, only forvalue reachable, address-bar typing)
- **Fixed:** the first batch of problems by 7 task threads, the reduced-motion batch by 4 fixer threads and approved by 1 independent tester
- **Dropped:** horizontal flip idea (4.8) and tile transition idea (4.9), About and Lab pages deferred to Phase 6
- **Started Phase 5 (content):** hero 5.1 approved in English ("Websites for restaurants, barbers and small shops, built sleek, modern and accessible to anyone."), Italian draft waits for Malaka's check, forvalue write-up 5.3 in progress (problem, solution and role approved, traceability claim researched), new items 5.11 (case study "How I built this with AI" for recruiters) and 8.5 (LinkedIn post of it)
- **Changed rules:** S29 (fixes are tested by a separate tester thread), S30 (prototype only the risky parts, stopping rule, two preview rounds at most)
- **Merged pull requests:** #36 diary (6 November), #39 and #40 rules sync

**Open items:** forvalue write-up (accessibility note, Figma ownership, stack), then the other projects' descriptions, Italian hero check, Namecheap email forwarding (around 24 November).

## Sunday, 8 November 2026

**Project:** My Portfolio Website

**Summary:** Phase 5 (content) day. All five project pages and all eight Lab entries were written and approved in English and Italian, and the About copy was started. No site code yet.

- **Approved copy:** project pages for forvalue, ForTheRoot, holoservice, Shitos Barber and Antigravity Bikes (5.3), Lab entries for Cavalleria, Russian Roulette, LeetSpeak, Manuale HTML, Random Color, Random Message, Morse and v1, all in English and Italian
- **Decided:** no code links on client work, no client prices or contact details, teammates never named, group work never shown as solo, ForValue and ForTheRoot dated to fourth and fifth year of high school, role lines say what AI did, timber paperwork claim worded as "mostly paper and split across regions" with no "most" and no percentages (after a research thread fact-checked it), Malaka confirmed the clients of holoservice and Shitos Barber are fine with being shown
- **Rule exception:** S20 (licensed assets only) allowed for the bike-page screenshots only (web photos, with a note, removable), logged with the rules thread
- **Started:** About copy (5.2)

**Open items:** About copy (5.2, in progress, Pretty Sri Lanka question waiting), Italian hero check, remaining Phase 5 items (5.4 to 5.7, 5.8, 5.9, 5.10, 5.11), Cavalleria README leftovers (cosmetic), Namecheap email forwarding (around 24 November).

## Monday, 9 November 2026

**Project:** My Portfolio Website

**Summary:** Phase 5 (content) day. The About and AI case study copy, the resume content, the portrait and 31 project screenshots were approved, and the Italian pass is well under way. No site code yet.

- **Approved copy:** About in English and Italian (5.2), "How I built this with AI" case study in English and Italian (5.11), links (5.5), resume content in English and Italian (5.6 stays open until the PDF renders)
- **Prepared images:** new portrait in web sizes with alt text (5.7), 31 project screenshots checked by a separate tester (5.4), a third-party sign blurred, demo email kept, Shitos Barber hero shot and the hero shot left out for privacy
- **Decided:** gallery layout with fixed-ratio frames and a card of phone over desktop, Security+ and bendata left out of About until Malaka commits and the client agrees, ForTheRoot level counts removed because they conflicted with the live site, second S20 exception (Pretty Sri Lanka photos on About) logged with the rules thread, AI section "For code" line to re-check at launch
- **Italian pass (5.9):** hero, ForValue, ForTheRoot, Holoservice, Shitos Barber, Antigravity Bikes and the Lab entries approved
- **Added checklist items:** 6.25 (build the resume page and PDF), 9.26 and 9.27 (diary 8 November and its PR #43)

**Open items:** Italian for About, AI section and resume, then a native-speaker proofread before launch, email setup (5.8) and bendata permission (5.10) waiting on Malaka, resume page and PDF (6.25), merge PR #43 (diary 8 November), Namecheap email forwarding (around 24 November).
