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
import { Divider, Stack, useDisclosure } from "@chakra-ui/react";

type Props = {
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  selectedItem: Item | null;
  juiceList: Item[];
  foodList: Item[];
  selectedMember: Member | null;
  purchaseItem: () => void;
};

function ItemPane({
  setSelectedItem,
  selectedItem,
  juiceList,
  foodList,
  selectedMember,
  purchaseItem,
}: Props) {
  const logoDictionary: LogoDictionary = {
    CocaCola: LogoCola,
    Fanta: LogoFanta,
    Water: LogoWater,
    GogoTea: LogoGogoTea,
    PotatoChips: LogoPotechi,
    Dagashi: LogoDagashi,
  };

  return (
    <Stack
      flex="2"
      h="calc(100vh - (64px + 96px))"
      maxW="900px"
      overflowY="scroll"
      overscroll="contain"
      spacing={8}
    >
      <JuicePane
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        juiceList={juiceList}
        logoDictionary={logoDictionary}
      />
      <FoodPane
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        foodList={foodList}
        logoDictionary={logoDictionary}
      />
    </Stack>
  );
}

export { ItemPane };
