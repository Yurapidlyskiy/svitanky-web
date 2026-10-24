import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/shared/config/site';

import { GET, POST } from './route';

const ORDER = 'SVT-M-MH3K9Z2A-9F3A1C2D';
const THANKS = new URL(`/support/thanks?order=${ORDER}`, SITE_URL).toString();
const SUPPORT = new URL('/support', SITE_URL).toString();

function postForm(fields: Record<string, string>): Request {
  return new Request('http://localhost/api/payments/wayforpay/return', {
    body: new URLSearchParams(fields),
    method: 'POST',
  });
}

function get(query: string): Request {
  return new Request(`http://localhost/api/payments/wayforpay/return${query}`);
}

describe('POST /api/payments/wayforpay/return', () => {
  it('sends the donor to the result page of their order, as a GET', async () => {
    const response = await POST(postForm({ orderReference: ORDER, transactionStatus: 'Approved' }));

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe(THANKS);
  });

  it.each(['', 'DH783023', 'SVT-M-MH3K9Z2A-9F3A1C2D\nSet-Cookie: a=b', '../../admin'])(
    'sends the donor back to the form for the order %j',
    async (orderReference) => {
      const response = await POST(postForm({ orderReference }));

      expect(response.status).toBe(303);
      expect(response.headers.get('location')).toBe(SUPPORT);
    }
  );

  it('sends the donor back to the form when there is no order at all', async () => {
    const response = await POST(postForm({ transactionStatus: 'Approved' }));

    expect(response.headers.get('location')).toBe(SUPPORT);
  });

  it('survives a body that is not a form', async () => {
    const request = new Request('http://localhost/api/payments/wayforpay/return', {
      body: '{"orderReference":"x"}',
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const response = await POST(request);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe(SUPPORT);
  });
});

describe('GET /api/payments/wayforpay/return', () => {
  it('sends the donor to the result page of their order', () => {
    const response = GET(get(`?orderReference=${ORDER}`));

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe(THANKS);
  });

  it('sends the donor back to the form without a valid order', () => {
    expect(GET(get('')).headers.get('location')).toBe(SUPPORT);
    expect(GET(get('?orderReference=nope')).headers.get('location')).toBe(SUPPORT);
  });

  it('never redirects anywhere but this site', () => {
    const response = GET(get(`?orderReference=${ORDER}&next=https://evil.example/`));
    const location = new URL(response.headers.get('location') ?? '');

    expect(location.origin).toBe(new URL(SITE_URL).origin);
  });
});
