import { useTranslations } from 'next-intl';

import { HeroSparkle } from './HeroSparkle';

type HeroTitleProps = {
  className?: string;
};

const LINE_CLASS = 'block pl-[0.7em]';

export function HeroTitle({ className = '' }: HeroTitleProps) {
  const t = useTranslations('activities.hero');

  return (
    <h1 className={`font-heading font-black leading-[1.05] text-brand-navy ${className}`}>
      {t.rich('title', {
        first: (chunks) => (
          <span className={`relative ${LINE_CLASS}`}>
            <HeroSparkle className="pointer-events-none absolute top-1/2 -left-[0.35em] h-[1.25em] w-[1.2em] -translate-y-[70%] text-brand-amber-strong" />
            {chunks}
          </span>
        ),
        line: (chunks) => <span className={LINE_CLASS}>{chunks}</span>,
      })}
    </h1>
  );
}
