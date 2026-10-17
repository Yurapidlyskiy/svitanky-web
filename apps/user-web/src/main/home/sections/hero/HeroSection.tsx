import { PageHero } from '@/shared/ui';

import { HERO_FOCUS, HERO_IMAGE } from './content';
import { HeroActions } from './HeroActions';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';
import { HeroWave } from './HeroWave';

export function HeroSection() {
  return (
    // Mobile: the card runs under the next section, closing the page gap.
    // Desktop: the wave starts below the fold, so the first screen is all photo.
    <div className="-mb-14 lg:mb-0 lg:[--hero-bleed:7rem]">
      <PageHero
        contentClassName="lg:left-[60px] lg:-top-[30px] lg:py-20 xl:px-[100px]"
        focus={HERO_FOCUS}
        image={HERO_IMAGE}
        overlay={<HeroWave />}
      >
        <div className="relative w-full lg:flex lg:min-h-[300px] lg:max-w-[600px] lg:origin-left lg:flex-col lg:scale-110">
          <div className="pointer-events-none absolute top-1/2 left-[180px] -z-10 hidden size-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas/90 blur-[100px] lg:block" />

          <div className="relative z-10 flex flex-col items-center gap-4 lg:items-start lg:gap-7">
            <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] leading-[1] lg:origin-left lg:-rotate-[3deg] lg:text-left lg:text-[4.5rem] lg:leading-[0.95]" />
            <HeroSubtitle className="text-base font-medium leading-snug text-brand-navy lg:max-w-md lg:text-xl lg:leading-[1.1] lg:text-sky-900" />
            <HeroActions className="mt-1 flex w-full max-w-xs flex-col gap-3 lg:mt-0 lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:gap-4" />
          </div>
        </div>
      </PageHero>
    </div>
  );
}
