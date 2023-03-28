import { ItemCard } from "../component/ItemCard";

import { Dispatch, SetStateAction } from "react";
import { Item, LogoDictionary, Member } from "types";

import { HStack, Box, Heading } from "@chakra-ui/react";

type Props = {
  juiceList: Item[];
  selected?: boolean;
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  selectedMember: Member | null;
  setPopUpVisibility: Dispatch<SetStateAction<boolean>>;
  logoDictionary: LogoDictionary;
};

function JuicePane({
  juiceList,
  setSelectedItem,
  selectedMember,
  setPopUpVisibility,
  logoDictionary,
}: Props) {
  return (
    <Box marginBottom='1em'>
        <Heading>ジュース</Heading>
        <HStack overflowX='scroll' spacing='1em'>
            {juiceList
              .sort((a, b) => -a.salesFigure + b.salesFigure)
              .map((juice) => {
                return (
                  <ItemCard
                    color="#FFC039"
                    onClick={() => {
                      setSelectedItem(juice);
                      if (selectedMember !== null) {
                        setPopUpVisibility(true);
                      }
                    }}
                    name={juice.name}
                    item={juice}
                    imgSrc={logoDictionary[juice.name]}
                    key={juice.name}
                  />
                );
              })}
        </HStack>
    </Box>
  );
}

export { JuicePane };
