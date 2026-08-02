# Svitanky — «Дім Світанків»

Web platform for the «Дім Світанків» charity foundation: a public site for
supporters and donors, and an administration panel for the foundation's team.

## Repository layout

Turborepo + npm workspaces. Two Next.js apps share one internal UI package.

| Workspace | Package name | Purpose |
| --- | --- | --- |
| `apps/user-web` | `user-web` | Public-facing app (dev port 3000) |
| `apps/admin-web` | `admin-web` | Administration app (dev port 3001) |
| `packages/common-ui` | `@project/common-ui` | Shared React components and theme |
| `packages/eslint-config` | `@repo/eslint-config` | Shared ESLint flat config |
| `packages/typescript-config` | `@repo/typescript-config` | Shared tsconfig bases |

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — design tokens live in `packages/common-ui/src/globals.css`,
  imported by each app via `@import '@project/common-ui/globals.css'`
- shadcn-style components on `@base-ui/react`

## Getting started

Requirements: Node ≥ 18, npm 10.

```sh
npm install
npm run dev        # start both apps
```

Scope to one app with a Turborepo filter:

```sh
npx turbo run dev --filter=user-web
```

## Commands (from repo root)

| Command | What it does |
| --- | --- |
| `npm run dev` | Start all apps |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Lint all workspaces (`eslint --max-warnings 0`) |
| `npm run check-types` | Typecheck all workspaces |
| `npm run format` | Prettier over `**/*.{ts,tsx,md}` |

## Conventions

Engineering rules live in `.claude/rules/` (architecture, frontend, security,
testing) and are summarized in `CLAUDE.md`. Key points:

- Container/Presentational split on the App Router: `page.tsx`/`layout.tsx`
  fetch data (Server Components); presentational components live in
  `components/` and are server-first.
- Mutations go through Server Actions (`actions.ts` per feature).
- Shared UI is imported from the package root:
  `import { Button } from '@project/common-ui'`.

## Architecture documentation

See `docs/architecture/` for the current-state audit, target architecture,
security/domain model (including minors'-data requirements), ADRs, roadmap,
and the list of decisions awaiting human approval.
