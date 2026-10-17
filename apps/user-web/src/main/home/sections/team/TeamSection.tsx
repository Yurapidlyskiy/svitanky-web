import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { TEAM } from './content';
import { TeamMemberCard } from './TeamMemberCard';

export function TeamSection() {
  const t = useTranslations('home.team');

  return (
    <Section aria-label={t('title')} className="pb-16 lg:pb-20" id="team">
      <SectionHeading>{t('title')}</SectionHeading>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {TEAM.map(({ id, photo }) => (
          <TeamMemberCard
            key={id}
            name={t(`members.${id}.name`)}
            photo={photo}
            role={t(`members.${id}.role`)}
          />
        ))}
      </div>
    </Section>
  );
}
