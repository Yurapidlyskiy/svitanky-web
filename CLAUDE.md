# Svitanky — Charity Platform

## Project Facts

- Monorepo for a charity/nonprofit web platform: Turborepo + npm workspaces.
- Package manager: npm 10.9.2 (see `devEngines`). Node >= 18.
- Two Next.js 16 (App Router, React 19) apps sharing one internal UI package.

## Layout

- `apps/user-web` — public-facing app (dev port 3000).
- `apps/admin-web` — administrator app (dev port 3001).
- `packages/common-ui` — shared React components/styles, imported as `@project/common-ui`.
- `packages/eslint-config` — shared ESLint config (`@repo/eslint-config`).
- `packages/typescript-config` — shared `tsconfig.json` bases (`@repo/typescript-config`).

## Commands (run from repo root)

- `npm run dev` — start all apps (`turbo run dev`).
- `npm run build` — build all apps/packages.
- `npm run lint` — lint all workspaces (`eslint --max-warnings 0` per package).
- `npm run check-types` — typecheck all workspaces (`next typegen && tsc --noEmit` per app).
- `npm run format` — Prettier write across `**/*.{ts,tsx,md}`.
- Scope to one workspace with a Turborepo filter, e.g. `npx turbo run dev --filter=user-web`.

## Engineering Workflow

Detailed rules live in `.claude/rules/`:

- `architecture.md` — Container/Presentational pattern, feature folder structure.
- `user-web-architecture.md` — **authoritative for `apps/user-web`**: Layout-Sliced Architecture (`app/` routes → `header/` · `main/<page>/sections/<section>/` · `footer/` → `shared/`), section folder anatomy, placement decision tree, naming, barrels, size limits, target tree. Read it before adding any file to `apps/user-web`. Does **not** apply to `admin-web`.
- `frontend.md` — Server Actions, custom hooks, typing/import conventions.
- `security.md` — auth boundaries, data validation, secrets handling.
- `testing.md` — what to unit vs. integration test.

Key points surfaced here because they're easy to get wrong:

- Shared UI imports: `import { Button } from '@project/common-ui'` — **not** `@charity/common-ui`.
- Absolute imports inside each app use `@/`.
- Keep files under ~150–200 lines; split large components instead of growing them.

## Skills

- `/architecture-review` — manual, read-only audit: current-state review, target architecture, ADRs, risks, phased roadmap. Run before large structural changes.
- `/feature-planning` — turns a feature idea into stories, data model, roles/RLS needs, edge cases, acceptance criteria. Produces no code.
