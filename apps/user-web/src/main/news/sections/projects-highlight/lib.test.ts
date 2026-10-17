import { describe, expect, it } from 'vitest';

import { formatAmount } from './lib';

describe('formatAmount', () => {
  it('groups thousands the Ukrainian way', () => {
    // uk-UA uses a non-breaking space as the group separator.
    expect(formatAmount(1250000)).toBe('1 250 000');
  });

  it('leaves small numbers as they are', () => {
    expect(formatAmount(950)).toBe('950');
  });
});
