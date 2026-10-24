import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { buildWidgetParams } from '../wayforpay/purchase';
import { startDonation } from './actions';

// The real implementation by default; one test makes it fail.
vi.mock('../wayforpay/purchase', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../wayforpay/purchase')>();

  return { ...actual, buildWidgetParams: vi.fn(actual.buildWidgetParams) };
});

const SECRET = 'unit-test-secret-key';

const VALID: Record<string, string> = {
  amount: '350',
  consent: 'on',
  email: 'anna@example.com',
  firstName: 'Анна',
  frequency: 'one-time',
  lastName: 'Коваль',
  phone: '+38 (050) 123-45-67',
};

function form(fields: Record<string, string> = VALID): FormData {
  const data = new FormData();

  for (const [key, value] of Object.entries(fields)) data.set(key, value);

  return data;
}

function configure() {
  vi.stubEnv('WAYFORPAY_MERCHANT_ACCOUNT', 'test_merchant');
  vi.stubEnv('WAYFORPAY_MERCHANT_DOMAIN', 'svitanky.example');
  vi.stubEnv('WAYFORPAY_SECRET_KEY', SECRET);
}

function unconfigure() {
  vi.stubEnv('WAYFORPAY_MERCHANT_ACCOUNT', '');
  vi.stubEnv('WAYFORPAY_MERCHANT_DOMAIN', '');
  vi.stubEnv('WAYFORPAY_SECRET_KEY', '');
}

beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe('startDonation', () => {
  it('returns the field errors and never reaches WayForPay for an invalid form', async () => {
    configure();

    const result = await startDonation(form({ ...VALID, email: 'nope', amount: '5' }));

    expect(result).toEqual({
      fieldErrors: { amount: 'invalidAmount', email: 'invalidEmail' },
      status: 'error',
    });
    expect(buildWidgetParams).not.toHaveBeenCalled();
  });

  it('says payments are unavailable while WayForPay is not configured', async () => {
    unconfigure();

    await expect(startDonation(form())).resolves.toEqual({
      error: 'paymentsUnavailable',
      status: 'error',
    });
  });

  it('prefers the field errors over "unavailable", so the donor fixes the form first', async () => {
    unconfigure();

    const result = await startDonation(form({ ...VALID, phone: '1' }));

    expect(result).toEqual({ fieldErrors: { phone: 'invalidPhone' }, status: 'error' });
  });

  it('returns a signed widget for a valid one-time donation', async () => {
    configure();

    const result = await startDonation(form());

    expect(result.status).toBe('ready');
    if (result.status !== 'ready') return;

    expect(result.widget).toMatchObject({
      amount: 350,
      clientEmail: 'anna@example.com',
      clientFirstName: 'Анна',
      clientLastName: 'Коваль',
      clientPhone: '380501234567',
      currency: 'UAH',
      merchantAccount: 'test_merchant',
      merchantDomainName: 'svitanky.example',
    });
    expect(result.widget.merchantSignature).toMatch(/^[0-9a-f]{32}$/);
    expect(result.widget.orderReference).toMatch(/^SVT-O-/);
    expect(result.widget).not.toHaveProperty('regularMode');
  });

  it('makes the donation regular when it is monthly', async () => {
    configure();

    const result = await startDonation(form({ ...VALID, frequency: 'monthly' }));

    expect(result.status).toBe('ready');
    if (result.status !== 'ready') return;

    expect(result.widget).toMatchObject({ regularAmount: 350, regularMode: 'monthly' });
    expect(result.widget.orderReference).toMatch(/^SVT-M-/);
  });

  it('gives each checkout its own order reference', async () => {
    configure();

    const [first, second] = await Promise.all([startDonation(form()), startDonation(form())]);

    expect(first.status).toBe('ready');
    expect(second.status).toBe('ready');
    if (first.status !== 'ready' || second.status !== 'ready') return;

    expect(first.widget.orderReference).not.toBe(second.widget.orderReference);
  });

  it('never hands the secret key to the browser', async () => {
    configure();

    const result = await startDonation(form());

    expect(JSON.stringify(result)).not.toContain(SECRET);
  });

  it('logs the checkout without any personal data', async () => {
    configure();

    await startDonation(form());

    const logged = JSON.stringify(vi.mocked(console.info).mock.calls);

    expect(logged).toContain('checkout started');
    for (const secret of [SECRET, 'anna@example.com', '380501234567', 'Анна', 'Коваль']) {
      expect(logged).not.toContain(secret);
    }
  });

  it('answers with a server error, not a crash, when the checkout cannot be built', async () => {
    configure();
    vi.mocked(buildWidgetParams).mockImplementationOnce(() => {
      throw new Error('boom');
    });

    await expect(startDonation(form())).resolves.toEqual({
      error: 'serverError',
      status: 'error',
    });
    expect(console.error).toHaveBeenCalled();
  });
});
