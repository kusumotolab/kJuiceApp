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
import { useItems, useItemsDispatch } from "contexts/ItemsContext";
import { ItemId } from "types";
import { Backend } from "util/Backend";

function ItemDeletePane() {
  const items = useItems();
  const dispatch = useItemsDispatch();

  function handleDeleteItem(id: ItemId) {
    if (!Backend.deleteItem(id)) {
      console.error("deleteItem: failed");
      return;
    }
    dispatch({ type: "deleted", id: id });
  }

  function handleSwitchItemActivity(id: ItemId, active: boolean) {
    if (!Backend.setItemActivity(id, active)) {
      console.error("setItemActivity: failed");
      return;
    }
    dispatch({ type: "switchedActivity", id: id, active: active });
  }

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
          {items.map((item) => (
            <Tr key={item.name}>
              <Th>{item.name}</Th>
              <Th>{item.category}</Th>
              <Th>
                <Switch
                  isChecked={item.active}
                  onChange={() =>
                    handleSwitchItemActivity(item.id, !item.active)
                  }
                />
              </Th>
              <Th>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteItem(item.id)}
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
