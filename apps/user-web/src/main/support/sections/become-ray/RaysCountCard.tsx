import { useTranslations } from 'next-intl';

import { RAYS_COUNT, RAYS_GOAL } from './content';
import { RaysSunDial } from './RaysSunDial';

export function RaysCountCard() {
  const t = useTranslations('support.becomeRay.rays');
  const remaining = Math.max(0, RAYS_GOAL - RAYS_COUNT);

  // On desktop the card takes the height of the form beside it instead of setting the
  // row's height: it is pinned to its grid cell, and the dial absorbs what is left.
  return (
    <div className="lg:relative">
      <div className="flex flex-col items-center gap-5 rounded-[32px] border border-brand-sky-pale/60 bg-white px-5 py-7 text-center shadow-sm sm:px-10 lg:absolute lg:inset-0 lg:gap-4 lg:px-8 lg:py-6">
        <p className="rounded-full bg-brand-sky-mist px-5 py-2 text-xs font-medium uppercase tracking-[0.08em] text-brand-navy sm:text-sm">
          {t('badge')}
        </p>

        <h3 className="font-heading text-2xl font-black text-brand-navy sm:text-3xl lg:text-2xl xl:text-[1.75rem]">
          {t('caption')}
        </h3>

        <p className="sr-only">
          {RAYS_COUNT} / {RAYS_GOAL} {t('unit')}
        </p>

        <div className="flex w-full justify-center lg:min-h-0 lg:flex-1">
          <RaysSunDial
            className="w-full max-w-[280px] lg:h-full lg:w-auto"
            count={RAYS_COUNT}
            goal={RAYS_GOAL}
            unit={t('unit')}
          />
        </div>

        <div className="text-base text-brand-navy sm:text-lg lg:text-base xl:text-lg">
          <p>
            {t.rich('remaining', {
              goal: RAYS_GOAL,
              remaining,
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p className="mt-1">{t('invitation')}</p>
        </div>

        <a
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-navy px-4 py-4 text-[15px] sm:px-6 sm:text-base lg:px-4 lg:text-[15px] xl:px-6 xl:text-base font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-brand-navy-muted hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          href="#become-ray-form"
        >
          <span>{t('cta')}</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
