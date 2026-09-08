import { Reveal } from '@/shared/ui';

import type { JourneyMilestone } from './types';

type JourneyNodeProps = JourneyMilestone & {
  delayMs: number;
};

export function JourneyNode({ delayMs, description, isCurrent = false, year }: JourneyNodeProps) {
  return (
    <Reveal
      className="relative flex flex-1 items-start gap-5 text-left lg:flex-col lg:gap-0"
      delayMs={delayMs}
    >
      <span
        aria-hidden="true"
        className="relative z-10 flex size-6 shrink-0 items-center justify-center"
      >
        <span
          className={`block rounded-full border-4 border-canvas shadow-sm ${
            isCurrent
              ? 'size-6 bg-brand-amber-strong shadow-[0_0_0_8px_rgba(249,175,34,0.25)]'
              : 'size-4 bg-brand-navy-muted'
          }`}
        />
      </span>

      <div className="lg:mt-4">
        <p
          className={`font-heading text-2xl font-black ${
            isCurrent ? 'text-brand-amber-strong' : 'text-brand-navy'
          }`}
        >
          {year}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 lg:max-w-[220px]">
          {description}
        </p>
      </div>
    </Reveal>
  );
}
