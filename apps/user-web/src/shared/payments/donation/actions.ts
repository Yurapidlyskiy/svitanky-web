'use server';

import { headers } from 'next/headers';

import {
  readTurnstileSetting,
  TURNSTILE_RESPONSE_FIELD,
  verifyTurnstileToken,
} from '../turnstile/verify';
import { getWayForPayConfig } from '../wayforpay/config';
import { buildPurchaseParams } from '../wayforpay/purchase';
import { clientIp, createRateLimiter } from './rateLimit';
import { parseDonationForm } from './schema';
import type { DonationFormState } from './types';

/** A real donor needs one or two tries; a card-testing bot needs hundreds. */
const allowCheckout = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });

/**
 * Server Action behind every donation form (home page and /support): validates the donor's
 * details, checks for bots, then signs a WayForPay order. The browser sends the donor to
 * WayForPay's own payment page with it, so the card number is never typed on this site.
 *
 * Bots are held off by Cloudflare Turnstile and a per-address attempt limit: donation
 * forms are where stolen cards get tested, and every attempt is a transaction in the
 * WayForPay cabinet.
 *
 * No donor data is stored here: the payment record lives in the WayForPay cabinet and the
 * signed notification lands in `/api/payments/wayforpay/callback`.
 */
export async function startDonation(formData: FormData): Promise<DonationFormState> {
  const parsed = parseDonationForm(formData);

  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, status: 'error' };

  const config = getWayForPayConfig();
  const turnstile = readTurnstileSetting();

  if (turnstile === 'missing') {
    console.error('[payments] Turnstile is not configured: set TURNSTILE_SECRET_KEY.');
  }
  if (!config || turnstile === 'missing') return { error: 'paymentsUnavailable', status: 'error' };

  const ip = clientIp(await headers());

  if (!allowCheckout(ip ?? 'unknown')) {
    console.warn('[payments] checkout refused: too many attempts from one address');

    return { error: 'tooManyAttempts', status: 'error' };
  }

  if (
    turnstile !== 'off' &&
    !(await verifyTurnstileToken(formData.get(TURNSTILE_RESPONSE_FIELD), turnstile.secretKey, {
      remoteIp: ip,
    }))
  ) {
    return { error: 'verificationFailed', status: 'error' };
  }

  try {
    const purchase = buildPurchaseParams(config, parsed.data);

    // No personal data in the log: just enough to match a payment with a checkout.
    console.info('[payments] checkout started', {
      amount: purchase.amount,
      frequency: parsed.data.frequency,
      orderReference: purchase.orderReference,
    });

    return { purchase, status: 'ready' };
  } catch (error) {
    console.error('[payments] could not build a WayForPay checkout', error);

    return { error: 'serverError', status: 'error' };
  }
}
