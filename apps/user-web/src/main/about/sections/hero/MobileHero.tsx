import Image from 'next/image';

import { StatsBar } from '@/shared/ui';

import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';
import { SunEmblem } from './SunEmblem';

import { HERO_STATS } from './content';

export function MobileHero() {
  return (
    <section aria-label="Про нас" className="relative isolate bg-canvas lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50dvh] w-full">
        <div className="relative h-full w-full bg-sand">
          <Image
            alt=""
            className="object-cover object-[74%_center]"
            fill
            priority
            sizes="100vw"
            src="/assets/images/about/hero/about-us-bg.png"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51dvh] flex-col items-center gap-6 rounded-t-[32px] bg-canvas px-6 pb-10 pt-10 text-center">
        <HeroTitle className="text-[clamp(2rem,8.5vw,2.75rem)]" />

        <HeroLede className="text-base leading-relaxed text-slate-700" />

        <div className="relative mt-2 w-full">
          <StatsBar stats={HERO_STATS} />
          <SunEmblem className="pointer-events-none absolute -top-3 -right-2 h-20 w-[62px] opacity-90" />
        </div>
      </div>
    </section>
  );
}
