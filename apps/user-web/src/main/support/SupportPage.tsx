import { BecomeRaySection } from './sections/become-ray';
import { FriendPerksSection } from './sections/friend-perks';
import { FundingSection } from './sections/funding';
import { HeroSection } from './sections/hero';

export function SupportPage() {
  return (
    <>
      <HeroSection />
      <BecomeRaySection />
      <FriendPerksSection />
      <FundingSection />
    </>
  );
}
