import { Section, SectionHeading } from '@/shared/ui';

import { ValueCard } from './ValueCard';

import { VALUES } from './content';

export function ValuesSection() {
  return (
    <Section aria-label="Наші цінності" className="flex flex-col" id="values">
      <SectionHeading>Наші цінності</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        {VALUES.map((value) => (
          <ValueCard description={value.description} icon={value.icon} key={value.title} title={value.title} />
        ))}
      </div>
    </Section>
  );
}
