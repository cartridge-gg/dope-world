import { HStack,  StyleProps,  Text } from "@chakra-ui/react";

export const BridgeAlert = ({message, ...props}: {message: string} & StyleProps) => {
  return (
    <HStack w="full" bg="bg.primary" p={2} display="flex" justifyContent="center" {...props}>
      <Text textTransform="uppercase" color="text.dark" fontWeight="bold">
        {message}
      </Text>
    </HStack>
  );
};
