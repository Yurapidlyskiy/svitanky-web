'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AmountOptions } from './AmountOptions';
import { FrequencyTabs } from './FrequencyTabs';
import { TrustBadges } from './TrustBadges';

import { DEFAULT_AMOUNT, DEFAULT_FREQUENCY } from './content';
import type { RayAmount, RayFrequency } from './types';

export function BecomeRayCard() {
  const t = useTranslations('support.becomeRay');
  const [frequency, setFrequency] = useState<RayFrequency>(DEFAULT_FREQUENCY);
  const [amount, setAmount] = useState<RayAmount>(DEFAULT_AMOUNT);

  return (
    <div className="flex flex-col gap-7">
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

      <FrequencyTabs onChange={setFrequency} value={frequency} />

      <AmountOptions frequency={frequency} onChange={setAmount} value={amount} />

      {/* Placeholder until checkout exists — this will navigate to the payment page. */}
      <button
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-amber-strong px-8 py-4 text-base font-bold text-brand-navy shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-brand-amber hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber-strong lg:max-w-lg"
        type="button"
      >
        <span>{t('cta')}</span>
        <span aria-hidden="true">&rarr;</span>
      </button>

      <TrustBadges />
    </div>
  );
}
