import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { CommunityLifeRow } from './CommunityLifeRow';
import { COMMUNITY_LIFE_ROWS } from './content';

export function CommunityLifeSection() {
  const t = useTranslations('home.communityLife');

  return (
    <Section aria-label={t('title')} className="flex flex-col" id="community-life">
      <SectionHeading align="left" size="sm">
        {t('title')}
      </SectionHeading>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
        {COMMUNITY_LIFE_ROWS.map(({ id, image }, index) => (
          <CommunityLifeRow
            image={{ alt: t(`rows.${id}.imageAlt`), src: image }}
            key={id}
            reverse={index % 2 === 1}
            text={t(`rows.${id}.text`)}
          />
        ))}
      </div>
    </Section>
  );
}
