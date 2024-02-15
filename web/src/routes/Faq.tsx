import { VStack } from "@chakra-ui/react";
import { BackButton } from "../components/layout/BackButton";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text
} from "@chakra-ui/react";

const faq = [
  {
    question: "What is a Bridge?",
    answer: "That's a good question",
  },
  {
    question: "What is Paper Bridge?",
    answer: "That's a good question",
  },
  {
    question: "Bridging from Ethereum to Starknet",
    answer: "That's a good question",
  },
  {
    question: "Bridging from Starknet to Ethereum",
    answer: "That's a good question",
  },
  {
    question: "Why do i have to wait 4h?",
    answer: "That's a good question",
  },
  {
    question: "Who is Cartridge?",
    answer: "That's a good question",
  },
];

export default function Faq() {
  return (
    <VStack w="full" gap={6} alignItems="flex-start" minHeight="100vh" my={12}>
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
