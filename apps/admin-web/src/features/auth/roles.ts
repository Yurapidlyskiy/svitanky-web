export const ADMIN_ROLE = 'admin';

/**
 * The role lives in `app_metadata`, which only the service role can write.
 * Never read it from `user_metadata` — the user can edit that themselves.
 */
export function hasAdminRole(appMetadata: unknown): boolean {
  return (
    typeof appMetadata === 'object' &&
    appMetadata !== null &&
    (appMetadata as Record<string, unknown>).role === ADMIN_ROLE
  );
}
