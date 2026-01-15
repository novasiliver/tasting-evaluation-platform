/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co',
      },
      // Allow images from API route
      {
        protocol: 'https',
        hostname: 'tastecert.com',
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tastecert.com',
        pathname: '/api/images/**',
      },
      // Allow localhost for development
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/images/**',
      },
    ],
    unoptimized: false,
  },
  // Allow images from API routes
  async headers() {
    return [
      {
        source: '/api/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

