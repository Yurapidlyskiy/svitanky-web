import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function HeroSection() {
  return (
    <div id="activities-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
