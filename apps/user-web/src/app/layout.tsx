import { SiteFooter } from '@/footer';
import { SiteHeader } from '@/header';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/shared/config/site';
import '@/shared/styles/globals.css';
import { ScrollToTopButton } from '@/shared/ui';
import type { Metadata } from 'next';
import { Balsamiq_Sans, Nunito } from 'next/font/google';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: '../shared/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: '../shared/fonts/GeistMonoVF.woff',
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

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: { locale: 'uk_UA', siteName: SITE_NAME, type: 'website' },
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${balsamiqSans.variable} ${nunito.variable} font-sans antialiased flex min-h-screen flex-col bg-background text-foreground`}
        suppressHydrationWarning
      >
        <SiteHeader />

        <main className="site-page flex-1 flex flex-col">{children}</main>

        <SiteFooter />

        <ScrollToTopButton />
      </body>
    </html>
  );
}
