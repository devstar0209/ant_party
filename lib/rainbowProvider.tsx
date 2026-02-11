"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  AvatarComponent,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { defineChain } from "viem";

export const bsc = /*#__PURE__*/ defineChain({
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: [
        "https://bnb-mainnet.g.alchemy.com/v2/ZcNVcNw7vRrP4YCTgWvSibzIJY2ue5bL",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452,
    },
  },
});

export const bscTestnet = /*#__PURE__*/ defineChain({
  id: 97,
  name: "Binance Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"] },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
      apiUrl: "https://api-testnet.bscscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483,
    },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "d9c46c90f96740613e82b9205a8d64cd",
  chains: [bsc],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const CustomAvatar: AvatarComponent = ({ size }) => {
  return (
    <img
      src="/images/avatar.png"
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  );
};

const queryClient = new QueryClient();
const RainbowProvider = ({ children, locale }: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale={locale}
          modalSize="compact"
          theme={darkTheme()}
          avatar={CustomAvatar}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowProvider;
