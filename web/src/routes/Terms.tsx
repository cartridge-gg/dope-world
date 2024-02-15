import { ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import { BackButton } from "../components/layout/BackButton";

export default function Terms() {
  return (
    <VStack w="full" gap={6} alignItems="flex-start" my={12}>
      
      <BackButton />

      <VStack alignItems="flex-start">
        <Text color="text.secondary">Last Revised: February 15, 2024</Text>
        <Text fontSize="24px" fontWeight="bold">
          Terms of Service
        </Text>
      </VStack>

      <VStack alignItems="flex-start">
        Cartridge Gaming Company ("Cartridge", "we", "our") welcomes you (the "User(s)", or "you") to 
        {window.location.host} (the "Site"), a website that provides information and hosts a user interface (the
        "Interface") to a pair of smart contracts on the Ethereum blockchain and on the Starknet network that
        facilitates your ability to conduct transactions with your ETH and ERC-20 tokens that reside on Layer 1 in a
        gas-efficient manner, via the Starknet Alpha network and its STARK-based computational compression capabilities
        (the "Bridge"). Each User may use the Site, Interface and/or Bridge1 in accordance with, and subject to, the
        terms and conditions hereunder.
      </VStack>

      <OrderedList alignItems="flex-start" spacing={6}>
        <ListItem>Acceptance of the Terms</ListItem>

        <ListItem>
          By entering, connecting to, accessing or using the Site, Interface and/or the Bridge, you acknowledge that you
          have read and understood the following Terms of Service (collectively, the "Terms"), and the terms of
          our Privacy Policy available at https://starknet.io/en/legal-disclaimers#toc-privacy-policy and you agree to
          be bound by them and to comply with all applicable laws and regulations regarding your use of the Site,
          Interface and the Bridge, and you acknowledge that these Terms constitute a binding and enforceable legal
          contract between StarkWare and you. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ENTER, CONNECT TO,
          ACCESS OR USE THE SITE, INTERFACE AND/OR BRIDGE IN ANY MANNER.{" "}
        </ListItem>
        <ListItem>
          The Site, Interface and Bridge are available only to individuals who (a) are at least eighteen (18) years old;
          and (b) possess the legal capacity to enter into these Terms (on behalf of themselves and their organization)
          and to form a binding agreement under any applicable law. You hereby represent that you possess the legal
          authority to enter into these Terms on your and (if applicable) your organization’s behalf and to form a
          binding agreement under any applicable law, to use the Site, Interface and Bridge in accordance with these
          Terms, and to fully perform your obligations hereunder.{" "}
        </ListItem>
        <ListItem>
          By entering, connecting to, accessing or using the Site, Interface and/or the Bridge, you acknowledge that you
          have read and understood the following Terms of Service (collectively, the "Terms"), and the terms of
          our Privacy Policy available at https://starknet.io/en/legal-disclaimers#toc-privacy-policy and you agree to
          be bound by them and to comply with all applicable laws and regulations regarding your use of the Site,
          Interface and the Bridge, and you acknowledge that these Terms constitute a binding and enforceable legal
          contract between StarkWare and you. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ENTER, CONNECT TO,
          ACCESS OR USE THE SITE, INTERFACE AND/OR BRIDGE IN ANY MANNER.{" "}
        </ListItem>
        <ListItem>
          The Site, Interface and Bridge are available only to individuals who (a) are at least eighteen (18) years old;
          and (b) possess the legal capacity to enter into these Terms (on behalf of themselves and their organization)
          and to form a binding agreement under any applicable law. You hereby represent that you possess the legal
          authority to enter into these Terms on your and (if applicable) your organization’s behalf and to form a
          binding agreement under any applicable law, to use the Site, Interface and Bridge in accordance with these
          Terms, and to fully perform your obligations hereunder.{" "}
        </ListItem>
        <ListItem>
          By entering, connecting to, accessing or using the Site, Interface and/or the Bridge, you acknowledge that you
          have read and understood the following Terms of Service (collectively, the "Terms"), and the terms of
          our Privacy Policy available at https://starknet.io/en/legal-disclaimers#toc-privacy-policy and you agree to
          be bound by them and to comply with all applicable laws and regulations regarding your use of the Site,
          Interface and the Bridge, and you acknowledge that these Terms constitute a binding and enforceable legal
          contract between StarkWare and you. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ENTER, CONNECT TO,
          ACCESS OR USE THE SITE, INTERFACE AND/OR BRIDGE IN ANY MANNER.{" "}
        </ListItem>
        <ListItem>
          The Site, Interface and Bridge are available only to individuals who (a) are at least eighteen (18) years old;
          and (b) possess the legal capacity to enter into these Terms (on behalf of themselves and their organization)
          and to form a binding agreement under any applicable law. You hereby represent that you possess the legal
          authority to enter into these Terms on your and (if applicable) your organization’s behalf and to form a
          binding agreement under any applicable law, to use the Site, Interface and Bridge in accordance with these
          Terms, and to fully perform your obligations hereunder.{" "}
        </ListItem>
      </OrderedList>
    </VStack>
  );
}
