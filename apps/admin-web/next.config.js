import process from 'node:process';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/common-ui'],
  images: {
    // Post images live in the public `post-images` Storage bucket.
    remotePatterns: supabaseUrl
      ? [
          {
            protocol: 'https',
            hostname: new URL(supabaseUrl).hostname,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
  experimental: {
    serverActions: {
      // A 5 MB post image plus the text fields. Keep in step with IMAGE_MAX_BYTES.
      bodySizeLimit: '6mb',
    },
  },
};

export default nextConfig;
