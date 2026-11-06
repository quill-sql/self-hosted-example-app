import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  serverExternalPackages: ["@quillsql/node"],
  webpack: (config, { isServer }) => {
    // @quillsql/node is symlinked from ../quill; serverExternalPackages is
    // ignored for packages whose real path is outside node_modules, so mark
    // it external explicitly.
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals]),
        { "@quillsql/node": "commonjs @quillsql/node" },
      ];
    }
    return config;
  },
};

export default nextConfig;
