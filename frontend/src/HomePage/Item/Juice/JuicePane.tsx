import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item, LogoDictionary } from "types";

import { Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  selected?: boolean;
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  onOpen: () => void;
  logoDictionary: LogoDictionary;
};

function JuicePane({
  juiceList,
  setSelectedItem,
  onOpen,
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
              color="#FFC039"
              onClick={() => {
                setSelectedItem(juice);
                onOpen();
              }}
              name={juice.name}
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
