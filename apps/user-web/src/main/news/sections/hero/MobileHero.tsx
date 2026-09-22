import Image from 'next/image';

import { HeroLede } from './HeroLede';
import { HeroNote } from './HeroNote';
import { HeroTitle } from './HeroTitle';

export function MobileHero() {
  return (
    <section aria-label="Новини" className="relative isolate bg-canvas lg:hidden">
      <div className="sticky top-[var(--site-header-height)] z-0 h-[50svh] w-full">
        <div className="relative h-full w-full bg-sand">
          <Image
            alt=""
            className="object-cover object-[73%_center]"
            fill
            priority
            sizes="100vw"
            src="/assets/images/news/news-page-bg003.png"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 flex min-h-[51svh] flex-col items-center gap-6 rounded-t-[32px] bg-canvas px-6 pb-10 pt-10 text-center">
        <HeroTitle className="text-[clamp(2.5rem,12vw,3.75rem)] leading-[1.05]" />

        <HeroLede className="max-w-md text-base leading-relaxed text-slate-700" />

        <HeroNote className="mt-2" />
      </div>
    </section>
  );
}
