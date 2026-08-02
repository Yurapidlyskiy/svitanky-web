# Architecture Rules

## Project Structure
Monorepo (Turborepo / npm workspaces):
- `apps/admin-web`: Next.js application for administrators.
- `apps/user-web`: Next.js application for public users.
- `packages/common-ui`: Shared React components, styles, and UI logic (used by both apps).

## Core Pattern: Container / Presentational (Next.js App Router)
Strictly separate data fetching/orchestration (Containers) from presentation (Components).

### Containers = Server Components
- `page.tsx` and `layout.tsx` act as Containers.
- DO use Server Components for all initial data fetching (`await fetch()`, ORM calls, DB queries).
- DO use URL Search Parameters (`?page=2&sort=asc`) as the source of truth for dynamic fetching (pagination, filtering, sorting in admin tables).
- DO pass raw, processed data down to Presentational Components as props.
- DON'T use client-side data fetching libraries (`useEffect` + `fetch`, React Query, SWR) for initial load unless required for real-time polling.

### Presentational Components = UI Components (Client or Server)
- Stored in the `components/` directory of the specific feature.
- Do not automatically make every UI component a Client Component.
- Server UI Components: pure UI (cards, typography, layouts) stays a Server Component by default.
- Client UI Components: add `'use client'` at the top only if the component needs interactivity, DOM events, or state/lifecycle hooks.
- Compose larger Client components out of smaller, pure sub-components to avoid prop drilling (no more than 5–7 props).

## File & Folder Structure Pattern (Per Feature)
When creating a new feature (e.g. "Camps"), follow this structure:

```
app/camps/
├── page.tsx           # Container (Server Component - fetches data)
├── actions.ts         # Server Actions for mutations (e.g. createCamp)
├── components/        # Presentational Components
│   ├── CampList.tsx   # 'use client' if interactive filtering is needed
│   ├── CampCard.tsx   # Pure Server UI Component (no 'use client')
│   └── index.ts
└── hooks/
    └── useCampFilters.ts  # Pure logic, receives initial data via params
```

## Forbidden
- No massive monolithic components — break a file down once it exceeds ~150–200 lines.
- No mixing of Server Component fetching and Client Component interactivity in the exact same file, unless using a well-defined Container pattern.
