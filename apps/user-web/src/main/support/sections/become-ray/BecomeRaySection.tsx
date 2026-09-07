import { Section } from '@/shared/ui';

import { BecomeRayCard } from './BecomeRayCard';
import { RaysCountCard } from './RaysCountCard';

export function BecomeRaySection() {
  return (
    <Section aria-label="Стань Променем" className="py-14 lg:py-20" id="become-ray">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <BecomeRayCard />
        <RaysCountCard />
      </div>
    </Section>
  );
}
