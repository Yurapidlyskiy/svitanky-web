# Architecture Decision Records

Status values: **Accepted** (approved with the audit), **Accepted (amended)** (approved with corrections), **Proposed** (awaiting a human decision listed in `decisions-needed.md`).

---

## ADR-1: Repair `admin-web` from the shared baseline

**Status:** Accepted

**Context.** `apps/admin-web` is unbuildable create-turbo template code: `app/page.tsx` imports `@repo/ui/button` (a package from the template, not this workspace) and `./page.module.css` (no such file exists). It also lacks the Tailwind `@source` directive and body styling that `user-web` has.

**Decision.** Rewrite `apps/admin-web`'s `page.tsx`, `layout.tsx`, and `globals.css` to mirror `user-web`'s conventions: `@project/common-ui` imports, Tailwind v4 setup, shared theme, correct metadata.

**Consequences.** The monorepo builds again; Turbo caching, CI, and deployment become possible; both apps share one consistent baseline before feature work starts.

---

## ADR-2: Give `@project/common-ui` a real public API

**Status:** Accepted

**Context.** The documented import `import { Button } from '@project/common-ui'` does not resolve — the exports map is `"./*": "./src/*.tsx"` with no root export, and `src/lib/utils.ts` / `src/globals.css` are unreachable through it. `user-web` uses a deep import as a workaround.

**Decision.** Add `src/index.ts` re-exporting components and `cn`; set exports to `{".": "./src/index.ts", "./globals.css": "./src/globals.css"}`; keep `transpilePackages` in both apps (the package ships uncompiled TS). Update `user-web`'s deep import in the same change. Move the `shadcn` CLI to devDependencies.

**Consequences.** The rules docs become true; internal file layout can change without breaking consumers; the theme CSS becomes importable by apps (prerequisite for ADR-3).

---

## ADR-3: Single styling source of truth on Tailwind v4

**Status:** Accepted

**Context.** Theme tokens are duplicated across three `globals.css` files and have already diverged; both apps carry dead v3 `tailwind.config.ts` files; `admin-web/app/globals.css` double-imports `tailwindcss` and is missing the `@source` directive for `packages/common-ui`.

**Decision.** Tokens live only in `packages/common-ui/src/globals.css`; each app imports it (`@import '@project/common-ui/globals.css'`) plus `@source "../../../packages/common-ui/src"`; delete both `tailwind.config.ts` files (nothing references them via `@config`).

**Consequences.** Admin and user apps stay visually consistent; no silent missing-class bugs when admin-web adopts shared components.

---

## ADR-4: Canonical rules location, `.rules` preserved for now

**Status:** Accepted (amended)

**Context.** Engineering rules exist in both root `.rules` and `.claude/rules/` + `CLAUDE.md`, with a direct conflict: `.rules` names the shared-UI package `@charity/common-ui`; the real package (and `CLAUDE.md`) say `@project/common-ui`.

**Decision (amended).** `.claude/rules/` + `CLAUDE.md` are canonical. **`.rules` is preserved — not deleted or modified — until it is explicitly verified whether Cursor (or another editor tool) consumes it.** Once verified: if consumed, reduce it to a pointer at `.claude/rules/`; if not, remove it. Until then, on any conflict `.claude/rules/` wins, and the `@charity/common-ui` import in `.rules` is known-wrong.

**Consequences.** No tool breakage from premature deletion; the drift risk remains temporarily and is tracked in `decisions-needed.md`.

---

## ADR-5: Supabase as the data/auth platform

**Status:** Accepted (amended)

**Context.** `.claude/rules/security.md` and the feature-planning skill assume Postgres RLS and server-side role checks, but no provider was chosen. The audit recommended Supabase; the recommendation was accepted with amendments on layout and key handling.

**Decision.**
- Supabase provides Postgres, RLS, and Auth.
- **All schema migrations (DDL and RLS policies) live in `supabase/migrations/`** and are applied via the Supabase CLI — the single source of truth for the database.
- **`packages/db` contains only** generated TypeScript types (`supabase gen types typescript`) and server-only data-access helpers guarded by the `server-only` package. No migrations, no ORM schema, no client-side data access.
- **Both apps may use the public anon key for Auth** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`); safety rests on RLS. **The service-role key is server-only and never exposed through `NEXT_PUBLIC_*`** or client imports.

**Consequences.** The RLS rules in `security.md` become enforceable; minors'-data requirements (`domain-and-security.md`) are implemented as migrations + policies; no Supabase resources are created until Phase 3 of the roadmap begins.

---

## ADR-6: Baseline quality gates before feature work

**Status:** Accepted (test-stack choice still Proposed)

**Context.** `.claude/rules/testing.md` prescribes a testing strategy, but no test runner is installed anywhere; there is no CI, which is how an unbuildable app (`admin-web`) got committed.

**Decision.** Add a `test` task to `turbo.json` and a GitHub Actions workflow running `lint`, `check-types`, `test`, `build` on every PR. Recommended stack: Vitest + React Testing Library (unit: hooks, complex components; integration: Server Actions, Containers). Playwright deferred until real flows exist. The concrete stack is a human decision (`decisions-needed.md`).

**Consequences.** A broken-build state can no longer merge; the testing rules gain teeth.

---

## ADR-7: Minors' data protection is a schema-level requirement

**Status:** Accepted (amended — added at review acceptance)

**Context.** The platform will store data about children (camp registrations). Protecting it cannot be an application-code afterthought.

**Decision.** Before any minor PII is stored: guardian consent is recorded (who, when, version, scope) and revocable; data minimization is enforced per column; a written retention/deletion policy exists with automated expiry; all admin access to minors' records is audited append-only at the data layer. Full detail in `domain-and-security.md`. Retention periods and legal texts are human decisions.

**Consequences.** The first minors'-data migration is larger (consent + audit tables, stricter RLS), but compliance and trust properties hold from day one and never need retrofitting.
