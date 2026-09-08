import { HERO_NOTE } from './content';

type HeroNoteProps = {
  className?: string;
};

export function HeroNote({ className = '' }: HeroNoteProps) {
  return (
    <div className={`flex items-center gap-3 text-brand-navy ${className}`}>
      <div className="relative max-w-[13rem] -rotate-6">
        <p className="font-display text-xl leading-snug font-bold sm:text-2xl">{HERO_NOTE}</p>

        <svg
          aria-hidden="true"
          className="absolute -bottom-3 left-2 h-4 w-[85%]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 160 20"
        >
          <path
            d="M4 6C34 18 104 20 156 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </div>

      <svg
        aria-hidden="true"
        className="h-10 w-10 shrink-0 -rotate-6 sm:h-12 sm:w-12"
        fill="none"
        viewBox="0 0 72 64"
      >
        <path
          d="M35.2 57.8C30.2 51.7 10.5 37.4 8.3 21.6C6.9 11.5 12.1 5.7 20.2 5.3C27.8 4.9 32.5 10.5 35.1 17.3C38.3 9.9 44.2 4.1 52.1 5.5C60.4 7 64.5 13.3 62.8 23.4C60.3 38.3 41 53.6 35.2 57.8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
}
