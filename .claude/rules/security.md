# Security Rules

No dedicated security guidance existed in this project's prior conventions — these are baseline rules for the current Next.js/Server Actions stack, meant to be extended once a database or auth provider is chosen.

## Server Actions & Mutations
- Treat every Server Action input as untrusted, even though it isn't a public HTTP endpoint — re-validate and re-authorize on the server, never rely on client-side checks alone.
- Re-check the caller's role/ownership inside the Server Action itself (e.g. a donor can only mutate their own donation), not just in the UI that calls it.
- Validate and sanitize all form/action payloads server-side before using them in a query or mutation.

## Secrets & Environment Variables
- Never prefix secrets with `NEXT_PUBLIC_` — that exposes them to the client bundle. Only non-sensitive, truly public values may use that prefix.
- Keep service-role/admin credentials (once a database or auth provider exists) usable only from server-side code (Server Components, Server Actions, route handlers), never imported into client components.

## Data Access & RLS
- Treat URL search params and route params as untrusted input, even when used as the "source of truth" for fetching (per `architecture.md`) — validate shape/range before querying.
- When a database is introduced, enforce authorization at the data layer (e.g. Postgres Row Level Security) in addition to any checks in Server Actions — don't rely on application code alone to prevent cross-tenant/cross-user access.
- `admin-web` and `user-web` are separate privilege boundaries: never share a data-fetching helper between them that assumes admin-level access is safe to call from user-facing code paths.

## Rendering
- Sanitize or escape any user-generated content before rendering (donor messages, campaign descriptions) — don't render raw HTML from user input.

## Forbidden
- No secrets or service-role keys in client components or `NEXT_PUBLIC_*` variables.
- No trusting client-supplied role/ownership claims without a server-side check.
