import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import type { DonationInput } from '../donation/types';
import type { WayForPayConfig } from './config';
import { buildWidgetParams, createOrderReference, parseOrderReference } from './purchase';

const CONFIG: WayForPayConfig = {
  merchantAccount: 'test_merchant',
  merchantDomainName: 'svitanky.example',
  returnUrl: 'https://svitanky.example/api/payments/wayforpay/return',
  secretKey: 'unit-test-secret-key',
  serviceUrl: 'https://svitanky.example/api/payments/wayforpay/callback',
};

const DONATION: DonationInput = {
  amount: 350,
  email: 'anna@example.com',
  firstName: 'Анна',
  frequency: 'one-time',
  lastName: 'Коваль',
  phone: '380501234567',
};

const NOW = new Date('2026-10-24T12:00:00Z');
const ORDER = 'SVT-O-MH3K9Z2A-9F3A1C2D';

function hmac(data: string): string {
  return createHmac('md5', CONFIG.secretKey).update(data, 'utf8').digest('hex');
}

describe('buildWidgetParams', () => {
  it('signs merchant, domain, order, date, amount, currency, then names, counts and prices', () => {
    const params = buildWidgetParams(CONFIG, DONATION, { now: NOW, orderReference: ORDER });

    expect(params.merchantSignature).toBe(
      hmac(
        [
          'test_merchant',
          'svitanky.example',
          ORDER,
          String(Math.floor(NOW.getTime() / 1000)),
          '350',
          'UAH',
          'Благодійний внесок',
          '1',
          '350',
        ].join(';')
      )
    );
  });

  it('describes a one-time donation without any regular-payment fields', () => {
    const params = buildWidgetParams(CONFIG, DONATION, { now: NOW, orderReference: ORDER });

    expect(params).toMatchObject({
      amount: 350,
      authorizationType: 'SimpleSignature',
      clientEmail: 'anna@example.com',
      clientFirstName: 'Анна',
      clientLastName: 'Коваль',
      clientPhone: '380501234567',
      currency: 'UAH',
      language: 'UA',
      merchantAccount: 'test_merchant',
      merchantDomainName: 'svitanky.example',
      orderDate: Math.floor(NOW.getTime() / 1000),
      orderReference: ORDER,
      productCount: [1],
      productName: ['Благодійний внесок'],
      productPrice: [350],
      returnUrl: CONFIG.returnUrl,
      serviceUrl: CONFIG.serviceUrl,
    });
    for (const field of [
      'dateNext',
      'paymentSystems',
      'regularAmount',
      'regularMode',
      'regularOn',
    ]) {
      expect(params).not.toHaveProperty(field);
    }
  });

  it('asks WayForPay to repeat a monthly donation on the same day next month', () => {
    const params = buildWidgetParams(
      CONFIG,
      { ...DONATION, frequency: 'monthly' },
      { now: NOW, orderReference: 'SVT-M-MH3K9Z2A-9F3A1C2D' }
    );

    expect(params).toMatchObject({
      dateNext: '24.11.2026',
      paymentSystems: 'card;googlePay;applePay',
      productName: ['Щомісячна благодійна підтримка'],
      regularAmount: 350,
      regularBehavior: 'preset',
      regularMode: 'monthly',
      regularOn: 1,
    });
  });

  it('keeps the regular-payment fields out of the signature', () => {
    const monthly = { ...DONATION, frequency: 'monthly' } as const;
    const params = buildWidgetParams(CONFIG, monthly, {
      now: NOW,
      orderReference: 'SVT-M-MH3K9Z2A-9F3A1C2D',
    });

    expect(params.merchantSignature).toBe(
      hmac(
        [
          'test_merchant',
          'svitanky.example',
          'SVT-M-MH3K9Z2A-9F3A1C2D',
          String(Math.floor(NOW.getTime() / 1000)),
          '350',
          'UAH',
          'Щомісячна благодійна підтримка',
          '1',
          '350',
        ].join(';')
      )
    );
  });

  it('never carries the secret key', () => {
    const params = buildWidgetParams(CONFIG, DONATION, { now: NOW, orderReference: ORDER });

    expect(JSON.stringify(params)).not.toContain(CONFIG.secretKey);
  });

  it('generates its own order reference when none is given', () => {
    const params = buildWidgetParams(CONFIG, DONATION, { now: NOW });

    expect(parseOrderReference(params.orderReference)).toEqual({
      frequency: 'one-time',
      orderReference: params.orderReference,
    });
  });
});

describe('createOrderReference', () => {
  it('marks monthly and one-time donations and stays unique', () => {
    const monthly = createOrderReference('monthly', NOW);
    const oneTime = createOrderReference('one-time', NOW);

    expect(monthly).toMatch(/^SVT-M-[0-9A-Z]+-[0-9A-F]{8}$/);
    expect(oneTime).toMatch(/^SVT-O-[0-9A-Z]+-[0-9A-F]{8}$/);
    expect(createOrderReference('monthly', NOW)).not.toBe(monthly);
  });
});

describe('parseOrderReference', () => {
  it('reads the frequency back from a reference we made', () => {
    expect(parseOrderReference(createOrderReference('monthly'))?.frequency).toBe('monthly');
    expect(parseOrderReference(createOrderReference('one-time'))?.frequency).toBe('one-time');
  });

  it.each([
    '',
    'DH783023',
    'SVT-X-MH3K9Z2A-9F3A1C2D',
    'svt-m-mh3k9z2a-9f3a1c2d',
    ' SVT-M-MH3K9Z2A-9F3A1C2D',
    'SVT-M-MH3K9Z2A-9F3A1C2D\n',
    'SVT-M-MH3K9Z2A-9F3A1C2D&x=1',
    'SVT-M-MH3K9Z2A-9F3A1C2G',
  ])('rejects %j', (value) => {
    expect(parseOrderReference(value)).toBeNull();
  });
});
