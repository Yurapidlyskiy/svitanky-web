import { describe, expect, it } from 'vitest';

import { DONATION_LIMITS } from '@/shared/config/support';

import { normalizePhone, parseDonationForm } from './schema';

const VALID: Record<string, string> = {
  amount: '350',
  consent: 'on',
  email: 'anna@example.com',
  firstName: 'Анна',
  frequency: 'monthly',
  lastName: 'Коваль',
  phone: '+38 (050) 123-45-67',
};

function form(fields: Record<string, string | File>): FormData {
  const data = new FormData();

  for (const [key, value] of Object.entries(fields)) data.set(key, value);

  return data;
}

function without(...keys: string[]): Record<string, string> {
  return Object.fromEntries(Object.entries(VALID).filter(([key]) => !keys.includes(key)));
}

function errorsFor(fields: Record<string, string | File>) {
  const result = parseDonationForm(form(fields));

  return result.success ? null : result.fieldErrors;
}

describe('normalizePhone', () => {
  it.each([
    ['+38 (050) 123-45-67', '380501234567'],
    ['0501234567', '380501234567'],
    ['380501234567', '380501234567'],
    ['+380 50 123 45 67', '380501234567'],
    ['00380501234567', '380501234567'],
    ['+1 415 555 2671', '14155552671'],
  ])('turns %j into %s', (raw, digits) => {
    expect(normalizePhone(raw)).toBe(digits);
  });

  it.each(['', 'abc', '123', '0501234', '1234567890123456'])('rejects %j', (raw) => {
    expect(normalizePhone(raw)).toBeNull();
  });
});

describe('parseDonationForm', () => {
  it('returns the donation with a normalized phone and nothing else', () => {
    const result = parseDonationForm(form(VALID));

    expect(result).toEqual({
      data: {
        amount: 350,
        email: 'anna@example.com',
        firstName: 'Анна',
        frequency: 'monthly',
        lastName: 'Коваль',
        phone: '380501234567',
      },
      success: true,
    });
  });

  it('ignores fields it does not know, so the client cannot add a currency or a price', () => {
    const result = parseDonationForm(form({ ...VALID, currency: 'USD', price: '1' }));

    expect(result.success && Object.keys(result.data).sort()).toEqual([
      'amount',
      'email',
      'firstName',
      'frequency',
      'lastName',
      'phone',
    ]);
  });

  it('trims the names and lowercases the email', () => {
    const result = parseDonationForm(
      form({ ...VALID, email: '  Anna@Example.COM ', firstName: '  Анна ', lastName: ' Коваль  ' })
    );

    expect(result.success && result.data).toMatchObject({
      email: 'anna@example.com',
      firstName: 'Анна',
      lastName: 'Коваль',
    });
  });

  describe('amount', () => {
    it('takes the custom amount when "custom" is chosen', () => {
      const result = parseDonationForm(form({ ...VALID, amount: 'custom', customAmount: '777' }));

      expect(result.success && result.data.amount).toBe(777);
    });

    it('ignores a custom amount when a preset is chosen', () => {
      const result = parseDonationForm(form({ ...VALID, customAmount: '9999' }));

      expect(result.success && result.data.amount).toBe(350);
    });

    it.each([DONATION_LIMITS.min, DONATION_LIMITS.max])('accepts the limit %d', (amount) => {
      expect(parseDonationForm(form({ ...VALID, amount: String(amount) })).success).toBe(true);
    });

    it.each([
      String(DONATION_LIMITS.min - 1),
      String(DONATION_LIMITS.max + 1),
      '0',
      '-100',
      '12.5',
      '1e3',
      'abc',
      '',
      'custom',
    ])('rejects %j', (amount) => {
      expect(errorsFor({ ...VALID, amount })).toEqual({ amount: 'invalidAmount' });
    });

    it('rejects a missing amount', () => {
      expect(errorsFor(without('amount'))).toEqual({ amount: 'invalidAmount' });
    });
  });

  describe('frequency', () => {
    it.each(['monthly', 'one-time'])('accepts %s', (frequency) => {
      expect(parseDonationForm(form({ ...VALID, frequency })).success).toBe(true);
    });

    it.each(['weekly', 'Monthly', ''])('rejects %j', (frequency) => {
      expect(errorsFor({ ...VALID, frequency })).toEqual({ frequency: 'invalidFrequency' });
    });

    it('rejects a missing frequency', () => {
      expect(errorsFor(without('frequency'))).toEqual({ frequency: 'invalidFrequency' });
    });
  });

  describe('names', () => {
    it.each(['Анна-Марія', "О'Коннор", 'Ґрунтовська', 'Mary Ann', 'Д.', 'Іван Іванович'])(
      'accepts %j',
      (firstName) => {
        expect(parseDonationForm(form({ ...VALID, firstName })).success).toBe(true);
      }
    );

    it.each(['', '   ', '123', '-Анна', 'Анна<script>', 'Анна@', 'А'.repeat(61)])(
      'rejects %j',
      (firstName) => {
        expect(errorsFor({ ...VALID, firstName })).toEqual({ firstName: 'invalidFirstName' });
      }
    );

    it('reports the last name on its own field', () => {
      expect(errorsFor({ ...VALID, lastName: '' })).toEqual({ lastName: 'invalidLastName' });
    });
  });

  describe('email', () => {
    it.each(['not-an-email', 'a b@example.com', 'anna@', '@example.com', 'a@b', ''])(
      'rejects %j',
      (email) => {
        expect(errorsFor({ ...VALID, email })).toEqual({ email: 'invalidEmail' });
      }
    );

    it('rejects an address longer than 254 characters', () => {
      const email = `${'a'.repeat(250)}@example.com`;

      expect(errorsFor({ ...VALID, email })).toEqual({ email: 'invalidEmail' });
    });
  });

  describe('phone', () => {
    it.each(['', 'abc', '123', '+38 050'])('rejects %j', (phone) => {
      expect(errorsFor({ ...VALID, phone })).toEqual({ phone: 'invalidPhone' });
    });
  });

  describe('consent', () => {
    it.each(['', 'off', 'true', 'yes'])('is not given by %j', (consent) => {
      expect(errorsFor({ ...VALID, consent })).toEqual({ consent: 'consentRequired' });
    });

    it('is not given by a missing checkbox', () => {
      expect(errorsFor(without('consent'))).toEqual({ consent: 'consentRequired' });
    });
  });

  it('reports every wrong field at once, one error per field', () => {
    expect(errorsFor({})).toEqual({
      amount: 'invalidAmount',
      consent: 'consentRequired',
      email: 'invalidEmail',
      firstName: 'invalidFirstName',
      frequency: 'invalidFrequency',
      lastName: 'invalidLastName',
      phone: 'invalidPhone',
    });
  });

  it('treats an uploaded file as a missing value, not as text', () => {
    const file = new File(['anna@example.com'], 'email.txt');

    expect(errorsFor({ ...VALID, email: file })).toEqual({ email: 'invalidEmail' });
  });
});
