import {
  Text,
  VStack,
  HStack,
  Link,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import config from "../../config";
import { BridgeChains } from "../../common/types";
import { Ethereum, Starknet } from "../Icons";
import { getExplorerLink } from "../../common/utils";
import useProviders from "../../hooks/useProviders";

export const BridgeDetails = ({
  isOpen,
  onClose,
  ethereumBridge,
  ethereumToken,
  starknetBridge,
  starknetToken,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  ethereumBridge: string;
  ethereumToken: string;
  starknetBridge: string;
  starknetToken: string;
}) => {
  const { ethereumChainId } = useProviders();

  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" p={6} minW="580px" minH="480px" top="-20px">
        <ModalBody p={0}>
          <VStack w="full" display="flex" direction="column" gap={6} justifyContent="space-between">
            <Heading>Bridge details</Heading>
            <VStack w="full" display="flex" direction="column" gap={3}>
              <ChainAddresses
                ethereumChainId={ethereumChainId}
                bridgeChain={BridgeChains.Ethereum}
                bridgeAddress={ethereumBridge}
                tokenAddress={ethereumToken}
                tokenName={config.branding.tokenName}
              />

              <ChainAddresses
                ethereumChainId={ethereumChainId}
                bridgeChain={BridgeChains.Starknet}
                bridgeAddress={starknetBridge}
                tokenAddress={starknetToken}
                tokenName={config.branding.tokenName}
              />
            </VStack>

            <Button variant="default" onClick={onClose}>
              CLOSE
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ChainAddresses = ({
  ethereumChainId,
  bridgeChain,
  bridgeAddress,
  tokenAddress,
  tokenName,
}: {
  ethereumChainId: number;
  bridgeChain: BridgeChains;
  bridgeAddress: string;
  tokenAddress: string;
  tokenName: string;
}) => {
  return (
    <VStack w="full" bg="bg.light" p={3} borderRadius={6} alignItems="flex-start">
      <HStack w="full" borderBottom="solid 2px" borderColor="bg.dark" pb={2} mb={1} fontSize="16px">
        {bridgeChain === BridgeChains.Ethereum && (
          <>
            <Ethereum colored /> <Text>Ethereum</Text>
          </>
        )}
        {bridgeChain === BridgeChains.Starknet && (
          <>
            <Starknet colored /> <Text>Starknet</Text>
          </>
        )}
      </HStack>

      <VStack w="full" alignItems="flex-start" gap={0} mb={1} color="text.secondary">
        <Text fontSize="12px" opacity={0.8}>
          BRIDGE
        </Text>
        <Link
          fontSize="13px"
          isExternal
          href={`${getExplorerLink(bridgeChain, ethereumChainId, "address", bridgeAddress)}`}
        >
          {bridgeAddress}
        </Link>
      </VStack>

      <VStack w="full" alignItems="flex-start" gap={0} color="text.secondary">
        <Text fontSize="12px" opacity={0.8}>
          {tokenName}
        </Text>
        <Link
          fontSize="13px"
          isExternal
          href={`${getExplorerLink(bridgeChain, ethereumChainId, "address", tokenAddress)}`}
        >
          {tokenAddress}
        </Link>
      </VStack>
    </VStack>
  );
};
