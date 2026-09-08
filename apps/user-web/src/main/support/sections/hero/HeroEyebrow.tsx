import { HERO_EYEBROW } from './content';

type HeroEyebrowProps = {
  className?: string;
};

export function HeroEyebrow({ className = '' }: HeroEyebrowProps) {
  return (
    <p
      className={`w-fit rounded-full bg-brand-amber/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-navy sm:text-sm ${className}`}
    >
      {HERO_EYEBROW}
    </p>
  );
}
