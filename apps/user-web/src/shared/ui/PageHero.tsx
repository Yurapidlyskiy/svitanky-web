import { cn } from '@project/common-ui';
import Image, { type StaticImageData } from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

type PageHeroProps = {
  /** Statically imported, so the blur placeholder and the intrinsic size come for free. */
  image: StaticImageData;
  /** `object-position` per layout — the part of the photo that must survive a crop. */
  focus: { mobile: string; desktop: string };
  label?: string;
  id?: string;
  /** Desktop-only layers drawn over the photo (side fades), under the built-in bottom fade. */
  overlay?: ReactNode;
  contentClassName?: string;
  children: ReactNode;
};

/**
 * The full-bleed page header: one photo, two layouts.
 * Mobile — the photo fills what the first screen leaves after the text card, and the
 * card slides over it. Desktop — the photo is the background and the text sits on it.
 * Both fill the first screen, whatever its proportions, so the photo is cropped to the
 * screen around `focus`. A parent may set `--hero-bleed` to push the bottom edge below
 * the fold (the home wave).
 */
export function PageHero({
  image,
  focus,
  label,
  id,
  overlay,
  contentClassName,
  children,
}: PageHeroProps) {
  const style = {
    '--hero-focus': focus.mobile,
    '--hero-focus-lg': focus.desktop,
  } as CSSProperties;

  return (
    <section
      aria-label={label}
      className="relative isolate flex min-h-[calc(100svh-var(--site-header-height))] flex-col bg-canvas lg:min-h-[calc(100svh-var(--site-header-height)+var(--hero-bleed,0px))] lg:flex-row lg:items-center lg:overflow-hidden"
      id={id}
      style={style}
    >
      <div className="sticky top-(--site-header-height) z-0 min-h-[28svh] w-full flex-1 lg:absolute lg:inset-0 lg:-z-10 lg:min-h-0">
        <div className="absolute inset-0 bg-sand">
          <Image
            alt=""
            className="object-cover object-(--hero-focus) lg:object-(--hero-focus-lg)"
            fill
            placeholder="blur"
            preload
            sizes="100vw"
            src={image}
          />

          <div className="hidden lg:block">
            {overlay}

            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-canvas" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'relative z-10 -mt-8 flex flex-col items-center gap-4 rounded-t-[32px] bg-canvas px-6 pt-8 pb-8 text-center',
          'lg:mt-0 lg:w-full lg:items-start lg:gap-0 lg:rounded-none lg:bg-transparent lg:px-12 lg:py-16 lg:text-left xl:px-20',
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
