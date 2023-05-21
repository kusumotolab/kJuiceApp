import { Dispatch, SetStateAction } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";
import { HistoryPane } from "../History/HistoryPane";
import { PopUpMenu } from "./purchase/PopUpMenu";

import { MemberInformation } from "./MemberInformation/MemberInformation";
import { Item, Member } from "types";
import { Divider, Stack, useDisclosure } from "@chakra-ui/react";

type Props = {
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  selectedItem: Item | null;
  juiceList: Item[];
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  foodList: Item[];
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
  setSumPurchased: Dispatch<SetStateAction<number>>;
};

function ItemPane({
  setSelectedItem,
  selectedItem,
  juiceList,
  foodList,
  selectedMember,
  setSelectedMember,
  setSumPurchased,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      mx={8}
      flex="3"
      spacing={8}
      overflowX="scroll"
      overscrollBehavior="contain"
    >
      <MemberInformation selectedMember={selectedMember} />
      <Divider />
      <JuicePane
        setSelectedItem={setSelectedItem}
        onOpen={onOpen}
        juiceList={juiceList}
      />
      <FoodPane
        setSelectedItem={setSelectedItem}
        onOpen={onOpen}
        foodList={foodList}
      />
      <HistoryPane selectedMember={selectedMember} />
      <PopUpMenu
        isOpen={isOpen}
        onClose={onClose}
        selectedItem={selectedItem}
        setSumPurchased={setSumPurchased}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </Stack>
  );
}

export { ItemPane };
