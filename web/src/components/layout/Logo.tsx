import { HStack, Link } from "@chakra-ui/react";
import { DojoIcon } from "../Icons";

const Logo = ({ ...props }) => {
  return (
    <Link href="/" _hover={{ textDecoration: "none" }}>
      <HStack {...props} color="cryellow.400">
        <DojoIcon />
      </HStack>
    </Link>
  );
};

export default Logo;
