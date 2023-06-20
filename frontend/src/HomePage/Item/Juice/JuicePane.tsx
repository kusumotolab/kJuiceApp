import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item, LogoDictionary } from "types";

import { Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  selectedItem: Item | null;
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  logoDictionary: LogoDictionary;
};

function JuicePane({
  juiceList,
  selectedItem,
  setSelectedItem,
  logoDictionary,
}: Props) {
  return (
    <Box>
      <Heading size="md" mb={4}>
        ジュース
      </Heading>
      <Flex w="100%" justify="start" flexWrap="wrap" gap={6}>
        {juiceList.map((juice) => {
          return (
            <ItemCard
              onClick={() => {
                setSelectedItem(juice);
              }}
              selected={juice === selectedItem}
              item={juice}
              imgSrc={logoDictionary[juice.id]}
              key={juice.id}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

export { JuicePane };
