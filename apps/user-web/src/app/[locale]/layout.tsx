import { SiteFooter } from '@/footer';
import { SiteHeader } from '@/header';
import { SITE_URL } from '@/shared/config/site';
import { routing } from '@/shared/i18n/routing';
import { setRouteLocale } from '@/shared/i18n/routeLocale';
import '@/shared/styles/globals.css';
import { ScrollToTopButton } from '@/shared/ui';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Balsamiq_Sans, Nunito } from 'next/font/google';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: '../../shared/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: '../../shared/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});
const balsamiqSans = Balsamiq_Sans({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-balsamiq',
  weight: ['400', '700'],
});
const nunito = Nunito({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-nunito',
  weight: ['800', '900'],
});

// Open Graph wants language_TERRITORY.
const OG_LOCALES: Record<string, string> = { en: 'en_GB', it: 'it_IT', uk: 'uk_UA' };

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const locale = await setRouteLocale(params);
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    openGraph: { locale: OG_LOCALES[locale] ?? locale, siteName: t('name'), type: 'website' },
    title: { default: t('name'), template: `%s — ${t('name')}` },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = await setRouteLocale(params);

  return (
    <html data-scroll-behavior="smooth" lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${balsamiqSans.variable} ${nunito.variable} font-sans antialiased flex min-h-screen flex-col bg-background text-foreground`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <SiteHeader />

          <main className="site-page flex-1 flex flex-col">{children}</main>

          <SiteFooter />

          <ScrollToTopButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
