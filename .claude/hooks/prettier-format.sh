#!/usr/bin/env bash
# PostToolUse hook: format the file Claude just edited with the repo's Prettier.
# Prettier reads .prettierignore itself; --ignore-unknown skips file types it can't format.
# Does nothing if Prettier isn't installed locally (run `npm ci` first), so it never blocks work.
file=$(jq -r '.tool_input.file_path // empty')
[ -n "$file" ] && [ -f "$file" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
[ -x node_modules/.bin/prettier ] || exit 0
node_modules/.bin/prettier --write --ignore-unknown --log-level warn "$file" >&2 || true
exit 0
