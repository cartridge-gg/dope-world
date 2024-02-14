import { HStack, Link } from "@chakra-ui/react";
import { GateWithNameIcon } from "../Icons";

const Logo = ({ ...props }) => {
  return (
    <Link href="/" _hover={{ textDecoration: "none" }}>
      <HStack {...props} color="cryellow.400">
        <GateWithNameIcon />
      </HStack>
    </Link>
  );
};

export default Logo;
