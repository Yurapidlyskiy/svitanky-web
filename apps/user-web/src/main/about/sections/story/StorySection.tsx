import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { STORY_BLOCKS } from './content';
import { StoryBlockRow } from './StoryBlockRow';

export function StorySection() {
  const t = useTranslations('about.story');

  return (
    <Section aria-label={t('title')} className="py-20 lg:py-28" id="story" tone="sand">
      <SectionHeading tone="navy">{t('title')}</SectionHeading>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-20 lg:mt-20 lg:gap-28">
        {STORY_BLOCKS.map(({ id, image }, index) => (
          <StoryBlockRow
            body={[t(`blocks.${id}.p1`), t(`blocks.${id}.p2`)]}
            eyebrow={t(`blocks.${id}.eyebrow`)}
            image={{ alt: t(`blocks.${id}.imageAlt`), src: image }}
            key={id}
            reverse={index % 2 === 1}
            title={t(`blocks.${id}.title`)}
          />
        ))}
      </div>
    </Section>
  );
}
