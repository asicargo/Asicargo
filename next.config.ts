import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "asicargo.local",
      },
    ],
  },
};

export default nextConfig;
