const RAY_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

type SunEmblemProps = {
  className?: string;
};

export function SunEmblem({ className = '' }: SunEmblemProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 200 260">
      <g className="sun-rays">
        {RAY_ANGLES.map((angle) => (
          <line
            key={angle}
            stroke="var(--color-brand-amber-strong)"
            strokeLinecap="round"
            strokeWidth="4"
            transform={`rotate(${angle} 100 100)`}
            x1="100"
            x2="100"
            y1="12"
            y2="34"
          />
        ))}
      </g>

      <circle cx="100" cy="100" fill="var(--color-brand-amber-strong)" r="46" />
      <circle cx="100" cy="100" fill="var(--color-brand-amber)" r="30" />
    </svg>
  );
}
