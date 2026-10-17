import { describe, expect, it } from 'vitest';

import { calculateProgress } from './progress';

describe('calculateProgress', () => {
  it.each([
    [0, 1000, 0],
    [250, 1000, 25],
    [333, 1000, 33],
    [1000, 1000, 100],
    [1500, 1000, 100],
  ])('%i of %i is %i%%', (value, goal, expected) => {
    expect(calculateProgress(value, goal)).toBe(expected);
  });
});
