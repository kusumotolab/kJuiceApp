import { useState } from "react";
import { Backend } from "util/Backend";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

function ItemAddPane() {
  const [itemId, setItemId] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [grouping, setGrouping] = useState("juice");

  async function addItem() {
    if (!(await Backend.addItem(itemId, sellingPrice, costPrice, grouping)))
      console.error("addItem: failed");
  }

  return (
    <Stack spacing={4}>
      <FormControl id="icon">
        <FormLabel>アイコン</FormLabel>
      </FormControl>
      <FormControl id="item_id">
        <FormLabel>アイテムID</FormLabel>
        <Input
          type="text"
          value={itemId}
          onChange={(event) => setItemId(event.target.value)}
        />
      </FormControl>
      <FormControl id="selling_price">
        <FormLabel>定価</FormLabel>
        <Input
          type="number"
          value={sellingPrice}
          onChange={(event) => setSellingPrice(Number(event.target.value))}
        />
      </FormControl>
      <FormControl id="cost_price">
        <FormLabel>原価</FormLabel>
        <Input
          type="number"
          value={costPrice}
          onChange={(event) => setCostPrice(Number(event.target.value))}
        />
      </FormControl>
      <FormControl id="grouping">
        <FormLabel>カテゴリ</FormLabel>
        <Select
          name="new-user-attribute"
          defaultValue="juice"
          value={grouping}
          onChange={(event) => setGrouping(event.target.value)}
        >
          <option value="juice">Juice</option>
          <option value="food">Food</option>
        </Select>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          addItem();
        }}
      >
        追加
      </Button>
    </Stack>
  );
}

export { ItemAddPane };
