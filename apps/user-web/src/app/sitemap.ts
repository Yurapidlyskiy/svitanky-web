import type { MetadataRoute } from 'next';

import { ROUTES } from '@/shared/config/routes';
import { SITE_URL } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
