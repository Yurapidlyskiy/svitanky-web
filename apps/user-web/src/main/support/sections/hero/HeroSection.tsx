import { useTranslations } from 'next-intl';

import { PageHero } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroActions } from './HeroActions';
import { HeroEyebrow } from './HeroEyebrow';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function HeroSection() {
  const t = useTranslations('support.hero');

  return (
    <PageHero
      contentClassName="lg:-top-12 lg:gap-8 xl:px-[100px]"
      focus={HERO_FOCUS}
      image={HERO_IMAGE}
      label={t('label')}
    >
      <HeroEyebrow />

      <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] lg:w-fit lg:-rotate-2 lg:text-[clamp(2.75rem,8vw,4.75rem)]" />

      <HeroSubtitle className="text-base font-medium leading-snug text-brand-navy lg:max-w-md lg:text-xl lg:text-brand-navy-muted" />

      <HeroActions className="mt-1 flex w-full max-w-xs flex-col gap-3 lg:mt-0 lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:gap-4" />
    </PageHero>
  );
}
