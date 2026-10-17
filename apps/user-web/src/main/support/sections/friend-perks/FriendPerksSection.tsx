import { useTranslations } from 'next-intl';

import { Section } from '@/shared/ui';

import { FRIEND_PERKS } from './content';
import { PerkCard } from './PerkCard';

export function FriendPerksSection() {
  const t = useTranslations('support.friendPerks');

  return (
    <Section aria-label={t('label')} className="pb-16 lg:pb-20" id="friend-perks">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-brand-sky-mist/50 px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <h2 className="text-center font-heading text-2xl font-black text-brand-navy sm:text-3xl">
          {t('title')}
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-10 xl:grid-cols-6">
          {FRIEND_PERKS.map(({ icon, id }) => (
            <PerkCard
              key={id}
              perk={{
                description: t(`items.${id}.description`),
                icon,
                title: t(`items.${id}.title`),
              }}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
