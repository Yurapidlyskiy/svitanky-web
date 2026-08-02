# Target Architecture

The documented architecture (Container/Presentational on the App Router, Server Actions, feature folders, shared UI package — see `.claude/rules/`) is sound for this product and team size. The target is not a different architecture but **making the repo conform to the one it documents**, then filling the missing layers on the chosen platform.

**Platform decision (accepted):** Supabase is the data/auth platform (Postgres + RLS + Supabase Auth). See `adrs.md` ADR-5 and `domain-and-security.md`.

## Target repository shape

```
apps/
  user-web/                  # public: campaigns, donations, camp info
  admin-web/                 # admin: management tables driven by URL search params
packages/
  common-ui/                 # src/index.ts barrel; exports ".", "./globals.css"
  db/                        # FUTURE: generated Supabase types + server-only
                             #         data-access helpers ONLY (no migrations)
  eslint-config/
  typescript-config/
supabase/
  migrations/                # FUTURE: all schema migrations (SQL), incl. RLS policies
  config.toml                # FUTURE: supabase CLI config
docs/architecture/           # this documentation set
.claude/rules/               # engineering rules (canonical)
.rules                       # preserved until Cursor compatibility is verified
.github/workflows/ci.yml     # FUTURE: lint + check-types + test + build via turbo
```

## Convergence points

### 1. One shared-UI import style
`packages/common-ui` gets a `src/index.ts` barrel and an explicit exports map:

```jsonc
"exports": {
  ".": "./src/index.ts",
  "./globals.css": "./src/globals.css"
}
```

so `import { Button } from '@project/common-ui'` works exactly as `.claude/rules/frontend.md` documents. Deep imports are disallowed by convention and eventually by the exports map itself. `transpilePackages: ["@project/common-ui"]` stays in both `next.config.js` files because the package ships uncompiled TS.

### 2. One theme source (Tailwind v4)
- Design tokens live only in `packages/common-ui/src/globals.css`.
- Each app's `app/globals.css` shrinks to: `@import 'tailwindcss'`, `@import '@project/common-ui/globals.css'`, `@source "../../../packages/common-ui/src"`, plus app-specific font wiring.
- Both `apps/*/tailwind.config.ts` files are deleted (dead v3 config).

### 3. Data layer split (amended)
- **`supabase/migrations/`** owns the schema: all DDL and RLS policies as SQL migrations, applied via the Supabase CLI. Migrations are the single source of truth for the database.
- **`packages/db`** contains only:
  - generated TypeScript types (`supabase gen types typescript` output), and
  - server-only data-access helpers (query/mutation functions) guarded with the `server-only` package so they can never be bundled into client components.
- No ORM schema definitions, no migration files, and no client-side data access live in `packages/db`.

### 4. Auth and key handling (amended)
- **Both apps** may use the public Supabase **anon key** for Auth (sign-in/sign-up/session) — it is designed to be public and is safe under RLS. It may be exposed via `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- The **service-role key** is server-only: usable exclusively from Server Components, Server Actions, and route handlers, and **never** exposed through any `NEXT_PUBLIC_*` variable or imported into client code.
- Authorization is enforced at the data layer (RLS) in addition to checks inside Server Actions — application code alone is never the boundary. Details in `domain-and-security.md`.

### 5. Privilege boundaries between apps
`admin-web` and `user-web` remain separate privilege boundaries (per `.claude/rules/security.md`). Admin-privileged helpers live either inside `apps/admin-web` or in a clearly separated, `server-only`-guarded subpath of `packages/db` that user-web never imports. RLS policies — not helper placement — remain the ultimate enforcement.

### 6. Feature verticals
New features follow the documented folder pattern per app:

```
app/<feature>/
├── page.tsx        # Container (Server Component; reads searchParams, calls packages/db helpers)
├── actions.ts      # Server Actions (validate + authorize + mutate via packages/db)
├── components/     # Presentational (server by default; 'use client' only when interactive)
└── hooks/          # Pure logic hooks; never fetch
```

### 7. Quality gates
Vitest + React Testing Library per workspace (hooks and complex components), a `test` task in `turbo.json`, and a GitHub Actions workflow running `lint`, `check-types`, `test`, `build` on every PR. Integration tests target Server Actions and Containers per `.claude/rules/testing.md`. Playwright is deferred until real user flows exist.

## What deliberately does not change

- Turborepo + npm workspaces, Next.js 16 / React 19, Tailwind v4, shadcn-style components on `@base-ui/react`.
- The Container/Presentational and Server Actions rules in `.claude/rules/` — they are adopted as-is.
- `.rules` stays in place until Cursor compatibility is verified (see `decisions-needed.md`).
