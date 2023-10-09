import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Item } from "types";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemAddPane } from "../ItemAdd/ItemAddPane";

type ItemRowProps = {
  item: Item;
  switchItemActivity: (id: string, activity: boolean) => void;
  deleteItem: (id: string) => void;
  fetchItemList: () => void;
};

function ItemRow(props: ItemRowProps) {
  const { item, switchItemActivity, deleteItem, fetchItemList } = props;

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
      <Box boxSize={8}>
        <Image />
      </Box>
      <Box ml={4}>
        <HStack spacing={2} align="center">
          <Text fontSize="xl" fontWeight="bold">
            {item.name}
          </Text>
          <Text as="sub" textColor="gray">{item.id}</Text>
        </HStack>
        <Text textColor="gray">
          {item.category +
            ", 定価: " +
            item.sellingPrice +
            " 円, 原価" +
            item.costPrice +
            " 円"}
        </Text>
      </Box>
      <Spacer />
      <HStack spacing={8}>
        <Switch
          size="lg"
          isChecked={item.active}
          onChange={() => switchItemActivity(item.id, !item.active)}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="More"
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
              size="lg"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <Stack spacing={4} p={4}>
              <Text>編集</Text>
              <Divider />
              <Text
                textColor="red"
                onClick={() => {
                  deleteItem(item.id);
                  fetchItemList();
                }}
              >
                削除
              </Text>
            </Stack>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
}

function ItemManagementPane() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function fetchItemList() {
    const itemList = await Backend.getItemList();
    if (itemList !== null) {
      setItemList(itemList);
    } else {
      console.error("fetchItemList: failed");
    }
  }

  async function switchItemActivity(id: string, activity: boolean) {
    if (!(await Backend.setItemActivity(id, activity))) {
      console.error("setItemactivity: failed");
    }
    itemList.findIndex((item) => item.id === id);
    setItemList(
      itemList.map((item) => {
        if (item.id === id) item.active = activity;
        return item;
      }),
    );
  }

  async function deleteItem(id: string) {
    if (!(await Backend.deleteItem(id))) console.error("deleteItem: failed");
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <>
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        colorScheme="blue"
        variant="outline"
        size="lg"
        mx={4}
        my={4}
        onClick={onOpen}
      >
        商品を追加
      </Button>
      <Stack spacing={0}>
        {itemList.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            switchItemActivity={switchItemActivity}
            deleteItem={deleteItem}
            fetchItemList={fetchItemList}
          />
        ))}
      </Stack>
      <ItemAddPane isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export { ItemManagementPane };
