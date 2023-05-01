import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import { Item } from "types";
import {
  Button,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function ItemDeletePane() {
  const [itemList, setItemList] = useState<Item[]>([]);

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
      })
    );
  }

  async function deleteItem(id: string) {
    if (!(await Backend.deleteItem(id))) console.error("deleteItem: failed");
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr className="caption">
            <Th>アイテム名</Th>
            <Th>グルーピング</Th>
            <Th>Active/Inactive</Th>
            <Th>削除ボタン</Th>
          </Tr>
        </Thead>
        <Tbody>
          {itemList.map((item) => (
            <Tr key={item.name}>
              <Th>{item.name}</Th>
              <Th>{item.category}</Th>
              <Th>
                <Switch
                  isChecked={item.active}
                  onChange={() => switchItemActivity(item.id, !item.active)}
                />
              </Th>
              <Th>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={async () => {
                    await deleteItem(item.id);
                    await fetchItemList();
                  }}
                >
                  削除
                </Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { ItemDeletePane };
