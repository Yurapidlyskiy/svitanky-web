import { DonateSection } from './sections/donate';
import { FriendsSection } from './sections/friends';
import { FundingSection } from './sections/funding';
import { HeroSection } from './sections/hero';
import { WhySupportSection } from './sections/why-support';

export function SupportPage() {
  return (
    <>
      <HeroSection />
      <DonateSection />
      <WhySupportSection />
      <FundingSection />
      <FriendsSection />
    </>
  );
}
