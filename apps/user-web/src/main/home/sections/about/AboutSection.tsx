import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { AboutImageSlider } from './AboutImageSlider';

export function AboutSection() {
  const t = useTranslations('home.about');

  return (
    <Section className="flex flex-col overflow-x-clip" id="about">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:-translate-x-16 xl:gap-28">
        <div className="max-w-xl">
          <SectionHeading align="left">{t('title')}</SectionHeading>
          <div className="mt-7 space-y-7 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
        </div>
        <AboutImageSlider />
      </div>
    </Section>
  );
}
