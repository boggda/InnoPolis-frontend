import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import chainsConfig from "./chains.json";

// Convert the JSON config to the correct format with proper CHAIN_NAMESPACES
export const chain: { [key: string]: CustomChainConfig } = Object.entries(chainsConfig).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: {
      ...value,
      chainNamespace: CHAIN_NAMESPACES.EIP155, // All configs use EIP155
    },
  }),
  {}
);