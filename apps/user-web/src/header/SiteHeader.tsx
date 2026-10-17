import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

import { HeaderActions } from './HeaderActions';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { PrimaryNavigation } from './PrimaryNavigation';

export function SiteHeader() {
  const t = useTranslations('header');

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-canvas/95 backdrop-blur-sm">
      <div className="flex h-full items-center gap-3 px-5 sm:px-8 lg:gap-4 lg:px-12 xl:px-[100px]">
        <Link
          aria-label={t('homeLink')}
          className="group shrink-0 rounded-sm transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          href={ROUTES.home}
        >
          <Image
            alt={t('logoAlt')}
            className="h-auto w-[148px] transition-opacity duration-200 ease-out group-hover:opacity-85 sm:w-[172px]"
            height={323}
            priority
            src="/assets/brand/logos/LogoMainYell&Blue.png"
            width={1121}
          />
        </Link>
        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <PrimaryNavigation />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          <HeaderActions />
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
}
