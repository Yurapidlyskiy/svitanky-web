import type { NextRequest } from 'next/server';

import { hasAdminRole } from '@/features/auth/roles';
import { PUBLIC_ROUTES, ROUTES } from '@/shared/config/routes';
import { redirectWithSession, updateSession } from '@/shared/supabase/proxy';

/**
 * Refreshes the session on every request and performs an OPTIMISTIC redirect.
 * This is not the security boundary — `requireAdmin()` is. See
 * features/auth/session.ts.
 */
export async function proxy(request: NextRequest) {
  const { response, claims } = await updateSession(request);
  const isAdmin = hasAdminRole(claims?.app_metadata);
  const { pathname, search } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return isAdmin
      ? redirectWithSession(new URL(ROUTES.dashboard, request.url), response)
      : response;
  }

  if (!isAdmin) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);
    return redirectWithSession(loginUrl, response);
  }

  return response;
}

export const config = {
  // Skip static assets and image optimisation — they need no session.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
