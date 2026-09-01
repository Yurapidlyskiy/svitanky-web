import { StatsBar } from '@/shared/ui';

import { SunEmblem } from './SunEmblem';

import { HERO_EYEBROW, HERO_LEDE, HERO_STATS, HERO_TITLE } from './content';

export function AboutHeroSection() {
  return (
    <section
      aria-label="Про нас"
      className="relative isolate overflow-hidden bg-linear-to-b from-sand via-canvas to-canvas"
      id="about-hero"
    >
      <SunEmblem className="pointer-events-none absolute -z-10 right-20 top-10 hidden h-[730px] w-[560px] opacity-90 lg:block" />

      <div className="relative z-10 px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pb-12 lg:pt-32 xl:px-[12vw]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
          {HERO_EYEBROW}
        </p>

        <h1 className="mt-4 max-w-2xl font-heading text-4xl font-black leading-[1.05] text-brand-navy sm:text-5xl lg:max-w-xl lg:text-6xl">
          {HERO_TITLE}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">{HERO_LEDE}</p>

        <div className="relative mt-10 max-w-2xl">
          <StatsBar stats={HERO_STATS} />
          <SunEmblem className="pointer-events-none absolute -right-4 -top-4 h-20 w-[62px] opacity-90 sm:-right-6 sm:-top-6 sm:h-28 sm:w-[86px] lg:hidden" />
        </div>
      </div>
    </section>
  );
}
