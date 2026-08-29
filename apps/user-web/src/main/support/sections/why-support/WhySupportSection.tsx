import { IconFeatureCard, Section, SectionHeading } from '@/shared/ui';

import { WHY_SUPPORT_ITEMS } from './content';

export function WhySupportSection() {
  return (
    <Section aria-label="Чому регулярна підтримка змінює життя" className="pb-16 lg:pb-20">
      <SectionHeading size="md" tone="navy">
        Чому регулярна підтримка важлива?
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
        {WHY_SUPPORT_ITEMS.map((item) => (
          <IconFeatureCard
            description={item.description}
            icon={item.icon}
            key={item.title}
            title={item.title}
            tone="amber"
          />
        ))}
      </div>
    </Section>
  );
}
