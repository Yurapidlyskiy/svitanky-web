import Image from 'next/image';
import Link from 'next/link';

import { HeaderActions } from './HeaderActions';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { PrimaryNavigation } from './PrimaryNavigation';

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-canvas/95 backdrop-blur-sm">
      <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-[100px]">
        <Link
          aria-label="Світанки України — на головну"
          className="group shrink-0 rounded-sm transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          href="/"
        >
          <Image
            alt="Світанки України"
            className="h-auto w-[148px] transition-opacity duration-200 ease-out group-hover:opacity-85 sm:w-[172px]"
            height={323}
            priority
            src="/assets/brand/logos/LogoMainYell&Blue.png"
            width={1121}
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center lg:flex">
          <div className="pointer-events-auto">
            <PrimaryNavigation />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HeaderActions />
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
}
