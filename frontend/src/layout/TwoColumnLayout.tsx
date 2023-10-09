import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type TwoColumnLayoutProps = {
  h: string;
  menu: ReactNode;
  children: ReactNode;
};

function TwoColumnLayout({ h, menu, children }: TwoColumnLayoutProps) {
  return (
    <Container
      display="flex"
      maxW="container.xl"
      p={6}
      gap={12}
      justifyContent="center"
      w="100%"
      h={h}
    >
      <Box
        flex="1"
        overflowY="scroll"
        overscroll="contain"
      >
        {menu}
      </Box>
      <Box flex="3" overflowY="scroll" overscroll="contain">
        {children}
      </Box>
    </Container>
  );
}

export { TwoColumnLayout };
