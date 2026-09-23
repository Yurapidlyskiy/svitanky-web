export const ROUTES = {
  dashboard: '/',
  login: '/login',
  posts: '/posts',
  newPost: '/posts/new',
} as const;

/** Routes reachable without an admin session. Everything else is protected. */
export const PUBLIC_ROUTES: readonly string[] = [ROUTES.login];

export const ADMIN_NAVIGATION = [
  { href: ROUTES.dashboard, label: 'Головна' },
  { href: ROUTES.posts, label: 'Публікації' },
] as const;
