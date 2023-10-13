import { Flex, useToast } from "@chakra-ui/react";
import { useItems } from "contexts/ItemsContext";
import { useMembers } from "contexts/MembersContext";
import { useState } from "react";
import { Item, Member } from "types";
import { Backend } from "util/Backend";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";

function HomePageParent() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const toast = useToast();

  const members = useMembers();
  const items = useItems();

  const juices = items.filter((item) => item.category === "juice" && item.active);
  const foods = items.filter((item) => item.category === "food" && item.active);

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    setSelectedMember(null);

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id))) {
      showPurchaseErrorToast();
      return;
    }

    showPurchaseSuccessToast();
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
        setSelectedMember={setSelectedMember}
        memberList={members}
      />
      <ItemPane
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        juiceList={juices}
        foodList={foods}
        selectedMember={selectedMember}
        purchaseItem={purchaseItem}
      />
    </Flex>
  );
}

export { HomePageParent };
