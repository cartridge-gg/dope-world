import { VStack } from "@chakra-ui/react";
import { BackButton } from "../components/layout/BackButton";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";

const faq = [
  {
    question: "What is a Bridge?",
    answer:
      "A decentralized application (dApp) enabling asset transfers between the StarkNet and Ethereum blockchains.",
  },
  {
    question: "Are there fees?",
    answer:
      "Transaction fees apply to cover gas costs and service fees, varying by network congestion and transaction complexity.",
  },
  {
    question: "Transfer Times?",
    answer:
      "Times vary by network congestion and asset type, ranging from a few minutes to longer for Ethereum-bound transfers.",
  },
  {
    question: "Why do I have to wait four hours when bridging from Starknet to Ethereum?",
    answer:
      "The process of sending transactions from Starknet to Ethereum is divided into two stages. A waiting period of several hours is expected between the stages. At the end of the first step, you will be required to sign in order to complete the transfer.",
  },
  {
    question: "What is Paper?",
    answer: "Paper is the ecosystem token for Dope Wars an onchain gaming DAO created in 2021",
  },
  {
    question: "What is Cartridge?",
    answer:
      "Cartridge is a team of blockchain native builders on working to bring onchain games and Autonomous Worlds to life",
  },
  {
    question: "I have a question that is not answered here, who should I talk to?",
    answer:
      "The best way to get in contact with us is to ask a question in the support channel in the Cartridge Discord ",
  },
];

export default function Faq() {
  return (
    <VStack w="full" gap={6} alignItems="flex-start" minHeight="90vh" my={12}>
      <BackButton />

      <Text fontSize="24px" fontWeight="bold">
        Faq
      </Text>

      <VStack w="full">
        <Accordion w="full" allowToggle>
          {faq.map((i, idx) => {
            return (
              <AccordionItem key={idx} borderTop="solid 0px" borderBottom="solid 2px" borderColor="border.default">
                <AccordionButton py={3}>
                  <Box as="span" flex="1" textAlign="left">
                    {i.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={3} mb={3} color="text.secondary">
                  {i.answer}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </VStack>
    </VStack>
  );
}
