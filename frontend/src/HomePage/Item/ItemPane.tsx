import { Dispatch, SetStateAction } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";
import { HistoryPane } from "../History/HistoryPane";
import { PopUpMenu } from "./purchase/PopUpMenu/PopUpMenu";

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
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  foodList: Item[];
  selectedMember: Member | null;
  setSumPurchased: Dispatch<SetStateAction<number>>;
};

function ItemPane({
  setSelectedItem,
  selectedItem,
  juiceList,
  update,
  setUpdate,
  foodList,
  selectedMember,
  setSumPurchased,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoDictionary: LogoDictionary = {
    CocaCola: LogoCola,
    Fanta: LogoFanta,
    Water: LogoWater,
    GogoTea: LogoGogoTea,
    PotatoChips: LogoPotechi,
    Dagashi: LogoDagashi,
  };

  return (
    <Stack mx={8} flex="3" spacing={8} overflowX="scroll" overscrollBehavior="contain">
      <MemberInformation selectedMember={selectedMember} />
      <Divider />
      <JuicePane
        setSelectedItem={setSelectedItem}
        onOpen={onOpen}
        juiceList={juiceList}
        logoDictionary={logoDictionary}
      />
      <FoodPane
        setSelectedItem={setSelectedItem}
        onOpen={onOpen}
        foodList={foodList}
        logoDictionary={logoDictionary}
      />
      <HistoryPane selectedMember={selectedMember} />
      <PopUpMenu
        isOpen={isOpen}
        onClose={onClose}
        imgSrc={
          logoDictionary[selectedItem === null ? "CocaCola" : selectedItem.id]
        }
        selectedItem={selectedItem}
        setSumPurchased={setSumPurchased}
        selectedMember={selectedMember}
        setUpdate={setUpdate}
        update={update}
      />
    </Stack>
  );
}

export { ItemPane };
