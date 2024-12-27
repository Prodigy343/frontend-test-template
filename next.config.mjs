/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/game-images/**',
      },
    ],
  },
  "plugins": ["jest"],
  "extends": ["plugin:jest/recommended"],
};

export default nextConfig;
