import { ItemCard } from "../component/ItemCard";

import { Item, LogoDictionary, Member } from "types";
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
            <Heading>食品</Heading>
            <Flex gap={4}>
                {foodList
                    .sort((a, b) => -a.salesFigure + b.salesFigure)
                    .map((food) => {
                        return (
                            <ItemCard
                                color="#FFC039"
                                onClick={() => {
                                    setSelectedItem(food);
                                    onOpen.call(null);
                                }}
                                name={food.name}
                                item={food}
                                imgSrc={logoDictionary[food.name]}
                                key={food.name}
                            />
                        );
                    })}
            </Flex>
        </Box>
    );
}

export { FoodPane };
