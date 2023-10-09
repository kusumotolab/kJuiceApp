import { ItemPerCategory } from "./ItemCategory/ItemCategory";

import { Item } from "types";
import { Stack } from "@chakra-ui/react";

type Props = {
  selectedItem: Item | null;
  handleClickItemCard: (item: Item) => void;
};

function ItemPane({ selectedItem, handleClickItemCard }: Props) {
  const categories = [
    { title: "ジュース", category: "juice" },
    { title: "食べ物", category: "food" },
  ];

  return (
    <Stack spacing={8}>
      {categories.map((category) => (
        <ItemPerCategory
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
