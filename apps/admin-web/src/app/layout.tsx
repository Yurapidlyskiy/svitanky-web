import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/shared/styles/globals.css';

const geistSans = localFont({
  src: '../shared/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: '../shared/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Світанки України — адмін панель головного сайту',
  description: 'Адміністративна панель «Світанки України»',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex min-h-svh flex-col bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
