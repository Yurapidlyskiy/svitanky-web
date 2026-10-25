import { createHmac } from 'node:crypto';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { recordNotification } from '@/shared/payments/wayforpay/notifications';

import { POST } from './route';

vi.mock('@/shared/payments/wayforpay/notifications', () => ({
  recordNotification: vi.fn(async () => undefined),
}));

const SECRET = 'unit-test-secret-key';
const ORDER = 'SVT-M-MH3K9Z2A-9F3A1C2D';

function hmac(data: string): string {
  return createHmac('md5', SECRET).update(data, 'utf8').digest('hex');
}

/** What WayForPay posts, signed the way its documentation describes. */
function signedNotification(overrides: Record<string, unknown> = {}) {
  const fields = {
    amount: 350,
    authCode: '123456',
    cardPan: '41****1111',
    currency: 'UAH',
    merchantAccount: 'test_merchant',
    orderReference: ORDER,
    paymentSystem: 'card',
    reasonCode: 1100,
    transactionStatus: 'Approved',
    ...overrides,
  };

  return {
    ...fields,
    merchantSignature: hmac(
      [
        fields.merchantAccount,
        fields.orderReference,
        fields.amount,
        fields.currency,
        fields.authCode,
        fields.cardPan,
        fields.transactionStatus,
        fields.reasonCode,
      ].join(';')
    ),
  };
}

function post(body: string, contentType = 'application/json'): Request {
  return new Request('http://localhost/api/payments/wayforpay/callback', {
    body,
    headers: { 'content-type': contentType },
    method: 'POST',
  });
}

beforeEach(() => {
  vi.stubEnv('WAYFORPAY_MERCHANT_ACCOUNT', 'test_merchant');
  vi.stubEnv('WAYFORPAY_MERCHANT_DOMAIN', 'svitanky.example');
  vi.stubEnv('WAYFORPAY_SECRET_KEY', SECRET);
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe('POST /api/payments/wayforpay/callback', () => {
  it('records a genuine notification and answers with a signed "accept"', async () => {
    const response = await POST(post(JSON.stringify(signedNotification())));
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ orderReference: ORDER, status: 'accept' });
    expect(typeof body.time).toBe('number');
    expect(body.signature).toBe(hmac(`${ORDER};accept;${String(body.time)}`));
    expect(recordNotification).toHaveBeenCalledTimes(1);
    expect(recordNotification).toHaveBeenCalledWith({
      amount: '350',
      currency: 'UAH',
      orderReference: ORDER,
      paymentSystem: 'card',
      reasonCode: '1100',
      transactionStatus: 'Approved',
    });
  });

  it('understands the JSON that WayForPay sends labelled as a form', async () => {
    const json = JSON.stringify(signedNotification());
    const response = await POST(
      post(`${encodeURIComponent(json)}=`, 'application/x-www-form-urlencoded')
    );

    expect(response.status).toBe(200);
    expect(recordNotification).toHaveBeenCalledTimes(1);
  });

  it('accepts a repeated notification again, because WayForPay retries until it is answered', async () => {
    const request = JSON.stringify(signedNotification());

    expect((await POST(post(request))).status).toBe(200);
    expect((await POST(post(request))).status).toBe(200);
    expect(recordNotification).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['a changed amount', { amount: 1 }],
    ['a changed status', { transactionStatus: 'Declined' }],
    ['a changed order', { orderReference: 'SVT-M-MH3K9Z2A-00000000' }],
  ])('rejects %s without recording anything', async (_name, change) => {
    const forged = { ...signedNotification(), ...change };
    const response = await POST(post(JSON.stringify(forged)));

    expect(response.status).toBe(400);
    expect(recordNotification).not.toHaveBeenCalled();
  });

  it('rejects an unsigned notification', async () => {
    const { merchantSignature: _signature, ...unsigned } = signedNotification();
    void _signature;
    const response = await POST(post(JSON.stringify(unsigned)));

    expect(response.status).toBe(400);
    expect(recordNotification).not.toHaveBeenCalled();
  });

  it('rejects a notification signed for another merchant account', async () => {
    const response = await POST(
      post(JSON.stringify(signedNotification({ merchantAccount: 'someone_else' })))
    );

    expect(response.status).toBe(400);
    expect(recordNotification).not.toHaveBeenCalled();
  });

  it.each(['', 'hello', '[]', '{"orderReference":"x"}'])('rejects the body %j', async (body) => {
    const response = await POST(post(body));

    expect(response.status).toBe(400);
    expect(recordNotification).not.toHaveBeenCalled();
  });

  it('answers 503 while payments are not configured, so WayForPay tries again later', async () => {
    vi.stubEnv('WAYFORPAY_SECRET_KEY', '');

    const response = await POST(post(JSON.stringify(signedNotification())));

    expect(response.status).toBe(503);
    expect(recordNotification).not.toHaveBeenCalled();
  });

  it('fails, rather than accepting, when the notification could not be recorded', async () => {
    vi.mocked(recordNotification).mockRejectedValueOnce(new Error('database is down'));

    // Next turns the thrown error into a 500, and WayForPay then sends the notification again.
    await expect(POST(post(JSON.stringify(signedNotification())))).rejects.toThrow(
      'database is down'
    );
  });
});
