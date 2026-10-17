import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function HeroSection() {
  return (
    <div id="partners-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
