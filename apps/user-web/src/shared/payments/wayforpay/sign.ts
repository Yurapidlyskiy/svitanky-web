import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

type SignatureField = string | number | null | undefined;

/** WayForPay signs everything with HMAC_MD5 (hex) over the UTF-8 text, keyed by the secret. */
export function hmacMd5(data: string, secretKey: string): string {
  return createHmac('md5', secretKey).update(data, 'utf8').digest('hex');
}

/** Values joined with `;` in the order the WayForPay docs list them; a missing value is empty. */
export function joinSignatureFields(fields: readonly SignatureField[]): string {
  return fields
    .map((field) => (field === null || field === undefined ? '' : String(field)))
    .join(';');
}

export function signFields(fields: readonly SignatureField[], secretKey: string): string {
  return hmacMd5(joinSignatureFields(fields), secretKey);
}

/** Constant-time comparison, so a forged signature cannot be found by timing the check. */
export function signaturesMatch(expected: string, received: unknown): boolean {
  if (typeof received !== 'string') return false;

  const a = Buffer.from(expected.toLowerCase(), 'utf8');
  const b = Buffer.from(received.toLowerCase(), 'utf8');

  return a.length === b.length && timingSafeEqual(a, b);
}
