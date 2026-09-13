import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function ActivitiesHeroSection() {
  return (
    <div id="activities-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
