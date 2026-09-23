import { createServerClient } from '@supabase/ssr';
import type { JwtPayload } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { publicEnv } from '@/shared/config/env';

type SessionResult = {
  response: NextResponse;
  claims: JwtPayload | null;
};

/**
 * Refreshes the Supabase session cookies for this request and returns the
 * verified JWT claims. The returned response carries the refreshed cookies —
 * any redirect built from it must copy them (see `redirectWithSession`).
 */
export async function updateSession(request: NextRequest): Promise<SessionResult> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    }
  );

  // getClaims() verifies the JWT signature; getSession() would trust the cookie blindly.
  const { data } = await supabase.auth.getClaims();

  return { response, claims: data?.claims ?? null };
}

/** Redirects while keeping any session cookies `updateSession` just refreshed. */
export function redirectWithSession(url: URL, sessionResponse: NextResponse): NextResponse {
  const redirect = NextResponse.redirect(url);
  sessionResponse.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}
