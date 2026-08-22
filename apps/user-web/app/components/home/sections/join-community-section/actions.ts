'use server';

export type SupportFormState = {
  status: 'idle' | 'error' | 'success';
  message?: string;
};

/**
 * Server Action behind the "Стати другом Світанків" form.
 *
 * TODO: the payment backend is not wired up yet — this currently only does the
 * baseline server-side validation and always reports "not connected".
 */
export async function submitSupportForm(
  _previousState: SupportFormState,
  formData: FormData
): Promise<SupportFormState> {
  const rawAmount = formData.get('amount') === 'custom' ? formData.get('customAmount') : formData.get('amount');
  const frequency = formData.get('frequency');
  const hasConsent = formData.get('consent') === 'on';

  // Never trust the client: everything below is re-checked here even though the
  // inputs are also marked `required` in the markup.
  // TODO: replace these ad-hoc checks with a real schema (e.g. zod) and return
  // per-field errors so they can be rendered under each input.
  if (!hasConsent) {
    return { message: 'Потрібна згода на обробку персональних даних.', status: 'error' };
  }

  const amount = Number(rawAmount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return { message: 'Вкажіть коректну суму підтримки.', status: 'error' };
  }

  if (frequency !== 'monthly' && frequency !== 'one-time') {
    return { message: 'Оберіть тип платежу.', status: 'error' };
  }

  // TODO: create the payment with the provider (LiqPay / Fondy / Stripe):
  //   - frequency === 'monthly'  -> recurring subscription
  //   - frequency === 'one-time' -> single charge
  //   then redirect() the donor to the provider's checkout page.
  // TODO: persist the donor + donation once a database exists.
  // TODO: send a confirmation email after a successful charge.
  // TODO: add spam protection (rate limiting / captcha) before going live.

  return {
    message: 'Оплату ще не підключено. Ми скоро це виправимо.',
    status: 'error',
  };
}
