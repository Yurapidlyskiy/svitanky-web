import { useTranslations } from 'next-intl';

import { IconFeatureCard, SectionHeading } from '@/shared/ui';

import { SUPPORT_RESULTS } from './content';
import { TransparencyBanner } from './TransparencyBanner';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function ProjectsResultsSection() {
  const t = useTranslations('news.projectsResults');

  return (
    <section aria-label={t('title')} className="flex flex-col gap-10">
      <SectionHeading size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORT_RESULTS.map((result) => (
          <IconFeatureCard
            description={t(`items.${result.id}`)}
            icon={result.icon}
            key={result.id}
            tinted
            tone={result.tone}
          />
        ))}
      </div>

      <TransparencyBanner />
    </section>
  );
}
