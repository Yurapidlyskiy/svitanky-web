import { getWayForPayConfig } from '@/shared/payments/wayforpay/config';
import {
  buildAcceptResponse,
  parseNotificationBody,
  verifyNotification,
} from '@/shared/payments/wayforpay/callback';
import { recordNotification } from '@/shared/payments/wayforpay/notifications';

/**
 * WayForPay's `serviceUrl`: after every payment attempt (and every automatic monthly charge)
 * WayForPay posts the signed result here. Only a notification with a valid signature is
 * believed; it is answered with a signed "accept", otherwise WayForPay re-sends for days.
 * https://wiki.wayforpay.com/en/view/852102
 */
export async function POST(request: Request): Promise<Response> {
  const config = getWayForPayConfig();

  // Not configured: refuse, so WayForPay keeps retrying instead of treating it as delivered.
  if (!config) return new Response(null, { status: 503 });

  const payload = parseNotificationBody(await request.text());
  const notification = payload ? verifyNotification(payload, config) : null;

  if (!notification) {
    console.warn('[payments] rejected a WayForPay notification: unreadable body or bad signature');

    return new Response(null, { status: 400 });
  }

  await recordNotification(notification);

  return Response.json(buildAcceptResponse(notification.orderReference, config.secretKey));
}
