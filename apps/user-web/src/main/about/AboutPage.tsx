import { HeroSection } from './sections/hero';
import { JourneySection } from './sections/journey';
import { StorySection } from './sections/story';
import { TeamSection } from './sections/team';

export function AboutPage() {
  return (
    <>
      <HeroSection />
      <JourneySection />
      <StorySection />
      <TeamSection />
    </>
  );
}
