# Decisions Requiring Human Approval

Already decided at audit acceptance (2026-08-02): **Supabase** is the data/auth platform (ADR-5); migrations live in `supabase/migrations/`; `packages/db` holds generated types and server-only helpers only; both apps may use the public anon key for Auth; the service-role key is server-only.

Open decisions, in the order they block the roadmap:

## 1. Payment provider — blocks the donations vertical (Phase 3/4)

Options to evaluate for Ukrainian charity donations: LiqPay, Fondy, WayForPay, Stripe (availability/fees for UA entities), or bank-transfer-only for v1. Working assumption regardless of choice: provider-hosted checkout, card data never touches our database. The choice shapes the donations schema (webhook/callback model, currency handling, recurring donations) — needed before Phase 3's donations tables are designed.

## 2. Deployment target — blocks CI/CD completion (Phase 2/3)

Vercel two-project setup vs. self-hosted (e.g. Docker on a VPS) vs. other. Affects env-var handling, preview environments, and the shape of `.github/workflows/ci.yml`. A CI-only workflow (no deploy) can land in Phase 2 without this decision.

## 3. i18n policy — blocks final layout metadata (Phase 0 uses a reversible default)

Ukrainian-only (hardcode `lang="uk"` and inline strings) vs. multi-locale via `next-intl` or similar. Phase 0 proceeds with hardcoded Ukrainian as the reversible interim; the decision determines whether Phase 4 features must externalize strings from the start.

## 4. Legal & privacy policy — blocks Phase 3 minors'-data schema

Required inputs from a human (likely with legal advice), per `domain-and-security.md`:
- Retention periods per data category (registrations, medical notes, audit logs, donor records).
- Consent text and versioning policy for guardian consent.
- Privacy policy and terms published to users; which regulations apply (Ukrainian data-protection law; GDPR if EU data subjects are in scope).
- Designated person responsible for access-audit review and deletion-request SLA.

## 5. `components.json` `rsc` flag in `packages/common-ui` — blocks nothing, decide by Phase 1

Currently `rsc: false`, so future `shadcn add` output is client-flavored — at odds with the server-first rule in `.claude/rules/architecture.md`. Recommendation: flip to `true`. Approve before the next `shadcn add`.

## 6. `.rules` / Cursor compatibility — verification task, then decision (Phase 0)

**Amended: `.rules` is preserved untouched until this is verified.** Determine whether Cursor (or any other tool in use) reads root `.rules`. Then per ADR-4: if consumed, reduce it to a pointer at `.claude/rules/` (fixing the known-wrong `@charity/common-ui` reference); if not, remove it. Either action needs explicit approval after verification.

## 7. Test stack — blocks Phase 2

Recommendation: Vitest + React Testing Library (unit + integration), Playwright deferred. Approval needed because it adds dependencies across all workspaces.
