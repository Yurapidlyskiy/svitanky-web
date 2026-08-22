/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@project/common-ui"],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ytimg.com",
        },
      ],
    },
  };

  export default nextConfig;