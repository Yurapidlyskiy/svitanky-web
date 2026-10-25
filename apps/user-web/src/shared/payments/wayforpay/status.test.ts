import { createHmac } from 'node:crypto';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { classifyTransactionStatus, fetchPaymentOutcome } from './status';

const CONFIG = { merchantAccount: 'test_merchant', secretKey: 'unit-test-secret-key' };
const ORDER = 'SVT-O-MH3K9Z2A-9F3A1C2D';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('classifyTransactionStatus', () => {
  it.each([
    ['Approved', 'approved'],
    ['InProcessing', 'processing'],
    ['Pending', 'processing'],
    ['WaitingAuthComplete', 'processing'],
    ['Declined', 'failed'],
    ['Expired', 'failed'],
    ['Refunded', 'unknown'],
    ['Voided', 'unknown'],
    ['', 'unknown'],
    [undefined, 'unknown'],
    [42, 'unknown'],
  ])('%j is %s', (status, outcome) => {
    expect(classifyTransactionStatus(status)).toBe(outcome);
  });

  it('ignores letter case', () => {
    expect(classifyTransactionStatus('APPROVED')).toBe('approved');
    expect(classifyTransactionStatus('inProcessing')).toBe('processing');
  });
});

describe('fetchPaymentOutcome', () => {
  function respondWith(body: unknown, init: ResponseInit = {}) {
    return vi.fn<typeof fetch>(async () => Response.json(body, init));
  }

  it('sends a signed CHECK_STATUS request and reads the status', async () => {
    const fetchImpl = respondWith({ reasonCode: 1100, transactionStatus: 'Approved' });

    await expect(fetchPaymentOutcome(CONFIG, ORDER, fetchImpl)).resolves.toBe('approved');

    const [url, init] = fetchImpl.mock.calls[0] ?? [];

    expect(url).toBe('https://api.wayforpay.com/api');
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toEqual({
      apiVersion: 1,
      merchantAccount: 'test_merchant',
      merchantSignature: createHmac('md5', CONFIG.secretKey)
        .update(`test_merchant;${ORDER}`, 'utf8')
        .digest('hex'),
      orderReference: ORDER,
      transactionType: 'CHECK_STATUS',
    });
  });

  it('reports a declined payment', async () => {
    const fetchImpl = respondWith({ transactionStatus: 'Declined' });

    await expect(fetchPaymentOutcome(CONFIG, ORDER, fetchImpl)).resolves.toBe('failed');
  });

  it.each([
    ['an unknown status', () => respondWith({ transactionStatus: 'Mystery' })],
    ['a body without a status', () => respondWith({ reason: 'Order not found' })],
    ['an HTTP error', () => respondWith({}, { status: 502 })],
    ['a body that is not an object', () => respondWith('nope')],
    [
      'a network failure',
      () =>
        vi.fn<typeof fetch>(async () => {
          throw new Error('offline');
        }),
    ],
  ])('falls back to "unknown" on %s', async (_name, makeFetch) => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(fetchPaymentOutcome(CONFIG, ORDER, makeFetch())).resolves.toBe('unknown');
  });
});
