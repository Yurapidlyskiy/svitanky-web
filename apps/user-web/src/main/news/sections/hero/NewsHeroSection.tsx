import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function NewsHeroSection() {
  return (
    <div id="news-hero">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
