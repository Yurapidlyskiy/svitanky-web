import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { TeamMemberOrb } from './TeamMemberOrb';

import { TEAM_LEDE, TEAM_MEMBERS } from './content';

export function TeamSection() {
  return (
    <Section aria-label="Наша команда" className="pb-24 pt-20 lg:pb-28 lg:pt-24" id="team">
      <SectionHeading lede={TEAM_LEDE} tone="navy">
        Наша команда
      </SectionHeading>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
        {TEAM_MEMBERS.map((member, index) => (
          <Reveal delayMs={(index % 5) * 90} key={member.name}>
            <TeamMemberOrb name={member.name} role={member.role} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
