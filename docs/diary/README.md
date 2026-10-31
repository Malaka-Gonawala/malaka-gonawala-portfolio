# Project diary

A day-by-day record of work on the portfolio, with front pages for the goal, tech stack, tools and workflow rules.

- `diary.md`: the source. One `##` entry per day, one bullet per category.
- `diary.pdf`: the exported PDF.
- `build-pdf.sh`: rebuilds the PDF (needs pandoc and Node with Playwright): `bash docs/diary/build-pdf.sh`

When a pull request changes `diary.md`, the "Rebuild diary PDF" GitHub Action (`.github/workflows/diary-pdf.yml`) runs `build-pdf.sh` and commits the new `diary.pdf` to that PR branch. It never pushes to main.
