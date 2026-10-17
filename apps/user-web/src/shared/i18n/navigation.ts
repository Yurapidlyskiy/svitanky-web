import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Locale-aware replacements for next/link and next/navigation — use these for every
// internal link so the visitor stays in the language they picked.
export const { getPathname, Link, redirect, usePathname, useRouter } = createNavigation(routing);
