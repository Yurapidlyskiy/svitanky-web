import { useTranslations } from 'next-intl';

import { PageHero, StatsBar } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';
import { SunEmblem } from './SunEmblem';
import { useHeroStats } from './useHeroStats';

export function HeroSection() {
  const t = useTranslations('about.hero');
  const stats = useHeroStats();

  return (
    <div id="about-hero">
      <PageHero
        focus={HERO_FOCUS}
        image={HERO_IMAGE}
        label={t('label')}
        overlay={
          <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/30 via-40% to-transparent to-60%" />
        }
      >
        <HeroTitle className="text-[clamp(2rem,8.5vw,2.75rem)] lg:max-w-xl lg:text-6xl" />

        <HeroLede className="text-base leading-relaxed text-slate-700 lg:mt-6 lg:max-w-xl lg:text-lg lg:leading-8" />

        <div className="mt-10 hidden w-full max-w-2xl lg:block">
          <StatsBar stats={stats} />
        </div>
      </PageHero>

      {/* On mobile the stats sit below the first screen, so the photo keeps its room. */}
      <div className="relative bg-canvas px-6 pt-4 pb-10 lg:hidden">
        <StatsBar stats={stats} />
        <SunEmblem className="pointer-events-none absolute top-1 right-4 h-20 w-[62px] opacity-90" />
      </div>
    </div>
  );
}
