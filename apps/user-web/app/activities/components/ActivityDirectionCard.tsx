import Image from 'next/image';
import Link from 'next/link';

import { DirectionIcon, type DirectionIconName } from './DirectionIcon';

type ActivityDirectionAccent = 'amber' | 'navy' | 'green';
export type ActivityImageFocalPoint = 'center' | 'upper';

type ActivityDirectionCardProps = {
  accent?: ActivityDirectionAccent;
  description: string;
  href: string;
  icon: DirectionIconName;
  image: { src: string; alt: string };
  imageFocalPoint?: ActivityImageFocalPoint;
  imageSide?: 'left' | 'right';
  order: string;
  priority?: boolean;
  title: string;
};

const ACCENT_STYLES: Record<ActivityDirectionAccent, string> = {
  amber: 'bg-amber-400 text-white',
  navy: 'bg-[#1B4D7A] text-white',
  green: 'bg-[#5AA469] text-white',
};

export function ActivityDirectionCard({
  accent = 'navy',
  description,
  href,
  icon,
  image,
  imageFocalPoint = 'center',
  imageSide = 'left',
  order,
  priority = false,
  title,
}: ActivityDirectionCardProps) {
  return (
    <article className="grid overflow-hidden rounded-[28px] bg-white shadow-sm transition-shadow duration-200 ease-out hover:shadow-lg lg:grid-cols-2">
      <div
        className={`relative aspect-[16/9] w-full sm:aspect-[21/9] lg:aspect-auto lg:min-h-[220px] ${
          imageSide === 'right' ? 'lg:order-2' : ''
        }`}
      >
        <Image
          alt={image.alt}
          className={`object-cover ${imageFocalPoint === 'upper' ? 'object-[center_34%]' : 'object-center'}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={image.src}
        />
      </div>

      <div className="relative flex items-center gap-5 overflow-hidden p-6 sm:gap-6 sm:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-heading text-7xl font-black leading-none text-[#FBE7C4] sm:text-8xl lg:text-9xl"
        >
          {order}
        </span>

        <span
          className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl sm:size-16 ${ACCENT_STYLES[accent]}`}
        >
          <DirectionIcon name={icon} />
        </span>

        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="text-xl font-black text-[#004574]">{title}</h3>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">{description}</p>
          <Link
            aria-label={`Детальніше: ${title}`}
            className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-bold text-[#1B4D7A] transition-colors duration-200 ease-out hover:text-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            href={href}
          >
            Детальніше &gt;
          </Link>
        </div>
      </div>
    </article>
  );
}
