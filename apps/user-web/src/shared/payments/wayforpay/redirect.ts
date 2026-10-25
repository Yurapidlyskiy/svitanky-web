import type { PurchaseParams } from './types';

/**
 * WayForPay's payment page. A signed order is posted here as a plain form and WayForPay
 * answers with a redirect to its own page on its own domain, so card details are typed there
 * and never reach this site or its servers (no PCI DSS scope).
 * https://wiki.wayforpay.com/en/view/852091
 */
export const WAYFORPAY_PAY_URL = 'https://secure.wayforpay.com/pay';

const FORM_ID = 'wayforpay-purchase';

/** One `[name, value]` pair per form field; list fields (`productName`, ...) repeat as `name[]`. */
export function purchaseFormFields(params: PurchaseParams): [name: string, value: string][] {
  return Object.entries(params).flatMap(([name, value]): [string, string][] => {
    if (value === undefined) return [];

    return Array.isArray(value)
      ? value.map((item): [string, string] => [`${name}[]`, String(item)])
      : [[name, String(value)]];
  });
}

/**
 * Sends the whole tab to WayForPay's payment page with the signed order. The donor leaves
 * this site; WayForPay brings them back to the `returnUrl` inside the order.
 */
export function redirectToWayForPay(params: PurchaseParams): void {
  // A second attempt (the donor came back with the Back button) starts from a clean form.
  document.getElementById(FORM_ID)?.remove();

  const form = document.createElement('form');

  form.acceptCharset = 'utf-8';
  form.action = WAYFORPAY_PAY_URL;
  form.hidden = true;
  form.id = FORM_ID;
  form.method = 'post';

  for (const [name, value] of purchaseFormFields(params)) {
    const input = document.createElement('input');

    input.name = name;
    input.type = 'hidden';
    input.value = value;
    form.append(input);
  }

  document.body.append(form);
  form.submit();
}
