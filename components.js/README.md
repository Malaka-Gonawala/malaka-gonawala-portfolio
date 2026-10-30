# React Bits (temporary holding folder)

This folder is a stopgap. The site isn't a React project yet, so there is no real
`components.json` or components directory to install React Bits into.

- `components/` holds the source of every React Bits component in its
  TypeScript + Tailwind variant (218 components), downloaded from
  https://reactbits.dev/r/registry.json on 2026-10-30.
- `index.json` lists each component's description, npm dependencies and files.
- `components.json` holds the `@react-bits` registry entry.

## When the site is rebuilt in React

1. Merge the `registries` entry from `components.json` here into the real
   `components.json` that `npx shadcn@latest init` creates.
2. Move the components you use into the real components directory and install
   their `dependencies` from `index.json`. Or reinstall a fresh copy with
   `npx shadcn@latest add @react-bits/<Name>-TS-TW`.
3. Delete this folder.

Other variants (JS-CSS, JS-TW, TS-CSS) and the Sound* items are still
available from the registry.

React Bits is by David Haz (https://github.com/DavidHDev/react-bits) and is
licensed MIT + Commons Clause, so it can't be resold as-is.
