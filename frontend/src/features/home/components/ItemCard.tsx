import { Item } from "types";
import { Image, Stack, Text, AspectRatio } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import LogoDefaultItem from "image/default_item.svg";

type Props = {
  item: Item;
  selected: boolean;
  onClick: () => void;
};

function ItemCard({ item, selected, onClick }: Props) {
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    async function getImage() {
      const res = await Backend.getItemImage(item.id);
      if (!ignore) {
        if (res === null) {
          console.log(
            item.id + ": Custom image not found. So use default image."
          );
          setImageURL(LogoDefaultItem);
          return;
        }
        setImageURL(URL.createObjectURL(res));
      }
    }
    getImage();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Stack spacing={1} w={32} onClick={onClick}>
      <AspectRatio ratio={1 / 1}>
        <Image
          src={imageURL}
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
