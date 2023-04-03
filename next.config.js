/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/signIn', //
      },
      {
        source: '/register',
        destination: '/auth/register', //
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
