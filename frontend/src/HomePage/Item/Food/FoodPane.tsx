import { ItemCard } from "../component/ItemCard";

import { Item, LogoDictionary } from "types";
import { Dispatch, SetStateAction } from "react";

import { Box, Heading, Flex } from "@chakra-ui/react";

type Props = {
  foodList: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  onOpen: () => void;
  logoDictionary: LogoDictionary;
};

function FoodPane({
  foodList,
  setSelectedItem,
  onOpen,
  logoDictionary,
}: Props) {
  return (
    <Box>
      <Heading size="md" mb={4}>
        食品
      </Heading>
      <Flex w="100%" justify="start" flexWrap="wrap" gap={6}>
        {foodList.map((food) => {
          return (
            <ItemCard
              color="#FFC039"
              onClick={() => {
                setSelectedItem(food);
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
