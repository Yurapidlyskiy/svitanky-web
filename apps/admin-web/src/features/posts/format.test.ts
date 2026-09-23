import { describe, expect, it } from 'vitest';

import { formatPostDate, todayInKyiv } from './format';

describe('formatPostDate', () => {
  it('formats an ISO date the Ukrainian way', () => {
    expect(formatPostDate('2026-07-20')).toBe('20.07.2026');
  });
});

describe('todayInKyiv', () => {
  it('uses Kyiv time, not UTC', () => {
    // 22:30 UTC on 19 July is already 20 July in Kyiv (UTC+3 in summer).
    expect(todayInKyiv(new Date('2026-07-19T22:30:00Z'))).toBe('2026-07-20');
  });
});
