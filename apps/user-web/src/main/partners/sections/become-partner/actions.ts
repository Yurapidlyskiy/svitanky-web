'use server';

export type PartnerRequestState = {
  status: 'idle' | 'error' | 'success';
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action behind the "Станьте партнером сьогодні" form.
 *
 * TODO: no database exists yet — once the Supabase project is wired up, insert the
 * validated payload into a `partner_requests` table here (with RLS restricting reads to
 * admins) instead of discarding it, and swap the response below for a real success state.
 * TODO: send a notification email to the team after a successful insert.
 * TODO: add spam protection (rate limiting / honeypot / captcha) before going live.
 */
export async function submitPartnerRequest(
  _previousState: PartnerRequestState,
  formData: FormData
): Promise<PartnerRequestState> {
  const name = formData.get('name');
  const email = formData.get('email');
  const organization = formData.get('organization');
  const cooperationType = formData.get('cooperationType');
  const message = formData.get('message');

  // Never trust the client: everything below is re-checked here even though the
  // inputs are also marked `required` in the markup.
  if (typeof name !== 'string' || name.trim().length < 2) {
    return { message: "Вкажіть, будь ласка, ваше ім'я.", status: 'error' };
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    return { message: 'Вкажіть коректний email.', status: 'error' };
  }

  if (typeof organization !== 'string' || organization.trim().length < 2) {
    return { message: 'Вкажіть назву організації чи компанії.', status: 'error' };
  }

  if (typeof cooperationType !== 'string' || cooperationType.trim().length === 0) {
    return { message: 'Оберіть тип співпраці.', status: 'error' };
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    return { message: 'Опишіть, будь ласка, коротко вашу пропозицію.', status: 'error' };
  }

  return {
    message: 'Форму ще не підключено до бази даних. Ми скоро це виправимо.',
    status: 'error',
  };
}
