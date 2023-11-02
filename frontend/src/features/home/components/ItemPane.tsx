import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useItems } from "contexts/ItemsContext";
import { ItemCard } from "./ItemCard";

type Props = {
  selectedItemId: string;
  onClickItemCard: (id: string) => void;
};

export default function ItemPane({ selectedItemId, onClickItemCard }: Props) {
  const items = useItems();
  const juices = items.filter(
    (item) => item.category === "juice" && item.active,
  );
  const foods = items.filter((item) => item.category === "food" && item.active);
  const categories = [
    { id: 0, title: "ジュース", items: juices },
    { id: 1, title: "食べ物", items: foods },
  ];

  return (
    <>
      {categories.map((category) => (
        <Stack key={category.id} spacing={4} mb={8}>
          <Heading size="md">{category.title}</Heading>
          <Flex w="100%" justify="start" flexWrap="wrap" gap={6}>
            {category.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                selected={item.id === selectedItemId}
                onClick={() => onClickItemCard(item.id)}
              />
            ))}
          </Flex>
        </Stack>
      ))}
    </>
  );
}
