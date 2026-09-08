import { DesktopHero } from './DesktopHero';
import { MobileHero } from './MobileHero';

export function HeroSection() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
}
