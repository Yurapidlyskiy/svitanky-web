import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

import { HERO_IMAGE } from './content';

export function MobileHero() {
  return (
    <section aria-label="Партнерам" className="relative isolate bg-canvas lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50dvh] w-full">
        <div className="relative h-full w-full bg-sand">
          <Image
            alt=""
            className="object-cover object-[62%_45%]"
            fill
            priority
            sizes="100vw"
            src={HERO_IMAGE}
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51dvh] flex-col items-center gap-6 rounded-t-[32px] bg-canvas px-6 pb-10 pt-10 text-center">
        <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)]" />

        <HeroLede className="max-w-md text-base leading-relaxed text-slate-700" />

        <HeroNote className="mt-2" />
      </div>
    </section>
  );
}
