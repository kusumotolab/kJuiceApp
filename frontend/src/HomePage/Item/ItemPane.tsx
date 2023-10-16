import { Dispatch, SetStateAction } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";
import { HistoryPane } from "../History/HistoryPane";
import { PopUpMenu } from "./purchase/PopUpMenu";

import LogoCola from "./../../image/logo_coca_cora.jpg";
import LogoFanta from "./../../image/logo_fanta.jpg";
import LogoWater from "./../../image/logo_water.jpeg";
import LogoGogoTea from "./../../image/logo_tea.jpeg";
import LogoPotechi from "./../../image/logo_potechi.jpeg";
import LogoDagashi from "./../../image/logo_dagashi.jpeg";
import { MemberInformation } from "./MemberInformation/MemberInformation";
import { Item, LogoDictionary, Member } from "types";
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
  const logoDictionary: LogoDictionary = {
    CocaCola: LogoCola,
    Fanta: LogoFanta,
    Water: LogoWater,
    GogoTea: LogoGogoTea,
    PotatoChips: LogoPotechi,
    Dagashi: LogoDagashi,
  };

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
        logoDictionary={logoDictionary}
      />
      <FoodPane
        handleClickItemCard={handleClickItemCard}
        onOpen={onOpenSafely}
        foodList={foodList}
        logoDictionary={logoDictionary}
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
