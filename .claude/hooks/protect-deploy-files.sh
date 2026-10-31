#!/usr/bin/env bash
# PreToolUse hook: block Claude from editing CNAME and package-lock.json.
# A wrong CNAME takes malakagonawala.dev offline; the lockfile should only change through npm.
file=$(jq -r '.tool_input.file_path // .tool_input.notebook_path // empty')
case "$(basename "$file")" in
  CNAME|package-lock.json)
    echo "Blocked: $(basename "$file") is protected. Ask Malaka before changing it (package-lock.json should only change through npm)." >&2
    exit 2 ;;
esac
exit 0
