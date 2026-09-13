import { BecomePartnerSection } from './sections/become-partner';
import { HowItWorksSection } from './sections/how-it-works';
import { PartnersHeroSection } from './sections/hero';
import { PartnershipTypesSection } from './sections/partnership-types';
import { TestimonialsSection } from './sections/testimonials';

export function PartnersPage() {
  return (
    <>
      <PartnersHeroSection />

      <PartnershipTypesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BecomePartnerSection />
    </>
  );
}
