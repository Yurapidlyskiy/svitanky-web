import 'server-only';

import type { VerifiedNotification } from './callback';

/**
 * Called once for every WayForPay notification whose signature checked out — including
 * repeats, so anything added here must be safe to run twice for the same order.
 *
 * For now the payment record lives in the WayForPay cabinet and this only leaves a trace
 * in the logs (no personal data: the card and the contacts never reach this code).
 *
 * TODO: once the Supabase project exists (ADR-5), upsert the donation by `orderReference`
 * here and send the donor a confirmation email on the first `Approved`. Throwing makes the
 * route answer 500, and WayForPay then retries the notification.
 */
export async function recordNotification(notification: VerifiedNotification): Promise<void> {
  console.info('[payments] WayForPay notification', notification);
}
