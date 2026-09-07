import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroNotes } from './HeroNotes';
import { HeroTitle } from './HeroTitle';

import { HERO_EYEBROW } from './content';

export function HeroSection() {
  return (
    <section
      aria-label="Підтримати Світанки"
      className="relative isolate flex w-full min-h-[max(520px,var(--hero-image-height))] items-center overflow-hidden bg-canvas [--hero-image-height:calc(100vw*1585/3965)] sm:min-h-[max(560px,var(--hero-image-height))] lg:min-h-[max(600px,var(--hero-image-height))]"
    >
      <div className="absolute inset-0 -z-10 bg-sand">
        <Image
          alt=""
          className="object-cover object-top sm:object-right-top"
          fill
          priority
          sizes="100vw"
          src="/assets/images/home/hero/upscale_image_01.png"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <HeroNotes />

      <div className="relative w-full px-5 py-16 sm:px-8 lg:-top-12 lg:px-12 xl:px-[100px]">
        <div className="flex max-w-xl flex-col gap-6 sm:gap-8 lg:max-w-3xl">
          <p className="w-fit rounded-full bg-brand-amber/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-navy sm:text-sm">
            {HERO_EYEBROW}
          </p>

          <HeroTitle className="w-fit text-[clamp(2.75rem,8vw,4.75rem)] sm:-rotate-2" />

          <p className="max-w-[17rem] text-lg sm:max-w-md font-medium leading-snug text-brand-navy-muted sm:text-xl">
            Маленька регулярна підтримка допомагає нам планувати великі зміни для дітей та молоді.
          </p>

          <HeroActions className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4" />
        </div>
      </div>
    </section>
  );
}
