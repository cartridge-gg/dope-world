import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Connector, useAccount, useBalance, useConnect, useDisconnect } from "@starknet-react/core";
import { getStarknet } from "get-starknet-core";
import { useEffect, useState } from "react";
import { AccountInterface } from "starknet";
import { useChainId as useEthereumChainId } from "wagmi";
import { BridgeChains } from "../../common/types";
import { frenlyAddress, getExplorerLink } from "../../common/utils";
import { CopiedAddressIcon, CopyAddressIcon, DisconnectIcon, Starknet } from "../Icons";
import { CustomAvatar } from "./EthereumProviders";

export const ConnectStarknet = ({ ...props }) => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { account, address } = useAccount();

  //
  // EFFECT : account change --> disconnect / reconnect
  //

  useEffect(() => {
    const init = async () => {
      const wallets = await getStarknet().getAvailableWallets();
      //
      for (let wallet of wallets) {
        wallet?.on("accountsChanged", () => {
          disconnect();
          connect()
        });
      }
    };
    init();
  }, [account, address]);

  const {
    // isLoading,
    // isError,
    // error,
    data: ethBalance,
  } = useBalance({
    address,
  });

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" {...props}>
        {!account && (
          <Button fontSize="14px" onClick={() => setIsConnectModalOpen(true)} w="full">
            Connect starknet
          </Button>
        )}
        {account && (
          <Button
            fontSize="14px"
            fontFamily="inter"
            onClick={() => setIsAccountModalOpen(true)}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <HStack>
              <Starknet width="20px" height="20px" />
              <Text>{frenlyAddress(account.address || "")}</Text>
              <Text>Ξ{Number(ethBalance?.formatted).toFixed(3)}</Text>
            </HStack>
          </Button>
        )}
      </Box>

      <ConnectModal
        connectors={connectors}
        connect={connect}
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

      {account && (
        <AccountModal
          account={account}
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          disconnect={disconnect}
        />
      )}
    </>
  );
};

const AccountModal = ({
  account,
  isOpen,
  onClose,
  disconnect,
}: {
  account: AccountInterface;
  isOpen: boolean;
  onClose: VoidFunction;
  disconnect: VoidFunction;
}) => {
  const [isCopying, setIsCopying] = useState(false);
  const ethereumChainId = useEthereumChainId();

  const onCopy = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(account?.address);
    setTimeout(() => {
      setIsCopying(false);
    }, 1500);
  };

  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" maxW="360px">
        <ModalBody p={6}>
          <VStack w="full" gap={6}>
            <CustomAvatar />

            <Link
              fontSize="18px"
              fontWeight="bold"
              fontFamily="monospace"
              isExternal
              href={`${getExplorerLink(BridgeChains.Starknet, ethereumChainId, "address", account?.address)}`}
            >
              {frenlyAddress(account?.address || "")}
            </Link>

            <HStack w="full" justifyContent="center">
              <Button
                variant="transparent"
                w="full"
                h="auto"
                border={0}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                onClick={onCopy}
              >
                {isCopying ? (
                  <CopiedAddressIcon width="16px" height="16px" />
                ) : (
                  <CopyAddressIcon width="20px" height="20px" />
                )}
                <Text textAlign="center" textTransform="none" mt={1} fontSize="12px">
                  {isCopying ? "Copied!" : "Copy Address"}
                </Text>
              </Button>
              <Button
                variant="transparent"
                w="full"
                h="auto"
                border={0}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                onClick={() => {
                  disconnect();
                  onClose();
                }}
              >
                <DisconnectIcon width="20px" height="20px" />
                <Text textAlign="center" textTransform="none" mt={1} fontSize="12px">
                  Disconnect
                </Text>
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ConnectModal = ({
  connectors,
  connect,
  isOpen,
  onClose,
}: {
  connectors: Array<Connector>;
  connect: Function;
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark">
        <ModalHeader fontSize="16px" textAlign="center" pb={0}>
          Connect a Wallet
        </ModalHeader>
        <ModalBody p={3}>
          <VStack w="full">
            {connectors.map((connector) => (
              <Button
                w="full"
                fontSize="14px"
                fontFamily="inter"
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  onClose();
                }}
              >
                <HStack>
                  <Image src={connector.icon.dark} width="24px" height="24px" />
                  <Text>{connector.name}</Text>
                </HStack>
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
