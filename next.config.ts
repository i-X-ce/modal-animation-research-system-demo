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
};

export default nextConfig;
