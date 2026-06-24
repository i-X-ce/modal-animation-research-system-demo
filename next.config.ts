import type { NextConfig } from "next";
import { BASE_PATH } from "./consts/userSetting";

export const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */

  output: "export",

  basePath: isDev ? undefined : BASE_PATH,

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
