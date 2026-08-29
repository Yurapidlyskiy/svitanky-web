import { AboutSection } from './sections/about';
import { ActivitiesSection } from './sections/activities';
import { CommunityLifeSection } from './sections/community-life';
import { GallerySection } from './sections/gallery';
import { HeroSection } from './sections/hero';
import { JoinCommunitySection } from './sections/join-community';
import { LocationSection } from './sections/location';
import { RaisingFundsSection } from './sections/raising-funds';
import { TeamSection } from './sections/team';
import { ValuesHighlightsSection } from './sections/values-highlights';
import { ValuesSection } from './sections/values';
import { VideoSection } from './sections/video';

export function HomePage() {
  return (
    <div className="flex flex-col gap-14 bg-canvas [&>*]:relative [&>*]:z-0 lg:gap-16">
      <HeroSection />
      <ValuesHighlightsSection />
      <AboutSection />
      <ValuesSection />
      <LocationSection />
      <ActivitiesSection />
      <GallerySection />
      <RaisingFundsSection />
      <CommunityLifeSection />
      <VideoSection />
      <JoinCommunitySection />
      <TeamSection />
    </div>
  );
}
