import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Section } from '@/shared/ui';

import { CAMP_FAQ_ITEMS, CAMP_FAQ_PHOTO } from './content';
import { FaqAccordionItem } from './FaqAccordionItem';

export function CampFaqSection() {
  const t = useTranslations('news.campFaq');

  return (
    <Section
      aria-label={t('label')}
      className="flex flex-col gap-8 pb-16 pt-4 lg:pb-20"
      width="wide"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {CAMP_FAQ_ITEMS.map((id) => (
            <FaqAccordionItem
              answer={t(`items.${id}.answer`)}
              key={id}
              question={t(`items.${id}.question`)}
            />
          ))}
        </div>

        <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-[28rem]">
          <Image
            alt={t('photoAlt')}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={CAMP_FAQ_PHOTO}
          />
        </div>
      </div>
    </Section>
  );
}
