import { useTranslations } from 'next-intl';

import { PageHero } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';
import { HeroUnderline } from './HeroUnderline';

export function HeroSection() {
  const t = useTranslations('activities.hero');

  return (
    <PageHero
      contentClassName="lg:pb-[5%]"
      focus={HERO_FOCUS}
      id="activities-hero"
      image={HERO_IMAGE}
      label={t('label')}
      overlay={
        <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/25 via-35% to-transparent to-55%" />
      }
    >
      <HeroTitle className="text-[clamp(2rem,8.5vw,2.75rem)] lg:text-7xl" />

      <HeroLede className="max-w-md text-base leading-relaxed text-slate-700 lg:mt-6 lg:text-lg lg:leading-8" />

      <HeroUnderline className="w-[80%] max-w-[240px] lg:h-auto lg:w-[330px] lg:max-w-none" />
    </PageHero>
  );
}
