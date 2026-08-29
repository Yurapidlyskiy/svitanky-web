import { Section, SectionHeading } from '@/shared/ui';

import { ActivityCard } from './ActivityCard';

import { ACTIVITIES } from './content';

export function ActivitiesSection() {
  return (
    <Section aria-label="Напрямки діяльності" className="flex flex-col" id="activities">
      <SectionHeading>Напрямки діяльності</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {ACTIVITIES.map((activity) => (
          <ActivityCard key={activity.title} {...activity} />
        ))}
      </div>
    </Section>
  );
}
