import { describe, expect, it } from 'vitest';

import { clientIp, createRateLimiter } from './rateLimit';

describe('createRateLimiter', () => {
  it('allows up to the limit in a window, then refuses', () => {
    const allow = createRateLimiter({ limit: 3, windowMs: 1000 });

    expect([1, 2, 3, 4].map(() => allow('a', 0))).toEqual([true, true, true, false]);
  });

  it('counts every key on its own', () => {
    const allow = createRateLimiter({ limit: 1, windowMs: 1000 });

    expect(allow('a', 0)).toBe(true);
    expect(allow('b', 0)).toBe(true);
    expect(allow('a', 0)).toBe(false);
  });

  it('starts a fresh window once the old one has passed', () => {
    const allow = createRateLimiter({ limit: 1, windowMs: 1000 });

    expect(allow('a', 0)).toBe(true);
    expect(allow('a', 999)).toBe(false);
    expect(allow('a', 1000)).toBe(true);
  });

  it('keeps memory bounded when too many addresses show up', () => {
    const allow = createRateLimiter({ limit: 1, maxKeys: 2, windowMs: 1000 });

    allow('a', 0);
    allow('b', 0);
    // The store is full of live windows, so it is reset and "a" is counted afresh.
    expect(allow('c', 0)).toBe(true);
    expect(allow('a', 0)).toBe(true);
  });
});

describe('clientIp', () => {
  it('takes the first address of x-forwarded-for', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))).toBe(
      '203.0.113.7'
    );
  });

  it('falls back to x-real-ip, then to nothing', () => {
    expect(clientIp(new Headers({ 'x-real-ip': '203.0.113.8' }))).toBe('203.0.113.8');
    expect(clientIp(new Headers())).toBeUndefined();
  });
});
