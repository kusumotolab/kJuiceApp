import { Dispatch, SetStateAction } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";

import LogoCola from "./../../image/logo_coca_cora.jpg";
import LogoFanta from "./../../image/logo_fanta.jpg";
import LogoWater from "./../../image/logo_water.jpeg";
import LogoGogoTea from "./../../image/logo_tea.jpeg";
import LogoPotechi from "./../../image/logo_potechi.jpeg";
import LogoDagashi from "./../../image/logo_dagashi.jpeg";
import { Item, LogoDictionary, Member } from "types";
import { Stack } from "@chakra-ui/react";

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
    <Stack spacing={8}>
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
