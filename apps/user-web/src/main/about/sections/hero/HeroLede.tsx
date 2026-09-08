import { HERO_LEDE } from './content';

type HeroLedeProps = {
  className?: string;
};

export function HeroLede({ className = '' }: HeroLedeProps) {
  return <p className={className}>{HERO_LEDE}</p>;
}
