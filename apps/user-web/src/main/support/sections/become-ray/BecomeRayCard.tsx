'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DONATION_LIMITS } from '@/shared/config/support';
import { isAllowedAmount, parseWholeAmount } from '@/shared/payments/donation/amount';
import { errorClassName, inputClassName, labelClassName } from '@/shared/payments/donation/styles';

import { AmountOptions } from './AmountOptions';
import { DetailsStep } from './DetailsStep';
import { FrequencyTabs } from './FrequencyTabs';
import { TrustBadges } from './TrustBadges';

import { DEFAULT_AMOUNT, DEFAULT_FREQUENCY } from './content';
import type { RayAmount, RayFrequency } from './types';

export function BecomeRayCard() {
  const t = useTranslations('support.becomeRay');
  const tPayments = useTranslations('payments');
  const [frequency, setFrequency] = useState<RayFrequency>(DEFAULT_FREQUENCY);
  const [amount, setAmount] = useState<RayAmount>(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState<'choose' | 'details'>('choose');
  const [hasTriedToContinue, setHasTriedToContinue] = useState(false);

  const donationAmount = amount === 'custom' ? parseWholeAmount(customAmount) : amount;
  const showAmountError = hasTriedToContinue && !isAllowedAmount(donationAmount);

  return (
    <div className="flex flex-col gap-7" id="become-ray-form">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-amber-strong sm:text-sm">
          {t('eyebrow')}
        </p>

        <h2 className="w-fit pr-12 sm:pr-14 font-heading text-3xl font-black text-brand-navy sm:text-4xl lg:text-5xl">
          {t.rich('title', {
            mark: (chunks) => <span className="relative inline-block">{chunks}</span>,
          })}
        </h2>

        <div className="text-base leading-relaxed text-slate-600 sm:text-lg">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
        </div>
      </div>

      {step === 'details' && isAllowedAmount(donationAmount) ? (
        <DetailsStep
          amount={donationAmount}
          frequency={frequency}
          onChange={() => setStep('choose')}
        />
      ) : (
        <>
          <FrequencyTabs onChange={setFrequency} value={frequency} />

          <AmountOptions frequency={frequency} onChange={setAmount} value={amount} />

          {amount === 'custom' ? (
            <div className="flex flex-col gap-2">
              <label className={labelClassName} htmlFor="ray-customAmount">
                {t('customAmountLabel')}
              </label>
              <input
                aria-describedby={showAmountError ? 'ray-customAmount-error' : undefined}
                aria-invalid={showAmountError ? true : undefined}
                className={`${inputClassName} lg:max-w-lg`}
                id="ray-customAmount"
                inputMode="numeric"
                max={DONATION_LIMITS.max}
                min={DONATION_LIMITS.min}
                onChange={(event) => setCustomAmount(event.target.value)}
                placeholder={t('customAmountPlaceholder')}
                step={1}
                type="number"
                value={customAmount}
              />
            </div>
          ) : null}

          <div aria-live="polite">
            {showAmountError ? (
              <p className={errorClassName} id="ray-customAmount-error">
                {tPayments('errors.invalidAmount', DONATION_LIMITS)}
              </p>
            ) : null}
          </div>

          <button
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-amber-strong px-8 py-4 text-base font-bold text-brand-navy shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-brand-amber hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber-strong lg:max-w-lg"
            onClick={() => {
              if (isAllowedAmount(donationAmount)) {
                setStep('details');
              } else {
                setHasTriedToContinue(true);
              }
            }}
            type="button"
          >
            <span>{t('cta')}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </>
      )}

      <TrustBadges />
    </div>
  );
}
