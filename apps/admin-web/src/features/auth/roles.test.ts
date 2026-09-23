import { describe, expect, it } from 'vitest';

import { hasAdminRole } from './roles';

describe('hasAdminRole', () => {
  it('accepts app_metadata with the admin role', () => {
    expect(hasAdminRole({ role: 'admin', provider: 'email' })).toBe(true);
  });

  it.each([undefined, null, {}, { role: 'editor' }, { role: ['admin'] }, 'admin'])(
    'rejects %j',
    (metadata) => {
      expect(hasAdminRole(metadata)).toBe(false);
    }
  );
});
