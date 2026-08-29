import { StatIcon } from '@/shared/ui';

import { calculateProgress } from '@/shared/lib/progress';

import { FRIENDS_COUNT, FRIENDS_GOAL, FRIENDS_HEADING, FRIENDS_INTRO } from './content';

export function FriendsProgress() {
  const percent = calculateProgress(FRIENDS_COUNT, FRIENDS_GOAL);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-3xl font-black uppercase leading-tight text-brand-navy sm:text-4xl">
        {FRIENDS_HEADING}
      </h2>

      <p className="text-base leading-relaxed text-slate-700">{FRIENDS_INTRO}</p>

      <div>
        <p className="font-heading text-7xl font-black text-amber-400 sm:text-8xl">
          {FRIENDS_COUNT}
        </p>
        <p className="mt-2 text-lg font-bold text-brand-navy">Друзів Світанків</p>
      </div>

      <div className="relative h-9">
        <div className="absolute top-1/2 h-2.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 text-white shadow-sm"
          style={{ left: `${percent}%` }}
        >
          <StatIcon name="sun" />
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p>
          <span className="block text-lg font-black text-amber-500">{FRIENDS_COUNT}</span>
          <span className="text-slate-600">зараз з нами</span>
        </p>
        <p className="text-right">
          <span className="block text-lg font-black text-brand-navy">{FRIENDS_GOAL}</span>
          <span className="text-slate-600">наша ціль</span>
        </p>
      </div>
    </div>
  );
}
