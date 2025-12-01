import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/repo_search_engine',
  assetPrefix: '/repo_search_engine/',
};

export default nextConfig;
