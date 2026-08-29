import { PageIntro } from '@/shared/ui';

import { DonateSection } from './sections/donate';
import { FriendsSection } from './sections/friends';
import { FundingSection } from './sections/funding';
import { WhySupportSection } from './sections/why-support';

export function SupportPage() {
  return (
    <>
      <PageIntro
        description="Твоя підтримка допомагає нам планувати табори, зустрічі та розвиток спільноти наперед."
        title="Підтримати"
      />

      <DonateSection />
      <WhySupportSection />
      <FundingSection />
      <FriendsSection />
    </>
  );
}
