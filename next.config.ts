import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1440, 1920, 2048],
  },
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
