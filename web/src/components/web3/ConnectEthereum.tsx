import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Ethereum } from "../Icons";
import config from "../../config";

export const ConnectEthereum = ({ ...props }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <Box display="flex" alignItems="center" justifyContent="center" {...props}>
            {(() => {
              if (!connected) {
                return (
                   
                    <Button onClick={openConnectModal} w="full" fontSize="14px" fontFamily="inter" >
                    Connect Ethereum
                  </Button>
                );
              }

              return (
                <HStack w="full">
                  <Button
                    onClick={openAccountModal}
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="14px"
                    fontFamily="inter"
                  >
                    <HStack>
                      <Ethereum width="20px" height="20px" />
                      <Text>{account.displayName.replace("…", "...")}</Text>
                      <Text>Ξ{account.displayBalance ? `${account.displayBalance.replace("ETH", "")}` : ""}</Text>
                    </HStack>
                  </Button>
                </HStack>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const ChainSelectorEthereum = ({ ...props }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) return null;

        return (
          <Box display="flex" alignItems="center" justifyContent="center" {...props}>
            {(() => {
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} w="full" color="error.default" borderColor="error.default">
                    Wrong network
                  </Button>
                );
              }
              if (config.chains.length === 1) return null;

              return (
                <HStack w="full">
                  <Button onClick={openChainModal} fontSize="12px" style={{ display: "flex", alignItems: "center" }}>
                    {/* {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )} */}
                    {chain.name}
                  </Button>
                </HStack>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
