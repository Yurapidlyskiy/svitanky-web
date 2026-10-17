import { useTranslations } from 'next-intl';

import { SectionHeading } from '@/shared/ui';

import { CAMP_DAYS, CAMP_SCHEDULE } from './content';
import { ProgramCard } from './ProgramCard';

/** Rendered inside news-feed's own <Section> shell — see camps-highlight/CampsHighlightSection.tsx. */
export function CampProgramSection() {
  const t = useTranslations('news.campProgram');

  const themes = {
    rows: CAMP_DAYS.map((id, index) => ({
      label: t('themes.day', { day: index + 1 }),
      text: t(`themes.rows.${id}`),
    })),
    title: t('themes.title'),
  };
  const schedule = {
    rows: CAMP_SCHEDULE.map(({ id, time }) => ({ label: time, text: t(`schedule.rows.${id}`) })),
    title: t('schedule.title'),
  };

  return (
    <section aria-label={t('label')} className="flex flex-col gap-8">
      <SectionHeading align="left" size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <ProgramCard list={themes} />
        <ProgramCard list={schedule} />
      </div>
    </section>
  );
}
