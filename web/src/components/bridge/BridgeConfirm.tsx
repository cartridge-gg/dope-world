import {
  Button,
  Checkbox,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UseAccountResult } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { PublicClient } from "wagmi";
import { GetAccountResult } from "wagmi/actions";
import { BridgeChains, BridgeDirection } from "../../common/types";
import { formatEtherBalance, getExplorerLink } from "../../common/utils";
import config from "../../config";
import useProviders from "../../hooks/useProviders";
import { AlertIcon, ClockIcon } from "../Icons";

export const BridgeConfirmModal = ({
  direction,
  amount,
  starknetAccount,
  ethereumAccount,
  isOpen,
  onClose,
  onConfirm,
}: {
  direction: BridgeDirection;
  amount: string;
  starknetAccount: UseAccountResult;
  ethereumAccount: GetAccountResult<PublicClient>;
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const { ethereumChainId } = useProviders();

  const fromChain =
    direction === BridgeDirection.FromEthereumToStarknet ? BridgeChains.Ethereum : BridgeChains.Starknet;
  const toChain = direction === BridgeDirection.FromStarknetToEthereum ? BridgeChains.Ethereum : BridgeChains.Starknet;

  const fromAddress = fromChain === BridgeChains.Ethereum ? ethereumAccount.address : starknetAccount.address;
  const toAddress = fromChain === BridgeChains.Starknet ? ethereumAccount.address : starknetAccount.address;

  const timeEstimation = direction === BridgeDirection.FromEthereumToStarknet ? "a few minutes" : "up to 4 hours";

  useEffect(() => {
    setConfirmed(false);
  }, [isOpen]);

  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" p={6} minW="580px" minH="480px" top="40px">
        <ModalBody p={0} px={6}>
          <VStack w="full" gap={4}>
            <Text textAlign="center" fontWeight={"bold"} fontSize="20px">
              Review Transaction
            </Text>
            <HStack
              gap={3}
              color="error.default"
              p={3}
              borderRadius={8}
              borderColor="border.light !important"
              border="solid 1px"
            >
              <AlertIcon />
              <Text>
                Please review this information carefully. Bridging to the wrong address could result in a permanent loss of
                funds!
              </Text>
            </HStack>

            <VStack w="full" gap={3} p={3} borderRadius={8} borderColor="border.light !important" border="solid 1px">
              <VStack w="full" mb={3}>
                <Text>
                  Bridge {formatEtherBalance(Number(amount))} {config.branding.tokenName}
                </Text>

                <HStack fontSize="14px" color="text.primary">
                  <ClockIcon /> <Text>this usually takes {timeEstimation}</Text>
                </HStack>
              </VStack>

              <VStack w="full" opacity={0.5} gap={1}>
                <Text fontSize="14px">From {fromChain}</Text>
                <Link
                  fontSize="small"
                  fontFamily="monospace"
                  isExternal
                  href={`${getExplorerLink(fromChain, ethereumChainId, "address", fromAddress || "0x0")}`}
                >
                  {fromAddress}
                </Link>
              </VStack>

              <VStack w="full" opacity={0.5} gap={1}>
                <Text fontSize="14px"> To {toChain} </Text>
                <Link
                  fontSize="small"
                  fontFamily="monospace"
                  isExternal
                  href={`${getExplorerLink(toChain, ethereumChainId, "address", toAddress || "0x0")}`}
                >
                  {toAddress}
                </Link>
              </VStack>
            </VStack>

            <VStack w="full" p={3} borderRadius={8} bg="bg.light" alignItems="flex-start">
              <Checkbox colorScheme="cryellow" checked={confirmed} onChange={() => setConfirmed(!confirmed)}>
                <Text fontSize="14px">I reviewed the above and it's correct.</Text>
              </Checkbox>
            </VStack>

            <VStack w="full">
              <Button
                variant="primary"
                w="full"
                isDisabled={!confirmed}
                onClick={async () => {
                  onClose();
                  await onConfirm();
                }}
              >
                BRIDGE
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
