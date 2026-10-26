import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readTurnstileSetting, verifyTurnstileToken } from './verify';

function reply(body: unknown, status = 200): typeof fetch {
  return vi.fn(async () => Response.json(body, { status }));
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('readTurnstileSetting', () => {
  it('uses the secret key when it is set', () => {
    expect(readTurnstileSetting({ TURNSTILE_SECRET_KEY: ' secret ' })).toEqual({
      secretKey: 'secret',
    });
  });

  it('is off without a key outside production, so dev and e2e need no Cloudflare', () => {
    expect(readTurnstileSetting({})).toBe('off');
    expect(readTurnstileSetting({ VERCEL_ENV: 'preview' })).toBe('off');
  });

  it('reports the key as missing in a production deployment', () => {
    expect(readTurnstileSetting({ TURNSTILE_SECRET_KEY: '', VERCEL_ENV: 'production' })).toBe(
      'missing'
    );
  });
});

describe('verifyTurnstileToken', () => {
  it('passes a token Cloudflare confirms, sending the secret, token and IP', async () => {
    const fetchImpl = reply({ success: true });

    await expect(
      verifyTurnstileToken('token', 'secret', { fetchImpl, remoteIp: '203.0.113.7' })
    ).resolves.toBe(true);

    const [url, init] = vi.mocked(fetchImpl).mock.calls[0] ?? [];
    const body = init?.body as URLSearchParams;

    expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    expect(Object.fromEntries(body)).toEqual({
      remoteip: '203.0.113.7',
      response: 'token',
      secret: 'secret',
    });
  });

  it('rejects a token Cloudflare refuses', async () => {
    await expect(
      verifyTurnstileToken('token', 'secret', {
        fetchImpl: reply({ 'error-codes': ['timeout-or-duplicate'], success: false }),
      })
    ).resolves.toBe(false);
  });

  it.each([undefined, '', 42, 'x'.repeat(2049)])(
    'rejects %j without asking Cloudflare',
    async (token) => {
      const fetchImpl = reply({ success: true });

      await expect(verifyTurnstileToken(token, 'secret', { fetchImpl })).resolves.toBe(false);
      expect(fetchImpl).not.toHaveBeenCalled();
    }
  );

  it('fails closed when Cloudflare answers with an error', async () => {
    await expect(
      verifyTurnstileToken('token', 'secret', { fetchImpl: reply({ success: true }, 500) })
    ).resolves.toBe(false);
  });

  it('fails closed when Cloudflare cannot be reached', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('network down');
    });

    await expect(verifyTurnstileToken('token', 'secret', { fetchImpl })).resolves.toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('never logs the secret key', async () => {
    await verifyTurnstileToken('token', 'top-secret', { fetchImpl: reply({}, 500) });

    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain('top-secret');
  });
});
