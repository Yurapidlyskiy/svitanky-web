import { Section, SectionHeading } from '@/shared/ui';

import { JourneyLine } from './JourneyLine';
import { JourneyNode } from './JourneyNode';

import { JOURNEY_LEDE, JOURNEY_MILESTONES } from './content';

export function JourneySection() {
  return (
    <Section aria-label="Як усе починалося" className="py-20 lg:py-28" id="journey">
      <SectionHeading lede={JOURNEY_LEDE} tone="navy">
        Як усе починалося
      </SectionHeading>

      <div className="relative mx-auto mt-16 flex max-w-5xl flex-col gap-12 lg:mt-24 lg:flex-row lg:gap-6">
        <JourneyLine />

        {JOURNEY_MILESTONES.map((milestone, index) => (
          <JourneyNode delayMs={index * 150} key={milestone.year} {...milestone} />
        ))}
      </div>
    </Section>
  );
}
