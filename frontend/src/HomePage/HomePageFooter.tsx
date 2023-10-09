import {
  Image,
  Text,
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  AspectRatio,
  useColorModeValue,
  IconButton,
  Center,
  Stack,
} from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, Member } from "types";
import { MemberInformation } from "./Item/MemberInformation/MemberInformation";

function ItemInformation({selectedItem} : {selectedItem: Item | null}) {
  return (
      <Center>
        {selectedItem === null ? (
          <Heading color="blackAlpha.500" size="md">
            商品を選択
          </Heading>
        ) : (
          <Stack>
            <Heading size="md">{selectedItem.name}</Heading>
            <Text>{selectedItem.sellingPrice + " 円"}</Text>
          </Stack>
        )}
      </Center>
  );
}

type HomePageFooterProps = {
  selectedUser: Member | null;
  setSelectedUser: (member: Member | null) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  purchaseItem: () => void;
};

function HomePageFooter({
  selectedUser,
  setSelectedUser,
  selectedItem,
  setSelectedItem,
  purchaseItem,
}: HomePageFooterProps) {
  const bg = useColorModeValue("white", "gray.800");

  function clearUserSelection() {
    setSelectedUser(null);
  }

  function clearItemSelection() {
    setSelectedItem(null);
  }

  return (
    <Box
      pos="fixed"
      bottom="0"
      left="0"
      w="100%"
      h={24}
      borderTop="1px"
      borderColor="blackAlpha.300"
      bg={bg}
      zIndex="999"
      py={4}
      px={8}
    >
      <HStack spacing={4}>
        <IconButton
          variant="unstyled"
          aria-label="利用者選択取り消し"
          icon={
            <FontAwesomeIcon
              icon={faXmarkCircle}
              size="lg"
              color={selectedUser === null ? "gray" : "red"}
            />
          }
          onClick={clearUserSelection}
        />
        <MemberInformation selectedMember={selectedUser} />
        <IconButton
          variant="unstyled"
          aria-label="商品取り消し"
          icon={
            <FontAwesomeIcon
              icon={faXmarkCircle}
              size="lg"
              color={selectedItem === null ? "gray" : "red"}
            />
          }
          onClick={clearItemSelection}
        />
        <AspectRatio
          ratio={1 / 1}
          w={16}
          border="1px"
          borderColor="blackAlpha.300"
          rounded={8}
        >
          <Image objectFit="cover" />
        </AspectRatio>
        <ItemInformation selectedItem={selectedItem} />
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={purchaseItem}
          isDisabled={selectedItem === null || selectedUser === null}
          size="lg"
        >
          購入
        </Button>
      </HStack>
    </Box>
  );
}

export { HomePageFooter };
