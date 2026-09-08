import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroEyebrow } from './HeroEyebrow';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function DesktopHero() {
  return (
    <section
      aria-label="Підтримати Світанки"
      className="relative isolate hidden w-full min-h-[max(600px,var(--hero-image-height))] items-center overflow-hidden bg-canvas [--hero-image-height:calc(100vw*1585/3965)] lg:flex"
    >
      <div className="absolute inset-0 -z-10 bg-sand">
        <Image
          alt=""
          className="object-cover object-right-top"
          fill
          priority
          sizes="100vw"
          src="/assets/images/home/hero/upscale_image_01.png"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="relative -top-12 w-full px-12 py-16 xl:px-[100px]">
        <div className="flex max-w-3xl flex-col gap-8">
          <HeroEyebrow />

          <HeroTitle className="w-fit -rotate-2 text-[clamp(2.75rem,8vw,4.75rem)]" />

          <HeroSubtitle className="max-w-md text-xl font-medium leading-snug text-brand-navy-muted" />

          <HeroActions className="flex flex-wrap gap-4" />
        </div>
      </div>
    </section>
  );
}
