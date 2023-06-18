import { Text, Box, Button, Heading, HStack, Spacer } from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePageFooter() {
  return (
    <Box
      pos="fixed"
      bottom="0"
      left="0"
      w="100%"
      h={24}
      borderTop="1px"
      borderColor="blackAlpha.300"
      bg="white"
      zIndex="999"
      py={4}
      px={8}
    >
      <HStack spacing={4}>
        <FontAwesomeIcon icon={faXmarkCircle} size="lg" color="red" />
        <Box
          w={16}
          h={16}
          border="1px"
          borderColor="blackAlpha.300"
          rounded={8}
        ></Box>
        <Heading color="blackAlpha.500" size="md" w={48}>
          ユーザを選択
        </Heading>
        <FontAwesomeIcon icon={faXmarkCircle} size="lg" color="red" />
        <Box
          w={16}
          h={16}
          border="1px"
          borderColor="blackAlpha.300"
          rounded={8}
        ></Box>
        <Heading color="blackAlpha.500" size="md" w={48}>
          商品を選択
        </Heading>
        <Spacer />
        <Text size="lg">xxx 円</Text>
        <Button colorScheme="teal">購入</Button>
      </HStack>
    </Box>
  );
}

export { HomePageFooter };
