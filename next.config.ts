import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["lightningcss"],
  experimental: {
    inlineCss: true,
  },
  typedRoutes: true,
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Turbopack config - GLB files from /public are served as static assets automatically
  turbopack: {},
};

export default nextConfig;
