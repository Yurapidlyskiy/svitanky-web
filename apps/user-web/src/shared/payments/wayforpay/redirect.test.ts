import { describe, expect, it } from 'vitest';

import { WAYFORPAY_PAY_URL, purchaseFormFields } from './redirect';
import type { PurchaseParams } from './types';

const ONE_TIME: PurchaseParams = {
  amount: 150,
  authorizationType: 'SimpleSignature',
  clientEmail: 'anna@example.com',
  clientFirstName: 'Анна',
  clientLastName: 'Коваль',
  clientPhone: '380501234567',
  currency: 'UAH',
  language: 'UA',
  merchantAccount: 'test_merchant',
  merchantDomainName: 'svitanky.example',
  merchantSignature: '0123456789abcdef0123456789abcdef',
  orderDate: 1_761_300_000,
  orderReference: 'SVT-O-MH3K9Z2A-9F3A1C2D',
  productCount: [1],
  productName: ['Благодійний внесок'],
  productPrice: [150],
  returnUrl: 'https://svitanky.example/api/payments/wayforpay/return',
  serviceUrl: 'https://svitanky.example/api/payments/wayforpay/callback',
};

describe('WAYFORPAY_PAY_URL', () => {
  it("is the secure payment address on WayForPay's own domain", () => {
    expect(WAYFORPAY_PAY_URL).toBe('https://secure.wayforpay.com/pay');
  });
});

describe('purchaseFormFields', () => {
  it('turns every value into text, in the order of the order', () => {
    const fields = purchaseFormFields(ONE_TIME);

    expect(fields).toContainEqual(['amount', '150']);
    expect(fields).toContainEqual(['orderDate', '1761300000']);
    expect(fields).toContainEqual(['clientFirstName', 'Анна']);
    expect(fields.map(([name]) => name).slice(0, 3)).toEqual([
      'amount',
      'authorizationType',
      'clientEmail',
    ]);
  });

  it('repeats the product lists as name[] fields, as WayForPay expects', () => {
    const fields = purchaseFormFields({
      ...ONE_TIME,
      productCount: [1, 2],
      productName: ['Перший', 'Другий'],
      productPrice: [100, 50],
    });

    expect(fields.filter(([name]) => name === 'productName[]')).toEqual([
      ['productName[]', 'Перший'],
      ['productName[]', 'Другий'],
    ]);
    expect(fields.filter(([name]) => name === 'productPrice[]').map(([, value]) => value)).toEqual([
      '100',
      '50',
    ]);
    expect(fields.map(([name]) => name)).not.toContain('productName');
  });

  it('carries the regular payment settings of a monthly donation', () => {
    const fields = Object.fromEntries(
      purchaseFormFields({
        ...ONE_TIME,
        dateEnd: '24.11.2036',
        dateNext: '24.11.2026',
        paymentSystems: 'card;googlePay;applePay',
        regularAmount: 150,
        regularMode: 'monthly',
        regularOn: 1,
      })
    );

    expect(fields).toMatchObject({
      dateEnd: '24.11.2036',
      dateNext: '24.11.2026',
      paymentSystems: 'card;googlePay;applePay',
      regularAmount: '150',
      regularMode: 'monthly',
      regularOn: '1',
    });
  });

  it('sends no regular payment fields for a one-time donation', () => {
    const names = purchaseFormFields(ONE_TIME).map(([name]) => name);

    expect(names.filter((name) => name.startsWith('regular'))).toEqual([]);
    expect(names).not.toContain('dateNext');
  });

  it('leaves out a field that is not set, instead of sending "undefined"', () => {
    const fields = purchaseFormFields({ ...ONE_TIME, dateNext: undefined });

    expect(fields.map(([name]) => name)).not.toContain('dateNext');
    expect(fields.some(([, value]) => value === 'undefined')).toBe(false);
  });
});
