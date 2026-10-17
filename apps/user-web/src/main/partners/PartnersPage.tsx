import { BecomePartnerSection } from './sections/become-partner';
import { HowItWorksSection } from './sections/how-it-works';
import { HeroSection } from './sections/hero';
import { PartnershipTypesSection } from './sections/partnership-types';
import { TestimonialsSection } from './sections/testimonials';

export function PartnersPage() {
  return (
    <>
      <HeroSection />

      <PartnershipTypesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BecomePartnerSection />
    </>
  );
}
