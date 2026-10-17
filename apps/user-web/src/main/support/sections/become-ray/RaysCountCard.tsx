import { useTranslations } from 'next-intl';

import { RAYS_COUNT, RAYS_GOAL } from './content';
import { RaysSunDial } from './RaysSunDial';

export function RaysCountCard() {
  const t = useTranslations('support.becomeRay.rays');
  const remaining = Math.max(0, RAYS_GOAL - RAYS_COUNT);

  return (
    <div className="flex flex-col items-center gap-6 rounded-[32px] border border-brand-sky-pale/60 bg-white px-6 py-6 text-center shadow-sm sm:px-10">
      <p className="rounded-full bg-brand-sky-mist px-5 py-2 text-sm text-brand-navy">
        {t('badge')}
      </p>

      <div>
        <p className="font-heading text-5xl font-black leading-none sm:text-6xl">
          <span className="text-brand-amber-strong">{RAYS_COUNT}</span>
          <span className="text-brand-navy"> / {RAYS_GOAL}</span>
        </p>

        <p className="mt-2 font-heading text-2xl font-black uppercase tracking-wide text-brand-navy sm:text-3xl">
          {t('unit')}
        </p>

        <p className="mt-2 text-base text-brand-navy-muted sm:text-lg">{t('caption')}</p>
      </div>

      <RaysSunDial count={RAYS_COUNT} goal={RAYS_GOAL} />

      <div className="text-base text-slate-600">
        <p>
          {t.rich('remaining', {
            goal: RAYS_GOAL,
            remaining,
            strong: (chunks) => <strong className="font-bold text-brand-navy">{chunks}</strong>,
          })}
        </p>
        <p className="mt-1 font-bold text-brand-navy">{t('invitation')}</p>
      </div>

      <button
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-sky-mist px-6 py-3.5 text-base font-bold text-brand-navy transition-[background-color,transform] duration-200 ease-out hover:bg-brand-sky-pale active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        type="button"
      >
        <span>{t('cta')}</span>
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
