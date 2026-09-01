import { Section, SectionHeading } from '@/shared/ui';

import { StoryBlockRow } from './StoryBlockRow';

import { STORY_BLOCKS } from './content';

export function StorySection() {
  return (
    <Section aria-label="Історія Світанків" className="py-20 lg:py-28" id="story" tone="sand">
      <SectionHeading tone="navy">Історія Світанків</SectionHeading>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-20 lg:mt-20 lg:gap-28">
        {STORY_BLOCKS.map((block, index) => (
          <StoryBlockRow key={block.title} {...block} reverse={index % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
