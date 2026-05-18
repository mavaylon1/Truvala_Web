import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No basePath or assetPrefix — site is served from root via custom domain truvala.ai
};

export default nextConfig;
