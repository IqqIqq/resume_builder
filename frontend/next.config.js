const withTM = require('next-transpile-modules')(['@ant-design/icons', 'rc-util', 'antd']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL 
          ? `${process.env.API_URL}/:path*`
          : 'http://localhost:8000/api/:path*', // 提供一个默认值
      },
    ]
  },
}

module.exports = withTM(nextConfig);