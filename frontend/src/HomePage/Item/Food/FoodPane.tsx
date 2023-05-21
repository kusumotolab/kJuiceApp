import { ItemCard } from "../component/ItemCard";

import { Item } from "types";
import { Dispatch, SetStateAction } from "react";

import { Box, Heading, Flex } from "@chakra-ui/react";

type Props = {
  foodList: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  onOpen: () => void;
};

function FoodPane({ foodList, setSelectedItem, onOpen }: Props) {
  return (
    <Box>
      <Heading>食品</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {foodList.map((food) => {
          return (
            <ItemCard
              onClick={() => {
                setSelectedItem(food);
                onOpen();
              }}
              name={food.name}
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
