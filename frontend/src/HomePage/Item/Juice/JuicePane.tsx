import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item } from "types";

import { Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  onOpen: () => void;
};

function JuicePane({ juiceList, setSelectedItem, onOpen }: Props) {
  return (
    <Box>
      <Heading>ジュース</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {juiceList.map((juice) => {
          return (
            <ItemCard
              onClick={() => {
                setSelectedItem(juice);
                onOpen();
              }}
              item={juice}
              key={juice.id}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

export { JuicePane };
