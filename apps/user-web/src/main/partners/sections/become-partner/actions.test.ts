import { describe, expect, it } from 'vitest';

import { submitPartnerRequest } from './actions';

const IDLE = { status: 'idle' } as const;

const VALID = {
  cooperationType: 'Фінансова підтримка',
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
    ['name', 'О', "Вкажіть, будь ласка, ваше ім'я."],
    ['name', '   ', "Вкажіть, будь ласка, ваше ім'я."],
    ['email', 'not-an-email', 'Вкажіть коректний email.'],
    ['email', 'a b@example.com', 'Вкажіть коректний email.'],
    ['organization', ' ', 'Вкажіть назву організації чи компанії.'],
    ['cooperationType', '  ', 'Оберіть тип співпраці.'],
    ['message', 'Коротко', 'Опишіть, будь ласка, коротко вашу пропозицію.'],
  ])('rejects %s=%j', async (field, value, message) => {
    const result = await submitPartnerRequest(IDLE, form({ ...VALID, [field]: value }));

    expect(result).toEqual({ message, status: 'error' });
  });

  it('rejects a payload with a field missing entirely', async () => {
    const withoutEmail: Record<string, string> = { ...VALID };
    delete withoutEmail.email;
    const result = await submitPartnerRequest(IDLE, form(withoutEmail));

    expect(result.message).toBe('Вкажіть коректний email.');
  });

  // Documents the current stub: valid input passes validation but is not stored yet.
  // Update this test when the partner_requests table lands.
  it('reports the form as not connected for a valid payload', async () => {
    const result = await submitPartnerRequest(IDLE, form(VALID));

    expect(result).toEqual({
      message: 'Форму ще не підключено до бази даних. Ми скоро це виправимо.',
      status: 'error',
    });
  });
});
