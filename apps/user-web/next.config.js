import process from 'node:process';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

const supabaseUrl = process.env.SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/common-ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      // Post images live in the public `post-images` Storage bucket.
      ...(supabaseUrl
        ? [
            {
              protocol: 'https',
              hostname: new URL(supabaseUrl).hostname,
              pathname: '/storage/v1/object/public/**',
            },
          ]
        : []),
    ],
  },
};

export default withNextIntl(nextConfig);
