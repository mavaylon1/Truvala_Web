import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Truvala_Web",
  assetPrefix: "/Truvala_Web/",
};

export default nextConfig;
