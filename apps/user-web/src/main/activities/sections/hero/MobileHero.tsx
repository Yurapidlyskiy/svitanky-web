import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';
import { HeroUnderline } from './HeroUnderline';

import { HERO_IMAGE } from './content';

export function MobileHero() {
  return (
    <section aria-label="Напрямки діяльності" className="relative isolate bg-canvas lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50svh] w-full">
        <div className="relative h-full w-full bg-sand">
          <Image
            alt=""
            className="object-cover object-[60%_center]"
            fill
            priority
            sizes="100vw"
            src={HERO_IMAGE}
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51svh] flex-col items-center gap-6 rounded-t-[32px] bg-canvas px-6 pb-10 pt-10 text-center">
        <HeroTitle className="text-[clamp(2rem,8.5vw,2.75rem)]" />

        <HeroLede className="max-w-md text-base leading-relaxed text-slate-700" />

        <HeroUnderline className="w-[80%] max-w-[240px] text-brand-amber-strong" />
      </div>
    </section>
  );
}
