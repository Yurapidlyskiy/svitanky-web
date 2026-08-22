type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className = '' }: HeroTitleProps) {
  return (
    <h1 className={`hero-title text-[#004574] ${className}`}>
      <span className="relative block md:pl-[0.7em]">
        <svg
          aria-hidden="true"

          className="pointer-events-none absolute -left-[0.15em] md:-left-[0.35em] top-1/2 h-[1.25em] w-[1.2em] -translate-y-[70%] text-[#F9AF22]"
          fill="none"
          viewBox="0 0 170 220"
        >
          <path d="M13 109L101 116" stroke="currentColor" strokeLinecap="round" strokeWidth="18" />
          <path d="M32 191L107 147" stroke="currentColor" strokeLinecap="round" strokeWidth="18" />
          <path d="M43 14L111 86" stroke="currentColor" strokeLinecap="round" strokeWidth="18" />
          <path d="M132 12L148 57" stroke="currentColor" strokeLinecap="round" strokeWidth="18" />
        </svg>
        Світанки
      </span>

      <span className="block">
        запалюєш{' '}
        <span className="relative inline-block">
          ти
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-[0.12em] -z-10 h-[0.19em] w-full text-[#F9AF22]"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 100 12"
          >
            <path d="M2 8 Q50 2 98 7" stroke="currentColor" strokeLinecap="round" strokeWidth="7" />
          </svg>
        </span>
      </span>
    </h1>
  );
}
