'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { ROUTES } from '@/shared/config/routes';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import { parseCredentials } from './credentials';
import { safeRedirectPath } from './redirect';
import { hasAdminRole } from './roles';
import type { LoginFormState } from './types';

// One message for "no such user", "wrong password" and "not an admin", so the
// form cannot be used to find out which emails have accounts.
const INVALID_CREDENTIALS = 'Невірна електронна пошта або пароль';
const TOO_MANY_ATTEMPTS = 'Забагато спроб входу. Спробуйте за кілька хвилин';
const UNEXPECTED_ERROR = 'Не вдалося увійти. Спробуйте ще раз';

// Auth errors that mean "these credentials don't get you in". Anything else
// (404 from a misconfigured URL, 5xx, network) is a fault, not a bad password.
const CREDENTIAL_ERROR_CODES = new Set([
  'invalid_credentials',
  'email_not_confirmed',
  'user_banned',
]);

export async function signIn(
  _previous: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const rawEmail = formData.get('email');
  const email = typeof rawEmail === 'string' ? rawEmail.slice(0, 254) : undefined;

  const parsed = parseCredentials(formData);
  if (!parsed.success) {
    return { email, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // Codes only — never the email or password.
    console.warn('[auth] signIn rejected', { code: error.code, status: error.status });
    if (error.status === 429) return { email, error: TOO_MANY_ATTEMPTS };
    if (CREDENTIAL_ERROR_CODES.has(error.code ?? '')) return { email, error: INVALID_CREDENTIALS };
    return { email, error: UNEXPECTED_ERROR };
  }

  if (!hasAdminRole(data.user.app_metadata)) {
    console.warn('[auth] signIn rejected: missing admin role', { userId: data.user.id });
    await supabase.auth.signOut();
    return { email, error: INVALID_CREDENTIALS };
  }

  redirect(safeRedirectPath(formData.get('next')));
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(ROUTES.login);
}
