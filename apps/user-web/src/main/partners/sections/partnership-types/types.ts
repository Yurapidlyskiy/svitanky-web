import type { IconFeatureCardTone, StatIconName } from '@/shared/ui';

/** Untranslated part of a type — its texts are in `partners.partnershipTypes.items.<id>`. */
export type PartnershipType = {
  icon: StatIconName;
  id: 'business' | 'churches' | 'foundations' | 'volunteers';
  tone: IconFeatureCardTone;
};
