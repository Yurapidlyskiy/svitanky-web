# Phased Roadmap

Ordered, independently shippable phases. Each phase leaves the repo in a working state. Effort estimates assume one developer familiar with the stack.

Constraints in effect: no source changes, dependency installs, or Supabase resources are made as part of the review itself — this roadmap is the plan for subsequent, separately approved work. `.rules` is not touched until Cursor compatibility is verified.

## Phase 0 — Make it build (hours) · ADR-1, ADR-4

- Fix `apps/admin-web`: rewrite `app/page.tsx`, `layout.tsx`, `globals.css` to mirror user-web conventions (`@project/common-ui`, Tailwind v4, `@source` directive, shared body styling).
- Remove dead template code: unused `ThemeImage` + `next/image` import in `apps/user-web/app/page.tsx`, stock SVGs in both `public/` dirs.
- Real metadata (`title`, `description`) and `lang="uk"` in both layouts (pending the i18n decision — hardcoding `uk` is the reversible default).
- Rewrite root `README.md` to describe this repo instead of the create-turbo template.
- Verify Cursor's use of `.rules` (see `decisions-needed.md` #6); act on the result per ADR-4.

**Exit criteria:** `npm run build`, `lint`, `check-types` pass from the root.

## Phase 1 — Shared-UI API + styling consolidation (half a day) · ADR-2, ADR-3

- `packages/common-ui`: add `src/index.ts` barrel; exports map `{".": "./src/index.ts", "./globals.css": "./src/globals.css"}`; move `shadcn` to devDependencies; settle the `components.json` `rsc` flag (decision #5).
- Update `user-web`'s deep import to the root import in the same change.
- Theme tokens only in `packages/common-ui/src/globals.css`; both app `globals.css` files shrink to imports + `@source` + font wiring; delete both `apps/*/tailwind.config.ts`.

**Exit criteria:** `import { Button } from '@project/common-ui'` works in both apps; one theme source; both apps render shared components with correct styles.

## Phase 2 — Quality gates (half a day) · ADR-6

- Install the approved test stack (default recommendation: Vitest + React Testing Library) per workspace; add a `test` task to `turbo.json`.
- Add `.github/workflows/ci.yml`: `lint`, `check-types`, `test`, `build` on PRs and pushes to `main`.
- Seed tests: one hook unit test, one component test in `common-ui`.

**Exit criteria:** CI is green on `main`; a PR reintroducing a broken import cannot merge.

## Phase 3 — Data & auth foundation (days) · ADR-5, ADR-7 — gated on decisions

Blocked until decisions #1 (payment provider, insofar as it shapes the donations schema), #4 (legal/privacy: retention periods, consent text) are made; Supabase itself is already decided.

- Initialize Supabase project + CLI; `supabase/migrations/` holds all schema, starting with: roles, profiles, consent, and audit tables with default-deny RLS.
- Create `packages/db`: generated types + `server-only` data-access helpers; service-role client construction only here.
- `.env.example` per app documenting `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public by design), `SUPABASE_SERVICE_ROLE_KEY` (server-only, never `NEXT_PUBLIC_`).
- Auth flows in both apps using the anon key; admin role check for admin-web.
- Minors'-data schema per `domain-and-security.md`: guardian consent, minimized columns, separated sensitive tables, append-only audit.

**Exit criteria:** RLS default-deny verified by tests (cross-user access impossible); auth works in both apps; audit rows appear on admin access to minors' records.

## Phase 4 — First feature verticals (per-feature)

- Features (camps, campaigns, donations) built per the documented folder pattern: `app/<feature>/{page.tsx, actions.ts, components/, hooks/}`.
- Admin tables driven by URL search params (validated server-side); mutations via Server Actions calling `packages/db` helpers.
- Donations depend on the payment-provider decision (#1); provider-hosted checkout assumed — card data never touches our database.
- Integration tests for each feature's Server Actions and Container per `.claude/rules/testing.md`.

**Exit criteria:** per-feature acceptance criteria from `/feature-planning` outputs.

## Deliberately deferred

- Playwright end-to-end tests — until real user flows exist (late Phase 4).
- i18n framework (`next-intl` or similar) — until decision #3; Ukrainian-only hardcoding is the reversible interim.
- Deployment automation — until decision #2 (target platform).
