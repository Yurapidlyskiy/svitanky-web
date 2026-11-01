import { describe, expect, it } from 'vitest';

import { withoutDismissed } from './useFieldErrors';

describe('withoutDismissed', () => {
  const errors = { title: ['Введіть заголовок'], image: ['Додайте фото'] };

  it('hides only the dismissed fields', () => {
    expect(withoutDismissed(errors, ['image'])).toEqual({ title: ['Введіть заголовок'] });
  });

  it('keeps everything when nothing is dismissed', () => {
    expect(withoutDismissed(errors, [])).toEqual(errors);
  });
});
