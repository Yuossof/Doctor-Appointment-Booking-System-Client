import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clinic.divstark.com',
      },
    ],
  }
};

export default nextConfig;
