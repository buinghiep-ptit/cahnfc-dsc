/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login', //
      },
      {
        source: '/product/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/auth/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // eslint: {
  //   dirs: ['apis', 'components', 'hooks', 'layouts', 'pages', 'store', 'types'],
  // },
}

module.exports = nextConfig
