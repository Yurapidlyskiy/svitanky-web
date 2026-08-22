import { AboutSection } from './sections/about-section/AboutSection';
import { ActivitiesSection } from './sections/activities-section/ActivitiesSection';
import { CommunityLifeSection } from './sections/community-life-section/CommunityLifeSection';
import { GallerySection } from './sections/gallery-section/GallerySection';
import { HeroSection } from './sections/hero-section/HeroSection';
import { JoinCommunitySection } from './sections/join-community-section/JoinCommunitySection';
import { LocationSection } from './sections/location-section/LocationSection';
import { RaisingFundsSection } from './sections/raising-funds-section/RaisingFundsSection';
import { TeamSection } from './sections/team-section/TeamSection';
import { ValuesHighlightsSection } from './sections/values-highlights-section/ValuesHighlightsSection';
import { ValuesSection } from './sections/values-section/ValuesSection';
import { VideoSection } from './sections/video-section/VideoSection';

export function HomeSections() {
  return (
    <div className="flex flex-col gap-14 bg-[#FFFDF8] [&>*]:relative lg:gap-16">
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
