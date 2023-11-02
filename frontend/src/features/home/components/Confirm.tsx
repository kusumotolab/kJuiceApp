import { Box, Button, HStack, Spacer, useToast } from "@chakra-ui/react";
import { useItems } from "contexts/ItemsContext";
import { useMembers, useMembersDispatch } from "contexts/MembersContext";
import { Backend } from "util/Backend";
import ItemInfo from "./ItemInfo";
import MemberInfo from "./MemberInfo";

type Props = {
  selectedMemberId: string;
  clearMemberSelection: () => void;
  selectedItemId: string;
  clearItemSelection: () => void;
};

export default function Confrim({
  selectedMemberId,
  clearMemberSelection,
  selectedItemId,
  clearItemSelection,
}: Props) {
  const members = useMembers();
  const selectedMember = members.find(
    (member) => member.id === selectedMemberId
  );

  const items = useItems();
  const selectedItem = items.find((item) => item.id === selectedItemId);

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

  const dispatch = useMembersDispatch();
  async function purchaseItem() {
    if (selectedMemberId === "" || selectedItemId === "") {
      return;
    }

    if (selectedMember === undefined || selectedItem === undefined) {
      return;
    }

    if (!(await Backend.purchase(selectedMemberId, selectedItemId))) {
      console.error("purchaseItem: failed");
      return;
    }

    dispatch({
      type: "purchased",
      id: selectedMemberId,
      price: selectedItem.sellingPrice,
    });

    clearMemberSelection();
    clearItemSelection();
    showToast();
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
      zIndex="999"
      py={4}
      px={8}
      bg="white"
    >
      <HStack spacing={4}>
        <MemberInfo
          member={selectedMember}
          onClickClearButton={clearMemberSelection}
        />
        <ItemInfo item={selectedItem} onClickClearButton={clearItemSelection} />
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
