import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item, LogoDictionary } from "types";

import { Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  selected?: boolean;
  handleClickItemCard: Dispatch<SetStateAction<string | null>>;
  onOpen: () => void;
  logoDictionary: LogoDictionary;
};

function JuicePane({
  juiceList,
  handleClickItemCard,
  onOpen,
  logoDictionary,
}: Props) {
  return (
    <Box>
      <Heading>ジュース</Heading>
      <Flex p={1} overflowX="auto" gap={4}>
        {juiceList.map((juice) => {
          return (
            <ItemCard
              color="#FFC039"
              onClick={() => {
                handleClickItemCard(juice.id);
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
