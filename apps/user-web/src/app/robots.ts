import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', userAgent: '*' },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
