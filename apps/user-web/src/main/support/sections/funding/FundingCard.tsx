import Image from 'next/image';

import { StatIcon } from '@/shared/ui';

import type { FundingItem } from './types';

const ACCENT_CLASS: Record<FundingItem['accent'], string> = {
  amber: 'bg-amber-400',
  green: 'bg-brand-green',
  navy: 'bg-brand-navy-muted',
};

type FundingCardProps = {
  item: FundingItem;
};

export function FundingCard({ item }: FundingCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative aspect-[16/10] w-full">
        <Image
          alt={item.image.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={item.image.src}
        />
      </div>

      <div className="flex items-start gap-4 p-6">
        <span
          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-white ${ACCENT_CLASS[item.accent]}`}
        >
          <StatIcon name={item.icon} />
        </span>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-black text-brand-navy">{item.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
        </div>
      </div>
    </article>
  );
}
