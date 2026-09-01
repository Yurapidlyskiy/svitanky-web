import { PageIntro } from '@/shared/ui';

import { BecomePartnerSection } from './sections/become-partner';
import { HowItWorksSection } from './sections/how-it-works';
import { PartnershipTypesSection } from './sections/partnership-types';
import { TestimonialsSection } from './sections/testimonials';

export function PartnersPage() {
  return (
    <>
      <PageIntro
        description="Ми віримо, що більше світла для дітей ми даруємо разом. Долучайтеся як фонд, церква, компанія чи волонтер — і станьте частиною історії «Світанків»."
        title="Партнерам"
      />

      <PartnershipTypesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BecomePartnerSection />
    </>
  );
}
