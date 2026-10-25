import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import { buildAcceptResponse, parseNotificationBody, verifyNotification } from './callback';

const CONFIG = { merchantAccount: 'test_merchant', secretKey: 'unit-test-secret-key' };

function hmac(data: string, key = CONFIG.secretKey): string {
  return createHmac('md5', key).update(data, 'utf8').digest('hex');
}

/** A notification signed the way WayForPay documents it. */
function signedNotification(overrides: Record<string, unknown> = {}) {
  const fields = {
    amount: 350,
    authCode: '123456',
    cardPan: '41****1111',
    currency: 'UAH',
    merchantAccount: 'test_merchant',
    orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D',
    paymentSystem: 'card',
    reasonCode: 1100,
    transactionStatus: 'Approved',
    ...overrides,
  };
  const merchantSignature = hmac(
    [
      fields.merchantAccount,
      fields.orderReference,
      fields.amount,
      fields.currency,
      fields.authCode ?? '',
      fields.cardPan ?? '',
      fields.transactionStatus,
      fields.reasonCode,
    ].join(';')
  );

  return { ...fields, merchantSignature };
}

describe('verifyNotification', () => {
  it('accepts a correctly signed notification and keeps what matters', () => {
    expect(verifyNotification(signedNotification(), CONFIG)).toEqual({
      amount: '350',
      currency: 'UAH',
      orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D',
      paymentSystem: 'card',
      reasonCode: '1100',
      transactionStatus: 'Approved',
    });
  });

  it('accepts a declined payment, which has no auth code and no card', () => {
    const declined = signedNotification({
      authCode: null,
      cardPan: null,
      reasonCode: 1101,
      transactionStatus: 'Declined',
    });

    expect(verifyNotification(declined, CONFIG)?.transactionStatus).toBe('Declined');
  });

  it('rejects a notification whose signed fields were changed', () => {
    for (const change of [
      { amount: 1 },
      { currency: 'USD' },
      { orderReference: 'SVT-O-MH3K9Z2A-00000000' },
      { reasonCode: 1104 },
      { transactionStatus: 'Declined' },
    ]) {
      const forged = { ...signedNotification(), ...change };

      expect(verifyNotification(forged, CONFIG), JSON.stringify(change)).toBeNull();
    }
  });

  it('rejects a signature made with another key', () => {
    const { merchantSignature: _signature, ...fields } = signedNotification();
    void _signature;

    expect(
      verifyNotification({ ...fields, merchantSignature: hmac('x', 'other-key') }, CONFIG)
    ).toBeNull();
  });

  it('rejects a missing or non-string signature', () => {
    const { merchantSignature: _signature, ...fields } = signedNotification();
    void _signature;

    expect(verifyNotification(fields, CONFIG)).toBeNull();
    expect(verifyNotification({ ...fields, merchantSignature: 42 }, CONFIG)).toBeNull();
  });

  it('rejects a notification for another merchant account, even if validly signed', () => {
    expect(
      verifyNotification(signedNotification({ merchantAccount: 'someone_else' }), CONFIG)
    ).toBeNull();
  });

  it('rejects a notification without an order', () => {
    expect(verifyNotification({}, CONFIG)).toBeNull();
  });
});

describe('parseNotificationBody', () => {
  const payload = signedNotification();
  const json = JSON.stringify(payload);

  it('reads a JSON body', () => {
    expect(parseNotificationBody(json)).toEqual(payload);
  });

  it('reads JSON that arrives as the only key of a form-encoded body', () => {
    expect(parseNotificationBody(`${encodeURIComponent(json)}=`)).toEqual(payload);
  });

  it('reads ordinary form fields too', () => {
    const body = new URLSearchParams({ orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D', amount: '350' });

    expect(parseNotificationBody(body.toString())).toEqual({
      amount: '350',
      orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D',
    });
  });

  it.each(['', '   ', 'not json', '[1,2]', '"text"', '42', 'a=b'])('gives up on %j', (body) => {
    expect(parseNotificationBody(body)).toBeNull();
  });
});

describe('buildAcceptResponse', () => {
  it('answers "accept" with a signature over order, status and time', () => {
    const now = new Date('2026-10-24T12:00:00Z');
    const time = Math.floor(now.getTime() / 1000);
    const response = buildAcceptResponse('SVT-O-MH3K9Z2A-9F3A1C2D', CONFIG.secretKey, now);

    expect(response).toEqual({
      orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D',
      signature: hmac(`SVT-O-MH3K9Z2A-9F3A1C2D;accept;${time}`),
      status: 'accept',
      time,
    });
  });
});
