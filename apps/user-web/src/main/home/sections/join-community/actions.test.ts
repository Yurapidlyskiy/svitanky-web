import { describe, expect, it } from 'vitest';

import { submitSupportForm } from './actions';

const IDLE = { status: 'idle' } as const;

function form(fields: Record<string, string>): FormData {
  const data = new FormData();

  for (const [key, value] of Object.entries(fields)) data.set(key, value);

  return data;
}

const VALID = { amount: '350', consent: 'on', frequency: 'monthly' };

describe('submitSupportForm', () => {
  it('requires consent to personal data processing', async () => {
    const result = await submitSupportForm(IDLE, form({ amount: '350', frequency: 'monthly' }));

    expect(result).toEqual({
      message: 'Потрібна згода на обробку персональних даних.',
      status: 'error',
    });
  });

  it.each(['0', '-100', 'abc', '', 'Infinity'])('rejects amount %j', async (amount) => {
    const result = await submitSupportForm(IDLE, form({ ...VALID, amount }));

    expect(result.message).toBe('Вкажіть коректну суму підтримки.');
  });

  it('reads the custom amount when "custom" is selected', async () => {
    const invalid = await submitSupportForm(
      IDLE,
      form({ ...VALID, amount: 'custom', customAmount: '-1' })
    );
    const valid = await submitSupportForm(
      IDLE,
      form({ ...VALID, amount: 'custom', customAmount: '777' })
    );

    expect(invalid.message).toBe('Вкажіть коректну суму підтримки.');
    expect(valid.message).not.toBe('Вкажіть коректну суму підтримки.');
  });

  it.each(['', 'weekly', 'MONTHLY'])('rejects frequency %j', async (frequency) => {
    const result = await submitSupportForm(IDLE, form({ ...VALID, frequency }));

    expect(result.message).toBe('Оберіть тип платежу.');
  });

  // Documents the current stub: valid input is accepted but payments are not wired up.
  // Update this test when the LiqPay checkout lands.
  it.each(['monthly', 'one-time'])(
    'reports payments as not connected for %s',
    async (frequency) => {
      const result = await submitSupportForm(IDLE, form({ ...VALID, frequency }));

      expect(result).toEqual({
        message: 'Оплату ще не підключено. Ми скоро це виправимо.',
        status: 'error',
      });
    }
  );
});
