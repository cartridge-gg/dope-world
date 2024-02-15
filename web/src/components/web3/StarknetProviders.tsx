import React from "react";

import { goerli, mainnet } from "@starknet-react/chains";
import { StarknetConfig, argent, braavos, publicProvider, useInjectedConnectors, voyager } from "@starknet-react/core";

export function StarknetProviders({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "always",
    // Randomize the order of the connectors.
    //order: "random"
  });


  // TO USE CUSTOM PROVIDER :
  // provider={jsonRpcProvider({
  //   rpc: (chain: Chain) => {
  //     console.log(chain);
  //     return {
  //       nodeUrl: chain.testnet ? "https://rpc.starknet-testnet.lava.build" : "https://rpc.starknet.lava.build",
  //     };
  //   },
  // })}

  return (
    <StarknetConfig
      autoConnect={true}
      chains={[/*devnet,*/ goerli, /*sepolia, */ mainnet]} // seems provider doesnt update when changing chain
      //chains={[/*devnet,*/ goerli, /*sepolia, */ mainnet]} // seems provider doesnt update when changing chain
     provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}

export const getStarknetChainIdFromEthereumChain = (ethereumChain: Partial<{ network: string }>) => {
  switch (ethereumChain.network) {
    case "homestead":
      return "SN_MAIN";

    case "goerli":
      return "SN_GOERLI";

    case "sepolia":
      return "SN_SEPOLIA";

    default:
      return "SN_MAIN";
  }
};
