import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  h: string;
};

export function TwoColumnLayout({ children, h = "100%" }: Props) {
  return (
    <Container
      display="flex"
      maxW="container.xl"
      p={6}
      gap={12}
      justifyContent="center"
      h={h}
    >
      {children}
    </Container>
  );
}

export function LeftColumn({ children }: { children: ReactNode }) {
  return (
    <Box flex="1" overflowY="auto">
      {children}
    </Box>
  );
}

export function RightColumn({ children }: { children: ReactNode }) {
  return (
    <Box flex="3" overflowY="auto">
      {children}
    </Box>
  );
}
