'use server';

import { getWayForPayConfig } from '../wayforpay/config';
import { buildWidgetParams } from '../wayforpay/purchase';
import { parseDonationForm } from './schema';
import type { DonationFormState } from './types';

/**
 * Server Action behind every donation form (home page and /support): validates the donor's
 * details, then signs a WayForPay checkout. The browser opens WayForPay's own payment
 * window with it, so the card number is never typed on this site.
 *
 * No donor data is stored here: the payment record lives in the WayForPay cabinet and the
 * signed notification lands in `/api/payments/wayforpay/callback`.
 *
 * TODO: add spam protection (CAPTCHA such as Cloudflare Turnstile, plus rate limiting)
 * before the form goes public — card-testing bots love donation pages.
 */
export async function startDonation(formData: FormData): Promise<DonationFormState> {
  const parsed = parseDonationForm(formData);

  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, status: 'error' };

  const config = getWayForPayConfig();

  if (!config) return { error: 'paymentsUnavailable', status: 'error' };

  try {
    const widget = buildWidgetParams(config, parsed.data);

    // No personal data in the log: just enough to match a payment with a checkout.
    console.info('[payments] checkout started', {
      amount: widget.amount,
      frequency: parsed.data.frequency,
      orderReference: widget.orderReference,
    });

    return { status: 'ready', widget };
  } catch (error) {
    console.error('[payments] could not build a WayForPay checkout', error);

    return { error: 'serverError', status: 'error' };
  }
}
