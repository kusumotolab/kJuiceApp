import { useEffect, useState } from "react";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";
import { Backend } from "util/Backend";
import { Item, Member } from "types";
import { Flex } from "@chakra-ui/react";

function HomePageParent() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [juiceList, setJuiceList] = useState<Item[]>([]);
  const [foodList, setFoodList] = useState<Item[]>([]);

  const [update, setUpdate] = useState(false);

  // 再レンダリング用のトリガとして利用するステート
  // もう少し賢い実装がありそうなので，TODO としておく
  // TODO
  const [sumPurchased, setSumPurchased] = useState(0);

  async function fetchMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList.filter((member) => member.active));
  }

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
  }, [sumPurchased]);

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
        update={update}
        setUpdate={setUpdate}
        foodList={foodList}
        selectedMember={selectedMember}
        setSumPurchased={setSumPurchased}
      />
    </Flex>
  );
}

export { HomePageParent };
