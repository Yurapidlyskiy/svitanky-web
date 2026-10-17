import { useTranslations } from 'next-intl';

import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { TEAM_MEMBERS } from './content';
import { TeamMemberOrb } from './TeamMemberOrb';

export function TeamSection() {
  const t = useTranslations('about.team');

  return (
    <Section aria-label={t('title')} className="pb-24 pt-20 lg:pb-28 lg:pt-24" id="team">
      <SectionHeading lede={t('lede')} tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
        {TEAM_MEMBERS.map((id, index) => (
          <Reveal delayMs={(index % 5) * 90} key={id}>
            <TeamMemberOrb name={t(`members.${id}.name`)} role={t(`members.${id}.role`)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
