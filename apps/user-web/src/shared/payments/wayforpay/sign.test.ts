import { createHmac } from 'node:crypto';

import { describe, expect, it } from 'vitest';

import { hmacMd5, joinSignatureFields, signFields, signaturesMatch } from './sign';

describe('hmacMd5', () => {
  it('matches the RFC 2202 test vector', () => {
    expect(hmacMd5('what do ya want for nothing?', 'Jefe')).toBe(
      '750c783e6ab0b503eaa86e310a5db738'
    );
  });

  it('signs the UTF-8 bytes of Ukrainian text', () => {
    const text = 'Благодійний внесок;Пам’ять';

    expect(hmacMd5(text, 'key')).toBe(
      createHmac('md5', 'key').update(Buffer.from(text, 'utf8')).digest('hex')
    );
  });
});

describe('joinSignatureFields', () => {
  it('joins with semicolons and turns missing values into empty strings', () => {
    expect(joinSignatureFields(['a', 1, null, undefined, 2.5])).toBe('a;1;;;2.5');
  });
});

describe('signFields', () => {
  it('signs the joined fields', () => {
    expect(signFields(['one', 2], 'secret')).toBe(hmacMd5('one;2', 'secret'));
  });
});

describe('signaturesMatch', () => {
  const signature = hmacMd5('data', 'secret');

  it('accepts the same signature, whatever its letter case', () => {
    expect(signaturesMatch(signature, signature)).toBe(true);
    expect(signaturesMatch(signature, signature.toUpperCase())).toBe(true);
  });

  it('rejects a different signature, a prefix of it, and non-strings', () => {
    expect(signaturesMatch(signature, hmacMd5('other', 'secret'))).toBe(false);
    expect(signaturesMatch(signature, signature.slice(0, -1))).toBe(false);
    expect(signaturesMatch(signature, '')).toBe(false);
    expect(signaturesMatch(signature, undefined)).toBe(false);
    expect(signaturesMatch(signature, 42)).toBe(false);
  });
});
