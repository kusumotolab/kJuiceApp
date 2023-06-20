import "./ItemCard.css";
import { Item } from "types";
import { Image, Stack, Text, AspectRatio } from "@chakra-ui/react";

type Props = {
  selected: boolean;
  item: Item;
  onClick: () => void;
  imgSrc: string;
};

function ItemCard({ selected, onClick, imgSrc, item }: Props) {
  return (
    <Stack spacing={1} w={32} onClick={onClick}>
      <AspectRatio ratio={1 / 1}>
        <Image
          src={imgSrc}
          border="2px"
          borderColor={selected ? "teal.400" : "blackAlpha.200"}
          rounded={8}
          objectFit="cover"
        />
      </AspectRatio>
      <Text>{item.name}</Text>
      <Text>{item.sellingPrice}円</Text>
    </Stack>
  );
}

export { ItemCard };
