import createMiddleware from 'next-intl/middleware';

import { routing } from './shared/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except Next.js internals and files with an extension (images, sitemap.xml…).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
