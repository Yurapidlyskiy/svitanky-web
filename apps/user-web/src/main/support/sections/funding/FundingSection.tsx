import { Section, SectionHeading } from '@/shared/ui';

import { FundingCard } from './FundingCard';

import { FUNDING_ITEMS } from './content';

export function FundingSection() {
  return (
    <Section aria-label="На що підуть твої кошти" className="pb-16 lg:pb-20">
      <SectionHeading size="md" tone="navy">
        На що підуть твої кошти
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        {FUNDING_ITEMS.map((item) => (
          <FundingCard item={item} key={item.title} />
        ))}
      </div>
    </Section>
  );
}
