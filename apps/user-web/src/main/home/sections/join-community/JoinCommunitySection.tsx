import { Section } from '@/shared/ui';

import { JOIN_COMMUNITY_LEDE, JOIN_COMMUNITY_TITLE } from './content';
import { SupportForm } from './SupportForm';

export function JoinCommunitySection() {
  return (
    <Section aria-label={JOIN_COMMUNITY_TITLE} className="py-16 lg:py-20" id="join-community">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="font-heading text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
            {JOIN_COMMUNITY_TITLE}
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            {JOIN_COMMUNITY_LEDE.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <SupportForm />
      </div>
    </Section>
  );
}
