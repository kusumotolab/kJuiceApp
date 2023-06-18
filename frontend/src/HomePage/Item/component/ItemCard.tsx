import "./ItemCard.css";
import { Item } from "types";
import {
  Image,
  Stack,
  Heading,
  Card,
  CardBody,
  Text,
  AspectRatio,
  Box,
} from "@chakra-ui/react";

type Props = {
  color: string;
  name: string;
  item: Item;
  onClick: () => void;
  imgSrc: string;
};

function ItemCard({ name, onClick, imgSrc, item }: Props) {
  return (
    <Stack spacing={1} w={32} onClick={onClick}>
      <AspectRatio ratio={1 / 1}>
        <Image
          src={imgSrc}
          border="1px"
          borderColor="blackAlpha.300"
          rounded={8}
          objectFit="cover"
        />
      </AspectRatio>
      <Text>{name}</Text>
      <Text>{item.sellingPrice}円</Text>
    </Stack>
  );
}

export { ItemCard };
