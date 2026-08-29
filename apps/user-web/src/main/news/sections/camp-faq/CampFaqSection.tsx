import Image from 'next/image';

import { Section } from '@/shared/ui';

import { FaqAccordionItem } from './FaqAccordionItem';

import { CAMP_FAQ_ITEMS, CAMP_FAQ_PHOTO } from './content';

export function CampFaqSection() {
  return (
    <Section
      aria-label="Відповіді на важливі запитання"
      className="flex flex-col gap-8 pb-16 pt-4 lg:pb-20"
      width="wide"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {CAMP_FAQ_ITEMS.map((item) => (
            <FaqAccordionItem answer={item.answer} key={item.question} question={item.question} />
          ))}
        </div>

        <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-[28rem]">
          <Image
            alt={CAMP_FAQ_PHOTO.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={CAMP_FAQ_PHOTO.src}
          />
        </div>
      </div>
    </Section>
  );
}
