import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

import { HERO_IMAGE } from './content';

export function DesktopHero() {
  return (
    <section
      aria-label="Партнерам"
      className="relative isolate hidden overflow-hidden bg-sand lg:block lg:min-h-[700px]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt=""
          className="object-cover object-[50%_45%]"
          fill
          priority
          sizes="100vw"
          src={HERO_IMAGE}
        />

        <div className="absolute inset-0 bg-linear-to-r from-sand/60 via-sand/25 via-35% to-transparent to-55%" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-canvas" />
      </div>

      <div className="relative z-10 px-12 pt-28 pb-16 xl:px-20">
        <div className="relative w-fit max-w-2xl">
          <HeroTitle className="mt-4 text-7xl" />

          <HeroLede className="mt-5 max-w-md text-lg leading-8 text-slate-700" />

          <HeroNote className="mt-10" />
        </div>
      </div>
    </section>
  );
}
