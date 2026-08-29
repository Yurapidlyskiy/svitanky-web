import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function MobileHero() {
  return (
    <section className="relative isolate -mb-14 lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50dvh] w-full">
        <Image
          alt=""
          className="object-cover object-[74%_center]"
          fill
          priority
          sizes="100vw"
          src="/assets/images/home/hero/header_background.png"
        />
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51dvh] flex-col items-center gap-6 rounded-t-[32px] bg-[#FFFDF8] px-6 pb-10 pt-10 text-center">
        <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] leading-[1]" />
        <HeroSubtitle className="text-base font-medium leading-snug text-sky-900" />
        <HeroActions className="mt-1 flex w-full max-w-xs flex-col gap-3" />
      </div>
    </section>
  );
}
