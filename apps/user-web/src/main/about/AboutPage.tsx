import { AboutHeroSection } from './sections/hero';
import { JourneySection } from './sections/journey';
import { StorySection } from './sections/story';
import { TeamSection } from './sections/team';

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <JourneySection />
      <StorySection />
      <TeamSection />
    </>
  );
}
