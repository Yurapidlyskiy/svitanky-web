const RAYS = ['M13 109L101 116', 'M32 191L107 147', 'M43 14L111 86', 'M132 12L148 57'];

type HeroSparkleProps = {
  className?: string;
};

export function HeroSparkle({ className = '' }: HeroSparkleProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 170 220">
      {RAYS.map((ray) => (
        <path d={ray} key={ray} stroke="currentColor" strokeLinecap="round" strokeWidth="18" />
      ))}
    </svg>
  );
}
