import { useTranslations } from 'next-intl';

import { Section, StatsBar } from '@/shared/ui';

import { IMPACT_STATS } from './content';

export function ImpactSection() {
  const t = useTranslations('partners.impact');

  const stats = IMPACT_STATS.map(({ id, ...stat }) => ({ ...stat, secondary: t(`stats.${id}`) }));

  return (
    <Section aria-label={t('label')} className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-4xl">
        <StatsBar stats={stats} />
      </div>
    </Section>
  );
}
