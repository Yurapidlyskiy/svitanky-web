import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/shared/i18n/navigation';

import { TRANSPARENCY_PHOTO } from './content';

export function TransparencyBanner() {
  const t = useTranslations('news.projectsResults.transparency');

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm sm:flex-row">
      <div className="flex flex-col justify-center gap-4 bg-brand-navy p-8 text-white sm:w-2/5 sm:p-10">
        <h3 className="font-heading text-2xl font-black uppercase sm:text-3xl">{t('title')}</h3>

        <p className="text-sm leading-relaxed text-white/90 sm:text-base">{t('text')}</p>

        <Link
          className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 active:scale-95"
          href="/news?category=reports"
        >
          {t('cta')} <span aria-hidden="true">›</span>
        </Link>
      </div>

      <div className="relative h-48 w-full sm:h-auto sm:flex-1">
        <Image
          alt={t('photoAlt')}
          className="object-cover"
          fill
          sizes="(min-width: 640px) 60vw, 100vw"
          src={TRANSPARENCY_PHOTO}
        />
      </div>
    </div>
  );
}
