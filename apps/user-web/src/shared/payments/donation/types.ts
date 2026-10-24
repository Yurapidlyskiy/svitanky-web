import type { WidgetParams } from '../wayforpay/types';
import type { DonationFrequency } from './frequency';

/** A donation as validated on the server, ready to become a payment. */
export type DonationInput = {
  /** Whole hryvnias. */
  amount: number;
  email: string;
  firstName: string;
  frequency: DonationFrequency;
  lastName: string;
  /** Digits only, with the country code (380501234567). */
  phone: string;
};

export type DonationField =
  'amount' | 'consent' | 'email' | 'firstName' | 'frequency' | 'lastName' | 'phone';

/** Keys under `payments.errors` for a problem with a single field. */
export type DonationFieldError =
  | 'consentRequired'
  | 'invalidAmount'
  | 'invalidEmail'
  | 'invalidFirstName'
  | 'invalidFrequency'
  | 'invalidLastName'
  | 'invalidPhone';

/** Keys under `payments.errors` for a problem with the attempt as a whole. */
export type DonationError =
  'paymentDeclined' | 'paymentsUnavailable' | 'serverError' | 'widgetLoadFailed';

export type DonationFieldErrors = Partial<Record<DonationField, DonationFieldError>>;

/** What the `startDonation` Server Action returns. */
export type DonationFormState =
  | { error?: DonationError; fieldErrors?: DonationFieldErrors; status: 'error' }
  | { status: 'ready'; widget: WidgetParams };
