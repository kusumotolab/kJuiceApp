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
import { useContext, useEffect, useState } from "react";
import { Backend } from "util/Backend";
import LogoDefaultItem from "./../../../image/default_item.svg";
import { TabIndex } from "App";

type Props = {
  name: string;
  item: Item;
  onClick: () => void;
};

function ItemCard({ name, onClick, item }: Props) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const tabIndex = useContext(TabIndex);

  async function getImage() {
    const img = await Backend.getItemImage(item.id);
    if (img !== null) {
      setImgSrc(URL.createObjectURL(img));
    } else {
      setImgSrc(LogoDefaultItem);
    }
  }

  useEffect(() => {
    getImage();
  }, [tabIndex]);

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
