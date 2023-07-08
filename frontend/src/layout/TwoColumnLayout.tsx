import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type TwoColumnLayoutProps = {
  menu: ReactNode;
  content: ReactNode;
};

function TwoColumnLayout({ menu, content }: TwoColumnLayoutProps) {
  return (
    <Container
      display="flex"
      maxW="container.xl"
      p={6}
      gap={12}
      justifyContent="center"
      w="100%"
      h="calc(100vh - (64px + 96px))"
    >
      <Box
        flex="1"
        h="calc(100vh - (64px + 96px))"
        overflowY="scroll"
        overscroll="contain"
      >
        {menu}
      </Box>
      <Box flex="3" overflowY="scroll" overscroll="contain">
        {content}
      </Box>
    </Container>
  );
}

export { TwoColumnLayout };
