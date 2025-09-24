import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude server-side only packages from client bundle
  serverExternalPackages: ['pdf-parse', 'mammoth'],
};

export default nextConfig;
