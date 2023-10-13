import { Flex, useToast } from "@chakra-ui/react";
import { TabIndex } from "App";
import { useContext, useEffect, useState } from "react";
import { Item, Member } from "types";
import { Backend } from "util/Backend";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";

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
    itemList?.sort(compareItemFunction);

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

  function compareItemFunction(a: Item, b: Item) {
    if (a.id === b.id) {
      return 0;
    } else if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  }

  useEffect(() => {
    fetchMemberList();
    fetchItemList();
  }, [tabIndex]);

  useEffect(() => {
    fetchMemberList();
  }, [selectedMember]);

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
