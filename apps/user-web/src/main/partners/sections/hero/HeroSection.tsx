import { useTranslations } from 'next-intl';

import { PageHero } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

export function HeroSection() {
  const t = useTranslations('partners.hero');

  return (
    <PageHero
      focus={HERO_FOCUS}
      id="partners-hero"
      image={HERO_IMAGE}
      label={t('label')}
      overlay={
        <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/25 via-35% to-transparent to-55%" />
      }
    >
      <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] lg:text-7xl" />

      <HeroLede className="max-w-md text-base leading-relaxed text-slate-700 lg:mt-5 lg:text-lg lg:leading-8" />

      <HeroNote className="mt-2 lg:mt-10" />
    </PageHero>
  );
}
