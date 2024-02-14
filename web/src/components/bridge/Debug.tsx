import { VStack, Text } from "@chakra-ui/react";
import useProviders from "../../hooks/useProviders";

export const Debug = () => {
  const { ethereumAccount, starknetAccount, ethereumChainId } = useProviders();

  return (
    <VStack
      position="absolute"
      opacity={0.25}
      top="60px"
      left="10px"
      zIndex={9}
      borderRadius={8}
      p={2}
      bgColor="bg.light"
      align="flex-start"
    >
      <Text>ethereumChainId : {ethereumChainId}</Text>
      <Text>ethereumAccount : {ethereumAccount.address} connected: {ethereumAccount?.isConnected?.toString()}</Text>
      <Text>starknetAccount : {starknetAccount.address} connected: {starknetAccount?.isConnected?.toString()}</Text>
    </VStack>
  );
};
