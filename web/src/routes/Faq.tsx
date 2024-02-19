import { Heading, VStack } from "@chakra-ui/react";
import { BackButton } from "../components/layout/BackButton";

import { Text } from "@chakra-ui/react";

export default function Faq() {
  return (
    <VStack w="full" gap={6} alignItems="flex-start" minHeight="90vh" my={12}>
      <BackButton />

      <VStack alignItems="flex-start" mb={6}>
        <Text fontSize="24px" fontWeight="bold">
          Faq
        </Text>
      </VStack>

      <VStack w="full" alignItems="flex-start" gap={9}>
        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">What is a Bridge?</Heading>
          <Text color="text.secondary">
            A decentralized application (dApp) enabling asset transfers between the StarkNet and Ethereum blockchains.
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">Are there fees?</Heading>
          <Text color="text.secondary">
            Transaction fees apply to cover gas costs and service fees, varying by network congestion and transaction
            complexity.
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">Transfer Times?</Heading>
          <Text color="text.secondary">
            Times vary by network congestion and asset type, ranging from a few minutes to longer for Ethereum-bound
            transfers.
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">Why do I have to wait four hours when bridging from Starknet to Ethereum?</Heading>
          <Text color="text.secondary">
            The process of sending transactions from Starknet to Ethereum is divided into two stages. <br />
            <br />
            - A waiting period of several hours is expected between the stages. <br />- At the end of the first step,
            you will be required to sign in order to complete the transfer.
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">What is Paper?</Heading>
          <Text color="text.secondary">
            Paper is the ecosystem token for{" "}
            <a href="https://dopewars.gg/" target="_blank" style={{ textDecoration: "underline" }}>
              Dope Wars
            </a>{" "}
            an onchain gaming DAO created in 2021
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">What is Cartridge?</Heading>
          <Text color="text.secondary">
            <a href="https://cartridge.gg/" target="_blank" style={{ textDecoration: "underline" }}>
              Cartridge
            </a>{" "}
            is a team of blockchain native builders on working to bring onchain games and Autonomous Worlds to life
          </Text>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Heading fontSize="18px">I have a question that is not answered here, who should I talk to?</Heading>
          <Text color="text.secondary">
            The best way to get in contact with us is to ask a question in the support channel in the{" "}
            <a href="https://discord.gg/cartridge" target="_blank" style={{ textDecoration: "underline" }}>
              Cartridge Discord
            </a>
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
}
