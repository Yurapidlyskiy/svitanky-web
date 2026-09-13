import { HeroSparkle } from './HeroSparkle';

import { HERO_TITLE_LINES } from './content';

type HeroTitleProps = {
  className?: string;
};

const LINE_CLASS = 'block pl-[0.7em]';

export function HeroTitle({ className = '' }: HeroTitleProps) {
  const [firstLine, ...restLines] = HERO_TITLE_LINES;

  return (
    <h1 className={`font-heading font-black leading-[1.05] text-brand-navy ${className}`}>
      <span className={`relative ${LINE_CLASS}`}>
        <HeroSparkle className="pointer-events-none absolute top-1/2 -left-[0.35em] h-[1.25em] w-[1.2em] -translate-y-[70%] text-brand-amber-strong" />
        {firstLine}
      </span>

      {restLines.map((line) => (
        <span className={LINE_CLASS} key={line}>
          {line}
        </span>
      ))}
    </h1>
  );
}
