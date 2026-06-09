import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estatico — v0 e demo navegavel sem backend.
  // Desabilita API routes, headers/redirects/rewrites em runtime e Image Optimization.
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
