import { PerkIcon } from './PerkIcon';

import type { Perk } from './types';

type PerkCardProps = {
  perk: Perk;
};

export function PerkCard({ perk }: PerkCardProps) {
  return (
    <li className="flex flex-col items-center gap-3 rounded-2xl bg-white px-3 py-6 text-center shadow-sm">
      <PerkIcon name={perk.icon} />

      <h3 className="text-sm font-bold text-brand-navy">{perk.title}</h3>

      <p className="text-sm leading-snug text-slate-500">{perk.description}</p>
    </li>
  );
}
