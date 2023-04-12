import { useEffect, useState } from "react";
import { Button } from "../../../component/Button";
import { Toggle } from "../../../component/Toggle";
import { Backend } from "util/Backend";
import { Item } from "types";

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
    if (!(await Backend.setItemActivity(id, activity)))
      console.error("setItemactivity: failed");
  }

  async function deleteItem(id: string) {
    if (!(await Backend.deleteItem(id))) console.error("deleteItem: failed");
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <div className="ItemDelete">
      <table border={1}>
        <tr className="caption">
          <th>アイテム名</th>
          <th>グルーピング</th>
          <th>Active/Inactive</th>
          <th>削除ボタン</th>
        </tr>
        {itemList.map((item) => (
          <tr key={item.id}>
            <th>{item.name}</th>
            <th>{item.category}</th>
            <th>
              <Toggle
                toggled={item.active}
                onClick={(activity: boolean) =>
                  switchItemActivity(item.id, activity)
                }
              />
            </th>
            <th>
              <Button
                color="gray"
                radius="0.5em"
                onClick={async () => {
                  await deleteItem(item.id);
                  await fetchItemList();
                }}
                fontColor="white"
              >
                削除
              </Button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}

export { ItemDeletePane };
