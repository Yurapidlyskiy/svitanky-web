import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';

export function DesktopHero() {
  return (
    <section className="home-hero relative hidden flex-col items-center justify-center overflow-hidden bg-canvas lg:flex">
      <Image
        alt=""
        className="object-cover object-[70%_38%]"
        fill
        priority
        sizes="100vw"
        src="/assets/images/home/hero/header_background.png"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-canvas to-transparent" />

      <div className="relative left-[60px] top-[-30px] z-10 w-full px-5 py-20 sm:px-8 lg:px-12 xl:px-[100px]">
        <div className="flex w-full max-w-[600px] origin-left flex-col gap-6 sm:gap-7 lg:min-h-[300px] lg:scale-110">
          <HeroTitle className="origin-left -rotate-[3deg] text-left text-[clamp(3rem,5vw,4.5rem)] leading-[0.95]" />
          <HeroSubtitle className="max-w-md text-lg font-medium leading-[1.1] text-sky-900 sm:text-xl" />
          <HeroActions className="flex flex-wrap gap-4" />
        </div>
      </div>
    </section>
  );
}
