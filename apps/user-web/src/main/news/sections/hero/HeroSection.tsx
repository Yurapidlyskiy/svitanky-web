import { useTranslations } from 'next-intl';

import { PageHero } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

export function HeroSection() {
  const t = useTranslations('news.hero');

  return (
    <PageHero focus={HERO_FOCUS} id="news-hero" image={HERO_IMAGE} label={t('label')}>
      <HeroTitle className="text-[clamp(2.5rem,12vw,3.75rem)] leading-[1.05] lg:text-7xl lg:leading-none" />

      <HeroLede className="max-w-md text-base leading-relaxed text-slate-700 lg:mt-5 lg:text-lg lg:leading-8" />

      <HeroNote className="mt-2 lg:mt-10" />
    </PageHero>
  );
}
