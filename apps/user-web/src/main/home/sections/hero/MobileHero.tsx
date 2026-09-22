import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function MobileHero() {
  return (
    <section className="relative isolate -mb-14 flex min-h-[calc(100svh-var(--site-header-height))] flex-col lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 min-h-[28svh] w-full flex-1">
        <div className="absolute inset-0">
          <Image
            alt=""
            className="object-cover object-[74%_center]"
            fill
            priority
            sizes="100vw"
            src="/assets/images/home/hero/header-bg.png"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex flex-col items-center gap-4 rounded-t-[32px] bg-canvas px-6 pb-8 pt-8 text-center">
        <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] leading-[1]" />
        <HeroSubtitle className="text-base font-medium leading-snug text-brand-navy" />
        <HeroActions className="mt-1 flex w-full max-w-xs flex-col gap-3" />
      </div>
    </section>
  );
}
