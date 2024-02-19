import {
  Card,
  CardBody,
  HStack,
  Input,
  Text,
  // InputGroup,
  // InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { formatEther } from "viem";

import { BridgeChains, BridgeSide } from "../../common/types";
import { formatBalance } from "../../common/utils";

type TokenProps = {
  bridgeSide: BridgeSide;
  bridgeChain: BridgeChains;
  chainIcon: ReactNode;
  tokenBalance: bigint;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  isConnected: boolean | undefined;
};

export const Token = ({
  bridgeSide,
  bridgeChain,
  chainIcon,
  tokenBalance,
  amount,
  setAmount,
  isConnected,
}: TokenProps) => {
  return (
    <Card w="full" minH="100px" bg="bg.dark">
      <CardBody>
        <VStack w="full">
          <Text
            color="text.secondary"
            fontWeight="bold"
            mr="auto"
            userSelect="none"
            mb={2}
            px={1}
            border="solid 1px"
            borderColor="bg.light"
            borderRadius={4}
          >
            {bridgeSide}
          </Text>
          <HStack w="full" justifyContent="space-between" alignItems="flex-end" userSelect="none">
            <HStack>
              {chainIcon}
              <Text fontSize="18px">{bridgeChain}</Text>
            </HStack>
            <VStack
              gap="0"
              fontSize="xs"
              fontWeight="bold"
              alignItems="flex-end"
              cursor={bridgeSide === BridgeSide.From ? "pointer" : "default"}
              onClick={() => {
                if (bridgeSide === BridgeSide.From) {
                  setAmount(formatEther(tokenBalance || 0n));
                }
              }}
            >
              <Text color="text.accent" fontSize="11px" fontWeight="bold">
                AVAILABLE
              </Text>

              <Text color={tokenBalance>0 ? "text.primary" : "text.secondary"} fontSize="11px" fontWeight="bold">
                {isConnected ? formatBalance(tokenBalance || 0n) : "---"}
              </Text>
            </VStack>
          </HStack>

          {bridgeSide === BridgeSide.From && (
            // <InputGroup w="full">
            <Input
              type="number"
              // pr={28}
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(e.target.value.replace(",", "."))}
            />
            //   <InputRightElement top="2px" right="2px" bottom="2px" h="auto" w={24} bg="neon.800">
            //     <Text userSelect={"none"}>{tokenName}</Text>
            //   </InputRightElement>
            // </InputGroup>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};
