import { Section } from '@/shared/ui';

import { PerkCard } from './PerkCard';

import { FRIEND_PERKS } from './content';

export function FriendPerksSection() {
  return (
    <Section aria-label="Що отримує Друг Світанків" className="pb-16 lg:pb-20" id="friend-perks">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-brand-sky-mist/50 px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <h2 className="text-center font-heading text-2xl font-black text-brand-navy sm:text-3xl">
          Стаючи Променем, ти стаєш Другом Світанків
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-10 xl:grid-cols-6">
          {FRIEND_PERKS.map((perk) => (
            <PerkCard key={perk.title} perk={perk} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
