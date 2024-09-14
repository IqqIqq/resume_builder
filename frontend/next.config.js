const withTM = require('next-transpile-modules')(['@ant-design/icons', 'rc-util', 'antd']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/:path*', // 使用环境变量
      },
    ]
  },
}

module.exports = withTM(nextConfig);