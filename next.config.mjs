/** @type {import('next').NextConfig} */
const isStaticExport = process.env.EXPORT_STATIC === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export' } : {}),
  ...(basePath ? { basePath } : {}),
  ...(!isStaticExport ? {
    async redirects() {
      return [
        {
          source: '/calculator',
          destination: '/contact',
          permanent: true,
        },
        {
          source: '/en',
          destination: '/?lang=en',
          permanent: false,
        },
        {
          source: '/en/:path*',
          destination: '/:path*?lang=en',
          permanent: false,
        },
        {
          source: '/ar',
          destination: '/?lang=ar',
          permanent: false,
        },
        {
          source: '/ar/:path*',
          destination: '/:path*?lang=ar',
          permanent: false,
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=2592000, stale-while-revalidate=86400',
            },
          ],
        },
        {
          source: '/projects/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=2592000, stale-while-revalidate=86400',
            },
          ],
        },
        {
          source: '/:path*.((?:png|jpg|jpeg|gif|webp|svg|ico))',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=2592000, stale-while-revalidate=86400',
            },
          ],
        },
      ];
    },
  } : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arvinpanjereh.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aparat.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      }
    ],
  },
};

export default nextConfig;
