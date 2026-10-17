import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function HeroSection() {
  return (
    <div id="about-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
