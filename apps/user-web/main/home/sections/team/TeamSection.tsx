import { Section, SectionHeading } from '@/shared/ui';

import { TeamMemberCard } from './TeamMemberCard';

import { TEAM } from './content';

export function TeamSection() {
  return (
    <Section aria-label="Наша команда" className="pb-16 lg:pb-20" id="team">
      <SectionHeading>Наша команда</SectionHeading>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            photo={member.photo}
            role={member.role}
          />
        ))}
      </div>
    </Section>
  );
}
