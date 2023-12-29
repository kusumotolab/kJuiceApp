import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { History } from "types";
import { DateFormatter } from "util/DateFormatter";
import { Backend } from "util/Backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LogoDefaultItem from "image/default_item.svg";
import { useMembersDispatch } from "contexts/MembersContext";

type Props = {
  history: History;
  onDeleteHistory: (history: History) => void;
};

function HistoryCard({ history, onDeleteHistory: deleteHistory }: Props) {
  // TODO: 画像処理の共通化
  const [imageURL, setImageURL] = useState<string>("");
  const dispatch = useMembersDispatch();

  useEffect(() => {
    let ignore = false;

    async function getImage() {
      if (history === null) {
        setImageURL(LogoDefaultItem);
        return;
      }

      const res = await Backend.getItemImage(history.itemId);
      if (!ignore) {
        if (res === null) {
          console.log(
            history.itemId + ": Custom image not found. So use default image."
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

  async function deletePurchaseHistory(history: History) {
    if (!(await Backend.recall(history.historyId))) {
      console.error("recall: failed");
      return;
    }

    // memberの利用金額を更新
    dispatch({
      type: "purchaseCanceled",
      id: history.memberId,
      price: history.price,
    });

    // historyを更新
    deleteHistory(history);
  }

  return (
    <Flex
      _first={{ borderTop: "1px", borderColor: "blackAlpha.200" }}
      borderBottom="1px"
      borderColor="blackAlpha.200"
      justify="space-between"
      alignItems="center"
      px={4}
      py={2}
    >
      <AspectRatio
        ratio={1 / 1}
        w={16}
        border="1px"
        borderColor="blackAlpha.300"
        rounded={8}
      >
        {history.itemId === null ? (
          <Box />
        ) : (
          <Image src={imageURL} objectFit="cover" />
        )}
      </AspectRatio>
      <Box ml={4}>
        <HStack spacing={2} align="center">
          <Text fontSize="xl" fontWeight="bold">
            {history.itemName}
          </Text>
        </HStack>
        <Text textColor="gray">
          {DateFormatter.convertDateFormat(history.date) +
            ", " +
            history.price +
            " 円"}
        </Text>
      </Box>
      <Spacer />
      <IconButton
        variant="unstyled"
        aria-label="購入履歴を削除"
        onClick={() => deletePurchaseHistory(history)}
        icon={<FontAwesomeIcon icon={faTrash} color="red" />}
      />
    </Flex>
  );
}

export { HistoryCard };
