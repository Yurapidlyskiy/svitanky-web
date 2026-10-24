'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DONATION_LIMITS, PRESET_AMOUNTS } from '@/shared/config/support';
import { DonorFields } from '@/shared/payments/donation/DonorFields';
import { errorClassName, inputClassName, labelClassName } from '@/shared/payments/donation/styles';
import { useDonationCheckout } from '@/shared/payments/donation/useDonationCheckout';

const CUSTOM_AMOUNT = 'custom';

const amountClassName =
  'flex w-full cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-2.5 text-center text-base font-bold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-navy';

export function SupportForm() {
  const t = useTranslations('home.joinCommunity');
  const tPayments = useTranslations('payments');
  const { error, fieldErrors, isPending, preload, submit } = useDonationCheckout();
  const [selectedAmount, setSelectedAmount] = useState<number | typeof CUSTOM_AMOUNT | null>(null);
  const amountError = fieldErrors?.amount ?? fieldErrors?.frequency;

  return (
    <form
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"
      // Before the page hydrates a submit is a plain browser submit: POST keeps the donor's
      // name, phone and email out of the address bar, history and analytics.
      method="post"
      onFocusCapture={preload}
      onSubmit={(event) => {
        event.preventDefault();
        // The pressed button ("monthly" or "one-time") travels along as `frequency`.
        submit(new FormData(event.currentTarget, (event.nativeEvent as SubmitEvent).submitter));
      }}
    >
      <h3 className="text-2xl font-black text-brand-navy sm:text-3xl">{t('form.title')}</h3>

      <fieldset>
        <legend className="sr-only">{t('form.amountLegend')}</legend>
        <div
          className="grid grid-cols-2 gap-3"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedAmount(null);
            }
          }}
        >
          {PRESET_AMOUNTS.map((amount) => (
            <label
              className={`${amountClassName} ${
                selectedAmount === amount
                  ? 'border-amber-400 bg-amber-400 text-white'
                  : 'border-amber-400 bg-white text-brand-navy hover:bg-amber-50'
              }`}
              key={amount}
            >
              <input
                checked={selectedAmount === amount}
                className="sr-only"
                name="amount"
                onChange={() => setSelectedAmount(amount)}
                type="radio"
                value={amount}
                required
              />
              {t('form.amount', { amount })}
            </label>
          ))}
          <label
            className={`${amountClassName} ${
              selectedAmount === CUSTOM_AMOUNT
                ? 'border-brand-sky bg-brand-sky text-brand-navy'
                : 'border-brand-sky-pale bg-white text-slate-400 hover:bg-sky-50'
            }`}
          >
            <input
              checked={selectedAmount === CUSTOM_AMOUNT}
              className="sr-only"
              name="amount"
              onChange={() => setSelectedAmount(CUSTOM_AMOUNT)}
              type="radio"
              value={CUSTOM_AMOUNT}
              required
            />
            {t('form.customAmount')}
          </label>
        </div>
      </fieldset>

      {selectedAmount === CUSTOM_AMOUNT && (
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="customAmount">
            {t('form.customAmountLabel')}
          </label>
          <input
            className={inputClassName}
            id="customAmount"
            inputMode="numeric"
            max={DONATION_LIMITS.max}
            min={DONATION_LIMITS.min}
            name="customAmount"
            placeholder={t('form.customAmountPlaceholder')}
            required
            step={1}
            type="number"
          />
        </div>
      )}

      <div aria-live="polite">
        {amountError ? (
          <p className={errorClassName}>{tPayments(`errors.${amountError}`, DONATION_LIMITS)}</p>
        ) : null}
      </div>

      <DonorFields errors={fieldErrors} idPrefix="support" />

      <div aria-live="polite">
        {error ? <p className={errorClassName}>{tPayments(`errors.${error}`)}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          className="rounded-xl bg-amber-400 px-6 py-4 text-base font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          name="frequency"
          type="submit"
          value="monthly"
        >
          {t('form.monthly')}
        </button>
        <button
          className="rounded-xl bg-brand-sky px-6 py-4 text-base font-bold text-brand-navy transition-[background-color,transform] duration-200 ease-out hover:bg-[#96BFE8] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          name="frequency"
          type="submit"
          value="one-time"
        >
          {t('form.oneTime')}
        </button>
      </div>

      <p className="text-sm leading-snug text-slate-500">{tPayments('form.secureNote')}</p>
    </form>
  );
}
