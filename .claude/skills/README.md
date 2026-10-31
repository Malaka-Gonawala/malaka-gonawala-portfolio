# Design and React skills

Project skills for Claude Code. Any session that clones this repo (including cloud sessions) picks them up automatically.

| Skill folder | Source | Commit | License |
| --- | --- | --- | --- |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) `.claude/skills/impeccable` | df3a4ab | Apache-2.0 |
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) `.claude/skills/ui-ux-pro-max` | 28b3b8d | MIT |
| `apple-design` | [nutshellengineering/apple-design-skill](https://github.com/nutshellengineering/apple-design-skill) `skills/apple-design-skill` | 119b6ac | Apache-2.0 |
| `gsap-*` (8 skills) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) `skills/` | aed9cfd | MIT |
| `shadcn` | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) `skills/shadcn` | main, 2026-10-31 | MIT |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/react-best-practices` | main, 2026-10-31 | MIT |
| `vercel-composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/composition-patterns` | main, 2026-10-31 | MIT |

Local changes from upstream:
- `ui-ux-pro-max/SKILL.md`: script paths changed from `${CLAUDE_PLUGIN_ROOT}/.claude/skills/...` to `.claude/skills/...`, since this is a project skill, not a plugin.
- `apple-design/SKILL.md`: `name` changed from `apple-design-skill` to `apple-design` to match the folder.

To update a skill, re-copy its folder from upstream and update the commit above.

## MCP servers (`/.mcp.json`)

- `shadcn`: needs no key.
- `magic` (21st.dev): reads its key from the `TWENTY_FIRST_API_KEY` environment variable. Never put the key in this repo. For cloud sessions, add it as an environment variable in the cloud environment settings.
