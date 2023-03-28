import { ItemCard } from "../component/ItemCard";

import { Item, LogoDictionary, Member } from "types";
import { Dispatch, SetStateAction } from "react";

import { HStack, Box, Heading } from "@chakra-ui/react";

type Props = {
  foodList: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  selectedMember: Member | null;
  setPopUpVisibility: Dispatch<SetStateAction<boolean>>;
  logoDictionary: LogoDictionary;
};

function FoodPane({
  foodList,
  setSelectedItem,
  selectedMember,
  setPopUpVisibility,
  logoDictionary,
}: Props) {
  return (
    <Box marginBottom='1em'>
      <Heading>食品</Heading>
        <HStack overflowX='scroll' spacing='1em'>
        {foodList
          .sort((a, b) => -a.salesFigure + b.salesFigure)
          .map((food) => {
            return (
              <ItemCard
                color="#FFC039"
                onClick={() => {
                  setSelectedItem(food);
                  if (selectedMember !== null) {
                    setPopUpVisibility(true);
                  }
                }}
                name={food.name}
                item={food}
                imgSrc={logoDictionary[food.name]}
                key={food.name}
              />
            );
          })}
      </HStack>
    </Box>
  );
}

export { FoodPane };
