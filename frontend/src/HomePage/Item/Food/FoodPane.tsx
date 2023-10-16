import { ItemCard } from "../component/ItemCard";

import { Item, LogoDictionary } from "types";
import { Dispatch, SetStateAction } from "react";

import { Box, Heading, Flex } from "@chakra-ui/react";

type Props = {
  foodList: Item[];
  handleClickItemCard: Dispatch<SetStateAction<string | null>>;
  onOpen: () => void;
  logoDictionary: LogoDictionary;
};

function FoodPane({
  foodList,
  handleClickItemCard,
  onOpen,
  logoDictionary,
}: Props) {
  return (
    <Box>
      <Heading>食品</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {foodList.map((food) => {
          return (
            <ItemCard
              color="#FFC039"
              onClick={() => {
                handleClickItemCard(food.id);
                onOpen();
              }}
              name={food.name}
              item={food}
              imgSrc={logoDictionary[food.id]}
              key={food.id}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

export { FoodPane };
