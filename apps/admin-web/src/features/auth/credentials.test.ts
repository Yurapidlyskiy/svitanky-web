import { describe, expect, it } from 'vitest';

import { parseCredentials } from './credentials';

function form(fields: Record<string, string>) {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => data.set(key, value));
  return data;
}

describe('parseCredentials', () => {
  it('normalises the email', () => {
    const result = parseCredentials(form({ email: '  Admin@Example.COM ', password: 'secret' }));
    expect(result.success && result.data).toEqual({
      email: 'admin@example.com',
      password: 'secret',
    });
  });

  it('rejects a malformed email', () => {
    expect(parseCredentials(form({ email: 'nope', password: 'secret' })).success).toBe(false);
  });

  it('rejects missing fields', () => {
    expect(parseCredentials(new FormData()).success).toBe(false);
  });

  it('rejects an empty or over-long password', () => {
    expect(parseCredentials(form({ email: 'a@b.co', password: '' })).success).toBe(false);
    expect(parseCredentials(form({ email: 'a@b.co', password: 'x'.repeat(73) })).success).toBe(
      false
    );
  });

  it('rejects a file posted in place of a string', () => {
    const data = form({ email: 'a@b.co' });
    data.set('password', new Blob(['secret']));
    expect(parseCredentials(data).success).toBe(false);
  });
});
