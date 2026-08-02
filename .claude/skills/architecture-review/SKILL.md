---
name: architecture-review
description: Manual, read-only audit of the codebase's current architecture, producing a target architecture, ADRs, risks, and a phased roadmap. Only run when the user explicitly invokes /architecture-review — do not trigger this automatically from other requests.
---

# Architecture Review

Invoke only via an explicit `/architecture-review` request. Never trigger this proactively from a feature request, bug report, or refactor ask.

## Mode
- Read-only by default: use Read, Grep/Glob, and read-only Bash (`git log`, `ls`, `find`, dry-run lint/typecheck) for inspection. Do not Edit or Write files, run installs, or change git state.
- If the user explicitly asks you to also apply changes, confirm scope with them first — that's outside this skill's default read-only mode.

## Process
1. Inspect the repo: monorepo layout, apps/packages, routing, data layer, auth, shared UI, deployment config, and `.claude/rules/*`.
2. Note deviations from the documented rules (`architecture.md`, `frontend.md`, `security.md`, `testing.md`) and any undocumented conventions actually in use.
3. Identify pain points: coupling, duplicated logic, inconsistent patterns across `admin-web`/`user-web`, missing tests, security gaps.

## Output (in this order)
1. **Current-State Audit** — what exists today, by layer (apps, shared packages, data, auth, infra).
2. **Target Architecture** — the shape the codebase should converge to, and why.
3. **ADRs** — one short Architecture Decision Record per significant recommendation (Context / Decision / Consequences).
4. **Risks** — what could go wrong with the current state and with the proposed migration.
5. **Phased Roadmap** — ordered, independently shippable phases with rough effort.
6. **Decisions Requiring Approval** — explicit list of calls needing a human decision (breaking changes, new dependencies, data model changes, cross-team impact) before implementation starts.

Keep the report concrete — cite actual files/paths, not generic advice.
