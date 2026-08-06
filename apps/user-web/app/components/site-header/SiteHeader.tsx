import Image from 'next/image';
import Link from 'next/link';

import { HeaderActions } from './HeaderActions';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { PrimaryNavigation } from './PrimaryNavigation';

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-[#FFFDF8]/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-[100px]">
        <Link
          aria-label="Світанки України — на головну"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          href="/"
        >
          <Image
            alt="Світанки України"
            className="h-auto w-[148px] sm:w-[172px]"
            height={323}
            priority
            src="/assets/brand/logos/LogoMainYell&Blue.png"
            width={1121}
          />
        </Link>
        <PrimaryNavigation />
        <HeaderActions />
        <MobileNavigationMenu />
      </div>
    </header>
  );
}
