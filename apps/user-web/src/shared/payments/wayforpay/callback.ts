import 'server-only';

import type { WayForPayConfig } from './config';
import { signFields, signaturesMatch } from './sign';

type Payload = Record<string, unknown>;

/** The fields of a payment notification worth keeping once its signature is proven. */
export type VerifiedNotification = {
  amount: string;
  currency: string;
  orderReference: string;
  paymentSystem: string;
  reasonCode: string;
  transactionStatus: string;
};

function text(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function parseObject(value: string): Payload | null {
  try {
    const parsed: unknown = JSON.parse(value);

    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? (parsed as Payload)
      : null;
  } catch {
    return null;
  }
}

/**
 * WayForPay posts the result as JSON but labels it `application/x-www-form-urlencoded`,
 * so the body is read as text. Form-encoded fields are accepted too, to be safe.
 */
export function parseNotificationBody(raw: string): Payload | null {
  const body = raw.trim();

  if (!body) return null;

  const json = parseObject(body);

  if (json) return json;

  const params = new URLSearchParams(body);

  for (const [key, value] of params) {
    // The whole JSON document ends up as the only key, with an empty value.
    if (value === '') {
      const fromKey = parseObject(key);

      if (fromKey) return fromKey;
    }
  }

  return params.has('orderReference') ? Object.fromEntries(params) : null;
}

/**
 * Proves a notification came from WayForPay: it must be for our merchant account and carry
 * a signature that only the holder of the secret key can produce.
 * https://wiki.wayforpay.com/en/view/852102
 */
export function verifyNotification(
  payload: Payload,
  config: Pick<WayForPayConfig, 'merchantAccount' | 'secretKey'>
): VerifiedNotification | null {
  const merchantAccount = text(payload.merchantAccount);
  const orderReference = text(payload.orderReference);

  if (!orderReference || merchantAccount !== config.merchantAccount) return null;

  const expected = signFields(
    [
      merchantAccount,
      orderReference,
      text(payload.amount),
      text(payload.currency),
      text(payload.authCode),
      text(payload.cardPan),
      text(payload.transactionStatus),
      text(payload.reasonCode),
    ],
    config.secretKey
  );

  if (!signaturesMatch(expected, payload.merchantSignature)) return null;

  return {
    amount: text(payload.amount),
    currency: text(payload.currency),
    orderReference,
    paymentSystem: text(payload.paymentSystem),
    reasonCode: text(payload.reasonCode),
    transactionStatus: text(payload.transactionStatus),
  };
}

/**
 * The reply that tells WayForPay the notification was received. Without it WayForPay keeps
 * re-sending for days. The reply is signed too, so WayForPay knows it came from us.
 */
export function buildAcceptResponse(
  orderReference: string,
  secretKey: string,
  now: Date = new Date()
) {
  const status = 'accept';
  const time = Math.floor(now.getTime() / 1000);

  return {
    orderReference,
    signature: signFields([orderReference, status, time], secretKey),
    status,
    time,
  };
}
