import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  VStack,
  Button,
  HStack,
  Spinner,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import config from "../../config";
import { BridgeChains, BridgeDirection } from "../../common/types";
import { ClockIcon, Ethereum, Starknet } from "../Icons";
import { frenlyAddress, getExplorerLink } from "../../common/utils";
import useProviders from "../../hooks/useProviders";

import * as timeago from "timeago.js";
import { HistoryEvent } from "../../hooks/useHistory";
import { Pill } from "./Pill";
const { format: formatTimestamp } = timeago;

export const BridgeHistory = ({
  isOpen,
  onClose,
  withdraw,
  ethereumEvents,
  starknetEvents,
  isLoading,
  actionCount,
  pendingCount,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  withdraw: Function;
  ethereumEvents: HistoryEvent[];
  starknetEvents: HistoryEvent[];
  isLoading: boolean;
  actionCount: number;
  pendingCount: number;
}) => {
  const { ethereumChainId } = useProviders();

  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" minW="580px" minH="480px" top="-20px" p={1}>
        <ModalBody p={1}>
          <VStack w="full" gap={3} display="flex" direction="column" justifyContent="space-between">
            <Box w="full">
              <Tabs colorScheme="cryellow">
                <TabList>
                  <Tab w="full">
                    <Ethereum />
                    <Text ml={1}>Ethereum</Text>
                  </Tab>
                  <Tab w="full">
                    <Starknet />
                    <Text ml={1}>Starknet</Text>
                    <HStack ml={3}>
                      <>
                        {actionCount > 0 && <Pill title="Claimable">{actionCount}</Pill>}
                        {pendingCount > 0 && (
                          <Pill title="Pending" opacity={0.4}>
                            {pendingCount}
                          </Pill>
                        )}
                      </>
                    </HStack>
                  </Tab>
                </TabList>
                <VStack w="full" maxH="350px" h="350px" overflowY="auto" fontSize="12px">
                  <TabPanels>
                    <TabPanel display="grid" gap={3} p={2} alignItems="flex-start">
                      {!isLoading ? (
                        <>
                          {ethereumEvents.length === 0 && <Text textAlign="center">No recent transactions</Text>}
                          {ethereumEvents.map((e, idx) => {
                            return (
                              <EventItem
                                ethereumChainId={ethereumChainId}
                                direction={e.direction}
                                event={e}
                                key={idx}
                                onClose={onClose}
                                withdraw={() => {}}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Spinner colorScheme="cryellow" alignSelf="center" justifySelf="center" />
                      )}
                    </TabPanel>
                    <TabPanel display="grid" gap={3} p={2} alignItems="flex-start">
                      {!isLoading ? (
                        <>
                          {starknetEvents.length === 0 && <Text textAlign="center">No recent transactions</Text>}
                          {starknetEvents.map((e, idx) => {
                            return (
                              <EventItem
                                ethereumChainId={ethereumChainId}
                                direction={e.direction}
                                event={e}
                                key={idx}
                                onClose={onClose}
                                withdraw={withdraw}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Spinner colorScheme="cryellow" alignSelf="center" justifySelf="center" />
                      )}
                    </TabPanel>
                  </TabPanels>
                </VStack>
              </Tabs>
            </Box>
            <Button variant="default" onClick={onClose}>
              CLOSE
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const EventItem = ({
  ethereumChainId,
  direction,
  event,
  withdraw,
  onClose,
}: {
  ethereumChainId: number;
  direction: BridgeDirection;
  event: HistoryEvent;
  withdraw: Function;
  onClose: VoidFunction;
}) => {
  const [txAcceptedOnL1, setTxAcceptedOnL1] = useState(false);
  const fromChain =
    direction === BridgeDirection.FromEthereumToStarknet ? BridgeChains.Ethereum : BridgeChains.Starknet;

  const toChain =
    event.action === "Withdrawal"
      ? fromChain
      : direction === BridgeDirection.FromStarknetToEthereum
      ? BridgeChains.Ethereum
      : BridgeChains.Starknet;

  const isBridgeEventFromStarknet =
    event.direction === BridgeDirection.FromStarknetToEthereum && event.action === "Bridge";

  useEffect(() => {
    if (event.direction === BridgeDirection.FromStarknetToEthereum) {
      setTxAcceptedOnL1(event.starknetTxStatus === "ACCEPTED_ON_L1");
    }
  }, [event, event.starknetTxStatus]);

  return (
    <VStack w="full" h="100%" gap={1} mb={3} p={3} bg="bg.light" borderRadius={8} color="text.secondary">
      <HStack w="full" mb={2} pb={2} borderBottom="solid 1px" borderColor="bg.dark">
        <Text fontFamily="inter" fontSize="16px" color="text.default">
          {event.action} {event.amount} {config.branding.tokenName}
        </Text>

        <HStack ml="auto" w="auto" gap={1}>
          <ClockIcon />
          <Text fontSize="12px">{formatTimestamp(event.timestamp, "en_US")}</Text>
        </HStack>
      </HStack>

      <HStack w="full" gap={9}>
        {event.recipient !== "" && (
          <VStack align="flex-start" gap={1}>
            <Text fontSize="11px" fontWeight="bold">
              RECIPIENT
            </Text>
            <Link isExternal href={`${getExplorerLink(toChain, ethereumChainId, "address", event.recipient)}`}>
              {frenlyAddress(event.recipient)}
            </Link>
          </VStack>
        )}

        <VStack align="flex-start" gap={1}>
          <Text fontSize="11px" fontWeight="bold">
            TX HASH
          </Text>
          <Link isExternal href={`${getExplorerLink(fromChain, ethereumChainId, "tx", event.hash || "0x0")}`}>
            {frenlyAddress(event.hash || "0x0")}
          </Link>
        </VStack>

        {event.starknetTxStatus && event.starknetTxStatus !== "" && (
          <VStack align="flex-start" gap={1}>
            <Text fontSize="11px" fontWeight="bold">
              STATUS
            </Text>
            <Text>{event.starknetTxStatus.replace("ACCEPTED_ON_", "Accepted on ")}</Text>
          </VStack>
        )}

        {isBridgeEventFromStarknet && (
          <Button
            variant={event.withdrawable ? "primary" : "secondary"}
            p={0}
            px={3}
            fontSize="small"
            ml="auto"
            isDisabled={!event.withdrawable || !txAcceptedOnL1}
            onClick={() => {
              withdraw({
                args: [event.rawAmount, event.recipient, event.hash],
              });

              onClose();
            }}
          >
            {event.withdrawable ? (txAcceptedOnL1 ? "Claim" : "Pending") : "Claimed"}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
