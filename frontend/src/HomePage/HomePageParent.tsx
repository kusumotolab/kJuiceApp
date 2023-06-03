import { useContext, useEffect, useState } from "react";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";
import { Backend } from "util/Backend";
import { Item, Member } from "types";
import { Flex, useToast } from "@chakra-ui/react";
import { TabIndex } from "App";

function HomePageParent() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [juiceList, setJuiceList] = useState<Item[]>([]);
  const [foodList, setFoodList] = useState<Item[]>([]);
  const toast = useToast();

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id)))
      console.error("purchaseItem: failed");

    setSelectedMember(null);
    showToast();
  }

  function showToast() {
    toast({
      title: "購入完了",
      description: "購入が完了しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function fetchMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList.filter((member) => member.active));
  }

  const tabIndex = useContext(TabIndex);

  async function fetchItemList() {
    const itemList = await Backend.getItemList();

    if (itemList === null) {
      console.error("fetchItemList: failed");
      return;
    }

    setJuiceList(
      itemList.filter((item) => item.active && item.category === "juice")
    );
    setFoodList(
      itemList.filter((item) => item.active && item.category === "food")
    );
  }

  useEffect(() => {
    fetchMemberList();
    fetchItemList();
  }, [tabIndex]);

  return (
    <Flex h="calc(100vh - 40px)" overflowX="scroll">
      <MemberPane
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        memberList={memberList}
      />
      <ItemPane
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        juiceList={juiceList}
        foodList={foodList}
        selectedMember={selectedMember}
        purchaseItem={purchaseItem}
      />
    </Flex>
  );
}

export { HomePageParent };
