import 'server-only';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/shared/config/routes';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import { hasAdminRole } from './roles';
import type { Admin } from './types';

/**
 * Data Access Layer: the authoritative admin check. proxy.ts only does an
 * optimistic redirect — every page and Server Action touching admin data must
 * call `requireAdmin()` itself. Memoised per request by React `cache`.
 */
export const getAdmin = cache(async (): Promise<Admin | null> => {
  const supabase = await createSupabaseServerClient();
  // getUser() asks the Auth server, so a revoked or deleted user is rejected
  // even while their JWT is still unexpired.
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || !hasAdminRole(data.user.app_metadata)) return null;

  return { id: data.user.id, email: data.user.email ?? '' };
});

export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin();
  if (!admin) redirect(ROUTES.login);
  return admin;
}
