import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function PartnersHeroSection() {
  return (
    <div id="partners-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
