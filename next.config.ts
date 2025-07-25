// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: "/backoffice",
  assetPrefix: "/backoffice",
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  // เปิด polling ให้ watcher ใน dev mode เท่านั้น
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000, // ตรวจทุก 1 วินาที
      aggregateTimeout: 300, // รอ 300ms ก่อน rebuild
    };
    return config;
  },
};

export default nextConfig;
