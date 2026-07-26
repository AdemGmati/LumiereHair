import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhqicoixvyljxslvcxus.supabase.co",
      },
      { hostname: "images.unsplash.com" }
    ],
  },
};

export default nextConfig;
