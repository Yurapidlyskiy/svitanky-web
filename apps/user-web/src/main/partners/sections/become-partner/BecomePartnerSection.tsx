import { Section } from '@/shared/ui';

import { PartnerRequestForm } from './PartnerRequestForm';

import { BECOME_PARTNER_LEDE } from './content';

export function BecomePartnerSection() {
  return (
    <Section aria-label="Станьте партнером сьогодні" className="pb-16 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-6">
          <h2 className="font-heading text-4xl font-black uppercase leading-tight text-brand-navy sm:text-5xl lg:text-4xl">
            Станьте партнером
            <br />
            сьогодні
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">{BECOME_PARTNER_LEDE}</p>
        </div>

        <PartnerRequestForm />
      </div>
    </Section>
  );
}
