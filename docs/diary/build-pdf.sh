#!/usr/bin/env bash
# Builds diary.pdf from diary.md. Needs pandoc and Node with Playwright (Chromium).
set -euo pipefail
cd "$(dirname "$0")"
pandoc diary.md -s --toc --toc-depth=2 --css diary.css --embed-resources \
  --metadata pagetitle="Project Diary" -o diary.html
node -e '
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + process.cwd() + "/diary.html");
  await p.pdf({ path: "diary.pdf", format: "A4", printBackground: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: "<div style=\"font-size:8pt;width:100%;text-align:center;color:#6f655c\">My Portfolio Website · Project Diary · <span class=\"pageNumber\"></span></div>",
    margin: { top: "20mm", bottom: "20mm", left: "18mm", right: "18mm" } });
  await b.close();
})();'
rm -f diary.html
echo "Built diary.pdf"
