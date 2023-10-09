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
} from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, Member } from "types";
import { MemberInformation } from "./Item/MemberInformation/MemberInformation";

type HomePageFooterProps = {
  onOpenPopUp: () => void;
  selectedUser: Member | null;
  setSelectedUser: (member: Member | null) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
};

function HomePageFooter({
  onOpenPopUp,
  selectedUser,
  setSelectedUser,
  selectedItem,
  setSelectedItem,
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
        <FontAwesomeIcon
          icon={faXmarkCircle}
          size="lg"
          color={selectedUser === null ? "blackAlpha.300" : "red"}
          onClick={clearUserSelection}
        />
        <MemberInformation selectedMember={selectedUser} />
        <FontAwesomeIcon
          icon={faXmarkCircle}
          size="lg"
          color={selectedItem === null ? "blackAlpha.300" : "red"}
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
        <Heading
          color={selectedItem === null ? "blackAlpha.500" : "black"}
          size="md"
          w={48}
        >
          {selectedItem === null ? "商品を選択" : selectedItem.name}
        </Heading>
        <Spacer />
        <Text size="lg">
          {selectedItem === null ? "" : selectedItem.sellingPrice + "円"}
        </Text>
        <Button
          colorScheme="teal"
          onClick={onOpenPopUp}
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
