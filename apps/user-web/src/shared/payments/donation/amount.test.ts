import { describe, expect, it } from 'vitest';

import { DONATION_LIMITS } from '@/shared/config/support';

import { isAllowedAmount, parseWholeAmount } from './amount';

describe('parseWholeAmount', () => {
  it.each([
    ['350', 350],
    [' 350 ', 350],
    ['0020', 20],
    ['1000000', 1_000_000],
  ])('reads %j as %d', (raw, amount) => {
    expect(parseWholeAmount(raw)).toBe(amount);
  });

  it.each([
    '',
    '   ',
    '-5',
    '+5',
    '12.5',
    '12,5',
    '1e3',
    '0x10',
    '12 34',
    '12345678',
    'abc',
    '१२३',
    null,
    undefined,
  ])('rejects %j', (raw) => {
    expect(parseWholeAmount(raw)).toBeNull();
  });
});

describe('isAllowedAmount', () => {
  it('accepts both limits and everything between them', () => {
    expect(isAllowedAmount(DONATION_LIMITS.min)).toBe(true);
    expect(isAllowedAmount(350)).toBe(true);
    expect(isAllowedAmount(DONATION_LIMITS.max)).toBe(true);
  });

  it('rejects anything outside the limits, and no amount at all', () => {
    expect(isAllowedAmount(0)).toBe(false);
    expect(isAllowedAmount(DONATION_LIMITS.min - 1)).toBe(false);
    expect(isAllowedAmount(DONATION_LIMITS.max + 1)).toBe(false);
    expect(isAllowedAmount(null)).toBe(false);
  });
});
