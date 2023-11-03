import {
  AspectRatio,
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Item } from "types";
import { Backend } from "util/Backend";
import LogoDefaultItem from "image/default_item.svg";

type Props = {
  item: Item | undefined;
  onClickClearButton: () => void;
};

function ItemInfo({ item, onClickClearButton }: Props) {
  // TODO: 画像処理の共通化
  const [imageURL, setImageURL] = useState<string>("");
  useEffect(() => {
    let ignore = false;

    async function getImage() {
      if (item === undefined) {
        setImageURL(LogoDefaultItem);
        return;
      }

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
  }, [item]);

  return (
    <>
      <IconButton
        variant="unstyled"
        aria-label="商品選択取り消し"
        icon={
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size="lg"
            color={item === undefined ? "gray" : "red"}
          />
        }
        onClick={onClickClearButton}
      />
      <AspectRatio
        ratio={1 / 1}
        w={16}
        border="1px"
        borderColor="blackAlpha.300"
        rounded={8}
      >
        {item === undefined ? <Box /> : 
        <Image src={imageURL} objectFit="cover" />
        }
      </AspectRatio>
      <Center>
        {item === undefined ? (
          <Heading color="blackAlpha.500" size="md">
            商品を選択
          </Heading>
        ) : (
          <Stack>
            <Heading size="md">{item.name}</Heading>
            <Text>{item.sellingPrice + " 円"}</Text>
          </Stack>
        )}
      </Center>
    </>
  );
}

export { ItemInfo };
