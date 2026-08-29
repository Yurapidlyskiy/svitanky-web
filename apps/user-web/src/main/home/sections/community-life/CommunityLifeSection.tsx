import { Section, SectionHeading } from '@/shared/ui';

import { CommunityLifeRow } from './CommunityLifeRow';

import { COMMUNITY_LIFE_ROWS } from './content';

export function CommunityLifeSection() {
  return (
    <Section
      aria-label="Ми створюємо не просто прихисток, а дім"
      className="flex flex-col"
      id="community-life"
    >
      <SectionHeading align="left" size="sm">
        Ми створюємо не просто прихисток, а дім
      </SectionHeading>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
        {COMMUNITY_LIFE_ROWS.map((row, index) => (
          <CommunityLifeRow image={row.image} key={row.text} reverse={index % 2 === 1} text={row.text} />
        ))}
      </div>
    </Section>
  );
}
