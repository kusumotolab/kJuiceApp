import "./ItemCard.css";
import { Item } from "types";
import { Image, Stack, Heading, Card, CardBody, Text, AspectRatio } from "@chakra-ui/react";

type Props = {
  color: string;
  name: string;
  item: Item;
  onClick: () => void;
  imgSrc: string;
};

function ItemCard({ name, onClick, imgSrc, item }: Props) {
  return (
    <Card width='10em' flexShrink='0' onClick={onClick}>
        <CardBody>
            <Stack spacing='3'>
                <AspectRatio ratio={ 1 / 1 }>
                    <Image src={imgSrc} w='100%' objectFit='cover' />
                </ AspectRatio>
                <Heading size='md'>{name}</Heading>
                <Text>{item.sellingPrice}円</Text>
            </Stack>
        </CardBody>
    </Card>
  );
}

export { ItemCard };
