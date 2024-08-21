/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.dynamicapproach.dev",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
