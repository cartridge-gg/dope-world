import { Container, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import useIsMobile from "../../hooks/useIsMobile";
import Fonts from "../../theme/fonts";
import { Background } from "./Background";
import { DesktopOnly } from "./DesktopOnly";
import Footer from "./Footer";
import Topbar from "./Topbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <Flex w="full" h="full" minH="100vh" flexDirection="column" bg="bg.dark" overflow="hidden">
      <Fonts />
      <Background />
      <Topbar isMobile={isMobile} />
      <Container display="flex" alignItems="center" flex="1" w="full" maxW="4xl" p="6" minH="calc(100vh - 240px)">
        {!isMobile && <>{children}</>}
      </Container>
      <Footer />
      {isMobile && <DesktopOnly />}
    </Flex>
  );
};

export default Layout;
