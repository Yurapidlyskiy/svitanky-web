import 'server-only';

import { randomBytes } from 'node:crypto';

import type { DonationFrequency } from '../donation/frequency';
import type { DonationInput } from '../donation/types';
import { formatChargeDate, nextChargeDate } from '../schedule';
import type { WayForPayConfig } from './config';
import { signFields } from './sign';
import type { WidgetParams } from './types';

const CURRENCY = 'UAH';

// TODO: confirm the wording with the fund — it is what the donor sees on the WayForPay page
// and in the receipt, and it doubles as the "purpose of payment".
const PRODUCT_NAMES: Record<DonationFrequency, string> = {
  monthly: 'Щомісячна благодійна підтримка',
  'one-time': 'Благодійний внесок',
};

/** Not every payment method can repeat (Privat24, for one), so monthly donations list theirs. */
const REGULAR_PAYMENT_SYSTEMS = 'card;googlePay;applePay';

const FREQUENCY_CODES = { monthly: 'M', 'one-time': 'O' } as const satisfies Record<
  DonationFrequency,
  string
>;

/** SVT-<M|O>-<time>-<random>: M/O tells monthly from one-time in the WayForPay cabinet too. */
const ORDER_REFERENCE_PATTERN = /^SVT-([MO])-[0-9A-Z]{6,12}-[0-9A-F]{8}$/;

export function createOrderReference(
  frequency: DonationFrequency,
  now: Date = new Date(),
  random: Buffer = randomBytes(4)
): string {
  const time = now.getTime().toString(36).toUpperCase();

  return `SVT-${FREQUENCY_CODES[frequency]}-${time}-${random.toString('hex').toUpperCase()}`;
}

/** Validates an order reference that came from the outside (a URL, a form) and reads it. */
export function parseOrderReference(
  value: string
): { frequency: DonationFrequency; orderReference: string } | null {
  const code = ORDER_REFERENCE_PATTERN.exec(value)?.[1];

  if (!code) return null;

  return { frequency: code === 'M' ? 'monthly' : 'one-time', orderReference: value };
}

type BuildOptions = {
  now?: Date;
  orderReference?: string;
};

/**
 * The signed options for WayForPay's payment widget.
 *
 * The signature seals merchant, domain, order, date, amount, currency and the product
 * lines (names, then counts, then prices) — so the donor cannot change the amount in the
 * browser. The secret key stays here; only the signature leaves.
 * https://wiki.wayforpay.com/en/view/852102
 */
export function buildWidgetParams(
  config: WayForPayConfig,
  donation: DonationInput,
  {
    now = new Date(),
    orderReference = createOrderReference(donation.frequency, now),
  }: BuildOptions = {}
): WidgetParams {
  const orderDate = Math.floor(now.getTime() / 1000);
  const productName = [PRODUCT_NAMES[donation.frequency]];
  const productCount = [1];
  const productPrice = [donation.amount];

  const merchantSignature = signFields(
    [
      config.merchantAccount,
      config.merchantDomainName,
      orderReference,
      orderDate,
      donation.amount,
      CURRENCY,
      ...productName,
      ...productCount,
      ...productPrice,
    ],
    config.secretKey
  );

  const params: WidgetParams = {
    amount: donation.amount,
    authorizationType: 'SimpleSignature',
    clientEmail: donation.email,
    clientFirstName: donation.firstName,
    clientLastName: donation.lastName,
    clientPhone: donation.phone,
    currency: CURRENCY,
    language: 'UA',
    merchantAccount: config.merchantAccount,
    merchantDomainName: config.merchantDomainName,
    merchantSignature,
    orderDate,
    orderReference,
    productCount,
    productName,
    productPrice,
    returnUrl: config.returnUrl,
    serviceUrl: config.serviceUrl,
  };

  if (donation.frequency === 'one-time') return params;

  // The first payment is taken now; WayForPay then repeats it on its own schedule, so we
  // need no scheduler and never store the card. These fields sit outside the signature.
  return {
    ...params,
    dateNext: formatChargeDate(nextChargeDate(now)),
    paymentSystems: REGULAR_PAYMENT_SYSTEMS,
    regularAmount: donation.amount,
    regularBehavior: 'preset',
    regularMode: 'monthly',
    regularOn: 1,
  };
}
