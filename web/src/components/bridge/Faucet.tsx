import { Button } from "@chakra-ui/react";
import config from "../../config";
import {
  useChainId as useEthereumChainId,
  useContractWrite as useEthereumContractWrite,
  useContractRead as useEthereumContractRead,
  Address,
} from "wagmi";
import { Ethereum } from "../Icons";
import { getEthereumBridgeAddress } from "../../common/utils";
import { ValidChainId } from "../../common/types";

export const Faucet = () => {
  const ethereumChainId = useEthereumChainId() as ValidChainId;

  const { data: ethereumTokenAddress } = useEthereumContractRead({
    address: getEthereumBridgeAddress(ethereumChainId),
    abi: config.bridge.l1.abi,
    functionName: "l1Token",
  });

  const { write: faucet, isLoading: isLoadingFaucet } = useEthereumContractWrite({
    address: ethereumTokenAddress as Address,
    abi: config.bridge.l1.tokenAbi,
    functionName: "faucet",
    args: [],
  });

  return (
    <Button
      fontSize={"12px"}
      isLoading={isLoadingFaucet}
      isDisabled={isLoadingFaucet || !ethereumTokenAddress}
      onClick={() => faucet()}
    >
      Mint {config.branding.tokenName} on <Ethereum />
    </Button>
  );
};
