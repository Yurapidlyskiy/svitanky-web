import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function AboutHeroSection() {
  return (
    <div id="about-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
