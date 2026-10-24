import { z } from 'zod';

import { DONATION_LIMITS } from '@/shared/config/support';

import { parseWholeAmount } from './amount';
import { DONATION_FREQUENCIES } from './frequency';
import type {
  DonationField,
  DonationFieldError,
  DonationFieldErrors,
  DonationInput,
} from './types';

// Letters of any alphabet, spaces, apostrophes, dots and hyphens: enough for real names.
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'’ʼ.-]*$/u;

/**
 * "+38 (050) 123-45-67", "0501234567" and "380501234567" all become 380501234567, the form
 * WayForPay wants. Foreign numbers pass as long as they look like one (10-15 digits).
 */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '').replace(/^00/, '');
  const international = digits.length === 10 && digits.startsWith('0') ? `38${digits}` : digits;

  return /^\d{10,15}$/.test(international) ? international : null;
}

const nameField = z.string().trim().min(1).max(60).regex(NAME_PATTERN);

const donationSchema = z.object({
  amount: z.int().min(DONATION_LIMITS.min).max(DONATION_LIMITS.max),
  consent: z.literal(true),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  firstName: nameField,
  frequency: z.enum(DONATION_FREQUENCIES),
  lastName: nameField,
  phone: z
    .string()
    .refine((value) => normalizePhone(value) !== null)
    .transform((value) => normalizePhone(value) ?? ''),
});

/** One message per field is enough for a donation form: the field says what is wrong. */
const ERROR_FOR_FIELD = {
  amount: 'invalidAmount',
  consent: 'consentRequired',
  email: 'invalidEmail',
  firstName: 'invalidFirstName',
  frequency: 'invalidFrequency',
  lastName: 'invalidLastName',
  phone: 'invalidPhone',
} as const satisfies Record<DonationField, DonationFieldError>;

function isDonationField(field: PropertyKey): field is DonationField {
  return typeof field === 'string' && field in ERROR_FOR_FIELD;
}

export type ParsedDonation =
  { data: DonationInput; success: true } | { fieldErrors: DonationFieldErrors; success: false };

/**
 * Reads and validates the donation form. Never trust the client: the markup's `required`
 * and `min` are a courtesy, everything is checked again here.
 */
export function parseDonationForm(formData: FormData): ParsedDonation {
  const read = (key: string): string | undefined => {
    const value = formData.get(key);

    return typeof value === 'string' ? value : undefined;
  };
  const rawAmount = read('amount') === 'custom' ? read('customAmount') : read('amount');

  const result = donationSchema.safeParse({
    amount: parseWholeAmount(rawAmount) ?? undefined,
    consent: read('consent') === 'on',
    email: read('email'),
    firstName: read('firstName'),
    frequency: read('frequency'),
    lastName: read('lastName'),
    phone: read('phone'),
  });

  if (result.success) {
    const { amount, email, firstName, frequency, lastName, phone } = result.data;

    return { data: { amount, email, firstName, frequency, lastName, phone }, success: true };
  }

  const fieldErrors: DonationFieldErrors = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0];

    if (field !== undefined && isDonationField(field)) {
      fieldErrors[field] ??= ERROR_FOR_FIELD[field];
    }
  }

  return { fieldErrors, success: false };
}
