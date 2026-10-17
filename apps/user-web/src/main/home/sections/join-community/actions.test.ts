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

    expect(result).toEqual({ error: 'consentRequired', status: 'error' });
  });

  it.each(['0', '-100', 'abc', '', 'Infinity'])('rejects amount %j', async (amount) => {
    const result = await submitSupportForm(IDLE, form({ ...VALID, amount }));

    expect(result.error).toBe('invalidAmount');
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

    expect(invalid.error).toBe('invalidAmount');
    expect(valid.error).not.toBe('invalidAmount');
  });

  it.each(['', 'weekly', 'MONTHLY'])('rejects frequency %j', async (frequency) => {
    const result = await submitSupportForm(IDLE, form({ ...VALID, frequency }));

    expect(result.error).toBe('invalidFrequency');
  });

  // Documents the current stub: valid input is accepted but payments are not wired up.
  // Update this test when the LiqPay checkout lands.
  it.each(['monthly', 'one-time'])(
    'reports payments as not connected for %s',
    async (frequency) => {
      const result = await submitSupportForm(IDLE, form({ ...VALID, frequency }));

      expect(result).toEqual({ error: 'paymentsNotConnected', status: 'error' });
    }
  );
});
