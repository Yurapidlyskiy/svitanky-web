import { StatIcon, type StatIconName } from './StatIcon';

export type IconFeatureCardTone = 'amber' | 'blue' | 'green' | 'purple';

const ICON_TONE_CLASS: Record<IconFeatureCardTone, string> = {
  amber: 'bg-amber-400',
  blue: 'bg-brand-navy-muted',
  green: 'bg-emerald-600',
  purple: 'bg-violet-600',
};

const CARD_TONE_CLASS: Record<IconFeatureCardTone, string> = {
  amber: 'bg-sand',
  blue: 'bg-sky-100',
  green: 'bg-emerald-50',
  purple: 'bg-violet-50',
};

type IconFeatureCardProps = {
  description: string;
  icon: StatIconName;
  title?: string;
  tone: IconFeatureCardTone;
  /** Pastel card background tinted to match the icon. Omit for a plain white card. */
  tinted?: boolean;
};

/** An icon-square + copy card — used for both the projects and support-page impact grids. */
export function IconFeatureCard({
  description,
  icon,
  title,
  tone,
  tinted = false,
}: IconFeatureCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-2xl p-8 text-center ${
        tinted ? CARD_TONE_CLASS[tone] : 'bg-white shadow-sm'
      }`}
    >
      <span
        className={`flex size-16 shrink-0 items-center justify-center rounded-2xl text-white ${ICON_TONE_CLASS[tone]}`}
      >
        <StatIcon name={icon} />
      </span>

      {title ? <h3 className="text-lg font-black text-brand-navy sm:text-xl">{title}</h3> : null}

      <p className="text-base leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
