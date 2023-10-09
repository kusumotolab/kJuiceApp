import { ItemCard } from "../component/ItemCard";
import { Item, LogoDictionary } from "types";

import LogoCola from "image/logo_coca_cora.jpg";
import LogoFanta from "image/logo_fanta.jpg";
import LogoWater from "image/logo_water.jpeg";
import LogoGogoTea from "image/logo_tea.jpeg";
import LogoPotechi from "image/logo_potechi.jpeg";
import LogoDagashi from "image/logo_dagashi.jpeg";

import { Flex, Box, Heading } from "@chakra-ui/react";
import useItems from "hooks/useItems";

type Props = {
  title: string;
  category: string;
  selectedItem: Item | null;
  handleClickItemCard: (item: Item) => void;
};

function ItemPerCategory({
  title,
  category,
  selectedItem,
  handleClickItemCard,
}: Props) {
  const items = useItems();
  const logoDictionary: LogoDictionary = {
    CocaCola: LogoCola,
    Fanta: LogoFanta,
    Water: LogoWater,
    GogoTea: LogoGogoTea,
    PotatoChips: LogoPotechi,
    Dagashi: LogoDagashi,
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Flex w="100%" justify="start" flexWrap="wrap" gap={6}>
        {items
          .filter((item) => item.category === category && item.active === true)
          .map((item) => {
            return (
              <ItemCard
                key={item.id}
                onClick={() => {
                  handleClickItemCard(item);
                }}
                selected={item === selectedItem}
                item={item}
                imgSrc={logoDictionary[item.id]}
              />
            );
          })}
      </Flex>
    </Box>
  );
}

export { ItemPerCategory };
