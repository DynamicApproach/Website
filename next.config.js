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
  }, async redirects() {
    return [
      {
        source: "/infoPages/mindmapper",
        destination: "/mindmapper",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
