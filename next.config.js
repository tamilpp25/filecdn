/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${NEXTAUTH_URL}/:path*`,
      },
    ]
  },
};

module.exports = nextConfig;
