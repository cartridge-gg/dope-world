import { Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevLeft } from "../Icons";

export const BackButton = () => {
  return (
    <VStack my={6}>
      <Link to="/">
        <Button
          variant="secondary"
          pl={3}
          pr={3}
          color="text.primary"
          textTransform="none"
          fontWeight="normal"
        >
          <ChevLeft />
          <Text>Return to bridge</Text>
        </Button>
      </Link>
    </VStack>
  );
};
