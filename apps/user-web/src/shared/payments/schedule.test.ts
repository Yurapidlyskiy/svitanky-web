import { describe, expect, it } from 'vitest';

import {
  REGULAR_PAYMENT_YEARS,
  billingDay,
  formatChargeDate,
  lastChargeDate,
  nextChargeDate,
} from './schedule';

describe('nextChargeDate', () => {
  it('is the same day of the next month', () => {
    expect(nextChargeDate(new Date('2026-10-24T12:00:00Z'))).toEqual({
      day: 24,
      month: 11,
      year: 2026,
    });
  });

  it('never goes past the 28th, so every month has that day', () => {
    expect(nextChargeDate(new Date('2026-01-31T10:00:00Z'))).toEqual({
      day: 28,
      month: 2,
      year: 2026,
    });
  });

  it('rolls December over into January of the next year', () => {
    expect(nextChargeDate(new Date('2026-12-15T10:00:00Z'))).toEqual({
      day: 15,
      month: 1,
      year: 2027,
    });
  });

  it('reads the date in Kyiv, not in UTC', () => {
    // 21:30 UTC on June 30th is already July 1st, 00:30 in Kyiv (UTC+3).
    expect(nextChargeDate(new Date('2026-06-30T21:30:00Z'))).toEqual({
      day: 1,
      month: 8,
      year: 2026,
    });
    // In winter Kyiv is UTC+2: 22:30 UTC on January 15th is January 16th there.
    expect(billingDay(new Date('2026-01-15T22:30:00Z'))).toBe(16);
  });
});

describe('lastChargeDate', () => {
  it('is the day of the first charge, ten years later', () => {
    expect(REGULAR_PAYMENT_YEARS).toBe(10);
    expect(lastChargeDate({ day: 24, month: 11, year: 2026 })).toEqual({
      day: 24,
      month: 11,
      year: 2036,
    });
  });

  it('keeps a February billing day valid in every year', () => {
    const first = nextChargeDate(new Date('2026-01-31T10:00:00Z'));

    expect(lastChargeDate(first)).toEqual({ day: 28, month: 2, year: 2036 });
  });
});

describe('billingDay', () => {
  it('is capped at 28', () => {
    expect(billingDay(new Date('2026-03-31T10:00:00Z'))).toBe(28);
    expect(billingDay(new Date('2026-03-27T10:00:00Z'))).toBe(27);
  });
});

describe('formatChargeDate', () => {
  it('is DD.MM.YYYY with leading zeros', () => {
    expect(formatChargeDate({ day: 5, month: 3, year: 2027 })).toBe('05.03.2027');
    expect(formatChargeDate({ day: 24, month: 11, year: 2026 })).toBe('24.11.2026');
  });
});
