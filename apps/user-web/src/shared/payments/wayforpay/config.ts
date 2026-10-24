import 'server-only';

import { z } from 'zod';

import { SITE_URL } from '@/shared/config/site';

import { WAYFORPAY_CALLBACK_PATH, WAYFORPAY_RETURN_PATH } from '../paths';

export type WayForPayConfig = {
  /** Merchant login from the WayForPay cabinet (store settings, "Merchant details"). */
  merchantAccount: string;
  /** The store's domain as registered in WayForPay; it is part of every payment signature. */
  merchantDomainName: string;
  /** Where the payer's browser is sent after paying. */
  returnUrl: string;
  /** The merchant secret key. It signs and verifies everything: never log it, never return it. */
  secretKey: string;
  /** Where WayForPay posts the payment result, server to server. */
  serviceUrl: string;
};

const envSchema = z.object({
  WAYFORPAY_MERCHANT_ACCOUNT: z.string().trim().min(1),
  WAYFORPAY_MERCHANT_DOMAIN: z.string().trim().min(1),
  WAYFORPAY_SECRET_KEY: z.string().trim().min(1),
});

/** "https://www.example.org/path" -> "www.example.org": the store is registered by host only. */
function toHostname(value: string): string {
  return value.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/[/?#].*$/, '');
}

/** Reads the WayForPay settings from the environment; `null` when any of them is missing. */
export function readWayForPayConfig(
  env: Record<string, string | undefined> = process.env,
  siteUrl: string = SITE_URL
): WayForPayConfig | null {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) return null;

  const { WAYFORPAY_MERCHANT_ACCOUNT, WAYFORPAY_MERCHANT_DOMAIN, WAYFORPAY_SECRET_KEY } =
    parsed.data;

  return {
    merchantAccount: WAYFORPAY_MERCHANT_ACCOUNT,
    merchantDomainName: toHostname(WAYFORPAY_MERCHANT_DOMAIN),
    returnUrl: new URL(WAYFORPAY_RETURN_PATH, siteUrl).toString(),
    secretKey: WAYFORPAY_SECRET_KEY,
    serviceUrl: new URL(WAYFORPAY_CALLBACK_PATH, siteUrl).toString(),
  };
}

let hasWarned = false;

/**
 * The WayForPay settings, or `null` while payments are not configured — callers then
 * show "payments unavailable" instead of crashing, so the site works without the keys.
 */
export function getWayForPayConfig(): WayForPayConfig | null {
  const config = readWayForPayConfig();

  if (!config && !hasWarned) {
    hasWarned = true;
    console.error(
      `[payments] WayForPay is not configured: set ${Object.keys(envSchema.shape).join(', ')}.`
    );
  }

  return config;
}
