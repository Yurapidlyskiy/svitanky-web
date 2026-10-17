import type { StatIconName } from '@/shared/ui';

import type { IconFeatureCardTone } from './IconFeatureCard';

/** Untranslated part of a type — its texts are in `partners.partnershipTypes.items.<id>`. */
export type PartnershipType = {
  icon: StatIconName;
  id: 'business' | 'churches' | 'foundations' | 'volunteers';
  tone: IconFeatureCardTone;
};
