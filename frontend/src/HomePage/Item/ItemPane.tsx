import { Dispatch, SetStateAction } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";
import { HistoryPane } from "../History/HistoryPane";
import { PopUpMenu } from "./purchase/PopUpMenu";

import { MemberInformation } from "./MemberInformation/MemberInformation";
import { Item, Member } from "types";
import { Divider, Stack, useDisclosure, useToast } from "@chakra-ui/react";

type Props = {
  handleClickItemCard: Dispatch<SetStateAction<string | null>>;
  selectedItem: Item | undefined;
  juiceList: Item[];
  foodList: Item[];
  selectedMember: Member | undefined;
  purchaseItem: () => void;
};

function ItemPane({
  handleClickItemCard,
  selectedItem,
  juiceList,
  foodList,
  selectedMember,
  purchaseItem,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function showMemberNotSelectedToast() {
    toast({
      title: "利用者未選択",
      description: "利用者を選択してください",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  function onOpenSafely() {
    if (selectedMember === undefined) {
      showMemberNotSelectedToast();
      return;
    }
    onOpen();
  }

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
        handleClickItemCard={handleClickItemCard}
        onOpen={onOpenSafely}
        juiceList={juiceList}
      />
      <FoodPane
        handleClickItemCard={handleClickItemCard}
        onOpen={onOpenSafely}
        foodList={foodList}
      />
      <HistoryPane selectedMember={selectedMember} />
      <PopUpMenu
        isOpen={isOpen}
        onClose={onClose}
        selectedItem={selectedItem}
        selectedMember={selectedMember}
        purchaseItem={purchaseItem}
      />
    </Stack>
  );
}

export { ItemPane };
