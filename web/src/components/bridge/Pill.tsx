import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Pill = ({
  children,
  title = "",
  opacity = 1,
}: {
  children: ReactNode;
  title?: string;
  opacity?: number;
}) => {
  return (
    <Box
      minW="22px"
      minH="22px"
      fontSize="12px"
      fontWeight="bold"
      fontFamily="inter"
      lineHeight="22px"
      borderRadius="100%"
      bg="bg.primary"
      color="text.dark"
      title={title}
      opacity={opacity}
      textAlign="center"
    >
      {children}
    </Box>
  );
};
