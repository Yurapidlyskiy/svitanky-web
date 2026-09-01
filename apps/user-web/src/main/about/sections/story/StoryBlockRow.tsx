import Image from 'next/image';

import { Reveal } from '@/shared/ui';

import type { StoryBlock } from './content';

type StoryBlockRowProps = StoryBlock & {
  reverse?: boolean;
};

export function StoryBlockRow({
  body,
  eyebrow,
  image,
  reverse = false,
  title,
}: StoryBlockRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={reverse ? 'lg:order-2' : ''}>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">{eyebrow}</p>

        <h3 className="mt-3 font-heading text-2xl font-black text-brand-navy sm:text-3xl">
          {title}
        </h3>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal
        className={`relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-sm ${reverse ? 'lg:order-1' : ''}`}
        delayMs={150}
      >
        <Image
          alt={image.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          src={image.src}
        />
      </Reveal>
    </div>
  );
}
