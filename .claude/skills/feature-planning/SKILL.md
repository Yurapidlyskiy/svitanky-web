---
name: feature-planning
description: Turns a feature idea into user stories, data model, roles, RLS requirements, edge cases, acceptance criteria, and an implementation plan. Planning only — produces no code.
---

# Feature Planning

Invoke via `/feature-planning <feature idea>`. Output a plan; do not write or edit code, and do not run build/dev commands. Read-only inspection of the existing codebase is fine to ground the plan in reality.

## Process
Given a feature idea, ask clarifying questions only when a decision genuinely can't be inferred from context. Otherwise state assumptions explicitly and proceed.

## Output (in this order)
1. **User Stories** — "As a [role], I want to [action], so that [benefit]," covering the public (`user-web`) and admin (`admin-web`) sides as relevant.
2. **Data Model** — entities, fields, relationships; note additions/changes to any existing schema.
3. **Roles & Permissions** — who can create/read/update/delete each entity (donor, admin, anonymous visitor, etc.).
4. **RLS Requirements** — row-level access rules per entity/role (e.g. a donor reads only their own donations; admins read all within their org). State these even if the current stack has no DB/RLS engine yet, so they translate directly into policies (e.g. Postgres RLS) once one exists.
5. **Edge Cases** — failure modes, empty/loading states, concurrent edits, partial failures (e.g. payment succeeds but record write fails).
6. **Acceptance Criteria** — testable, per user story.
7. **Implementation Plan** — ordered, file/folder-level steps that follow `.claude/rules/architecture.md` (containers vs. presentational, server actions, hooks) — no code.

Do not write code, do not create files, and do not run commands beyond read-only inspection needed to ground the plan in the existing codebase.
