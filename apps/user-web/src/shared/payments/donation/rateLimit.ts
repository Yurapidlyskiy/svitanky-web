import 'server-only';

type Window = { count: number; resetAt: number };

type RateLimitOptions = {
  limit: number;
  /** Past this many tracked keys, expired windows are swept so memory stays bounded. */
  maxKeys?: number;
  windowMs: number;
};

/**
 * A fixed-window counter per key, kept in this server instance's memory.
 *
 * Best effort only: on Vercel every instance counts on its own and forgets on a cold start.
 * It slows a single bot down; it is not a hard limit. A shared store (Upstash, Vercel
 * Firewall) replaces it once the deployment infrastructure is set up.
 */
export function createRateLimiter({ limit, maxKeys = 10_000, windowMs }: RateLimitOptions) {
  const windows = new Map<string, Window>();

  function sweep(now: number) {
    for (const [key, window] of windows) {
      if (window.resetAt <= now) windows.delete(key);
    }
    // Still full of live windows: someone is spraying addresses, start over.
    if (windows.size >= maxKeys) windows.clear();
  }

  /** Counts one attempt for `key`; `false` once the key has used up its window. */
  return function allow(key: string, now: number = Date.now()): boolean {
    const current = windows.get(key);

    if (current && current.resetAt > now) {
      current.count += 1;

      return current.count <= limit;
    }

    if (windows.size >= maxKeys) sweep(now);
    windows.set(key, { count: 1, resetAt: now + windowMs });

    return true;
  };
}

/** The visitor's address as the hosting proxy reports it (Vercel sets `x-forwarded-for`). */
export function clientIp(headers: Headers): string | undefined {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  return forwarded || headers.get('x-real-ip')?.trim() || undefined;
}
