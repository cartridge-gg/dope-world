import {
  useChainId as useEthereumChainId,
  useAccount as useEthereumAccount,
  useWebSocketPublicClient as useEthereumWebSocketPublicClient,
} from "wagmi";

import { useAccount as useStarknetAccount, useProvider as useStarknetProvider } from "@starknet-react/core";
import { ValidChainId } from "../common/types";

export default function useProviders() {
    const ethereumWebSocketClient = useEthereumWebSocketPublicClient();
    const ethereumChainId = useEthereumChainId() as ValidChainId;
    const ethereumAccount = useEthereumAccount();
  
    const { provider: starknetProvider } = useStarknetProvider();
    const starknetAccount = useStarknetAccount();
  
    return {
      ethereumWebSocketClient,
      ethereumChainId,
      ethereumAccount,
  
      starknetProvider,
      starknetAccount,
    };
  }
  