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
  useToast,
} from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, Member } from "types";
import { Backend } from "util/Backend";
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

type ConfirmPaneProps = {
  selectedMember: Member | null;
  clearMemberSelection: () => void;
  selectedItem: Item | null;
  clearItemSelection: () => void;
};

function ConfirmPane({
  selectedMember,
  clearMemberSelection,
  selectedItem,
  clearItemSelection,
}: ConfirmPaneProps) {

  const toast = useToast();
  function showToast() {
    toast({
      title: "購入完了",
      description: "購入が完了しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id)))
      console.error("purchaseItem: failed");

    clearMemberSelection();
    clearItemSelection();
    showToast();
  }

  const bg = useColorModeValue("white", "gray.800");
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
              color={selectedMember === null ? "gray" : "red"}
            />
          }
          onClick={clearMemberSelection}
        />
        <MemberInformation selectedMember={selectedMember} />
        <IconButton
          variant="unstyled"
          aria-label="商品選択取り消し"
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
          isDisabled={selectedItem === null || selectedMember === null}
          size="lg"
        >
          購入
        </Button>
      </HStack>
    </Box>
  );
}

export { ConfirmPane };
