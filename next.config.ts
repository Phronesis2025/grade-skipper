import type { NextConfig } from "next";

const nextConfig = {
  serverExternalPackages: ["some-package"], // Moved from experimental.serverComponentsExternalPackages
};

export default nextConfig;
