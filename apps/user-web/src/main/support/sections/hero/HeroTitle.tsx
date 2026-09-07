type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className = '' }: HeroTitleProps) {
  return (
    <h1
      className={`font-display font-bold leading-[1.05] tracking-tight text-brand-navy ${className}`}
    >
      <span className="block">Додай свій</span>

      <span className="relative inline-block">
        промінь
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 top-1/2 hidden h-[1.1em] w-[0.9em] -translate-y-1/2 translate-x-full text-brand-amber-strong sm:block"
          fill="none"
          viewBox="0 0 120 160"
        >
          <path d="M106 26L34 44" stroke="currentColor" strokeLinecap="round" strokeWidth="16" />
          <path d="M110 84L38 84" stroke="currentColor" strokeLinecap="round" strokeWidth="16" />
          <path d="M102 142L32 118" stroke="currentColor" strokeLinecap="round" strokeWidth="16" />
        </svg>
      </span>
    </h1>
  );
}
