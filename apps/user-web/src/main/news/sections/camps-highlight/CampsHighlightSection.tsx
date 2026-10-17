import { useTranslations } from 'next-intl';

import { SectionHeading, StatsBar } from '@/shared/ui';

import { CampFeatureCard } from './CampFeatureCard';
import { CampsPhotoCollage } from './CampsPhotoCollage';
import { CAMP_FEATURES, CAMP_STATS } from './content';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function CampsHighlightSection() {
  const t = useTranslations('news.campsHighlight');

  const stats = CAMP_STATS.map(({ icon, id, tone }) => ({
    icon,
    primary: t(`stats.${id}.primary`),
    secondary: id === 'since' ? undefined : t(`stats.${id}.secondary`),
    tone,
  }));

  return (
    <section aria-label={t('label')} className="flex flex-col gap-10">
      <StatsBar stats={stats} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading align="left" size="md" tone="navy">
            {t('title')}
          </SectionHeading>

          <CampsPhotoCollage />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAMP_FEATURES.map((id) => (
            <CampFeatureCard
              description={t(`features.${id}.description`)}
              key={id}
              title={t(`features.${id}.title`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
