import { ItemCard } from "../component/ItemCard";

import { Item } from "types";
import { Dispatch, SetStateAction } from "react";

import { Box, Heading, Flex } from "@chakra-ui/react";

type Props = {
  foodList: Item[];
  handleClickItemCard: Dispatch<SetStateAction<string | null>>;
  onOpen: () => void;
};

function FoodPane({ foodList, handleClickItemCard, onOpen }: Props) {
  return (
    <Box>
      <Heading>食品</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {foodList.map((food) => {
          return (
            <ItemCard
              onClick={() => {
                handleClickItemCard(food.id);
                onOpen();
              }}
              item={food}
              key={food.id}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

export { FoodPane };
