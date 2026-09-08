import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

export function DesktopHero() {
  return (
    <section
      aria-label="Новини"
      className="relative isolate hidden overflow-hidden bg-sand lg:block lg:min-h-[700px]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          alt=""
          className="object-cover object-[58%_60%]"
          fill
          priority
          sizes="100vw"
          src="/assets/images/news/news-page-bg003.png"
        />

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
