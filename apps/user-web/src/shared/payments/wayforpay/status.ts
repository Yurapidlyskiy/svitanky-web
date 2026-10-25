import 'server-only';

import type { WayForPayConfig } from './config';
import { signFields } from './sign';

const API_URL = 'https://api.wayforpay.com/api';
const REQUEST_TIMEOUT_MS = 8000;

/** What the donor-facing result page can tell: paid, still moving, not paid, or unknown. */
export type PaymentOutcome = 'approved' | 'failed' | 'processing' | 'unknown';

/** https://wiki.wayforpay.com/en/view/852131 */
export function classifyTransactionStatus(status: unknown): PaymentOutcome {
  if (typeof status !== 'string') return 'unknown';

  switch (status.toLowerCase()) {
    case 'approved':
      return 'approved';
    case 'inprocessing':
    case 'pending':
    case 'waitingauthcomplete':
      return 'processing';
    case 'declined':
    case 'expired':
      return 'failed';
    default:
      return 'unknown';
  }
}

/**
 * Asks WayForPay for the current state of an order (CHECK_STATUS). It only decides which
 * message the result page shows; nothing is fulfilled from it, so it is deliberately
 * forgiving: any failure becomes `unknown` instead of an error page.
 * https://wiki.wayforpay.com/en/view/852117
 */
export async function fetchPaymentOutcome(
  config: Pick<WayForPayConfig, 'merchantAccount' | 'secretKey'>,
  orderReference: string,
  fetchImpl: typeof fetch = fetch
): Promise<PaymentOutcome> {
  try {
    const response = await fetchImpl(API_URL, {
      body: JSON.stringify({
        apiVersion: 1,
        merchantAccount: config.merchantAccount,
        merchantSignature: signFields([config.merchantAccount, orderReference], config.secretKey),
        orderReference,
        transactionType: 'CHECK_STATUS',
      }),
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('[payments] WayForPay status check failed', { status: response.status });

      return 'unknown';
    }

    const data: unknown = await response.json();

    return classifyTransactionStatus(
      typeof data === 'object' && data !== null && 'transactionStatus' in data
        ? data.transactionStatus
        : undefined
    );
  } catch (error) {
    console.error('[payments] WayForPay status check failed', error);

    return 'unknown';
  }
}
