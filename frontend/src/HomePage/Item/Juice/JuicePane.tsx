import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item } from "types";

import { Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  handleClickItemCard: Dispatch<SetStateAction<string | null>>;
  onOpen: () => void;
};

function JuicePane({ juiceList, handleClickItemCard, onOpen }: Props) {
  return (
    <Box>
      <Heading>ジュース</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {juiceList.map((juice) => {
          return (
            <ItemCard
              onClick={() => {
                handleClickItemCard(juice.id);
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
