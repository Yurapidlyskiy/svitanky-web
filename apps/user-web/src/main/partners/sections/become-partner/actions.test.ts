import { describe, expect, it } from 'vitest';

import { submitPartnerRequest } from './actions';

const IDLE = { status: 'idle' } as const;

const VALID = {
  cooperationType: 'financial',
  email: 'partner@example.com',
  message: 'Хочемо підтримати літній табір.',
  name: 'Олена',
  organization: 'Компанія',
};

function form(fields: Record<string, string>): FormData {
  const data = new FormData();

  for (const [key, value] of Object.entries(fields)) data.set(key, value);

  return data;
}

describe('submitPartnerRequest', () => {
  it.each([
    ['name', 'О', 'invalidName'],
    ['name', '   ', 'invalidName'],
    ['email', 'not-an-email', 'invalidEmail'],
    ['email', 'a b@example.com', 'invalidEmail'],
    ['organization', ' ', 'invalidOrganization'],
    ['cooperationType', '  ', 'invalidCooperationType'],
    // The form submits ids; a label or an unknown value is rejected.
    ['cooperationType', 'Фінансова підтримка', 'invalidCooperationType'],
    ['cooperationType', 'admin', 'invalidCooperationType'],
    ['message', 'Коротко', 'invalidMessage'],
  ])('rejects %s=%j', async (field, value, error) => {
    const result = await submitPartnerRequest(IDLE, form({ ...VALID, [field]: value }));

    expect(result).toEqual({ error, status: 'error' });
  });

  it('rejects a payload with a field missing entirely', async () => {
    const withoutEmail: Record<string, string> = { ...VALID };
    delete withoutEmail.email;
    const result = await submitPartnerRequest(IDLE, form(withoutEmail));

    expect(result.error).toBe('invalidEmail');
  });

  it.each(['financial', 'volunteering', 'business', 'media', 'other'])(
    'accepts cooperation type %s',
    async (cooperationType) => {
      const result = await submitPartnerRequest(IDLE, form({ ...VALID, cooperationType }));

      expect(result.error).not.toBe('invalidCooperationType');
    }
  );

  // Documents the current stub: valid input passes validation but is not stored yet.
  // Update this test when the partner_requests table lands.
  it('reports the form as not connected for a valid payload', async () => {
    const result = await submitPartnerRequest(IDLE, form(VALID));

    expect(result).toEqual({ error: 'notConnected', status: 'error' });
  });
});
