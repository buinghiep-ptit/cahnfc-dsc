/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // eslint: {
  //   dirs: ['apis', 'components', 'hooks', 'layouts', 'pages', 'store', 'types'],
  // },
}

module.exports = nextConfig
