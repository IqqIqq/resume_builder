const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@ant-design/icons', 
  'rc-util', 
  'antd', 
  'rc-pagination', 
  'rc-picker',
  'rc-notification',
  'rc-tooltip'
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    esmExternals: false
  },
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
  transpilePackages: [
    'antd', 
    '@ant-design/icons', 
    'rc-util', 
    'rc-pagination', 
    'rc-picker',
    'rc-notification',
    'rc-tooltip'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@babel/runtime': '@babel/runtime-corejs3',
    };
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      // 只包含没有问题的页面
    }
  },
}

module.exports = withPlugins([withTM], nextConfig);