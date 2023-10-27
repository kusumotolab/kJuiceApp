import { Flex, useToast } from "@chakra-ui/react";
import { useItems } from "contexts/ItemsContext";
import { useMembers, useMembersDispatch } from "contexts/MembersContext";
import { useState } from "react";
import { Backend } from "util/Backend";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";

function HomePageParent() {
  const members = useMembers();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const selectedMember = members.find(
    (member) => member.id === selectedMemberId
  );

  const items = useItems();
  const juices = items.filter(
    (item) => item.category === "juice" && item.active
  );
  const foods = items.filter((item) => item.category === "food" && item.active);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedItemId);

  const toast = useToast();
  const dispatch = useMembersDispatch();

  async function purchaseItem() {
    if (selectedMember === undefined || selectedItem === undefined) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id))) {
      showPurchaseErrorToast();
      return;
    }

    dispatch({
      type: "purchased",
      id: selectedMember.id,
      purchase_amount: selectedItem.sellingPrice,
    });

    showPurchaseSuccessToast();

    setSelectedMemberId(null);
  }

  function showPurchaseSuccessToast() {
    toast({
      title: "購入完了",
      description: "購入が完了しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function showPurchaseErrorToast() {
    toast({
      title: "購入失敗",
      description: "購入に失敗しました",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Flex h="calc(100vh - 40px)" overflowX="scroll">
      <MemberPane
        selectedMember={selectedMember}
        handleClickMemberCard={(id: string) => setSelectedMemberId(id)}
        memberList={members}
      />
      <ItemPane
        selectedItem={selectedItem}
        handleClickItemCard={(id: string) => setSelectedItemId(id)}
        selectedMember={selectedMember}
        juiceList={juices}
        foodList={foods}
        purchaseItem={purchaseItem}
      />
    </Flex>
  );
}

export { HomePageParent };
