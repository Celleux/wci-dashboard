import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const isDev = process.env.NODE_ENV === "development";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: isDev,
  cacheOnNavigation: true,
  reloadOnOnline: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // API-Football team logos
      { protocol: "https", hostname: "media.api-sports.io" },
      // Polymarket CDN
      { protocol: "https", hostname: "polymarket-upload.s3.amazonaws.com" },
    ],
  },
};

export default withSerwist(nextConfig);
