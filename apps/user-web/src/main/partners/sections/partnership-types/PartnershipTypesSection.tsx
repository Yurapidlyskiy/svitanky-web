import { IconFeatureCard, Reveal, Section, SectionHeading } from '@/shared/ui';

import { PARTNERSHIP_TYPES } from './content';

export function PartnershipTypesSection() {
  return (
    <Section aria-labelledby="partnership-types-title" className="py-16 lg:py-20">
      <SectionHeading
        id="partnership-types-title"
        lede="Кожна форма партнерства наближає дітей до нового світанку — оберіть свою."
        size="md"
        tone="navy"
      >
        Як ми можемо співпрацювати
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERSHIP_TYPES.map((type, index) => (
          <Reveal className="h-full" delayMs={index * 100} key={type.title}>
            <IconFeatureCard
              description={type.description}
              icon={type.icon}
              title={type.title}
              tone={type.tone}
              tinted
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
