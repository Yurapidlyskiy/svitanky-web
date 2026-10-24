'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DONATION_LIMITS } from '@/shared/config/support';
import { DonorFields } from '@/shared/payments/donation/DonorFields';
import { errorClassName } from '@/shared/payments/donation/styles';
import { useDonationCheckout } from '@/shared/payments/donation/useDonationCheckout';
import { billingDay } from '@/shared/payments/schedule';

import type { RayFrequency } from './types';

type DetailsStepProps = {
  /** A whole-hryvnia amount that already passed the limits. */
  amount: number;
  frequency: RayFrequency;
  /** Back to the amount and frequency choice. */
  onChange: () => void;
};

/** Second step of the "Become a Ray" card: who is giving, then WayForPay's payment page. */
export function DetailsStep({ amount, frequency, onChange }: DetailsStepProps) {
  const t = useTranslations('support.becomeRay');
  const tPayments = useTranslations('payments');
  const { error, fieldErrors, isPending, submit } = useDonationCheckout();
  // Computed once, when the donor reaches this step, so the day cannot change under them.
  const [chargeDay] = useState(() => billingDay(new Date()));
  const amountError = fieldErrors?.amount ?? fieldErrors?.frequency;

  return (
    <form
      className="flex flex-col gap-6"
      // Before the page hydrates a submit is a plain browser submit: POST keeps the donor's
      // name, phone and email out of the address bar, history and analytics.
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        submit(new FormData(event.currentTarget));
      }}
    >
      <input name="amount" type="hidden" value={amount} />
      <input name="frequency" type="hidden" value={frequency} />

      <div className="flex flex-col gap-2 rounded-2xl border-2 border-brand-amber-strong bg-brand-amber/15 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-heading text-lg font-black text-brand-navy sm:text-xl">
            {t(frequency === 'monthly' ? 'checkout.summary.monthly' : 'checkout.summary.oneTime', {
              amount,
            })}
          </p>
          <button
            className="text-sm font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            onClick={onChange}
            type="button"
          >
            {t('checkout.change')}
          </button>
        </div>
        {frequency === 'monthly' ? (
          <p className="text-sm text-slate-600">{t('checkout.monthlyNote', { day: chargeDay })}</p>
        ) : null}
      </div>

      <DonorFields errors={fieldErrors} idPrefix="ray" />

      <div aria-live="polite" className="flex flex-col gap-1">
        {amountError ? (
          <p className={errorClassName}>{tPayments(`errors.${amountError}`, DONATION_LIMITS)}</p>
        ) : null}
        {error ? <p className={errorClassName}>{tPayments(`errors.${error}`)}</p> : null}
      </div>

      <button
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-amber-strong px-8 py-4 text-base font-bold text-brand-navy shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-brand-amber hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber-strong disabled:cursor-not-allowed disabled:opacity-60 lg:max-w-lg"
        disabled={isPending}
        type="submit"
      >
        <span>{isPending ? tPayments('form.submitting') : t('checkout.submit')}</span>
        <span aria-hidden="true">&rarr;</span>
      </button>

      <p className="text-sm leading-snug text-slate-500">{tPayments('form.secureNote')}</p>
    </form>
  );
}
