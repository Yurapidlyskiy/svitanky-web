import { HERO_TITLE } from './content';

type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className = '' }: HeroTitleProps) {
  return (
    <h1 className={`relative w-fit font-heading font-black text-brand-navy ${className}`}>
      {HERO_TITLE}

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 -right-3 h-[0.8em] w-[0.7em] translate-x-full text-brand-amber-strong"
        fill="none"
        viewBox="0 0 100 100"
      >
        <path d="M6 45L31 6" stroke="currentColor" strokeLinecap="round" strokeWidth="11" />
        <path d="M37 62L86 32" stroke="currentColor" strokeLinecap="round" strokeWidth="11" />
        <path d="M51 94L94 90" stroke="currentColor" strokeLinecap="round" strokeWidth="11" />
      </svg>
    </h1>
  );
}
