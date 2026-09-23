import { ROUTES } from '@/shared/config/routes';

const PLACEHOLDER_ORIGIN = 'http://admin.invalid';

/**
 * Turns an untrusted `next` value into a same-origin path, so the login form
 * cannot be abused as an open redirect (`//evil.com`, `/\evil.com`, `https:…`).
 */
export function safeRedirectPath(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/')) return ROUTES.dashboard;

  let url: URL;
  try {
    url = new URL(value, PLACEHOLDER_ORIGIN);
  } catch {
    return ROUTES.dashboard;
  }

  if (url.origin !== PLACEHOLDER_ORIGIN || url.pathname === ROUTES.login) {
    return ROUTES.dashboard;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
