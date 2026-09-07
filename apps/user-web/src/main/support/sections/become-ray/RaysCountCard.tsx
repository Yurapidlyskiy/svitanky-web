import { RaysSunDial } from './RaysSunDial';

import {
  PEOPLE_WORD_FORMS,
  RAYS_BADGE,
  RAYS_CAPTION,
  RAYS_COUNT,
  RAYS_CTA,
  RAYS_GOAL,
  RAYS_INVITATION,
  RAYS_UNIT,
} from './content';

function peopleWord(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;

  if (last === 1 && lastTwo !== 11) return PEOPLE_WORD_FORMS[0];
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return PEOPLE_WORD_FORMS[1];

  return PEOPLE_WORD_FORMS[2];
}

export function RaysCountCard() {
  const remaining = Math.max(0, RAYS_GOAL - RAYS_COUNT);

  return (
    <div className="flex flex-col items-center gap-6 rounded-[32px] border border-brand-sky-pale/60 bg-white px-6 py-6 text-center shadow-sm sm:px-10">
      <p className="rounded-full bg-brand-sky-mist px-5 py-2 text-sm text-brand-navy">
        {RAYS_BADGE}
      </p>

      <div>
        <p className="font-heading text-5xl font-black leading-none sm:text-6xl">
          <span className="text-brand-amber-strong">{RAYS_COUNT}</span>
          <span className="text-brand-navy"> / {RAYS_GOAL}</span>
        </p>

        <p className="mt-2 font-heading text-2xl font-black uppercase tracking-wide text-brand-navy sm:text-3xl">
          {RAYS_UNIT}
        </p>

        <p className="mt-2 text-base text-brand-navy-muted sm:text-lg">{RAYS_CAPTION}</p>
      </div>

      <RaysSunDial count={RAYS_COUNT} goal={RAYS_GOAL} />

      <div className="text-base text-slate-600">
        <p>
          Ще{' '}
          <strong className="font-bold text-brand-navy">
            {remaining} {peopleWord(remaining)}
          </strong>{' '}
          — і нас буде {RAYS_GOAL}.
        </p>
        <p className="mt-1 font-bold text-brand-navy">{RAYS_INVITATION}</p>
      </div>

      <button
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-sky-mist px-6 py-3.5 text-base font-bold text-brand-navy transition-[background-color,transform] duration-200 ease-out hover:bg-brand-sky-pale active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        type="button"
      >
        <span>{RAYS_CTA}</span>
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
