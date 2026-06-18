import type { NextConfig } from "next";

export const isDev = process.env.NODE_ENV === "development";

const repoName = "modal-animation-research-system-demo";

const nextConfig: NextConfig = {
  /* config options here */

  output: "export",

  basePath: isDev ? "" : `/${repoName}`,

  images: {
    unoptimized: true,
  },

  experimental: {
    viewTransition: true,
  },

  compiler: {
    emotion: true,
  },
};

export default nextConfig;
