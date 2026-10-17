import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { PARAGRAPH_KEYS, RAISING_FUNDS } from './content';
import { RaisingFundsCard } from './RaisingFundsCard';

export function RaisingFundsSection() {
  const t = useTranslations('home.raisingFunds');

  return (
    <Section aria-label={t('title')} className="flex flex-col" id="raising-funds">
      <SectionHeading lede={t('lede')}>{t('title')}</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {RAISING_FUNDS.map(({ icon, id }) => (
          <RaisingFundsCard
            answer={t('answer')}
            icon={{ alt: t(`items.${id}.title`), src: icon }}
            key={id}
            paragraphs={PARAGRAPH_KEYS.map((key) => t(`items.${id}.${key}`))}
            question={t('question')}
            title={t(`items.${id}.title`)}
          />
        ))}
      </div>
    </Section>
  );
}
