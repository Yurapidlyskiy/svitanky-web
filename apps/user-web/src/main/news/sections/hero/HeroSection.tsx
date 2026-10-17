import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function HeroSection() {
  return (
    <div id="news-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
