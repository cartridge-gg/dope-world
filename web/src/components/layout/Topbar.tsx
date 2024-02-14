import { Flex, HStack } from "@chakra-ui/react";

import { useChainId as useEthereumChainId } from "wagmi";

import { ChainSelectorEthereum, ConnectEthereum } from "../web3/ConnectEthereum";
import { ConnectStarknet } from "../web3/ConnectStarknet";

import Logo from "./Logo";
import { Faucet } from "../bridge/Faucet";
import { ValidChainId } from "../../common/types";

const Topbar = ({ isMobile }: { isMobile: boolean }) => {
  const ethereumChainId = useEthereumChainId() as ValidChainId;
  return (
    <Flex w="full" bg="neon.800" minH="60px" px={6} borderBottom="solid 2px" borderColor="border.dark">
      <Flex w="full" justifyContent={isMobile ? "center" : "space-between"}>
        <HStack>
          <Logo mr="6" />
          {!isMobile && (
            <>
              <ChainSelectorEthereum />
              {ethereumChainId !== 1 && <Faucet />}
            </>
          )}
        </HStack>
        {!isMobile && (
          <HStack>
            {/* <HStack mr="6">
            <Link>FAQ</Link>
          </HStack> */}
            <HStack>
              <ConnectEthereum />
              <ConnectStarknet />
            </HStack>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Topbar;
