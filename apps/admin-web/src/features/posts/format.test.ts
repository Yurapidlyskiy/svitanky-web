import { describe, expect, it } from 'vitest';

import {
  formatAmount,
  formatPostDate,
  parseAmountInput,
  projectProgress,
  todayInKyiv,
} from './format';

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

describe('projectProgress', () => {
  it.each([
    [840_000, 1_200_000, 70],
    [0, 100, 0],
    [150, 100, 100],
    [50, 0, 0],
  ])('%i of %i is %i%%', (raised, goal, expected) => {
    expect(projectProgress(raised, goal)).toBe(expected);
  });
});

describe('parseAmountInput', () => {
  it.each([
    ['1 200 000', 1_200_000],
    ['', 0],
    ['abc', 0],
    ['-5', 0],
  ])('reads %j as %i', (value, expected) => {
    expect(parseAmountInput(value)).toBe(expected);
  });
});

describe('formatAmount', () => {
  it('groups thousands', () => {
    expect(formatAmount(1_250_000).replace(/\s/g, ' ')).toBe('1 250 000');
  });
});
