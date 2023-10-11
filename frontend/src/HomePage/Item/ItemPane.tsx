import { ItemPerCategory } from "./ItemCategory/ItemCategory";

import { Item } from "types";
import { Stack } from "@chakra-ui/react";

type Props = {
  selectedItem: Item | null;
  handleClickItemCard: (item: Item) => void;
};

function ItemPane({ selectedItem, handleClickItemCard }: Props) {
  const categories = [
    { id: 0, title: "ジュース", category: "juice" },
    { id: 1, title: "食べ物", category: "food" },
  ];

  return (
    <Stack spacing={8}>
      {categories.map((category) => (
        <ItemPerCategory
          key={category.id}
          title={category.title}
          category={category.category}
          selectedItem={selectedItem}
          handleClickItemCard={handleClickItemCard}
        />
      ))}
    </Stack>
  );
}

export { ItemPane };
