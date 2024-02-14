import { Box, Text, VStack } from "@chakra-ui/react";
import { LaptopIcon } from "../Icons";

export const DesktopOnly = () => {
  return (
    <Box
      zIndex={99}
      position="absolute"
      top="60px"
      left={0}
      right={0}
      bottom="60px"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.dark"
    >
      <VStack>
        <LaptopIcon />
        <Text>Paper Bridge is desktop only</Text>
      </VStack>
    </Box>
  );
};
