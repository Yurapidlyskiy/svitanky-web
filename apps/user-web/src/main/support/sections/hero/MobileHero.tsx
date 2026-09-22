import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroEyebrow } from './HeroEyebrow';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function MobileHero() {
  return (
    <section aria-label="Підтримати Світанки" className="relative isolate bg-canvas lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50svh] w-full">
        <div className="relative h-full w-full bg-sand">
          <Image
            alt=""
            className="object-cover object-[91%_center]"
            fill
            priority
            sizes="100vw"
            src="/assets/images/home/hero/upscale_image_01.png"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51svh] flex-col items-center gap-6 rounded-t-[32px] bg-canvas px-6 pb-10 pt-10 text-center">
        <HeroEyebrow />

        <HeroTitle className="text-[clamp(2.25rem,10vw,3.25rem)] leading-[1.05]" />

        <HeroSubtitle className="text-base font-medium leading-snug text-brand-navy" />

        <HeroActions className="mt-1 flex w-full max-w-xs flex-col gap-3" />
      </div>
    </section>
  );
}
