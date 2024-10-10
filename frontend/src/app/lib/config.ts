'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia, localhost, baseSepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = "f2d65ee57b31b15e06607ec98b2d4e4c";

const supportedChains: Chain[] = [sepolia, localhost, baseSepolia];

export const config = getDefaultConfig({
   appName: "WalletConnection",
   projectId,
   chains: supportedChains as any,
  //  ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 });