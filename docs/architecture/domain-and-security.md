# Domain & Security Model

Platform: Supabase (Postgres + RLS + Supabase Auth) — accepted decision, see `adrs.md` ADR-5.
This document extends `.claude/rules/security.md`; where they overlap, the stricter rule wins.

## Actors and roles

| Actor | Auth state | App | Typical capabilities |
|---|---|---|---|
| Visitor | Anonymous | user-web | Browse campaigns/camps, start a donation |
| Donor / Guardian | Authenticated (Supabase Auth) | user-web | Manage own profile, own donations, own children's registrations |
| Admin | Authenticated + admin role | admin-web | Manage campaigns, camps, registrations, reports |
| Service | Server-side only | either app's server code | Privileged operations via service-role key |

Role assignment lives in the database (e.g. an `app_roles` table or Supabase custom claims), never in client-supplied data. Every Server Action re-checks role/ownership server-side; the UI hiding a button is not authorization.

## Keys and clients (amended policy)

- **Anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`): public by design. **Both apps** may use it for Auth flows (sign-in, sign-up, session refresh) and for RLS-guarded reads. Exposure in the client bundle is expected and safe *only because* RLS is the enforcement layer.
- **Service-role key** (`SUPABASE_SERVICE_ROLE_KEY`): bypasses RLS. Server-only — Server Components, Server Actions, route handlers. Never prefixed `NEXT_PUBLIC_`, never imported into a client component, never sent to the browser in any form. The helper that constructs the service-role client lives in `packages/db` behind the `server-only` package.
- `.env.example` files must list both keys with comments stating this policy; real values are never committed.

## Authorization layering

Defense in depth — three layers, all mandatory:

1. **RLS policies** (in `supabase/migrations/`): the ultimate boundary. Every table has RLS enabled; default deny; policies grant per-role, per-ownership access. Cross-user and cross-tenant access must be impossible even if application code is buggy.
2. **Server Actions**: validate payload shape/range (URL search params and route params are untrusted input), re-check role and ownership, then call `packages/db` helpers.
3. **App separation**: `admin-web` and `user-web` are separate privilege boundaries. No shared data-fetching helper may assume admin-level access is safe to call from user-facing code paths.

User-generated content (donor messages, campaign descriptions) is escaped/sanitized before rendering; raw HTML from user input is never rendered.

## Minors' data (amended — required before any minor PII is stored)

The platform will handle data about children (e.g. camp registrations). The following are **hard requirements**, to be reflected in the schema, RLS policies, and admin workflows before the first minor record exists:

### 1. Guardian consent
- A minor's record may be created only by (or linked to) an authenticated guardian account, with an explicit, recorded consent action.
- Consent records store: consenting guardian, timestamp, consent version (which policy text was agreed to), and scope (what processing was consented to).
- Consent is revocable; revocation triggers the deletion/anonymization workflow below.

### 2. Data minimization
- Store only fields strictly required for the concrete purpose (e.g. camp participation: name, age band, medical notes needed for safety). No "nice to have" fields.
- Every column holding minor PII is justified in the migration that introduces it (comment or accompanying doc).
- Sensitive fields (medical notes) are separated into their own table with stricter RLS than basic registration data.

### 3. Retention and deletion
- A written retention policy defines how long each category of minor data is kept after the relevant camp/program ends (exact periods are a legal/human decision — see `decisions-needed.md`).
- Expiry triggers deletion or irreversible anonymization; aggregate/statistical reporting must not depend on retaining PII.
- Guardian-initiated deletion requests are honored through a defined workflow with a documented SLA.

### 4. Access audit
- Every admin read and write of a minor's record is logged: who, when, which record, which action.
- Audit logs are append-only (no update/delete via RLS), retained per the retention policy, and reviewable by a designated responsible person.
- The audit mechanism lives at the data layer (e.g. audit table populated by triggers or by the server-only helpers), not solely in application code.

### RLS sketch for minors' data

- Guardians: read/write only records linked to their own account.
- Admins: access only via policies scoped to their role, with all access audited.
- Anonymous: no access whatsoever.
- Medical/sensitive tables: narrower admin subset if roles are later differentiated.

## Non-goals of this document

Payment data handling depends on the payment-provider decision (card data should never touch our database — provider-hosted checkout is the working assumption). Legal texts (privacy policy, consent wording, retention periods) are human decisions tracked in `decisions-needed.md`.
