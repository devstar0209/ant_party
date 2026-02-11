import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack: (config) => {
    // MetaMask SDK optionally imports @react-native-async-storage/async-storage for React Native.
    // In web builds, stub it with an empty implementation.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": path.resolve(
        __dirname,
        "lib/async-storage-stub.js"
      ),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);