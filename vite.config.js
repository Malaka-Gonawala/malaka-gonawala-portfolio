import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Build log (Underneath): merged PRs fetched once at build time, never live; diary, rules and checklist housekeeping left out.
const SKIP = /diary|rules|checklist|readme|licen[cs]e/i;
const buildLog = () => ({
  name: "build-log",
  resolveId: (id) => (id == "virtual:buildlog" ? "\0buildlog" : null),
  async load(id) {
    if (id != "\0buildlog") return;
    let rows = [];
    try {
      const r = await fetch(
        "https://api.github.com/repos/Malaka-Gonawala/malaka-gonawala-portfolio/pulls?state=closed&sort=updated&direction=desc&per_page=100",
        {
          headers: process.env.GITHUB_TOKEN
            ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {},
        },
      );
      rows = (await r.json())
        .filter((p) => p.merged_at && !SKIP.test(p.title))
        .sort((a, b) => b.merged_at.localeCompare(a.merged_at))
        .slice(0, 7)
        .map((p) => [
          p.merge_commit_sha.slice(0, 7),
          p.merged_at.slice(0, 10),
          p.title,
        ]);
    } catch {
      // offline build: the block is left out
    }
    return `export default ${JSON.stringify(rows)}`;
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), buildLog()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
});
