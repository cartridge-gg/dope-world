import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
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

export const BridgeFaq = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
  return (
    <Modal motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" p={6} minW="580px" minH="480px" top="40px">
        <ModalBody display="flex" p={0}>
          <VStack w="full" flex="1" display="flex" direction="column" gap={6} justifyContent="space-between">
            <VStack w="full">
              <Heading mb={6}>FAQ</Heading>
              <Accordion w="full" allowToggle>
                {faq.map((i, idx) => {
                  return (
                    <AccordionItem key={idx}>
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
            <Button variant="default" onClick={onClose}>
              CLOSE
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
