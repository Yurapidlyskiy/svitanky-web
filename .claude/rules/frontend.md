# Frontend Rules

## Data Mutations & Server Actions
- Use Next.js Server Actions for all data mutations (forms, submitting new camps, donations, etc.).
- Store server actions in an `actions/` directory or colocate them in an `actions.ts` file near the feature.
- Use React 19 hooks for handling actions in Client Components:
  - `useActionState` — primary hook for form state, returning payload/validation errors from Server Actions.
  - `useFormStatus` — handle pending/loading states of forms.
  - `useOptimistic` — instantly update the UI (e.g. a donation progress bar) before the server responds.

## Custom Hooks
- Store in the `hooks/` directory.
- Write pure business logic hooks (e.g. `useFavoriteReportLogic`, `useDonationCalculator`).
- Pass external data into hooks as a single object parameter (`{ data, config }`) rather than multiple distinct arguments.
- NEVER place data fetching (API calls, queries) inside generic custom hooks — hooks only process data, they don't fetch it.

## Typing and Imports
- Shared types: place in `types/` at the feature root if used across multiple files.
- Inline types: define component `Props` interfaces directly inside the component file if only used there — don't create redundant `.types.ts` files for single use.
- Shared UI: always import generic UI elements from the internal package:
  ```ts
  import { Button } from '@project/common-ui';
  ```
- Absolute imports: use `@/` for internal app imports.

## Forbidden
- No API calls hidden inside custom hooks.
- No `useEffect` for data fetching — rely on Server Components or Next.js built-in data fetching.
