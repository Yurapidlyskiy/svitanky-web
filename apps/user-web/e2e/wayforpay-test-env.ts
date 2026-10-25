/**
 * Fake WayForPay settings the e2e server runs with (see playwright.config.ts). They are
 * enough to sign checkouts and verify notifications, but nothing here is a real secret and
 * the tests never reach WayForPay.
 */
export const E2E_WAYFORPAY = {
  WAYFORPAY_MERCHANT_ACCOUNT: 'e2e_merchant',
  WAYFORPAY_MERCHANT_DOMAIN: 'localhost',
  WAYFORPAY_SECRET_KEY: 'e2e-secret-key-not-a-real-one',
} as const;
