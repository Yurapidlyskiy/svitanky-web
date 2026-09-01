import { Section, StatsBar } from '@/shared/ui';

import { IMPACT_STATS } from './content';

export function ImpactSection() {
  return (
    <Section aria-label="Наш спільний вплив" className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-4xl">
        <StatsBar stats={IMPACT_STATS} />
      </div>
    </Section>
  );
}
