import Image from 'next/image';

import { HeroActions } from './HeroActions';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroTitle } from './HeroTitle';
import { HeroWave } from './HeroWave';

export function DesktopHero() {
  return (
    <section className="home-hero relative hidden flex-col items-center justify-center overflow-hidden bg-canvas lg:flex">
      <div className="absolute inset-x-0 -top-[20%] bottom-0 z-0">
        <Image
          alt=""
          className="object-cover object-[75%_50%]"
          fill
          priority
          sizes="100vw"
          src="/assets/images/home/hero/header-bg.png"
        />
      </div>

      <HeroWave />

      <div className="relative left-[60px] top-[-30px] z-10 w-full px-5 py-20 sm:px-8 lg:px-12 xl:px-[100px]">
        <div className="relative flex w-full max-w-[600px] origin-left flex-col gap-6 sm:gap-7 lg:min-h-[300px] lg:scale-110">
          <div className="pointer-events-none absolute left-[180px] top-1/2 -z-10 size-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas/90 blur-[100px]" />
          <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
            <HeroTitle className="origin-left -rotate-[3deg] text-left text-[4.5rem] leading-[0.95]" />
            <HeroSubtitle className="max-w-md text-lg font-medium leading-[1.1] text-sky-900 sm:text-xl" />
            <HeroActions className="flex flex-wrap gap-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
