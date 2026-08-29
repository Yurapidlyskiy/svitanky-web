import { StatIcon, type StatIconName } from './StatIcon';

export type Stat = {
  icon: StatIconName;
  primary: string;
  secondary?: string;
  tone: 'amber' | 'navy';
};

type StatsBarProps = {
  stats: Stat[];
};

const TONE_CLASS = {
  amber: 'text-amber-500',
  navy: 'text-brand-navy',
} as const;

const ARROW_ICON = (
  <svg
    aria-hidden="true"
    className="size-5 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/** The icon + text row, separated by arrows, used atop the camps and projects highlights. */
export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-8">
      {stats.map((stat, index) => (
        <div className="flex items-center gap-4 sm:flex-1" key={stat.primary}>
          <div className="flex items-center gap-3">
            <span className={TONE_CLASS[stat.tone]}>
              <StatIcon name={stat.icon} />
            </span>
            <p>
              <span className="block text-base font-black text-brand-navy sm:text-lg">
                {stat.primary}
              </span>
              {stat.secondary ? (
                <span className="block text-sm font-medium text-slate-600">{stat.secondary}</span>
              ) : null}
            </p>
          </div>

          {index < stats.length - 1 ? (
            <span aria-hidden="true" className="hidden text-brand-navy sm:block">
              {ARROW_ICON}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
