import { Section, SectionHeading } from '@/shared/ui';

import { DirectionCard } from './DirectionCard';

import { DIRECTIONS } from './content';

export function DirectionsSection() {
  return (
    <Section
      aria-labelledby="activity-directions-title"
      className="pb-20 pt-4"
      width="wide"
    >
      <SectionHeading
        className="lg:text-5xl"
        id="activity-directions-title"
        size="md"
        tone="navy-muted"
      >
        Три напрями - одна місія
      </SectionHeading>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 sm:mt-14 lg:gap-10">
        {DIRECTIONS.map((direction, index) => (
          <DirectionCard
            key={direction.title}
            {...direction}
            imageSide={index % 2 === 0 ? 'left' : 'right'}
            priority={index === 0}
          />
        ))}
      </div>
    </Section>
  );
}
