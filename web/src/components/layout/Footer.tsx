import { HStack, Text, Link } from "@chakra-ui/react";

import { DiscordIcon, GithubIcon } from "../Icons";

const Footer = () => {
  return (
    <HStack minH="60px" justifyContent={"space-between"} px={6} color="text.accent">
      <HStack width="60px"></HStack>
      <Text fontSize={"small"}>© 2024 Cartridge - All Rigths Reserved </Text>
      <HStack gap={3}>
        <Link href="https://github.com/dojoengine/dojo" target="_blank" _hover={{ color: "cryellow.400" }}>
          <GithubIcon />
        </Link>
        <Link href="https://discord.gg/dojoengine" target="_blank" _hover={{ color: "cryellow.400" }}>
          <DiscordIcon />
        </Link>
      </HStack>
    </HStack>
  );
};

export default Footer;
