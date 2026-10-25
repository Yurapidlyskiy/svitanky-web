import { describe, expect, it } from 'vitest';

import { readWayForPayConfig } from './config';

const ENV = {
  WAYFORPAY_MERCHANT_ACCOUNT: 'test_merchant',
  WAYFORPAY_MERCHANT_DOMAIN: 'svitanky.example',
  WAYFORPAY_SECRET_KEY: 'unit-test-secret-key',
};

describe('readWayForPayConfig', () => {
  it('builds the config and the absolute callback URLs from the site URL', () => {
    expect(readWayForPayConfig(ENV, 'https://svitanky.example')).toEqual({
      merchantAccount: 'test_merchant',
      merchantDomainName: 'svitanky.example',
      returnUrl: 'https://svitanky.example/api/payments/wayforpay/return',
      secretKey: 'unit-test-secret-key',
      serviceUrl: 'https://svitanky.example/api/payments/wayforpay/callback',
    });
  });

  it('keeps only the host when the domain is pasted as a URL', () => {
    const config = readWayForPayConfig(
      { ...ENV, WAYFORPAY_MERCHANT_DOMAIN: ' https://www.svitanky.example/support?x=1 ' },
      'https://svitanky.example'
    );

    expect(config?.merchantDomainName).toBe('www.svitanky.example');
  });

  it.each(Object.keys(ENV))('is null when %s is missing or blank', (name) => {
    expect(
      readWayForPayConfig({ ...ENV, [name]: undefined }, 'https://svitanky.example')
    ).toBeNull();
    expect(readWayForPayConfig({ ...ENV, [name]: '  ' }, 'https://svitanky.example')).toBeNull();
  });
});
