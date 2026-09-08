import Image from 'next/image';

import { StatsBar } from '@/shared/ui';

import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';

import { HERO_STATS } from './content';

export function DesktopHero() {
  return (
    <section
      aria-label="Про нас"
      className="relative isolate hidden overflow-hidden bg-sand lg:block lg:min-h-[620px]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt=""
          className="object-cover object-[62%_60%]"
          fill
          priority
          sizes="100vw"
          src="/assets/images/about/hero/about-us-bg.png"
        />

        <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/30 via-40% to-transparent to-60%" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-canvas" />
      </div>

      <div className="relative z-10 px-12 pt-28 pb-16 xl:px-20">
        <HeroTitle className="mt-4 max-w-xl text-6xl" />

        <HeroLede className="mt-6 max-w-xl text-lg leading-8 text-slate-700" />

        <div className="mt-10 max-w-2xl">
          <StatsBar stats={HERO_STATS} />
        </div>
      </div>
    </section>
  );
}
