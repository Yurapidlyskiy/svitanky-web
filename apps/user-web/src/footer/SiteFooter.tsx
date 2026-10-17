import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

import { FooterContacts } from './FooterContacts';
import { FooterLinkColumn } from './FooterLinkColumn';
import { FooterSocials } from './FooterSocials';
import { footerNavigation, legalNavigation } from './navigation';

export function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#36608E]">
      <div className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16 xl:px-[100px]">
        <div className="flex justify-center">
          <Link
            aria-label={t('homeLink')}
            className="rounded-sm transition-opacity duration-200 ease-out hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-amber"
            href={ROUTES.home}
          >
            <Image
              alt={t('logoAlt')}
              className="h-auto w-[180px]"
              height={323}
              src="/assets/brand/logos/LogoMainYell&White.png"
              width={1121}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          <FooterLinkColumn
            links={footerNavigation.map(({ href, labelKey }) => ({
              href,
              label: t(`nav.${labelKey}`),
            }))}
            title={t('navTitle')}
            uppercaseLinks
          />
          {legalNavigation.length > 0 ? (
            <FooterLinkColumn
              links={legalNavigation.map(({ href, labelKey }) => ({
                href,
                label: t(`legal.${labelKey}`),
              }))}
              title={t('legalTitle')}
            />
          ) : null}
          <FooterContacts />
          <FooterSocials />
        </div>
      </div>

      {/* <div className="bg-[#F5C767] px-5 py-2 text-center text-sm font-bold text-brand-navy">
        Авторське право © {new Date().getFullYear()} – «СВІТАНКИ УКРАЇНИ»
      </div> */}
    </footer>
  );
}
