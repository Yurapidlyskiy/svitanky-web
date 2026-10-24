/** Where the payer lands once the payment window closes; it shows the real payment status. */
export const SUPPORT_THANKS_PATH = '/support/thanks';

/** WayForPay posts the signed payment result here, server to server (`serviceUrl`). */
export const WAYFORPAY_CALLBACK_PATH = '/api/payments/wayforpay/callback';

/** WayForPay sends the payer's browser here after paying (`returnUrl`), as a safety net. */
export const WAYFORPAY_RETURN_PATH = '/api/payments/wayforpay/return';
