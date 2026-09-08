import { HERO_SUBTITLE } from './content';

type HeroSubtitleProps = {
  className?: string;
};

export function HeroSubtitle({ className = '' }: HeroSubtitleProps) {
  return <p className={className}>{HERO_SUBTITLE}</p>;
}
