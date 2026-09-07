import { HERO_NOTE_LINES, HERO_NOTE_TAGS } from './content';

/** The two handwritten margin notes on the right of the hero. Purely decorative. */
export function HeroNotes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-[3%] hidden select-none font-display text-brand-navy xl:block"
    >
      <p className="absolute top-[14%] right-0 -rotate-6 text-right text-xl leading-tight 2xl:text-2xl">
        {HERO_NOTE_LINES.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
        <svg className="mt-2 ml-auto h-7 w-8" fill="none" viewBox="0 0 72 64">
          <path
            d="M35.2 57.8C30.2 51.7 10.5 37.4 8.3 21.6C6.9 11.5 12.1 5.7 20.2 5.3C27.8 4.9 32.5 10.5 35.1 17.3C38.3 9.9 44.2 4.1 52.1 5.5C60.4 7 64.5 13.3 62.8 23.4C60.3 38.3 41 53.6 35.2 57.8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </svg>
      </p>

      <p className="absolute bottom-[10%] right-0 -rotate-6 text-right text-xl leading-tight 2xl:text-2xl">
        {HERO_NOTE_TAGS.map((tag) => (
          <span className="block" key={tag}>
            {tag}
          </span>
        ))}
        <svg
          className="mt-1 ml-auto h-2.5 w-32 text-brand-amber-strong"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 100 12"
        >
          <path d="M2 8 Q50 2 98 7" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
        </svg>
      </p>
    </div>
  );
}
