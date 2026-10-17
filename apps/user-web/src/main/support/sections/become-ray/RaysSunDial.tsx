const RAY_COUNT = 24;
const RAY_ANGLE = 360 / RAY_COUNT;

type RaysSunDialProps = {
  className?: string;
  count: number;
  goal: number;
  unit: string;
};

/** The goal as a sun: one lit ray per 1/24 of it, the count in the middle. Decorative —
 * the card repeats the numbers for screen readers. The text is SVG, so it scales with
 * the dial when the desktop layout shrinks it. */
export function RaysSunDial({ className = '', count, goal, unit }: RaysSunDialProps) {
  const litRays = Math.min(RAY_COUNT, Math.round((count / goal) * RAY_COUNT));

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 200 200">
      {Array.from({ length: RAY_COUNT }, (_, index) => (
        <line
          className={index < litRays ? 'stroke-brand-amber-strong' : 'stroke-brand-amber/30'}
          key={index}
          strokeLinecap="round"
          strokeWidth="9"
          transform={`rotate(${-index * RAY_ANGLE} 100 100)`}
          x1="100"
          x2="100"
          y1="8"
          y2="28"
        />
      ))}

      <text className="font-heading font-black" textAnchor="middle" x="100" y="103">
        <tspan className="fill-brand-amber-strong text-[30px]">{count}</tspan>
        <tspan className="fill-brand-navy text-[12px]" dx="3">
          / {goal}
        </tspan>
      </text>

      <text
        className="fill-brand-navy font-heading text-[13px] font-black uppercase tracking-wide"
        textAnchor="middle"
        x="100"
        y="123"
      >
        {unit}
      </text>
    </svg>
  );
}
