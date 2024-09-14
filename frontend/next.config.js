const withTM = require('next-transpile-modules')(['@ant-design/icons']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // 指向您的后端 API
      },
    ]
  },
}

module.exports = withTM(nextConfig);