import { Reveal } from '@/shared/ui';

import type { JourneyMilestone } from './types';

type JourneyNodeProps = JourneyMilestone & {
  delayMs: number;
};

export function JourneyNode({ delayMs, description, isCurrent = false, year }: JourneyNodeProps) {
  return (
    <Reveal
      className="relative flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
      delayMs={delayMs}
    >
      <span
        aria-hidden="true"
        className={`relative z-10 block rounded-full border-4 border-canvas shadow-sm ${
          isCurrent
            ? 'size-6 bg-brand-amber-strong shadow-[0_0_0_8px_rgba(249,175,34,0.25)]'
            : 'size-4 bg-brand-navy-muted'
        }`}
      />

      <p
        className={`mt-4 font-heading text-2xl font-black ${
          isCurrent ? 'text-brand-amber-strong' : 'text-brand-navy'
        }`}
      >
        {year}
      </p>

      <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">{description}</p>
    </Reveal>
  );
}
