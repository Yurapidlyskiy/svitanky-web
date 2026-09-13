import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroTitle } from './HeroTitle';
import { HeroUnderline } from './HeroUnderline';

import { HERO_IMAGE } from './content';

export function DesktopHero() {
  return (
    <section
      aria-label="Напрямки діяльності"
      className="relative isolate hidden overflow-hidden bg-sand lg:flex lg:h-[max(600px,calc(100dvh_-_var(--site-header-height)))] lg:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt=""
          className="object-cover object-bottom"
          fill
          priority
          sizes="100vw"
          src={HERO_IMAGE}
        />

        <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/25 via-35% to-transparent to-55%" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-canvas" />
      </div>

      <div className="relative z-10 w-full px-12 pb-[5%] xl:px-20">
        <div className="relative w-fit max-w-2xl">
          <HeroTitle className="text-7xl" />

          <HeroLede className="mt-6 max-w-md text-lg leading-8 text-slate-700" />
          <HeroUnderline className="w-[280px] md:w-[330px] h-auto" />
        </div>
      </div>
    </section>
  );
}
