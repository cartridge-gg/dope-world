import { Button, Flex, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useChainId as useEthereumChainId } from "wagmi";
import { ValidChainId } from "../../common/types";
import { Faucet } from "../bridge/Faucet";
import { ChainSelectorEthereum, ConnectEthereum } from "../web3/ConnectEthereum";
import { ConnectStarknet } from "../web3/ConnectStarknet";
import Logo from "./Logo";

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
            <HStack>
              <HStack mr={9}>
                <NavLink to="/terms">
                  {({ isActive }) => {
                    return (
                      <Button variant="secondary" pl={3} pr={3} opacity={isActive ? 0.5 : 1}>
                        TERMS
                      </Button>
                    );
                  }}
                </NavLink>
                <NavLink to="/faq">
                  {({ isActive }) => {
                    return (
                      <Button variant="secondary" pl={3} pr={3} opacity={isActive ? 0.5 : 1}>
                        FAQ
                      </Button>
                    );
                  }}
                </NavLink>
              </HStack>
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
