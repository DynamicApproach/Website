/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ["readme-typing-svg.demolab.com"],
  },
};

module.exports = nextConfig;
