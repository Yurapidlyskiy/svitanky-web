const RAY_COUNT = 20;
const RAY_ANGLE = 360 / RAY_COUNT;

type RaysSunDialProps = {
  count: number;
  goal: number;
};

export function RaysSunDial({ count, goal }: RaysSunDialProps) {
  const litRays = Math.min(RAY_COUNT, Math.round((count / goal) * RAY_COUNT));

  return (
    <svg aria-hidden="true" className="w-full max-w-[240px]" viewBox="0 0 200 200">
      <circle className="fill-sand/50" cx="100" cy="100" r="44" />

      {Array.from({ length: RAY_COUNT }, (_, index) => (
        <line
          className={index < litRays ? 'stroke-brand-amber-strong' : 'stroke-brand-amber/30'}
          key={index}
          strokeLinecap="round"
          strokeWidth="10"
          transform={`rotate(${-index * RAY_ANGLE} 100 100)`}
          x1="100"
          x2="100"
          y1="17"
          y2="45"
        />
      ))}

      <text
        className="fill-brand-amber-strong font-heading text-[28px] font-black"
        dominantBaseline="central"
        textAnchor="middle"
        x="100"
        y="102"
      >
        {count}
      </text>
    </svg>
  );
}
