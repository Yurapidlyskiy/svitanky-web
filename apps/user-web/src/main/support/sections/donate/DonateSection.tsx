import { Section } from '@/shared/ui';

import { DonationForm } from './DonationForm';

export function DonateSection() {
  return (
    <Section aria-label="Форма підтримки" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <DonationForm />
      </div>
    </Section>
  );
}
