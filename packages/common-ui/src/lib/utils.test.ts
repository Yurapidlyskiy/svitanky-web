import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('cn', () => {
  it('merges multiple class strings', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('resolves conflicting Tailwind utility classes, keeping the last one', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('drops falsy and conditional values', () => {
    const isActive = false;
    expect(cn('a', isActive && 'b', undefined, null, 'c')).toBe('a c');
  });
});
