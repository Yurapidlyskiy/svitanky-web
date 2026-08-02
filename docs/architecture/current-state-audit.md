# Current-State Audit

Date: 2026-08-02 · Scope: full repo at commit `aa04cf4` · Method: read-only inspection (`/architecture-review`)

## Workspace

Turborepo + npm workspaces (`npm@10.9.2`, Node ≥ 18). Task graph in `turbo.json` is standard and healthy: `build` / `lint` / `check-types` with `^` topological dependencies, `dev` uncached/persistent.

| Workspace | Purpose | State |
|---|---|---|
| `apps/user-web` | Public app (dev port 3000) | Partially migrated off template |
| `apps/admin-web` | Admin app (dev port 3001) | **Unbuildable** — raw template with broken imports |
| `packages/common-ui` | Shared UI (`@project/common-ui`) | One component; broken public API |
| `packages/eslint-config` | Shared flat ESLint config | Working, minor redundancy |
| `packages/typescript-config` | Shared tsconfig bases | Working |

## Apps

### user-web
- `app/page.tsx` renders the Ukrainian landing stub («Дім Світанків») using the shared Button — the only code migrated to project conventions.
- Dead template code remains in the same file: unused `ThemeImage` component and `next/image` import; stock template SVGs in `public/`.
- `app/layout.tsx` still has `title: 'Create Next App'` and `lang="en"` despite Ukrainian content.

### admin-web (blocking)
- `app/page.tsx:2-3` imports `@repo/ui/button` and `./page.module.css`. Neither exists: there is no `@repo/ui` package in this workspace (it is the create-turbo template's package name) and no `.module.css` file anywhere in the repo. `turbo run build` and `check-types` fail on this app.
- 100% create-turbo template content otherwise.
- `app/layout.tsx` lacks the `font-sans bg-background text-foreground` body classes that user-web has → visual drift between apps.

## Shared UI (`packages/common-ui`)

Contents: `src/components/ui/button.tsx` (shadcn-style: `@base-ui/react` + cva + tailwind-merge), `src/lib/utils.ts` (`cn`), `src/globals.css` (theme tokens).

Problems:
1. **Exports map is `"./*": "./src/*.tsx"` only.** The documented import — `import { Button } from '@project/common-ui'` per `.claude/rules/frontend.md` and `CLAUDE.md` — does not resolve (no root export, no `src/index.tsx`). `user-web` works around it with a deep import (`@project/common-ui/components/ui/button`).
2. `src/lib/utils.ts` (`.ts`, not `.tsx`) and `src/globals.css` are unreachable through the exports map — apps cannot consume the package's theme CSS or utils.
3. `shadcn` (a CLI) is listed as a runtime `dependency` instead of a devDependency.
4. `components.json` sets `rsc: false` — future `shadcn add` output will be client-flavored, at odds with the server-first rule in `.claude/rules/architecture.md`.

## Styling

Tailwind v4 (`@tailwindcss/postcss`, `@import 'tailwindcss'`), but:
- Both apps keep a v3-style `tailwind.config.ts` with `content` globs — dead configuration in v4 (nothing references it via `@config`).
- The theme token block (`@theme inline` + variables) is duplicated **three times**: `packages/common-ui/src/globals.css`, `apps/user-web/app/globals.css`, `apps/admin-web/app/globals.css` — and the copies have already diverged.
- `apps/admin-web/app/globals.css` imports `tailwindcss` twice (lines 1 and 3) and is missing the `@source "../../../packages/common-ui/src"` directive that user-web has. Once admin-web uses shared components, classes used only inside `common-ui` will not be generated in its CSS.

## Engineering rules

Two sources of truth that have already drifted:
- Root `.rules` (line 67) says the shared-UI import is `@charity/common-ui`.
- `CLAUDE.md` and `.claude/rules/frontend.md` say `@project/common-ui` — which matches the real package name.

`.rules` is otherwise a near-copy of `.claude/rules/*`. **Amendment (accepted):** `.rules` is preserved until Cursor compatibility is explicitly verified — see `decisions-needed.md`.

## Lint / typecheck

- `@repo/eslint-config/next.js` re-adds `js.configs.recommended`, prettier, and `tseslint.configs.recommended` on top of `base.js`, which already includes them (harmless redundancy).
- Interaction worth knowing: `eslint-plugin-only-warn` in `base.js` downgrades every error to a warning, and the per-app script is `eslint --max-warnings 0` — so everything still blocks, but is *reported* as warnings.

## Missing layers

No database client, no auth, no `.env.example`, no test runner in any workspace (despite `.claude/rules/testing.md`), no CI workflow, no deployment config. Root `README.md` is stock create-turbo text describing apps (`docs`, `web`, `@repo/ui`) that do not exist here.

## Summary of blocking issues

1. `admin-web` cannot build (broken imports).
2. Documented shared-UI import path does not resolve.
3. Theme duplication with existing divergence; admin-web missing `@source` for shared components.
4. `.rules` vs `CLAUDE.md` package-name conflict (resolution deferred pending Cursor verification).
