import 'server-only';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const REQUEST_TIMEOUT_MS = 8000;
/** Cloudflare's own ceiling for a token; anything longer is not one. */
const MAX_TOKEN_LENGTH = 2048;

/** The hidden field the Turnstile widget adds to the form it sits in. */
export const TURNSTILE_RESPONSE_FIELD = 'cf-turnstile-response';

/**
 * `off` while the secret is unset outside production, so local dev and e2e run without
 * Cloudflare; `missing` in a production deployment, where checkouts must then be refused.
 */
export type TurnstileSetting = { secretKey: string } | 'missing' | 'off';

export function readTurnstileSetting(
  env: Record<string, string | undefined> = process.env
): TurnstileSetting {
  const secretKey = env.TURNSTILE_SECRET_KEY?.trim();

  if (secretKey) return { secretKey };

  return env.VERCEL_ENV === 'production' ? 'missing' : 'off';
}

type VerifyOptions = {
  fetchImpl?: typeof fetch;
  remoteIp?: string;
};

/**
 * Asks Cloudflare whether the token proves a human solved the widget. A token is single-use,
 * so a retry needs a fresh widget. Any failure, including Cloudflare being unreachable,
 * counts as "not verified": the form is closed rather than open to bots.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstileToken(
  token: unknown,
  secretKey: string,
  { fetchImpl = fetch, remoteIp }: VerifyOptions = {}
): Promise<boolean> {
  if (typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) return false;

  const body = new URLSearchParams({ response: token, secret: secretKey });

  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await fetchImpl(VERIFY_URL, {
      body,
      cache: 'no-store',
      method: 'POST',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('[payments] Turnstile check failed', { status: response.status });

      return false;
    }

    const data: unknown = await response.json();

    return typeof data === 'object' && data !== null && 'success' in data && data.success === true;
  } catch (error) {
    console.error('[payments] Turnstile check failed', error);

    return false;
  }
}
