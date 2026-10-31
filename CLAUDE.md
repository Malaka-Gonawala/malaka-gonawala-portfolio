## Project rules

Read and follow `docs/rules/rules.md` before any work. Strict rules (S) are never broken; Necessary rules (N) only with a written reason. Pass the relevant rules into every subagent prompt.

## If repo skills or hooks don't load

Some cloud project-thread sessions start before the repo is checked out, so nothing in `.claude/` loads: no repo skills ("Unknown skill"), no hooks, no plugins. Only this file is read. In that case:
- Read `.claude/skills/<name>/SKILL.md` directly and follow it instead of calling the Skill tool. Skills live in `.claude/skills/` (list them with `ls`).
- Before any work on the site, its components, copy or assets, read `.claude/skills/project-conventions/SKILL.md`.
- Never edit `CNAME` or `package-lock.json` by hand (the guard hook may not be running). Ask Malaka first; the lockfile changes only through npm.
- Run Prettier on edited files yourself if `node_modules` exists (the format hook may not be running).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
