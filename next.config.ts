import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude server-side only packages from client bundle
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'mammoth'],
  },
  // Alternative approach: mark packages as external
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'pdf-parse': 'commonjs pdf-parse',
        'mammoth': 'commonjs mammoth',
      });
    }
    return config;
  },
};

export default nextConfig;
