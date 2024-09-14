const withTM = require('next-transpile-modules')(['@ant-design/icons', 'rc-util', 'antd', 'rc-pagination']);
const withPlugins = require('next-compose-plugins');

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
          : 'http://localhost:8000/api/:path*',
      },
    ]
  },
  transpilePackages: ['antd', '@ant-design/icons', 'rc-util', 'rc-pagination'],
}

module.exports = withPlugins([withTM], nextConfig);