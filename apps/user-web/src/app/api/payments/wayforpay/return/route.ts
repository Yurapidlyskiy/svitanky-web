import { NextResponse } from 'next/server';

import { ROUTES } from '@/shared/config/routes';
import { SITE_URL } from '@/shared/config/site';
import { SUPPORT_THANKS_PATH } from '@/shared/payments/paths';
import { parseOrderReference } from '@/shared/payments/wayforpay/purchase';

/** Sends the donor to the result page — or back to the form if the order reference is junk. */
function toResultPage(orderReference: unknown): NextResponse {
  const order = typeof orderReference === 'string' ? parseOrderReference(orderReference) : null;
  const path = order
    ? `${SUPPORT_THANKS_PATH}?order=${encodeURIComponent(order.orderReference)}`
    : ROUTES.support;

  // 303 turns WayForPay's POST into a plain GET of the result page.
  return NextResponse.redirect(new URL(path, SITE_URL), 303);
}

/**
 * WayForPay's `returnUrl`: where the donor's browser is sent after paying. The payment
 * window normally reports back by itself, so this is the safety net for flows that leave
 * the page. WayForPay may POST here (its cabinet can switch that off), hence both methods.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const form = await request.formData().catch(() => null);

  return toResultPage(form?.get('orderReference'));
}

export function GET(request: Request): NextResponse {
  return toResultPage(new URL(request.url).searchParams.get('orderReference'));
}
