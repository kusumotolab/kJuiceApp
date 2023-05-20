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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import LogoDefaultItem from "./../../../image/default_item.svg";

type Props = {
  color: string;
  name: string;
  item: Item;
  onClick: () => void;
  imgSrc: string;
};

function ItemCard({ name, onClick, item }: Props) {

  const [imgSrc,setImgSrc] = useState<string>("");

  async function getImage() {
    const img = await Backend.getItemImage(item.id);
    if (img !== null) {
      setImgSrc(URL.createObjectURL(img));
    }else{
      setImgSrc(LogoDefaultItem);
    }
  }

  useEffect(() => {
    getImage()
  },[])

  return (
    <Card width="10em" flexShrink="0" onClick={onClick}>
      <CardBody>
        <Stack spacing="3">
          <AspectRatio ratio={1 / 1}>
            <Image src={imgSrc} w="100%" objectFit="cover" />
          </AspectRatio>
          <Heading size="md">{name}</Heading>
          <Text>{item.sellingPrice}円</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export { ItemCard };
