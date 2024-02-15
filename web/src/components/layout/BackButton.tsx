import { HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevLeft } from "../Icons";

export const BackButton = () => {
  return (
    <VStack my={6}>
      <Link to="/">
        <HStack color="text.primary">
          <ChevLeft />
          <Text>Return to bridge</Text>
        </HStack>
      </Link>
    </VStack>
  );
};
