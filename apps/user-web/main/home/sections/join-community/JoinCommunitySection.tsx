import { Section } from '@/shared/ui';

import { SupportForm } from './SupportForm';

export function JoinCommunitySection() {
  return (
    <Section
      aria-label="Долучайся до Світанків-спільноти"
      className="py-16 lg:py-20"
      id="join-community"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="font-heading text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
            Долучайся до Світанків-спільноти!
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>
              Як справжній друг/подруга Світанків, ти допомагаєш життєстійкості Світанків як
              організації. Саме завдяки твоїй фінансовій підтримці ми можемо створювати нові
              можливості для молоді та втілювати круті проєкти.
            </p>
            <p>
              Стати другом/подругою Світанків легко: підпишись на щомісячні платежі та стань
              частиною нашої спільноти!
            </p>
          </div>
        </div>
        <SupportForm />
      </div>
    </Section>
  );
}
