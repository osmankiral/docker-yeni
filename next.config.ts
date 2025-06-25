import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.secilstore.com",
      },
      {
        protocol: "https",
        hostname: "cdn.secilikart.com",
      },
    ],
  },
};

export default nextConfig;