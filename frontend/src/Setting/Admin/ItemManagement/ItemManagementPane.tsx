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
import { ItemAddModal } from "../ItemAddModal/ItemAddModal";
import useItems from "hooks/useItems";

type Props = {
  item: Item;
  onChangeSwitchActivity: (id: string, activity: boolean) => void;
  onClickDeleteItem: (id: string) => void;
};
function ItemRow({ item, onChangeSwitchActivity, onClickDeleteItem }: Props) {
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
          <Text as="sub" textColor="gray">
            {item.id}
          </Text>
        </HStack>
        <Text textColor="gray">
          {item.category +
            ", 定価: " +
            item.sellingPrice +
            " 円, 原価: " +
            item.costPrice +
            " 円"}
        </Text>
      </Box>
      <Spacer />
      <HStack spacing={4}>
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={item.active}
          onChange={() => onChangeSwitchActivity(item.id, !item.active)}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              aria-label="More"
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
              size="lg"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <Stack spacing={4}>
              <Text>編集</Text>
              <Divider />
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() => onClickDeleteItem(item.id)}
              >
                削除
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
}

function ItemManagementPane() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, reloadItems } = useItems();

  async function handleChangeActivity(id: string, activity: boolean) {
    if (!(await Backend.setItemActivity(id, activity))) {
      console.error("setItemactivity: failed");
      return;
    }

    reloadItems();
  }

  async function handleClickDeleteItem(id: string) {
    if (!(await Backend.deleteItem(id))) {
      console.error("deleteItem: failed");
      return;
    }

    reloadItems();
  }

  async function handleClickAddItem({
    id,
    name,
    sellingPrice,
    costPrice,
    category,
  }: Item) {
    if (!(await Backend.addItem(id, name, sellingPrice, costPrice, category))) {
      console.error("addItem: failed");
      return;
    }

    reloadItems();
  }

  return (
    <>
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        colorScheme="teal"
        variant="outline"
        size="lg"
        mx={4}
        my={4}
        onClick={onOpen}
      >
        商品を追加
      </Button>
      <Stack spacing={0}>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onChangeSwitchActivity={handleChangeActivity}
            onClickDeleteItem={handleClickDeleteItem}
          />
        ))}
      </Stack>
      <ItemAddModal
        isOpen={isOpen}
        onClose={onClose}
        onClickAddItem={handleClickAddItem}
      />
    </>
  );
}

export { ItemManagementPane };
