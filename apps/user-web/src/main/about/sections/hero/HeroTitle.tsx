import { HERO_TITLE } from './content';

type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className = '' }: HeroTitleProps) {
  return (
    <h1 className={`font-heading font-black leading-[1.05] text-brand-navy ${className}`}>
      {HERO_TITLE}
    </h1>
  );
}
